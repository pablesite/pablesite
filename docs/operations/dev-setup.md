# Dev Setup

## Objetivo

Definir un flujo mínimo y estable para trabajar en `pablesite` sin asumir todavía backend, base de
datos ni infraestructura compleja.

## Flujo recomendado

1. Leer `AGENTS.md`
2. Leer `docs/project-status.md`
3. Implementar cambios pequeños y trazables
4. Ejecutar `./scripts/validate.sh` antes de commit
5. Ejecutar `./scripts/pre-push-check.sh` antes de push

## Diagnóstico estándar

1. `git status -sb`
2. `git log --oneline -10`
3. `find . -maxdepth 2 -type f | sort`

## Reglas operativas

1. No usar `git push` sin confirmación del usuario
2. No usar comandos destructivos
3. No introducir dependencias pesadas sin necesidad del producto
