---
name: validate
description: Run the local quality gate before commit. Uses repo-native scripts and skips non-existent stack checks cleanly.
---

# Validate

## Workflow

1. Ejecutar `./scripts/validate.sh`
2. Si hay frontend, ejecutar también `python3 scripts/check_frontend_visual_guardrails.py`
3. Si algo falla, corregir antes de continuar

## Regla

No dar por válido un cambio de código sin validar los checks realmente disponibles en el repo.
