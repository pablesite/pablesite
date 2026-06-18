import type { Locale } from "./site";

type Localized<T> = Record<Locale, T>;

export const copy = {
  es: {
    home: {
      title: "De gestionar equipos a gestionar también agentes de IA.",
      description:
        "Mismo enfoque, distinto equipo: construyendo mi propio sistema de finanzas personales y un homelab desde cero.",
      about: [
        "Desde bien pequeño me ha gustado entender cómo funcionan las cosas por dentro: desmontar y montar de todo, desde Legos hasta máquinas de escribir (que le pregunten a mi padre por su preciada Olivetti) y, por supuesto, ordenadores, todos los que he tenido. Esa curiosidad me llevó a terminar mi primera etapa de formación importante: ingeniería de telecomunicaciones, seguida de un máster en tecnologías de la información y las comunicaciones.",
        "Por otra parte, cada vez predico más con el mantra de que lo que no se mide no se puede mejorar. Esa obsesión por medir y anotar todo, en campos como la salud o las finanzas personales, me llevó a otra fase de mi vida, en la que no solo me he reencontrado con las matemáticas en un máster de ingeniería matemática y computación, sino que también he aprendido, y sigo aprendiendo, sobre finanzas personales de forma autodidacta.",
        "Hoy soy lo que en mi centro tecnológico llamamos Director de Tecnología. Aunque creo que cada CTO tiene su propia definición del cargo, en mi caso es fácil de explicar: dirijo a un equipo de personas para que construya tecnología de calidad. En el día a día eso significa coordinar, priorizar y tomar decisiones técnicas en un contexto de proyectos de I+D y contratos en el sector naval.",
        "No obstante, para mí la mejor forma de entender algo es construyéndolo. Por eso, fuera del trabajo, sigo con las manos en la masa: Arda, mi homelab, y The Arkenstone, mi propio sistema de finanzas personales, son ahora mismo mis proyectos para seguir aprendiendo tecnología a bajo nivel, además de permitirme ganar tiempo y reducir costes en el proceso.",
        "Fuera del teclado, soy padre de Lucas, marido de Ana, además de músico y ciclista frustrado.",
      ],
      now: "Ahora mismo estoy diseñando el frontend de The Arkenstone y adaptándolo a PWA para móviles, además de terminar de afinar contenido y diseño en pablesite.es.",
    },
    labels: {
      about: "About",
      aboutAccent: "quién soy",
      projects: "Proyectos",
      projectsAccent: "destacados",
      arda: "Arda",
      ardaAccent: "mi homelab",
      arkenstone: "The Arkenstone",
      arkenstoneAccent: "finanzas personales",
      blog: "Blog",
      blogAccent: "notas y aprendizajes",
      outside: "Fuera del código",
      outsideAccent: "vida real",
      contact: "Contacto",
      readMore: "Saber más",
      seeAll: "Ver todos",
      soon: "próximamente",
    },
  },
  en: {
    home: {
      title: "From managing teams to also managing AI agents.",
      description:
        "Same mindset, different team: building my own personal finance system and a homelab from scratch.",
      about: [
        "Since I was a child I have liked understanding how things work inside: taking apart and rebuilding everything from Lego to typewriters and, of course, every computer I have owned.",
        "That curiosity became a technical career, and over time it mixed with another habit: measuring what matters. Health, finances, systems and decisions all improve when they become visible.",
        "Today I work as a Technology Director. In practice, that means helping a team build quality technology, prioritizing, coordinating and making technical decisions in R&D and naval-sector projects.",
        "Outside work, I still learn by building. Arda, my homelab, and The Arkenstone, my personal finance system, are the projects where I keep my hands close to the machinery.",
        "Away from the keyboard, I am also a father, husband, musician and frustrated cyclist.",
      ],
      now: "Right now I am shaping The Arkenstone frontend, turning it into a mobile-friendly PWA and polishing pablesite.es.",
    },
    labels: {
      about: "About",
      aboutAccent: "who I am",
      projects: "Projects",
      projectsAccent: "featured",
      arda: "Arda",
      ardaAccent: "my homelab",
      arkenstone: "The Arkenstone",
      arkenstoneAccent: "personal finance",
      blog: "Blog",
      blogAccent: "notes and lessons",
      outside: "Outside code",
      outsideAccent: "real life",
      contact: "Contact",
      readMore: "Read more",
      seeAll: "See all",
      soon: "coming soon",
    },
  },
} satisfies Localized<{
  home: {
    title: string;
    description: string;
    about: string[];
    now: string;
  };
  labels: Record<string, string>;
}>;

