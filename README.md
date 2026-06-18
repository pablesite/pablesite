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
7. base CI/CD neutral con workflow de calidad, `dependabot` y guía operativa

## Primeros pasos

1. Lee `AGENTS.md`
2. Revisa `docs/README.md`
3. Usa `./scripts/validate.sh` antes de cada commit
4. Usa `./scripts/pre-push-check.sh` antes de cualquier push
5. Consulta `docs/operations/ci-cd.md` antes de tocar pipelines o releases

## Docker desarrollo

1. Levanta el entorno con `docker compose -f compose.dev.yaml up --build`
2. Abre `http://localhost:4321/es/`
3. Para parar el entorno usa `docker compose -f compose.dev.yaml down`
