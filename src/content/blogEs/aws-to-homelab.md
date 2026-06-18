---
title: "Cómo migré de AWS a mi propio homelab y bajé la factura a casi cero"
description: "Qué cambió al sacar mis servicios de AWS, qué mantuve y qué aprendí al mover todo a Arda."
publishDate: 2026-06-17
translationKey: "aws-to-homelab"
draft: false
---

## TL;DR

- Estaba pagando cada mes unos 40-50 € para exponer proyectos personales y
  mantener mi gestor de contraseñas autohoespedado, y empecé a sentir que ese coste ya no tenía sentido.
- Más importante aún: quería quitarme suscripciones y sustituir algunos SaaS por alternativas autohospedadas basadas en software libre.
- La chispa no vino de un benchmark ni de una comparativa random, sino de
  una idea mucho más simple: rescatar un PC viejo y darle una segunda vida.
- El proyecto acabó siendo más grande de lo que había previsto en un principio: desmonté el equipo,
  lo limpié, lo mejoré, monté Debian y levanté desde ahí toda la
  base del homelab.
- Ya sé que un homelab no sustituye a todo ni elimina riesgos, pero te obliga a
  entender de verdad lo que estás construyendo.

## Motivación

Durante un tiempo estuve pagando cada mes entre 40 y 50 euros para exponer mis
proyectos personales y gestionar mis contraseñas en Passbolt. No era una cifra dramática, pero sí lo bastante alta como para empezar a molestarme cada vez que veía el cargo.

Pero el dinero, siendo importante, no era la única motivación ni siquiera la
más interesante. Lo que de verdad me tiraba era otra cosa: quitarme
suscripciones de encima y empezar a montar por mi cuenta muchos de los SaaS que
uso, siempre que hubiera una alternativa razonable basada en
software libre.

La razón principal era bastante mundana: quería moverlo todo con Docker y la
RAM que necesitaba me empujaba, como mínimo, a una instancia con 4 GiB. Para usar EC2 necesitaba como mínimo una instancia `t3.medium`: 2 vCPU y 4 GiB de RAM,
con un coste base que hoy ronda los 30 dólares al mes antes de sumar disco y
otros extras. Traducido a factura real, mis 40-50 euros al mes eran
perfectamente creíbles.

Mi plan inicial no era montarme un servidor en casa. De hecho, era mucho más
aburrido: buscar un proveedor cloud algo más barato y seguir igual. Pero en
ese punto me crucé con un informático con experiencia en sistemas que me contó
que él reutilizaba PCs viejos como servidores. Me sorprendió cuando defendió
con bastante rotundidad que un PC bien refrigerado no tiene por qué petar por
estar siempre encendido, y que a veces sufren más con ciclos de encendido y
apagado constantes. No sé hasta qué punto esa afirmación es totalmente cierta, pero lo que sí se es que me abrió una puerta mental.

De repente, el problema ya no era solo reducir una factura. Era recuperar un
equipo viejo al que le tengo especial cariño por ser una bestia en su día, desmontarlo entero y convertirlo en la base de una infraestructura propia donde ir sustituyendo SaaS por servicios bajo mi control. Y ahí el
proyecto dejó de ser una simple migración de un servicio de nube a otro, para volverse mucho, mucho más atractivo.

## Solución aplicada

La solución empezó por el hardware. Desmonté por completo el PC viejo para ver qué merecía la pena salvar y qué
no. Después de darle muchas vueltas, me deshice de la GPU dedicada que llevaba... eran tan obsoleta que sólo me iba a generar calor y consumo. Fuente, tarjeta WiFi, de sonido, lector de CDs, de disquetes.... sí sí, de disquetes, y alguna cosa más se fue fuera.

<figure class="blog-media blog-media--expandable">
  <a href="/blog/aws-to-homelab/arda-server.jpeg" target="_blank" rel="noreferrer">
    <img
      src="/blog/aws-to-homelab/arda-server.jpeg"
      alt="La placa base de Arda durante el montaje del homelab, antes de reinstalar el resto de componentes."
    />
  </a>
  <figcaption>
    Arda en pleno montaje: limpiando, simplificando y preparando la base del homelab. Pulsa para verla en grande.
  </figcaption>
</figure>