export const projects = {
  es: [
    {
      name: "The Arkenstone",
      description:
        "Sistema de finanzas personales que nace de mi propia forma de gestionar el dinero, disponible como Arkenstone autohospedado o Arkenstone Cloud.",
      href: "/es/arkenstone/",
      accent: "blue",
      stack: ["Django", "Vue", "PostgreSQL", "Docker"],
    },
    {
      name: "Fëanor",
      description:
        "Motor de backtesting para estrategias de trading, desarrollado como proyecto de máster. El repositorio conserva temporalmente el nombre Astra.",
      href: "https://github.com/pablesite/astra",
      accent: "purple",
      stack: ["Python", "Backtesting", "Trading"],
    },
  ],
  en: [
    {
      name: "The Arkenstone",
      description:
        "A personal finance system born from the way I manage my own money, available as self-hosted Arkenstone or Arkenstone Cloud.",
      href: "/en/arkenstone/",
      accent: "blue",
      stack: ["Django", "Vue", "PostgreSQL", "Docker"],
    },
    {
      name: "Fëanor",
      description:
        "A trading-strategy backtesting engine built as a master's degree project. The repository temporarily keeps the Astra name.",
      href: "https://github.com/pablesite/astra",
      accent: "purple",
      stack: ["Python", "Backtesting", "Trading"],
    },
  ],
} satisfies Localized<
  {
    name: string;
    description: string;
    href: string;
    accent: "green" | "blue" | "purple";
    stack: string[];
  }[]
>;

export type ServiceIcon =
  | "vault"
  | "orb"
  | "mountain"
  | "gem"
  | "ring"
  | "staff"
  | "library"
  | "council"
  | "leaf"
  | "home"
  | "forge"
  | "tower"
  | "pony"
  | "ledger";

export const ardaServices = [
  {
    name: "Moria",
    icon: "vault",
    description: {
      es: "Gestión de contraseñas. Solo entra quien sabe la palabra.",
      en: "Password management. Only those who know the word may enter.",
    },
    technology: "Passbolt",
    status: "up",
    kind: "third-party",
    url: "https://moria.codinglab.es",
  },
  {
    name: "Palantír",
    icon: "orb",
    description: {
      es: "Monitorización de todos los servicios de Arda: disponibilidad, latencia y alertas.",
      en: "Monitoring for Arda services: availability, latency and alerts.",
    },
    technology: "Uptime Kuma",
    status: "up",
    kind: "third-party",
    url: "https://palantir.codinglab.es",
  },
  {
    name: "Valinor",
    icon: "mountain",
    description: {
      es: "Backups con Restic: la tierra inmortal donde nada debería perderse.",
      en: "Restic backups: the undying land where nothing should be lost.",
    },
    technology: "Restic",
    status: "up",
    kind: "third-party",
  },
  {
    name: "The Arkenstone",
    icon: "gem",
    description: {
      es: "Mi sistema de finanzas personales: patrimonio, presupuesto y contabilidad.",
      en: "My personal finance system: net worth, budgeting and accounting.",
    },
    technology: {
      es: "Desarrollo propio",
      en: "Own product",
    },
    status: "up",
    kind: "own",
    url: "https://arkenstone.codinglab.es",
  },
  {
    name: "Narya",
    icon: "ring",
    description: {
      es: "Gateway a modelos de IA, con registro y control de uso.",
      en: "Gateway to AI models, with logging and usage control.",
    },
    technology: "LiteLLM",
    status: "planned",
    kind: "third-party",
  },
  {
    name: "Gandalf",
    icon: "staff",
    description: {
      es: "Bot de Telegram y asistente IA para gestionar Arda desde el móvil.",
      en: "Telegram bot and AI assistant to manage Arda from the phone.",
    },
    technology: "Bot + Narya",
    status: "planned",
    kind: "own",
  },
  {
    name: "Rivendell",
    icon: "library",
    description: {
      es: "Almacenamiento personal en la nube. La biblioteca élfica del homelab.",
      en: "Personal cloud storage. The homelab's elven library.",
    },
    technology: "Nextcloud",
    status: "planned",
    kind: "third-party",
  },
  {
    name: "Orthanc",
    icon: "tower",
    description: {
      es: "Domótica para la casa nueva: automatizaciones, sensores y control centralizado.",
      en: "Home automation for the new house: automations, sensors and centralized control.",
    },
    technology: "Home Assistant",
    status: "planned",
    kind: "third-party",
  },
  {
    name: "The Council",
    icon: "council",
    description: {
      es: "Gestor de tareas y proyectos: decidir qué misiones acometer.",
      en: "Tasks and projects: deciding which quests to take on.",
    },
    technology: "Vikunja",
    status: "planned",
    kind: "third-party",
  },
  {
    name: "Prancing Pony",
    icon: "pony",
    description: {
      es: "Estación multimedia del homelab para centralizar biblioteca y consumo doméstico.",
      en: "The homelab media station for a centralized household library and playback.",
    },
    technology: {
      es: "Stack multimedia",
      en: "Media stack",
    },
    status: "planned",
    kind: "third-party",
  },
  {
    name: "Lórien",
    icon: "leaf",
    description: {
      es: "Dashboard de salud y deporte, con datos de Garmin y Apple Health.",
      en: "Health and sport dashboard with Garmin and Apple Health data.",
    },
    technology: {
      es: "Desarrollo propio",
      en: "Own product",
    },
    status: "planned",
    kind: "own",
  },
  {
    name: "The Shire",
    icon: "home",
    description: {
      es: "Fotos familiares con Immich, para guardar memoria sin depender de terceros.",
      en: "Family photos with Immich, keeping memories without relying on third parties.",
    },
    technology: "Immich",
    status: "planned",
    kind: "third-party",
  },
  {
    name: "Glóin",
    icon: "ledger",
    description: {
      es: "Scripting e integración para traer facturas y recibos a base de datos sin picado manual.",
      en: "Scripting and integration to bring invoices and receipts into the database without manual entry.",
    },
    technology: {
      es: "Scripts + integración",
      en: "Scripts + integration",
    },
    status: "planned",
    kind: "own",
  },
  {
    name: "Fëanor",
    icon: "forge",
    description: {
      es: "Sistema automático de trading algorítmico.",
      en: "Automated algorithmic trading system.",
    },
    technology: {
      es: "Desarrollo propio",
      en: "Own product",
    },
    status: "planned",
    kind: "own",
  },
] as const;

