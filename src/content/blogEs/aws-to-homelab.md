---
title: "Cómo migré de AWS a mi propio homelab y bajé la factura a casi cero"
description: "Qué cambió al sacar mis servicios de AWS, qué mantuve y qué aprendí al mover todo a Arda."
publishDate: 2026-06-17
translationKey: "aws-to-homelab"
draft: false
---

## TL;DR

- Estaba pagando cada mes unos 40-50 € para exponer proyectos personales y
  mantener Passbolt, y empecé a sentir que ese coste ya no tenía sentido.
- Más importante aún: quería quitarme suscripciones y sustituir SaaS que ya
  usaba por alternativas autohospedadas basadas en open core o software libre.
- La chispa no vino de un benchmark ni de una comparativa de clouds, sino de
  una idea mucho más simple: rescatar un PC viejo y darle una segunda vida.
- El proyecto acabó siendo más grande que una migración: desmonté el equipo,
  lo limpié, lo mejoré, monté Debian sin interfaz y levanté desde ahí toda la
  base del homelab.
- Ya sé que un homelab no sustituye a todo ni elimina riesgos, pero te obliga a
  entender de verdad lo que estás construyendo.

## Motivación

Durante un tiempo estuve pagando cada mes entre 40 y 50 euros para exponer mis
proyectos personales y gestionar mis contraseñas en Passbolt. Para el tamaño de
lo que tenía, no era una cifra dramática, pero sí lo bastante alta como para
empezar a molestarme cada vez que veía el cargo.

Pero el dinero, siendo importante, no era la única motivación ni siquiera la
más interesante. Lo que de verdad me tiraba era otra cosa: quitarme
suscripciones de encima y empezar a montar por mi cuenta muchos de los SaaS que
uso, siempre que hubiera una alternativa razonable basada en open core o en
software libre. No quería depender de servicios externos para todo por pura
inercia, sobre todo cuando buena parte de esas piezas ya existen en formato
autohospedable.

La razón principal era bastante mundana: quería moverlo todo con Docker y la
RAM que necesitaba me empujaba, como mínimo, a una instancia con 4 GiB. No
puedo asegurar al cien por cien que fuera exactamente una `t3.medium`, pero esa
clase de instancia encaja bastante con lo que recuerdo: 2 vCPU y 4 GiB de RAM,
con un coste base que hoy ronda los 30 dólares al mes antes de sumar disco y
otros extras. Traducido a factura real, mis 40-50 euros al mes eran
perfectamente creíbles. Según la documentación de AWS, una `t3.medium` tiene 4
GiB de memoria, y AWS publica el pricing on-demand general en su página de EC2.

Mi plan inicial no era montarme un servidor en casa. De hecho, era mucho más
aburrido: buscar un proveedor cloud algo más barato y seguir adelante. Pero en
ese punto me crucé con un informático con experiencia en sistemas que me contó
que él reutilizaba PCs viejos como servidores. Me sorprendió cuando defendió
con bastante rotundidad que un PC bien refrigerado no tiene por qué petar por
estar siempre encendido, y que a veces sufren más con ciclos de encendido y
apagado constantes. No sé hasta qué punto esa afirmación es universal, pero sí
me abrió una puerta mental.

De repente, el problema ya no era solo reducir una factura. Era recuperar un
equipo viejo, desmontarlo entero y convertirlo en la base de una infraestructura
propia donde ir sustituyendo SaaS por servicios bajo mi control. Y ahí el
proyecto dejó de ser una simple migración para volverse mucho más atractivo.

## Solución aplicada

La solución empezó por el hardware, no por el software. En vez de buscar otra
VM, desmonté por completo el PC viejo para ver qué merecía la pena salvar y qué
no. Antes de tocar nada le hice fotos para tener una referencia del cableado, y
después fui retirando GPU dedicada, tarjeta WiFi, tarjeta de sonido, RAM,
discos y disipador.

La limpieza fue bastante más seria que un soplado rápido. Limpié el chasis con
aire comprimido, repasé a fondo ventiladores y disipador, quité la pasta
térmica antigua con alcohol isopropílico y aproveché para inspeccionar placa y
condensadores. También descarté piezas que ya no aportaban nada: una gráfica
obsoleta, la tarjeta de sonido, la WiFi y otros restos de un PC pensado para
otro uso y otra época.

El equipo de partida tampoco era una reliquia inútil. Aunque es un PC de 2012,
lleva un Intel i7 de tercera generación, SSDs y, tras la ampliación, se quedó
en 24 GB de RAM. Es verdad que no deja de ser hardware antiguo, pero también es
verdad que unas características así en AWS me habrían llevado a una máquina
bastante más cara de lo que estaba pagando por una instancia modesta para salir
del paso.

