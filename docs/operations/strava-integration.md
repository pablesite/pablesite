# Strava Integration

## Objetivo

Reemplazar el placeholder de Strava de la home por actividad pública real sin
exponer credenciales, mapas, coordenadas ni actividad privada.

## Arquitectura

1. `Eärendil` obtiene un access token usando OAuth y el refresh token de Strava.
2. Consulta `GET /api/v3/athlete/activities` para los últimos 30 días.
3. Conserva únicamente actividades cuya visibilidad sea `everyone`.
4. Sirve el resultado desde `GET /api/outside/strava`.
5. `StravaCard.astro` actualiza la tarjeta en cliente cada cinco minutos y
   mantiene el contenido estático como fallback.

## Scope

La autorización solicita únicamente `activity:read`. No se necesita acceso de
escritura ni `activity:read_all`.

## Contrato público

La respuesta incluye:

1. última actividad pública
2. tipo de deporte
3. distancia
4. tiempo en movimiento
5. desnivel positivo
6. totales públicos de los últimos 30 días
7. enlaces públicos al perfil y a la actividad

## OAuth local

1. Crear una aplicación en `https://www.strava.com/settings/api`.
2. Mantener una suscripción activa de Strava para que la aplicación tenga acceso
   a la API.
3. Configurar `localhost` como `Authorization Callback Domain`.
4. Añadir a `earendil/.env`:

```dotenv
STRAVA_CLIENT_ID=
STRAVA_CLIENT_SECRET=
STRAVA_REFRESH_TOKEN=
STRAVA_REDIRECT_URI=http://localhost:3000/callback
STRAVA_PROFILE_URL=https://www.strava.com/athletes/16376516
```

5. Ejecutar `npm run strava:authorize` desde el repo de Eärendil.
6. Autorizar el scope `activity:read` en el navegador.

El helper valida `state`, intercambia el código y actualiza
`STRAVA_REFRESH_TOKEN` sin imprimirlo.

## Rotación del token

Strava puede devolver un refresh token nuevo e invalidar el anterior. Eärendil
persiste siempre el token más reciente en:

```text
/app/data/strava-token.json
```

El directorio está respaldado por el volumen Docker `earendil_data`. El archivo
queda fuera de Git y con permisos restringidos.

## Caché y límites

Eärendil mantiene la señal en memoria durante cinco minutos. Esta frecuencia
reduce el consumo frente a los límites por intervalos de 15 minutos y diarios de
la API de Strava. No se necesitan webhooks para una tarjeta personal.

## Estado

El OAuth se completó el 2026-07-28, pero Strava devuelve
`Application Status: Inactive` porque la cuenta todavía no tiene una suscripción
activa. La integración queda preparada localmente y no debe desplegarse hasta
activar la suscripción y validar la respuesta real.
