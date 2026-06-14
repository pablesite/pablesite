# CI/CD

## Objetivo

Mantener una validación pequeña y fiable para una web Astro estática que se despliega como imagen
Docker en ARDA.

## Qué sí definimos ya

1. Gate local canónico: `./scripts/pre-push-check.sh`
2. Workflow de calidad en GitHub como espejo mínimo del gate local
3. Escaneo de secretos con `gitleaks`
4. Actualización automática de dependencias para GitHub Actions vía `dependabot`
5. Scripts npm reales para build, lint, typecheck y formato
6. Dockerfile reproducible para servir `dist/` con Nginx

## Pendiente

1. Publicación automática de imagen
2. Deploy remoto a ARDA
3. Rollback documentado con tags de imagen
4. Release automation con versionado real
5. Code scanning adicional si el stack crece

## Contrato actual

### Pull Requests

En cada PR a `main`, la expectativa es:

1. Ejecutar el workflow `Quality`
2. Ejecutar `npm run build`, `npm run lint`, `npm run typecheck` y `npm run format:check`
3. Validar que el gate local tenga paridad razonable con CI
4. Bloquear merge si el workflow falla

### Push local

Antes de cualquier push:

1. Ejecutar `./scripts/pre-push-check.sh`
2. No empujar si el gate falla
3. No asumir que "en mi máquina funciona" sustituye a la validación

## Filosofía

1. CI debe reflejar el gate local, no competir con él
2. El pipeline debe crecer solo cuando el repo lo necesite de verdad
3. Cada job nuevo debe responder a un riesgo real
4. Mejor una pipeline pequeña y fiable que una grande y falsa

## Próximos pasos cuando exista stack

1. Añadir build de imagen Docker en CI
2. Publicar imágenes versionadas
3. Añadir deploy manual aprobado hacia ARDA
4. Documentar rollback por tag de imagen
