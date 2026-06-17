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

## Crear un post

1. Crear un Markdown en `src/content/blogEs/` para español y otro en `src/content/blogEn/` para inglés
2. Mantener el mismo `translationKey` en ambos ficheros para que los alternates i18n del post apunten a su traducción
3. Definir al menos `title`, `description`, `publishDate` y `draft`
4. Usar el nombre del fichero como slug final de la URL
5. Partir de la plantilla `src/content/_templates/blog-post.md`
6. Respetar la guía editorial en `docs/content/blog-writing-guide.md`

Ejemplo:

```md
---
title: "Título del post"
description: "Resumen corto"
publishDate: 2026-06-17
translationKey: "mi-post"
draft: false
---
```

## Escribir con ayuda de un agente

1. Dar al agente 3-5 ideas clave del artículo
2. Añadir el contexto personal o la motivación real
3. Explicar la solución aplicada con el nivel técnico que quieras contar
4. Si ya tienes una conclusión o aprendizaje, incluirlo también
5. Pedir que use la skill `blog-post-writer` para convertir esas notas en un borrador con tu tono

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
3. `TRAEFIK_ENTRYPOINTS` — entrypoints de Traefik; por defecto `web`
4. `TRAEFIK_NETWORK` — red externa; por defecto `proxy`

## Diagnóstico estándar

1. `git status -sb`
2. `git log --oneline -10`
3. `find . -maxdepth 2 -type f | sort`

## Reglas operativas

1. No usar `git push` sin confirmación del usuario
2. No usar comandos destructivos
3. No introducir dependencias pesadas sin necesidad del producto
4. No añadir backend, base de datos ni proveedor de formulario sin una decisión explícita
