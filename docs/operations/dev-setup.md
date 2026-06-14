# Dev Setup

## Objetivo

Definir un flujo mínimo y estable para trabajar en `pablesite`, una web estática Astro
desplegable como contenedor Docker en ARDA.

## Stack actual

1. Astro + TypeScript
2. CSS global con tokens y primitivas compartidas
3. Contenido estructurado en `src/data/`
4. Docker + Nginx para servir `dist/`
5. Docker Compose con labels de Traefik para ARDA

## Flujo recomendado

1. Leer `AGENTS.md`
2. Leer `docs/project-status.md`
3. Instalar dependencias con `npm install`
4. Desarrollar con `npm run dev`
5. Implementar cambios pequeños y trazables
6. Ejecutar `./scripts/validate.sh` antes de commit
7. Ejecutar `./scripts/pre-push-check.sh` antes de push

## Comandos de aplicación

1. `npm run dev` — servidor local de Astro
2. `npm run build` — build estático de producción
3. `npm run preview` — preview local del build
4. `npm run lint` — validación Astro
5. `npm run typecheck` — validación TypeScript
6. `npm run format:check` — comprobación de formato

Si el entorno local no expone `node` pero sí Docker, `./scripts/validate.sh` ejecuta los scripts npm
con `node:22-alpine` como fallback reproducible.

## Docker local

1. `docker build -t pablesite:local .`
2. `docker run --rm -p 8080:8080 pablesite:local`
3. Abrir `http://localhost:8080/es/`

## Despliegue en ARDA

`compose.yaml` asume una red externa de Traefik. Variables útiles:

1. `PABLESITE_IMAGE` — imagen a ejecutar; por defecto `pablesite:latest`
2. `PABLESITE_HOST` — dominio público; por defecto `pablesite.es`
3. `TRAEFIK_ENTRYPOINT` — entrypoint de Traefik; por defecto `websecure`
4. `TRAEFIK_NETWORK` — red externa; por defecto `traefik`

## Diagnóstico estándar

1. `git status -sb`
2. `git log --oneline -10`
3. `find . -maxdepth 2 -type f | sort`

## Reglas operativas

1. No usar `git push` sin confirmación del usuario
2. No usar comandos destructivos
3. No introducir dependencias pesadas sin necesidad del producto
4. No añadir backend, base de datos ni proveedor de formulario sin una decisión explícita
