# pablesite

Base inicial de `pablesite` con un ecosistema de trabajo preparado para colaborar con IA desde el
primer día.

## Qué incluye

1. `AGENTS.md` y `CLAUDE.md` como guía operativa para agentes
2. `.codex/skills/` con workflows reutilizables
3. `.claude/settings.json` con hooks de seguridad y trazabilidad
4. `docs/` como documentación canónica del proyecto
5. `scripts/validate.sh` y `scripts/pre-push-check.sh` como gates locales
6. `scripts/check_frontend_visual_guardrails.py` para evitar deriva visual en frontend

## Primeros pasos

1. Lee `AGENTS.md`
2. Revisa `docs/README.md`
3. Usa `./scripts/validate.sh` antes de cada commit
4. Usa `./scripts/pre-push-check.sh` antes de cualquier push