Me quedé con la placa, el procesador, la RAM y dos discos duros SSD Sata. La limpieza fue bastante más seria que un soplado rápido. Limpié todo a conciencia, use alcohol isopropílico para la electrónica, repasé a fondo ventiladores y disipador y quité la pasta térmica antigua.

El equipo de partida tampoco era una reliquia inútil. Aunque es un PC de 2012,
lleva un Intel i7 de tercera generación con una placa base muy decente para la época. Es verdad que no deja de ser hardware antiguo, pero también es verdad que unas características así en AWS me habrían llevado a una máquina
bastante más cara de lo que estaba pagando por una instancia modesta para salir
del paso.

En paralelo, decidí invertir 180€ solo en lo que mejoraba de verdad el resultado:

- una caja nueva para mejorar la ventilación
- una fuente de alimentación eficiente, en mi caso una Corsair CX650 80+
  Bronze
- 16 GB de RAM DDR3 en dos módulos para aprovechar dual channel
- pasta térmica nueva

Con el equipo ya limpio y actualizado, tocó montarlo todo desde (casi) cero: placa base y procesador es el único bloque que tenía ya montado. Todo lo demás a disfrutarlo: fuente
de alimentación, disipador con pasta nueva, RAM, los SSD SATA
y un cableado bastante más ordenado que el original. Antes de instalar nada
comprobé que todo la BIOS arrancaba y reconocía todo, y aproveché para revisar hora (tocó también cambio de pila), opciones de encendido tras corte eléctrico y la posibilidad de
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
servicios: Traefik, Cloudflare Tunnel, Passbolt migrado desde AWS, Uptime Kuma, `pablesite.es` y primera versión de mi app de finanzas personales.

Y, por supuesto, no podía faltar la frikada. En vez de tirar por dioses
griegos, que para este tipo de cosas me parecen ya bastante manidos, me fui
directamente a mi mundo de fantasía favorito: Tolkien. El servidor padre pasó a
llamarse `Arda`, y a partir de ahí empecé a ordenar el homelab como si fueran
sus reinos.

`Moria` acabó siendo el gestor de contraseñas, porque al final es el sitio al que solo entra
quien sabe la palabra correcta. `Palantír` encaja demasiado bien para la
monitorización del servidor. `Valinor` se quedó con los backups, porque la idea de una tierra
inmortal donde nada se pierde nunca era demasiado buena como para no usarla. Y
`The Arkenstone`, por supuesto, acabó siendo el nombre de mi app de finanzas personales: la joya más preciada de Smaug como metáfora de algo igual de paciente y valioso, la construcción de patrimonio.

Lo mejor es que no se quedó en una broma puntual para bautizar tres
contenedores. De verdad me sigue sorprendiendo cómo casi cada servicio que se me
ocurre desplegar tiene un nombre del mundo de Tolkien que, de forma metafórica, le
encaja casi perfecto. De ahí salen o saldrán también `Narya` para LiteLLM y
`Gandalf` para el bot de Telegram que conectará de alguna manera con Arda, `The Council` para el gestor de tareas, `Rivendell` para el gestor de documentos compartidos, `Orthanc` para la domótica, `The Shire` para la gestión de fotos familiares, `Glóin` para el extractor de facturas, `Lórien` para la app de salud y deporte, o `Fëanor` para el sistema de trading algorítmico.

## Reflexiones

Ya sé que un homelab no vale para todo. Ya sé que puede romperse el día menos
esperado, que lo ideal sería tener un SAI ya mismo, que si sigues abriendo
servicios hacia fuera entran en juego más temas de red, IP pública, firewall y
muchas otras capas que en la nube delegas o ignoras durante más tiempo.

Pero precisamente por eso me sigue pareciendo un proyecto valioso. Montarlo tú
mismo desde cero, desde limpiar piezas y volver a ensamblar el PC hasta acabar
automatizando despliegues y levantando servicios hechos a medida, te da una
perspectiva técnica mucho más amplia. Te obliga a tocar capas que normalmente
quedan escondidas detrás de un panel de administración cualquiera y, sobre todo, te mantiene
actualizado y aprendiendo.

Muy contento con Arda la verdad. Ya no pago por inercia a AWS. Ahora pago a Octopus el consumo de energía del servidor xD.
