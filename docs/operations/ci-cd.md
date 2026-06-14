# CI/CD Baseline

## Objetivo

Tener una base de CI/CD útil desde el inicio sin acoplarla todavía a un stack concreto.

## Qué sí definimos ya

1. Gate local canónico: `./scripts/pre-push-check.sh`
2. Workflow de calidad en GitHub como espejo mínimo del gate local
3. Escaneo de secretos con `gitleaks`
4. Actualización automática de dependencias para GitHub Actions vía `dependabot`
5. Reglas de publicación y despliegue documentadas antes de automatizarlas

## Qué dejamos pendiente hasta conocer el stack

1. Jobs reales de build
2. Tests de aplicación específicos
3. Docker image builds
4. Deploy automático
5. Release automation con versionado real
6. Code scanning específico del lenguaje si requiere build real

## Contrato actual

### Pull Requests

En cada PR a `main`, la expectativa es:

1. Ejecutar el workflow `Quality`
2. Validar que el gate local tenga paridad razonable con CI
3. Bloquear merge si el workflow falla

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

1. Añadir instalación de dependencias real
2. Añadir lint, format, typecheck y tests específicos
3. Añadir build reproducible
4. Añadir estrategia de artefactos o imágenes
5. Añadir deploy con rollback documentado