export const outside = {
  es: [
    {
      label: "Strava",
      icon: "bike",
      main: "Rutas, rodillo y volver a coger ritmo",
      sub: "Mi perfil real en Strava: salidas cuando puedo y métricas para no engañarme con lo poco que entreno.",
      href: "https://www.strava.com/athletes/16376516",
    },
    {
      label: "Spotify",
      icon: "music",
      main: "Lo que estoy escuchando últimamente",
      sub: "Metal, rock y lo que se cuele entre medias. Perfil abierto, sin widgets fake ni ahora-suena inventados.",
      href: "https://open.spotify.com/user/pablesite?si=0793724c165f4439",
    },
    {
      label: "Leyendo ahora",
      icon: "book",
      main: "El poder del metal",
      sub: "Miguel de Lys recorre historia y cultura a través del rock y el metal. También estoy con One Piece, de Eiichiro Oda, y The Muscle & Strength Pyramid: Training, de Eric Helms, Andy Morgan y Andrea Valdez.",
    },
  ],
  en: [
    {
      label: "Strava",
      icon: "bike",
      main: "Rides, indoor sessions and getting back in shape",
      sub: "My real Strava profile: actual rides when life allows it, plus enough metrics to stay honest.",
      href: "https://www.strava.com/athletes/16376516",
    },
    {
      label: "Spotify",
      icon: "music",
      main: "What I have been listening to lately",
      sub: "Mostly metal and rock, with room for detours. An open profile, without fake live widgets.",
      href: "https://open.spotify.com/user/pablesite?si=0793724c165f4439",
    },
    {
      label: "Reading now",
      icon: "book",
      main: "El poder del metal",
      sub: "Miguel de Lys explores history and culture through rock and metal. Also on the pile: One Piece by Eiichiro Oda, and The Muscle & Strength Pyramid: Training by Eric Helms, Andy Morgan and Andrea Valdez.",
    },
  ],
} satisfies Localized<
  {
    label: string;
    icon: "bike" | "music" | "book";
    main: string;
    sub: string;
    href?: string;
  }[]
>;
