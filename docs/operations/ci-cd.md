# CI/CD

## Objetivo

Mantener una pipeline pequeña y fiable para `pablesite`: validar el sitio Astro, publicar la imagen Docker en GHCR y desplegarla en ARDA cuando producción esté habilitada.

## Estado actual

1. Gate local canónico: `./scripts/pre-push-check.sh`
2. Workflow `Quality` para PRs a `main`
3. Workflow `Build, Publish and Deploy` para pushes a `main`
4. Imagen Docker publicada en GHCR
5. Deploy remoto opcional a ARDA gated por variable de GitHub

## Contrato actual

### Pull Requests

En cada PR a `main`:

1. Ejecutar el workflow `Quality`
2. Ejecutar `npm run build`, `npm run lint`, `npm run typecheck` y `npm run format:check`
3. Validar que el gate local tenga paridad razonable con CI
4. Bloquear merge si el workflow falla

### Pushes a `main`

El workflow `deploy.yml` hace esto:

1. `npm ci`
2. `npm run build`
3. Build y push de la imagen Docker
4. Publicación de tags `latest` y `sha-${GITHUB_SHA}`
5. Si `ENABLE_PRODUCTION_DEPLOY=1`, copia `compose.yaml` y `.env.release` a ARDA
6. Ejecuta `docker compose pull && docker compose up -d`
7. Lanza un smoke básico contra `https://pablesite.es/es/`

## Secrets y variables requeridos

### GitHub secrets

1. `ARDA_SSH_HOST`
2. `ARDA_SSH_USER`
3. `ARDA_SSH_PRIVATE_KEY`
4. `GHCR_USERNAME` opcional
5. `GHCR_TOKEN` opcional

### GitHub variables

1. `ENABLE_PRODUCTION_DEPLOY=1` para activar deploy automático
2. `ARDA_SSH_PORT=2621`
3. `DEPLOY_PATH=/datos/docker/compose/pablesite`
4. `DEPLOY_ENV_FILE=.env`
5. `PRODUCTION_URL=https://pablesite.es`

## Contrato del servidor

1. Compose: `/datos/docker/compose/pablesite/compose.yaml`
2. Variables persistentes: `/datos/docker/compose/pablesite/.env`
3. Imagen exacta desplegada: `/datos/docker/compose/pablesite/.env.release`
4. Red externa de Traefik: `proxy`
5. Publicación externa: Cloudflare Tunnel -> `http://localhost:80` -> Traefik -> contenedor `pablesite`

## Rollback

1. Identificar un tag SHA previo en GHCR
2. Editar `/datos/docker/compose/pablesite/.env.release`
3. Ejecutar:

```bash
docker compose --env-file .env --env-file .env.release -f compose.yaml pull
docker compose --env-file .env --env-file .env.release -f compose.yaml up -d --remove-orphans
docker compose --env-file .env --env-file .env.release -f compose.yaml ps
```

## Filosofía

1. CI debe reflejar el gate local, no competir con él
2. La automatización de deploy debe ser simple y observable
3. El estado real del servidor manda sobre la documentación histórica
4. Mejor una pipeline pequeña y fiable que una grande y falsa
