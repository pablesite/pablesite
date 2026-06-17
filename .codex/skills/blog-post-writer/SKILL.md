---
name: blog-post-writer
description: Write or rewrite pablesite blog posts from user-supplied key ideas, preserving the author's personal tone and enforcing the canonical structure TL;DR, Motivación, Solución aplicada, Reflexiones.
---

# Blog Post Writer

Usar esta skill cuando el usuario quiera:

1. escribir un artículo nuevo para `pablesite`
2. convertir ideas sueltas en un post completo
3. reescribir un borrador para que suene más a Pablo
4. mantener una estructura editorial consistente en el blog

## Leer primero

1. `docs/content/blog-writing-guide.md`
2. `src/content/_templates/blog-post.md`
3. Si existe, el borrador o post relacionado que el usuario haya mencionado
4. Si ya hay posts publicados sobre temas cercanos, usarlos como referencia de
   tono y nivel de detalle

## Resultado esperado

El artículo debe respetar siempre esta estructura y este orden:

1. `TL;DR`
2. `Motivación`
3. `Solución aplicada`
4. `Reflexiones`

## Workflow

1. Partir de las ideas clave dadas por el usuario
2. Identificar qué parte pertenece a contexto personal y qué parte a solución
   real
3. Redactar un `TL;DR` breve con 3-5 bullets
4. Escribir la `Motivación` desde el problema real, sin dramatizar
5. Desarrollar `Solución aplicada` con suficiente detalle técnico, pero sin
   convertir el post en un tutorial inflado
6. Cerrar con `Reflexiones` honestas: aprendizajes, límites, tradeoffs o
   decisiones que tomaría distinto

## Reglas de tono

1. Mantener voz personal, directa y concreta
2. Evitar frases grandilocuentes, hype o tono vendedor
3. No sonar como artículo SEO ni como explicación académica
4. Preferir detalles reales, costes, fricciones y decisiones concretas
5. Si faltan datos, no inventar: dejar un hueco claro o pedir solo la mínima
   precisión necesaria

## Cómo colaborar con el usuario

Si el usuario quiere ayuda para escribir desde ideas sueltas:

1. pedir o extraer estas piezas:
   - 3-5 ideas clave
   - contexto o motivación
   - solución aplicada
   - reflexión final si ya la tiene
2. si alguna falta, inferir lo mínimo razonable
3. devolver un borrador que ya suene publicable

## Restricciones

1. No cambiar la estructura salvo petición explícita
2. No borrar el componente personal del artículo
3. No convertir experiencias propias en texto neutro e impersonal
