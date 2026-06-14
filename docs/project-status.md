# Project Status

Estado actual de `pablesite`. Actualizar este archivo cuando cambie el estado funcional o de
infraestructura del proyecto.

**Last review:** 2026-06-14

---

## Foundations

| Area                       | Status | Notes                                                                   |
| -------------------------- | ------ | ----------------------------------------------------------------------- |
| AI workflow baseline       | ✅     | `AGENTS.md`, `CLAUDE.md`, `.codex/skills/`, docs y scripts base creados |
| Local validation gate      | ✅     | `scripts/validate.sh` y `scripts/pre-push-check.sh` disponibles         |
| Frontend visual guardrails | ✅     | `scripts/check_frontend_visual_guardrails.py` + docs frontend           |
| CI/CD baseline             | ✅     | Workflow de calidad, `dependabot` y documentación stack-agnostic listos |
| Product stack              | ✅     | Astro + TypeScript para sitio estático bilingüe                         |
| Site v1                    | ✅     | Home, Arda, Arkenstone, CV, Blog y Contacto en `/es/` y `/en/`          |
| Deployment target          | ✅     | Docker en ARDA detrás de Traefik/Cloudflare Tunnel                      |
| Deployment pipeline        | 🔄     | Imagen Docker y Compose listos; automatización remota pendiente         |

---

## Next Tasks

| Type     | Priority | Status | Description                                                                  | Spec                                        |
| -------- | -------- | ------ | ---------------------------------------------------------------------------- | ------------------------------------------- |
| Frontend | High     | ✅     | Implementar `pablesite` v1 con Astro, rutas i18n y diseño base               | `docs/tasks/frontend/phase-1-pablesite-v1/` |
| Ops      | High     | ✅     | Preparar Dockerfile y Compose para despliegue como servicio ARDA             | `docs/tasks/frontend/phase-1-pablesite-v1/` |
| Manual   | Medium   | ⚪     | Añadir CV PDF real y revisar URLs sociales antes de publicar                 | —                                           |
| Manual   | Medium   | ⚪     | Diseñar integraciones dinámicas futuras para Arda, Spotify/Strava y contacto | —                                           |

---

## Legend

| Symbol | Meaning                 |
| ------ | ----------------------- |
| ✅     | Implemented and working |
| 🔄     | In progress             |
| ⚪     | Not started             |
