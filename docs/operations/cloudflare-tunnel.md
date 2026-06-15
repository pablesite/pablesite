# Cloudflare Tunnel para `pablesite.es`

## Objetivo

Exponer `pablesite.es` a internet usando el Cloudflare Tunnel ya existente en ARDA y enrutarlo a Traefik en `http://localhost:80`.

## Estado real en ARDA

1. `cloudflared` corre como contenedor Docker, no como servicio `systemd`.
2. El compose del tunnel vive en `/datos/docker/compose/cloudflared/compose.yml`.
3. La configuración del tunnel vive en `/datos/docker/data/cloudflared/config.yml`.
4. Traefik vive en la red Docker `proxy` y escucha en `:80` y `:443`.
5. `pablesite` debe desplegarse en `/datos/docker/compose/pablesite/`.

## Configuración de Cloudflare

El hostname `pablesite.es` ya puede publicarse correctamente a través del tunnel actual siempre que Traefik tenga un router activo para ese host.

Si hay que recrearlo o revisarlo en Zero Trust, la configuración es esta:

1. Ir a Cloudflare Zero Trust.
2. Abrir `Networks` o `Access` según la UI actual, luego `Tunnels`.
3. Entrar en el tunnel `codinglab`.
4. Añadir un `Public Hostname`:
   - Hostname: `pablesite.es`
   - Service type: `HTTP`
   - URL: `http://localhost:80`
5. Guardar con `Proxied` activo.

## Configuración esperada del tunnel

El archivo `/datos/docker/data/cloudflared/config.yml` puede seguir siendo mínimo:

```yaml
tunnel: <TUNNEL-UUID>
credentials-file: /etc/cloudflared/<TUNNEL-UUID>.json

ingress:
  - service: http://localhost:80
```

La asociación de `pablesite.es` al tunnel se hace en el panel de Cloudflare, no en este archivo.

## Configuración esperada de `pablesite`

En ARDA:

1. `compose.yaml` en `/datos/docker/compose/pablesite/compose.yaml`
2. `.env` en `/datos/docker/compose/pablesite/.env`
3. `.env.release` en `/datos/docker/compose/pablesite/.env.release`

`.env` mínimo recomendado:

```bash
PABLESITE_HOST=pablesite.es
TRAEFIK_NETWORK=proxy
TRAEFIK_ENTRYPOINTS=web
```

## Verificación

En ARDA:

```bash
docker compose --env-file /datos/docker/compose/pablesite/.env \
  --env-file /datos/docker/compose/pablesite/.env.release \
  -f /datos/docker/compose/pablesite/compose.yaml ps

curl -I -H "Host: pablesite.es" http://127.0.0.1/
docker logs cloudflared --tail 100
docker logs traefik --tail 100
```

Desde internet:

```bash
curl -I https://pablesite.es/es/
curl -I https://pablesite.es/en/
```

## Troubleshooting rápido

1. Si `curl -I https://pablesite.es/...` devuelve `404`, suele faltar el router en Traefik o el hostname público en el tunnel.
2. Si `curl -I -H "Host: pablesite.es" http://127.0.0.1/` devuelve `404` en ARDA, el contenedor no está desplegado o no está unido a la red `proxy`.
3. Si Cloudflare devuelve `502`, revisar `docker logs cloudflared` y confirmar que Traefik responde en `localhost:80`.
