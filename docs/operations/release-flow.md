# Release Flow

## Objetivo

Definir una política simple de publicación antes de automatizar versiones o despliegues.

## Estado actual

`pablesite` todavía no tiene una app ni un versionado funcional cerrado, así que no se automatiza
release todavía.

## Reglas actuales

1. Usar Conventional Commits
2. Validar localmente antes de push
3. Mantener `main` siempre en estado razonablemente publicable
4. No introducir automation de release hasta que exista una necesidad real de versionado

## Cuándo activar release automation

Tiene sentido activar `release-please` o equivalente cuando se cumplan estas condiciones:

1. ya existe producto desplegable
2. hay cambios que necesitan changelog
3. existe una política de versiones clara
4. el deploy ya no depende de pasos manuales ambiguos

## Decisiones pendientes

1. si `pablesite` usará versionado semántico formal
2. si se publicarán artefactos o imágenes
3. si el despliegue será GitHub Actions, Docker, plataforma managed o similar
