---
name: publish-flow
description: Run before any push or release check. Validates the local gate and blocks push recommendations when the repo is not green.
---

# Publish Flow

## Workflow

1. Revisar `git status -sb`
2. Ejecutar `./scripts/pre-push-check.sh`
3. Si falla, no recomendar `git push`
4. Si pasa, resumir:
   - resultado del gate
   - riesgos pendientes
   - si falta confirmación del usuario para empujar
