# Email Routing

## Objetivo

Definir la configuración mínima de correo entrante para `pablesite.es` sin operar un servidor de correo propio.

## Estado actual

Desde el 2026-07-28:

1. `contacto@pablesite.es` está publicado como dirección de contacto del sitio
2. Cloudflare Email Routing recibe el correo del dominio `pablesite.es`
3. La regla activa redirige `contacto@pablesite.es` a `pablesite@gmail.com`
4. El `catch-all` permanece desactivado y en `Drop`

## Decisión operativa

No se opera un servidor SMTP/IMAP propio en ARDA ni en `codinglab` para `pablesite.es`.

La recepción de correo se resuelve con Cloudflare Email Routing porque:

1. reduce complejidad operativa
2. evita mantenimiento de reputación, antispam y deliverability
3. separa la operativa de `pablesite` de la cuenta personal de Pablo

## Configuración esperada en Cloudflare

### Destination address

1. `pablesite@gmail.com` verificada como destino

### Routing rules

1. `contacto@pablesite.es` -> `pablesite@gmail.com`

### Política de wildcard

1. `Catch-all` desactivado
2. Acción por defecto: `Drop`

## Implicaciones

1. El sitio puede seguir usando `mailto:contacto@pablesite.es`
2. La recepción real ocurre en `pablesite@gmail.com`
3. Responder como `contacto@pablesite.es` no forma parte de esta configuración

## Cuándo revisar esta decisión

Tiene sentido pasar a un buzón real con dominio propio, como Google Workspace u otro proveedor, si se cumple al menos una de estas condiciones:

1. hace falta enviar correo saliente como `@pablesite.es`
2. hay más de una persona gestionando el correo
3. se necesitan aliases, filtros o auditoría más formales
4. el volumen de correo justifica separar recepción y envío
