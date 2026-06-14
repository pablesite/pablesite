# Release Flow

## Objetivo

Definir una política simple de publicación antes de automatizar versiones o despliegues.

## Estado actual

`pablesite` tiene una v1 estática en Astro y una imagen Docker preparada para ARDA. Todavía no se
automatiza release ni deploy remoto.

## Reglas actuales

1. Usar Conventional Commits
2. Validar localmente antes de push
3. Mantener `main` siempre en estado razonablemente publicable
4. Construir la imagen Docker antes de preparar un despliegue
5. No introducir automation de release hasta que exista una necesidad real de versionado
6. No ejecutar `git push` ni despliegues remotos sin confirmación explícita

## Cuándo activar release automation

Tiene sentido activar `release-please` o equivalente cuando se cumplan estas condiciones:

1. ya existe producto desplegable
2. hay cambios que necesitan changelog
3. existe una política de versiones clara
4. el deploy ya no depende de pasos manuales ambiguos

## Decisiones pendientes

1. si `pablesite` usará versionado semántico formal
2. si se publicarán artefactos o imágenes
3. si el despliegue a ARDA será manual, GitHub Actions con aprobación o pull desde el servidor
4. política de rollback por tags de imagen
