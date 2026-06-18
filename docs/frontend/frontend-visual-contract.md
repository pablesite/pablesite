# Frontend Visual Contract

Patrones base para cualquier frontend que se añada a `pablesite`.

## Reglas compartidas

1. Los layouts deben apoyarse en primitivas reutilizables
2. Los estilos compartidos viven en un lugar central del frontend cuando exista
3. Un nuevo patrón reusable debe documentarse aquí

## Primitivas actuales

1. `BaseLayout` define shell, navegación, metadata SEO, alternates i18n y footer.
2. `Section` define encabezados de bloque con acento y acción opcional.
3. `ProjectCard`, `ServiceCard` y `BlogList` cubren patrones repetidos de contenido.
4. `ServiceGlyph` define la iconografía propia de los servicios de Arda con SVGs de línea, alimentada desde `src/data/content.ts`.
5. `src/styles/global.css` concentra tokens de color, tipografía, espaciado, radios y grids.
6. El contenido editable vive en `src/data/` para evitar copy enterrado en componentes.
7. `blog-article` y `blog-list` cubren el patrón reusable de índice y detalle para posts Markdown del blog.
8. `locale-switcher` define el patrón de utilidades de cabecera para cambiar idioma sin competir visualmente con la navegación principal.
9. `blog-media` define el patrón reusable para imágenes editoriales dentro de posts, con separación vertical, borde, radio y pie de foto discreto.

## Antipatrones

1. `style=` inline en componentes
2. Nuevos bloques locales de CSS para resolver problemas globales
3. Hardcodes de layout repetidos sin token o clase compartida
