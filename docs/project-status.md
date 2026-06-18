# Project Status

Estado actual de `pablesite`. Actualizar este archivo cuando cambie el estado funcional o de
infraestructura del proyecto.

**Last review:** 2026-06-18

---

## Foundations

| Area                       | Status | Notes                                                                                                                                |
| -------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------ |
| AI workflow baseline       | ✅     | `AGENTS.md`, `CLAUDE.md`, `.codex/skills/`, docs y scripts base creados                                                              |
| Local validation gate      | ✅     | `scripts/validate.sh` y `scripts/pre-push-check.sh` disponibles                                                                      |
| Frontend visual guardrails | ✅     | `scripts/check_frontend_visual_guardrails.py` + docs frontend                                                                        |
| CI/CD baseline             | ✅     | Workflow de calidad, `dependabot` y documentación stack-agnostic listos                                                              |
| Product stack              | ✅     | Astro + TypeScript para sitio estático bilingüe                                                                                      |
| Site v1                    | ✅     | Home, Arda, Arkenstone, CV, Blog y Contacto en `/es/` y `/en/`                                                                       |
| Blog publishing workflow   | ✅     | Blog real con Astro Content Collections, rutas por idioma y posts Markdown en `src/content/blogEs/` y `src/content/blogEn/`          |
| Blog editorial workflow    | ✅     | Guía canónica, plantilla de post y skill `blog-post-writer` para redactar desde ideas clave respetando tono y estructura             |
| Docker dev environment     | ✅     | `compose.dev.yaml` levanta Astro con hot reload sobre `node:22-alpine`, volúmenes persistentes y acceso local en `localhost:4321`    |
| Deployment target          | ✅     | Docker en ARDA detrás de Traefik/Cloudflare Tunnel                                                                                   |
| Deployment pipeline        | 🔄     | Sitio ya servido en ARDA con compose image-only y imagen GHCR; falta validar el deploy automático por Tailscale desde GitHub Actions |

---

## Next Tasks

| Type     | Priority | Status | Description                                                                  | Spec                                        |
| -------- | -------- | ------ | ---------------------------------------------------------------------------- | ------------------------------------------- |
| Frontend | High     | ✅     | Implementar `pablesite` v1 con Astro, rutas i18n y diseño base               | `docs/tasks/frontend/phase-1-pablesite-v1/` |
| Ops      | High     | ✅     | Preparar Dockerfile y Compose para despliegue como servicio ARDA             | `docs/tasks/frontend/phase-1-pablesite-v1/` |
| Manual   | Medium   | ✅     | Añadir CV PDF real y revisar URLs sociales antes de publicar                 | —                                           |
| Manual   | Medium   | ⚪     | Diseñar integraciones dinámicas futuras para Arda, Spotify/Strava y contacto | —                                           |
| Ops      | Medium   | ⚪     | Definir correo `contacto@pablesite.es` en ARDA o proveedor externo           | —                                           |

---

## Fase 1: Validación de contenido

- **Estado:** ✅ Completada
- **Detalles:** CV PDF colocado en `public/cv/pablo.pdf`, URLs sociales validadas en `src/data/content.ts`, y build local verificado con `npm run build`.

---

## Legend

| Symbol | Meaning                 |
| ------ | ----------------------- |
| ✅     | Implemented and working |
| 🔄     | In progress             |
| ⚪     | Not started             |
