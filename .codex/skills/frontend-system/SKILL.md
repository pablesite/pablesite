---
name: frontend-system
description: Workflow to keep frontend work coherent and reusable. Use when changing layouts, views, components, CSS, copy hierarchy, or UX flows.
---

# Frontend System

## Required Read Order

1. `AGENTS.md`
2. `docs/frontend/frontend-visual-guide.md`
3. `docs/frontend/frontend-visual-contract.md`

## Workflow

1. Definir el problema en términos de estructura, jerarquía visual y estados.
2. Reutilizar clases compartidas y tokens antes de crear estilos locales.
3. Evitar `style=` inline y nuevos bloques locales si una primitive compartida puede resolverlo.
4. Si nace un patrón reusable, documentarlo en `docs/frontend/frontend-visual-contract.md`.

## Rules

1. No introducir `style=` inline.
2. No introducir hardcodes de layout si pueden salir a clases compartidas.
3. Cubrir `loading`, `empty`, `error` y `success` cuando el flujo lo requiera.
