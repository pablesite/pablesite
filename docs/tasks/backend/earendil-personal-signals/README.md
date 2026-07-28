# Levantar Eärendil para integraciones personales

## Title

Levantar `Eärendil` como microservicio de señales personales para `pablesite`.

## Context

La integración de Spotify ha demostrado que un snapshot estático sirve como transición, pero no encaja bien con un `now playing` real ni con futuras integraciones como Strava.

Hace falta un servicio pequeño en `ARDA` que consulte APIs externas y sirva JSON dinámico a la sección `Fuera del código`.

## Area

`backend` | `ops` | `docs`

## Scope

1. Crear el servicio `Eärendil`
2. Servir endpoints JSON para Spotify y Strava
3. Definir variables, healthcheck y contrato HTTP
4. Preparar el encaje con Traefik bajo `pablesite.es/api/outside/*`

Fuera de alcance:

1. convertir `pablesite` en SSR
2. dashboard visual completo de salud o deporte
3. persistencia histórica o base de datos

## Plan

1. Confirmar contrato de endpoints y naming dentro de Arda
2. Implementar scaffold mínimo del servicio
3. Desplegar en ARDA y conectar la home de `pablesite`

## Validation

1. `./scripts/validate.sh`
2. `npm run build`
3. `curl https://pablesite.es/api/outside/spotify`
4. validar el repositorio canónico `pablesite/earendil`

## Required Documentation Updates

- [x] `docs/project-status.md`
- [x] `docs/operations/earendil-service.md`
- [x] `docs/README.md`

## Risks

1. Tokens OAuth mal configurados pueden romper la integración en runtime
2. Si se expone por subdominio separado, aparece complejidad extra de CORS
3. Si se mezclan demasiadas responsabilidades, el servicio puede terminar compitiendo con `Lórien`

## Completion Criteria

- [x] Scaffold creado
- [x] Despliegue en ARDA ejecutado
- [x] Home de `pablesite` consumiendo endpoint dinámico
- [x] Commit creado con Conventional Commits
