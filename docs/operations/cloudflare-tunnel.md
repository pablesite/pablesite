**Configurar Cloudflare Tunnel para `pablesite.es` (ARDA + Traefik)**

Resumen: usar un Cloudflare Tunnel existente (o crear uno nuevo) que exponga `pablesite.es` y reenvíe tráfico al Traefik local en ARDA (HTTP 80). Traefik se encargará de enrutar a la aplicación `pablesite` que escucha en el puerto 8080 dentro del contenedor.

Prerequisitos en ARDA:
- `docker` y `docker-compose` instalados
- `traefik` corriendo en la red `traefik` (escuchando puertos 80/443 localmente)
- Acceso administrativo a la cuenta de Cloudflare para el dominio `pablesite.es` (o el zone donde gestionas DNS)
- `cloudflared` instalado en ARDA o un host que haga de cliente del Tunnel

Opciones: reutilizar un Tunnel existente (`codinglab` en tu captura) o crear un Tunnel nuevo.

1) Reutilizar Tunnel existente (recomendado si ya usas `codinglab`)

- En el panel Cloudflare → Zero Trust → Access → Tunnels → `codinglab` → "Configure" → "Hostname" añadir:
  - Hostname: `pablesite.es`
  - Service: `http://localhost:80` (o `http://127.0.0.1:80` si Traefik escucha en el host)
  - Proxy status: Proxied

- Guardar. Cloudflare creará un registro tipo `Tunnel` para `pablesite.es` (como el resto en tu captura).

2) Crear un Tunnel nuevo (si prefieres separar)

- En ARDA instala `cloudflared` (ejemplo Debian/Ubuntu):

```bash
curl -L https://github.com/cloudflare/cloudflared/releases/latest/download/cloudflared-linux-amd64 -o /usr/local/bin/cloudflared
chmod +x /usr/local/bin/cloudflared
```

- Autentica y crea un tunnel desde tu máquina local (necesita navegador):

```bash
cloudflared tunnel login
cloudflared tunnel create pablesite
# Esto crea un archivo de credenciales en ~/.cloudflared/<TUNNEL-UUID>.json
```

- Copia el archivo de credenciales a ARDA (por ejemplo a `/etc/cloudflared/`) y configura permisos.

- Crear `config.yml` de cloudflared en `/etc/cloudflared/config.yml` con contenido mínimo:

```yaml
tunnel: <TUNNEL-UUID>
credentials-file: /etc/cloudflared/<TUNNEL-UUID>.json
ingress:
  - hostname: pablesite.es
    service: http://127.0.0.1:80
  - service: http_status:404
```

- Registrar el hostname en el panel Cloudflare (Zero Trust → Tunnels → Hostnames) apuntando `pablesite.es` al tunnel creado.

- Ejecutar el tunnel como servicio systemd (ejemplo):

```bash
cat >/etc/systemd/system/cloudflared-pablesite.service <<'EOF'
[Unit]
Description=Cloudflare Tunnel for pablesite
After=network.target

[Service]
TimeoutStartSec=0
Type=simple
ExecStart=/usr/local/bin/cloudflared tunnel run --config /etc/cloudflared/config.yml
Restart=on-failure

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable --now cloudflared-pablesite
```

3) Ajustes en Traefik / Docker

- `compose.yaml` de `pablesite` ya contiene labels de Traefik con `Host(`${PABLESITE_HOST:-pablesite.es}`)`. Asegúrate en `/opt/arda/pablesite/.env` que `PABLESITE_HOST=pablesite.es`.
- Traefik debe escuchar HTTP en `0.0.0.0:80` (para que cloudflared pueda reenviarle tráfico en `127.0.0.1:80`). Si Traefik está en un contenedor separado, cloudflared puede apuntar al puerto expuesto en el host o al puerto del contenedor si usas `service: http://traefik:80` y ejecutas cloudflared en la misma red Docker.

4) Verificación

- Desde internet: `curl -I https://pablesite.es/es/` → deberías obtener `200 OK` y certificado TLS gestionado por Cloudflare.
- Logs: en ARDA revisar `journalctl -u cloudflared-pablesite -f` y `docker logs traefik` si hay problemas de enrutamiento.

5) Notas de seguridad

- Usa las entradas DNS tipo `Tunnel` en Cloudflare (no un A record público) si tu host está detrás del Tunnel.
- Mantén las credenciales del Tunnel en `/etc/cloudflared` con permisos restringidos (`600`) y propietario `root`.
- Si tu Traefik expone el panel (dashboard), protégelo con auth y un entrypoint interno.

6) Troubleshooting rápido

- Si obtienes 502 desde Cloudflare: verificar `cloudflared` está corriendo y el servicio destino (`http://127.0.0.1:80`) responde en ARDA.
- Si Traefik no enruta: revisar que `docker network` usado por pablesite y traefik es el mismo (`traefik`).

---

Si quieres, puedo:

- Añadir el `config.yml` y el unit file como plantilla en este repo en `deploy/` para que los copies a ARDA.
- Crear el workflow CI/CD (build→ghcr→deploy via SSH) — ya lo añadí y requiere que agregues los secrets `ARDA_SSH_HOST`, `ARDA_SSH_USER`, `ARDA_SSH_PRIVATE_KEY` y opcional `ARDA_SSH_PORT`.
