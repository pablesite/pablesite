---
name: security-review
description: Lightweight security review before publishing. Covers secrets, ignored files, dangerous defaults, and public exposure risks.
---

# Security Review

## Áreas de revisión

1. Secrets hardcodeados
2. `.gitignore` para `.env`, claves, dumps y artefactos
3. Config defaults inseguros
4. Dependencias con auditorías disponibles
5. Workflows públicos que puedan filtrar secretos

## Regla

No modificar archivos durante la auditoría salvo petición explícita del usuario. Primero leer y
reportar.
