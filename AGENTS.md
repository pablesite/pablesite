# AGENTS.md

## Objetivo

`pablesite` parte con un ecosistema ligero y preparado para trabajar bien con agentes desde el
inicio, sin asumir todavía una base de datos ni un stack cerrado.

## Skills disponibles

Usar obligatoriamente cuando aplique:

| Cuándo usarla | Skill |
| --- | --- |
| Cambios de interfaz, estilos, layouts o UX | `frontend-system` |
| Antes de cualquier commit con cambios de código | `validate` |
| Antes de cualquier push o preparación de release | `publish-flow` |
| Inicio de sesión sin contexto claro del proyecto | `status` |
| Revisión de publicación o exposición de riesgos | `security-review` |

Las skills viven en `.codex/skills/`. Leer el `SKILL.md` correspondiente antes de actuar.

## Read First

Leer al inicio de cualquier tarea:

1. `docs/project-status.md`
2. `docs/README.md`
3. La documentación canónica del área afectada, si existe
4. La spec de la tarea en `docs/tasks/` si existe

## Regla de trabajo

1. Diagnosticar antes de cambiar.
   - Revisar el estado real del repo antes de proponer estructura o código.
   - No asumir stack, herramientas ni arquitectura que aún no existan.
2. Cambiar lo mínimo necesario.
   - Priorizar pasos pequeños, reversibles y fáciles de validar.
   - No introducir infraestructura pesada sin una necesidad concreta del producto.
3. Validar antes de commitear.
   - Ejecutar `./scripts/validate.sh`.
   - Si hay frontend, también debe pasar `scripts/check_frontend_visual_guardrails.py`.
4. Validar antes de cualquier push.
   - Ejecutar `./scripts/pre-push-check.sh`.
   - No proponer `git push` sin confirmación explícita del usuario.
5. Mantener trazabilidad.
   - Actualizar `docs/project-status.md` si cambia el estado del proyecto.
   - Actualizar documentación canónica si cambia arquitectura, workflow o tooling.
   - Usar Conventional Commits.

## Restricciones operativas

1. No ejecutar `git push` sin confirmación explícita del usuario.
2. No usar comandos destructivos como `git reset --hard`.
3. No usar `docker compose down -v` sin confirmación explícita del usuario.
4. Si todavía no existe stack de app, no inventarlo para "hacer pasar" validaciones.

## Documentos canónicos

1. `docs/README.md`
2. `docs/project-status.md`
3. `docs/operations/dev-setup.md`
4. `docs/standards/task-template.md`
5. `docs/standards/planning-guide.md`
6. `docs/frontend/frontend-visual-guide.md`
7. `docs/frontend/frontend-visual-contract.md`
8. `docs/operations/ci-cd.md`
9. `docs/operations/release-flow.md`

## Cierre de tarea

1. Dejar claro qué se cambió
2. Dejar claro qué se validó
3. Indicar riesgos o trabajo pendiente si aplica
4. Crear commit con Conventional Commits cuando el bloque quede realmente cerrado
