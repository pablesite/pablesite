# Implementar pablesite v1

## Title

Implementar `pablesite` v1 con Astro y Docker en ARDA.

## Context

El repositorio tenía base operativa y diseños en `design/`, pero no aplicación real. La v1 convierte esos diseños en una web estática completa, navegable, bilingüe y preparada para desplegarse como contenedor en ARDA.

## Area

`frontend` | `ops` | `docs`

## Scope

1. App Astro estática con rutas `/es/` y `/en/`.
2. Páginas Home, Arda, Arkenstone, CV, Blog y Contacto.
3. Datos dinámicos tratados como contenido curado.
4. Dockerfile, Nginx y Compose para Traefik en ARDA.
5. Documentación canónica actualizada.

Fuera de alcance:

1. Backend, base de datos o CMS.
2. Formulario real o proveedor externo.
3. API en vivo para Uptime Kuma, Spotify, Strava o métricas del servidor.
4. Push o despliegue remoto sin confirmación explícita.

## Plan

1. Crear app Astro mínima con TypeScript.
2. Migrar diseño a componentes y CSS global compartido.
3. Implementar contenido ES/EN.
4. Añadir Docker y documentación de despliegue en ARDA.
5. Validar con gate local, build Astro y build Docker.

## Validation

1. `./scripts/validate.sh`
2. `python3 scripts/check_frontend_visual_guardrails.py`
3. `npm run build`
4. `npm run typecheck`
5. `npm run lint`
6. `npm run format:check`
7. `docker build -t pablesite:local .`

## Required Documentation Updates

- [x] `docs/project-status.md`
- [x] `docs/operations/dev-setup.md`
- [x] `docs/operations/ci-cd.md`
- [x] `docs/operations/release-flow.md`
- [x] `docs/frontend/frontend-visual-contract.md`

## Risks

1. Los enlaces sociales usan URLs iniciales y pueden requerir ajuste antes de publicar.
2. Los datos de Arda son snapshots curados, no monitorización real.
3. El PDF de CV queda como enlace preparado hasta añadir el archivo real.

## Completion Criteria

- [x] Validación ejecutada
- [x] Documentación actualizada
- [x] Commit creado con Conventional Commits