En paralelo, decidí invertir solo en lo que mejoraba de verdad el resultado:

- una caja nueva para mejorar la ventilación
- una fuente de alimentación más eficiente, en mi caso una Corsair CX650 80+
  Bronze
- 16 GB de RAM DDR3 en dos módulos para aprovechar dual channel
- pasta térmica nueva, y dejar preparado el terreno para añadir un SAI cuanto
  antes

Con el equipo ya limpio y actualizado, tocó remontarlo todo: placa base, fuente
de alimentación, disipador Arctic Freezer 13 con pasta nueva, RAM, los SSD SATA
y un cableado bastante más ordenado que el original. Antes de instalar nada
comprobé que todo hacía POST correctamente en BIOS y aproveché para revisar
arranque, hora, opciones de encendido tras corte eléctrico y la posibilidad de
dejar Wake-on-LAN configurado.

Luego vino el sistema. Instalé Debian sin entorno gráfico en el SSD principal,
dejando claro desde el principio que aquello iba a ser un servidor y no un PC
de escritorio reciclado a medias. El segundo SSD lo dejé para datos
persistentes, con montaje automático en `fstab` y una estructura pensada para
volúmenes Docker.

La parte de red y operación fue casi tan importante como el montaje físico.
Asigné IP estática en local, configuré SSH con claves públicas y root
deshabilitado, levanté un firewall básico, instalé Tailscale para acceso remoto
privado y monté Docker como base de todo lo demás. A partir de ahí llegaron los
servicios: Traefik, Cloudflare Tunnel, Passbolt migrado desde AWS, Uptime Kuma,
Portainer, `pablesite.es`, entornos de MoneyPlanner y varias piezas más.

Y, por supuesto, no podía faltar la frikada. En vez de tirar por dioses
griegos, que para este tipo de cosas me parecen ya bastante manidos, me fui
directamente a mi mundo de fantasía favorito: Tolkien. El servidor padre pasó a
llamarse `Arda`, y a partir de ahí empecé a ordenar el homelab como si fueran
sus reinos.

`Moria` acabó siendo Passbolt, porque al final es el sitio al que solo entra
quien sabe la palabra correcta. `Palantír` encaja demasiado bien para la
monitorización. `Valinor` se quedó con los backups, porque la idea de una tierra
inmortal donde nada se pierde nunca era demasiado buena como para no usarla. Y
`The Arkenstone`, por supuesto, terminó siendo MoneyPlanner SaaS: la joya más
valiosa de todo el conjunto.

Lo mejor es que no se quedó en una broma puntual para bautizar tres
contenedores. De verdad me sigue sorprendiendo cómo casi cada servicio que se me
ocurre desplegar tiene un nombre del legendarium que, de forma metafórica, le
encaja casi perfecto. De ahí salen o saldrán también `Narya` para LiteLLM,
`Gandalf` para el bot de Telegram, `The Council` para Vikunja, `Rivendell` para
Nextcloud, `Orthanc` para Home Assistant, `The Shire` para Immich, `Glóin` para
el extractor de facturas, `Lórien` para salud y deporte, o `Fëanor` para la
parte de trading y backtesting.

En realidad, lo que hice no fue solo "sacar servicios de AWS". Fue construir un
entorno completo que entendía mucho mejor: hardware, sistema operativo,
almacenamiento, red, despliegue, monitorización y backups. El ahorro fue una
consecuencia. La ganancia real fue el contexto.

## Reflexiones

Ya sé que un homelab no vale para todo. Ya sé que puede romperse el día menos
esperado, que lo ideal sería tener un SAI ya mismo, que si sigues abriendo
servicios hacia fuera entran en juego más temas de red, IP pública, firewall y
muchas otras capas que en la nube delegas o ignoras durante más tiempo.

Pero precisamente por eso me sigue pareciendo un proyecto valioso. Montarlo tú
mismo desde cero, desde limpiar piezas y volver a ensamblar el PC hasta acabar
automatizando despliegues y levantando servicios hechos a medida, te da una
perspectiva técnica mucho más amplia. Te obliga a tocar capas que normalmente
quedan escondidas detrás de un panel de cloud y, sobre todo, te mantiene
aprendiendo.

Arda salió de ahí. No como una infraestructura perfecta, sino como una
infraestructura entendida. Y para un proyecto personal, eso tiene muchísimo
más valor que seguir pagando por inercia.
