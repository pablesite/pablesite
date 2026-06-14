# Project Status

Estado actual de `pablesite`. Actualizar este archivo cuando cambie el estado funcional o de
infraestructura del proyecto.

**Last review:** 2026-06-14

---

## Foundations

| Area | Status | Notes |
| --- | --- | --- |
| AI workflow baseline | ✅ | `AGENTS.md`, `CLAUDE.md`, `.codex/skills/`, docs y scripts base creados |
| Local validation gate | ✅ | `scripts/validate.sh` y `scripts/pre-push-check.sh` disponibles |
| Frontend visual guardrails | ✅ | `scripts/check_frontend_visual_guardrails.py` + docs frontend |
| Product stack | ⚪ | Pendiente decidir framework y arquitectura real |
| Deployment pipeline | ⚪ | Pendiente cuando exista una app real |

---

## Next Tasks

| Type | Priority | Status | Description | Spec |
| --- | --- | --- | --- | --- |
| Manual | High | ⚪ | Definir stack inicial de `pablesite` y estructura de aplicación | — |
| Manual | High | ⚪ | Crear shell inicial del sitio y sistema de rutas | — |
| Manual | Medium | ⚪ | Definir estrategia de despliegue y checks CI cuando exista app | — |

---

## Legend

| Symbol | Meaning |
| --- | --- |
| ✅ | Implemented and working |
| 🔄 | In progress |
| ⚪ | Not started |
