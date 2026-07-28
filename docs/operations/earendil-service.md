# Eärendil

## Objetivo

`Eärendil` es el microservicio de integraciones personales de `Arda`.

Su función es servir contenido dinámico pequeño para `pablesite` sin convertir toda la web en SSR.

## Decisión

Spotify y Strava se agrupan en un mismo servicio porque:

1. ambas son señales personales de la sección `Fuera del código`
2. comparten patrón técnico de OAuth + consulta de API externa
3. evitan reconstruir y redeplegar `pablesite` para cada cambio de estado

## Encaje en Arda

`Eärendil` encaja como servicio nuevo y propio dentro de `Arda`.

No se reutiliza:

1. `Palantír`, porque monitoriza infraestructura
2. `Narya`, porque es gateway de IA
3. `Glóin`, porque está orientado a facturas e integraciones financieras
4. `Lórien`, porque su foco natural sigue siendo salud y deporte

## Contrato HTTP

Rutas propuestas en producción:

1. `GET /api/outside`
2. `GET /api/outside/spotify`
3. `GET /api/outside/strava`
4. `GET /healthz`

## Publicación recomendada

Exponer `Eärendil` a través de Traefik bajo el mismo host `pablesite.es` por `PathPrefix`, no por subdominio aparte.

Motivos:

1. evita CORS innecesario
2. simplifica la home de `pablesite`
3. mantiene una sola origin pública

Ejemplo conceptual:

1. `pablesite.es` -> contenedor `pablesite`
2. `pablesite.es/api/outside/*` -> contenedor `earendil`

## Runtime recomendado

1. contenedor Docker pequeño en ARDA
2. Node 22 sin dependencias pesadas
3. caché corta en memoria o respuesta `max-age` pequeña
4. secretos en `.env` del servicio, nunca en `pablesite`

## Integraciones previstas

### Spotify

1. `now playing` si existe reproducción activa
2. fallback a `recently played`
3. enlace al track o al perfil

### Strava

1. última actividad
2. distancia
3. desnivel o tiempo según disponibilidad
4. enlace al perfil o a la actividad

## Estado actual

1. el servicio canónico vive en `https://github.com/pablesite/earendil`
2. está desplegado en ARDA desde `/datos/docker/compose/earendil`
3. Spotify responde en producción desde `/api/outside/spotify`
4. Strava queda preparado como siguiente integración

## Siguiente paso natural

1. configurar el despliegue automático de `Eärendil`
2. implementar el provider de Strava
3. conectar la tarjeta de Strava al mismo contrato dinámico
