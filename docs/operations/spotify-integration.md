# Spotify Integration

## Objetivo

Reemplazar la tarjeta placeholder de Spotify en la home por una señal real de escucha sin introducir backend persistente ni exponer credenciales en cliente.

## Enfoque actual

La home renderiza primero una tarjeta de Spotify a partir de un snapshot estático y la actualiza
desde `Eärendil` en el navegador.

La tarjeta sigue esta prioridad:

1. mostrar el snapshot durante la carga o si JavaScript no está disponible
2. consultar `/api/outside/spotify` al cargar la página
3. refrescar cada 60 segundos mientras la pestaña esté visible
4. si la API falla, conservar la última información disponible
5. si no hay escucha reciente, caer al enlace público del perfil

## Archivos implicados

1. `src/components/SpotifyCard.astro`
2. `src/data/spotify.ts`
3. `src/data/spotify-snapshot.ts`
4. `scripts/refresh-spotify.mjs`
5. `https://github.com/pablesite/earendil`

## Variables requeridas

Para refrescar el snapshot:

1. `SPOTIFY_CLIENT_ID`
2. `SPOTIFY_CLIENT_SECRET`
3. `SPOTIFY_REFRESH_TOKEN`
4. `SPOTIFY_PROFILE_URL` opcional
5. `SPOTIFY_REDIRECT_URI` opcional para la fase inicial de autorización; por defecto `http://127.0.0.1:3000/callback`

## Scopes necesarios en Spotify

La app de Spotify debe autorizar al menos estos scopes:

1. `user-read-currently-playing`
2. `user-read-recently-played`

## Obtener el refresh token

### 1. Crear la app

En Spotify for Developers:

1. entrar al Dashboard
2. crear una app nueva
3. elegir `Web API`
4. configurar como Redirect URI `http://127.0.0.1:3000/callback`

### 2. Generar la URL de autorización

```bash
SPOTIFY_CLIENT_ID=... npm run spotify:auth-url
```

Ese comando imprime la URL que debes abrir en el navegador.

### 3. Autorizar la app

Después de aceptar, Spotify redirige a algo como:

```text
http://127.0.0.1:3000/callback?code=...&state=...
```

No hace falta que exista ningún servidor local. Solo necesitas copiar el valor de `code` desde la barra del navegador.

### 4. Intercambiar el code por tokens

```bash
SPOTIFY_CLIENT_ID=... \
SPOTIFY_CLIENT_SECRET=... \
SPOTIFY_AUTH_CODE=... \
npm run spotify:exchange-code
```

Ese comando imprime `SPOTIFY_REFRESH_TOKEN=...`.

### 5. Refrescar el snapshot

```bash
SPOTIFY_CLIENT_ID=... \
SPOTIFY_CLIENT_SECRET=... \
SPOTIFY_REFRESH_TOKEN=... \
npm run spotify:refresh
```

## Refresco manual

```bash
SPOTIFY_CLIENT_ID=... \
SPOTIFY_CLIENT_SECRET=... \
SPOTIFY_REFRESH_TOKEN=... \
npm run spotify:refresh
```

Ese comando actualiza `src/data/spotify-snapshot.ts`.

## Flujo recomendado

1. Crear una app en Spotify for Developers
2. Obtener `client id` y `client secret`
3. Completar una autorización inicial para conseguir el `refresh token`
4. Ejecutar `npm run spotify:refresh`
5. Validar localmente con `npm run build`

## Notas operativas

1. No se consumen tokens desde el navegador
2. El sitio sigue siendo estático
3. El snapshot sólo cambia al ejecutar `npm run spotify:refresh`, pero el contenido visible se actualiza dinámicamente desde `Eärendil`
4. `Eärendil` mantiene una caché corta y sirve la API bajo la misma origin
5. Según la actualización oficial de Spotify publicada el 2026-02-06, las apps nuevas en Development Mode requieren cuenta Spotify Premium y quedan limitadas por defecto a hasta cinco usuarios autorizados

## Estado

La integración dinámica de Spotify está desplegada en ARDA. El snapshot se conserva como fallback
de resiliencia y contenido sin JavaScript.
