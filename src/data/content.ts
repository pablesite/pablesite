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
        "Sistema de finanzas personales que nace de mi propia forma de gestionar el dinero. El core es público; sobre él corre el SaaS completo.",
      href: "/es/arkenstone/",
      accent: "blue",
      stack: ["Django", "Vue", "PostgreSQL", "Docker"],
    },
    {
      name: "Astra",
      description:
        "Motor de backtesting para estrategias de trading, desarrollado como proyecto de máster. El nombre público todavía está pendiente de ajuste.",
      href: "https://github.com/pablesite/astra",
      accent: "purple",
      stack: ["Python", "Backtesting", "Trading"],
    },
    {
      name: "Astra Front",
      description:
        "Interfaz del motor de backtesting. De momento conserva el nombre provisional del repositorio.",
      href: "https://github.com/pablesite/astra-front",
      accent: "green",
      stack: ["Frontend", "Trading", "UI"],
    },
  ],
  en: [
    {
      name: "The Arkenstone",
      description:
        "A personal finance system born from the way I manage my own money. The core is public; the full SaaS runs on top of it.",
      href: "/en/arkenstone/",
      accent: "blue",
      stack: ["Django", "Vue", "PostgreSQL", "Docker"],
    },
    {
      name: "Astra",
      description:
        "A trading-strategy backtesting engine built as a master's degree project. The public name is still pending a final rename.",
      href: "https://github.com/pablesite/astra",
      accent: "purple",
      stack: ["Python", "Backtesting", "Trading"],
    },
    {
      name: "Astra Front",
      description:
        "Frontend for the backtesting engine. It still keeps the provisional repository name for now.",
      href: "https://github.com/pablesite/astra-front",
      accent: "green",
      stack: ["Frontend", "Trading", "UI"],
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

export const ardaServices = [
  {
    name: "Moria",
    description: {
      es: "Gestión de contraseñas para todo el ecosistema, propio y de proyectos.",
      en: "Password management for my personal and project ecosystem.",
    },
    technology: "Passbolt",
    status: "up",
    kind: "third-party",
  },
  {
    name: "Palantír",
    description: {
      es: "Monitorización de todos los servicios de Arda: disponibilidad, latencia y alertas.",
      en: "Monitoring for Arda services: availability, latency and alerts.",
    },
    technology: "Uptime Kuma",
    status: "up",
    kind: "third-party",
  },
  {
    name: "The Arkenstone",
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
  },
  {
    name: "Lórien",
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
    name: "Astra",
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
  {
    name: "Rivendell",
    description: {
      es: "Almacenamiento personal en la nube.",
      en: "Personal cloud storage.",
    },
    technology: "Nextcloud",
    status: "planned",
    kind: "third-party",
  },
  {
    name: "El Consejo",
    description: {
      es: "Gestor de tareas y proyectos personales.",
      en: "Personal tasks and projects manager.",
    },
    technology: "Vikunja",
    status: "planned",
    kind: "third-party",
  },
  {
    name: "Narya",
    description: {
      es: "Puerta de entrada centralizada a modelos de IA, con registro y control de uso.",
      en: "Central gateway to AI models, with logging and usage control.",
    },
    technology: "LiteLLM Gateway",
    status: "planned",
    kind: "third-party",
  },
  {
    name: "Gandalf",
    description: {
      es: "Asistente vía Telegram para gestionar el servidor desde el móvil.",
      en: "Telegram assistant to manage the server from the phone.",
    },
    technology: "Bot + Claude API",
    status: "planned",
    kind: "own",
  },
] as const;

export const blogPosts = {
  es: [
    "Cómo migré de AWS a mi propio homelab (y pasé de 47$/mes a 1$/mes)",
    "Por qué construí mi propio sistema de finanzas personales",
    "Cómo dirijo un equipo de agentes de IA (notas desde 2026)",
  ],
  en: [
    "How I moved from AWS to my homelab and cut the bill from $47/month to $1/month",
    "Why I built my own personal finance system",
    "How I manage a team of AI agents: notes from 2026",
  ],
} satisfies Localized<string[]>;

export const outside = {
  es: [
    {
      label: "Strava",
      icon: "bike",
      main: "Placeholder de actividad",
      sub: "Aquí irá un resumen curado de Strava cuando decida si integrarlo o mantenerlo manual.",
      href: "https://www.strava.com/",
    },
    {
      label: "Spotify",
      icon: "music",
      main: "Placeholder musical",
      sub: "Aquí irá una escucha reciente o una selección manual, sin fingir datos en directo.",
      href: "https://open.spotify.com/",
    },
    {
      label: "Leyendo ahora",
      icon: "book",
      main: "El poder del metal",
      sub: "También en la mesilla: One Piece y The Muscle and Strength Pyramid: Entrenamiento",
    },
  ],
  en: [
    {
      label: "Strava",
      icon: "bike",
      main: "Activity placeholder",
      sub: "A curated Strava summary will live here if I decide to integrate it or keep it manual.",
      href: "https://www.strava.com/",
    },
    {
      label: "Spotify",
      icon: "music",
      main: "Music placeholder",
      sub: "A recent listen or manual selection will live here, without pretending it is live data.",
      href: "https://open.spotify.com/",
    },
    {
      label: "Reading now",
      icon: "book",
      main: "El poder del metal",
      sub: "Also on the pile: One Piece and The Muscle and Strength Pyramid: Training",
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
