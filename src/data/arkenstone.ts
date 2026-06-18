import type { Locale } from "./site";

type LandingCardTone = "green" | "blue" | "purple";

interface LandingCard {
  title: string;
  description: string;
  tone: LandingCardTone;
}

interface LandingPhase {
  name: string;
  description: string;
}

interface LandingShowcase {
  label: string;
  title: string;
  description: string;
  bullets: string[];
}

interface LandingCopy {
  seoDescription: string;
  backLabel: string;
  hero: {
    title: string;
    highlight: string;
    description: string;
    chips: string[];
    primaryCta: string;
    secondaryCta: string;
    asideTitle: string;
    asideBody: string;
  };
  openCoreIntro: string;
  openCore: LandingCard[];
  problem: {
    intro: string;
    questions: string[];
  };
  showcases: LandingShowcase[];
  modes: LandingCard[];
  phases: LandingPhase[];
  stack: string[];
  contact: {
    title: string;
    body: string;
  };
}

export const arkenstoneLanding = {
  es: {
    seoDescription:
      "The Arkenstone es una app de finanzas personales para entender tu situación, priorizar decisiones y avanzar sin depender de hojas de cálculo frágiles.",
    backLabel: "← pablesite.es",
    hero: {
      title: "Tu dinero debería",
      highlight: "ayudarte a decidir",
      description:
        "The Arkenstone convierte información financiera dispersa en una guía práctica. Puedes registrar cada movimiento o trabajar con revisiones más ligeras, pero en ambos casos terminas entendiendo qué está pasando y cuál es el siguiente paso razonable.",
      chips: [],
      primaryCta: "¿Tienes dudas?",
      secondaryCta: "",
      asideTitle: "Claridad para decidir mejor",
      asideBody:
        "Arkenstone te ayuda a ver tu patrimonio, entender cómo evoluciona tu caja y detectar qué decisión merece prioridad ahora, sin perder tiempo montando un sistema paralelo en hojas de cálculo.",
    },
    openCoreIntro:
      "Arkenstone puede usarse de dos formas: Arkenstone autohospedado para quien quiere control total sobre su despliegue, y Arkenstone Cloud para quien quiere usar la herramienta sin operar infraestructura.",
    openCore: [
      {
        title: "Arkenstone autohospedado",
        description:
          "Lo ejecutas en tu propia infraestructura para mantener control sobre los datos, adaptar el sistema a tu forma de trabajar y operar sin depender de terceros.",
        tone: "green",
      },
      {
        title: "Arkenstone Cloud",
        description:
          "Lo usas directamente, con la misma lógica de producto, pero sin ocuparte de servidores, backups ni mantenimiento.",
        tone: "blue",
      },
    ],
    problem: {
      intro:
        "La mayoría de herramientas te dejan en uno de estos extremos: o registras datos sin parar, o ves dashboards que muestran números pero no te ayudan a decidir. Arkenstone está diseñado para cubrir el espacio intermedio.",
      questions: [
        "¿Tengo un flujo de caja sano o solo estoy sobreviviendo?",
        "¿Debería priorizar deuda, ahorro, fondo de emergencia o inversión?",
        "¿Mi patrimonio mejora de verdad o solo se mueve dinero entre cuentas?",
        "¿Puedo llevar esto sin convertirlo en otro trabajo diario?",
      ],
    },
    showcases: [
      {
        label: "vista 01",
        title: "Panel financiero con contexto, no solo números",
        description:
          "La app está pensada para que una primera vista ya te diga cómo vas: patrimonio, caja, foco del mes y señales de alerta sin obligarte a interpretar diez widgets sueltos.",
        bullets: [
          "Resumen rápido de salud financiera",
          "Prioridades visibles sin navegar media app",
          "Hueco ideal para la captura principal del producto",
        ],
      },
      {
        label: "vista 02",
        title: "Cierre mensual para entender si realmente avanzas",
        description:
          "No se trata solo de registrar actividad. El cierre mensual convierte movimientos y balances en una lectura práctica: qué mejoró, qué empeoró y qué conviene hacer ahora.",
        bullets: [
          "Comparativa entre meses",
          "Desviaciones de presupuesto y caja",
          "Espacio para screenshot de revisión mensual",
        ],
      },
      {
        label: "vista 03",
        title: "Mapa de fases para decidir qué toca primero",
        description:
          "Arkenstone organiza la vida financiera en fases comprensibles para que el usuario no solo vea datos, sino también dónde está el cuello de botella.",
        bullets: [
          "Diagnóstico por áreas financieras",
          "Siguiente paso más razonable según contexto",
          "Placeholder para la vista estratégica de fases",
        ],
      },
    ],
    modes: [
      {
        title: "Para quien quiere control detallado",
        description:
          "Movimientos, categorías, presupuestos y cierres periódicos para entender la operativa diaria con precisión.",
        tone: "green",
      },
      {
        title: "Para quien quiere claridad sin fricción",
        description:
          "Revisiones mensuales, evolución patrimonial e indicadores agregados para seguir avanzando sin anotar cada gasto.",
        tone: "blue",
      },
    ],
    phases: [
      {
        name: "Deuda",
        description:
          "Ordenar pasivos, distinguir deuda mala y reducir la fricción que te impide avanzar.",
      },
      {
        name: "Flujo de caja",
        description:
          "Consolidar un superávit estable y saber si el mes está realmente bajo control.",
      },
      {
        name: "Fondo de emergencia",
        description:
          "Construir un colchón realista que proteja la operativa diaria y las decisiones importantes.",
      },
      {
        name: "Salud patrimonial",
        description:
          "Entender cómo se equilibran activos y pasivos y cómo evoluciona tu patrimonio neto.",
      },
      {
        name: "Independencia financiera",
        description:
          "Medir hasta qué punto tus activos productivos empiezan a sostener tu estilo de vida.",
      },
    ],
    stack: [
      "Django 6",
      "Django REST Framework",
      "SimpleJWT",
      "Vue 3",
      "Vite",
      "Pinia",
      "PostgreSQL",
      "Docker Compose",
    ],
    contact: {
      title:
        "Si esta forma de entender las finanzas personales te encaja, hablemos.",
      body: "Puedo enseñarte hacia dónde va el producto y cómo estoy aterrizando esta idea en una app real.",
    },
  },
  en: {
    seoDescription:
      "The Arkenstone is a personal finance app built to help people understand their situation, prioritise decisions and move beyond fragile spreadsheets.",
    backLabel: "← pablesite.es",
    hero: {
      title: "Your money should",
      highlight: "help you decide",
      description:
        "The Arkenstone turns scattered financial information into a practical guide. You can track every movement or work through lighter reviews, but in both cases you end up understanding what is happening and what the next sensible step should be.",
      chips: [],
      primaryCta: "Any questions?",
      secondaryCta: "",
      asideTitle: "Clarity for better decisions",
      asideBody:
        "Arkenstone helps you see your net worth, understand how your cash position evolves and spot which decision deserves attention now, without building a parallel system in spreadsheets.",
    },
    openCoreIntro:
      "Arkenstone can be used in two ways: self-hosted Arkenstone for people who want full control over the deployment, and Arkenstone Cloud for people who want to use the product without running infrastructure.",
    openCore: [
      {
        title: "Self-hosted Arkenstone",
        description:
          "You run it on your own infrastructure to keep control over the data, adapt the system to your workflow and operate without relying on third parties.",
        tone: "green",
      },
      {
        title: "Arkenstone Cloud",
        description:
          "You use it directly, with the same product logic, without dealing with servers, backups or maintenance.",
        tone: "blue",
      },
    ],
    problem: {
      intro:
        "Most tools leave you at one of two extremes: either you log data forever, or you get dashboards that show numbers without helping you decide what to do next. Arkenstone is designed for the middle ground.",
      questions: [
        "Is my cash flow actually healthy or am I just getting through the month?",
        "Should I focus on debt, savings, emergency fund or investing first?",
        "Is my net worth improving or am I only moving money between accounts?",
        "Can I keep this system going without turning it into another daily job?",
      ],
    },
    showcases: [
      {
        label: "view 01",
        title: "A financial dashboard with context, not just numbers",
        description:
          "The app is designed so that a first view already tells you how things stand: net worth, cash flow, current focus and warning signals without forcing you to interpret ten isolated widgets.",
        bullets: [
          "Fast financial health summary",
          "Visible priorities without digging through the app",
          "Ideal slot for the main product screenshot",
        ],
      },
      {
        label: "view 02",
        title:
          "A monthly close that tells you if you are really moving forward",
        description:
          "This is not only about logging activity. The monthly close turns movements and balances into a practical reading: what improved, what got worse and what deserves attention now.",
        bullets: [
          "Month-over-month comparison",
          "Budget and cash flow variance",
          "Reserved space for the review screenshot",
        ],
      },
      {
        label: "view 03",
        title: "A phase map that helps you choose what matters first",
        description:
          "Arkenstone organises personal finance into understandable phases so the user does not just see data, but also where the current bottleneck sits.",
        bullets: [
          "Diagnosis across financial areas",
          "Most sensible next step based on context",
          "Placeholder for the strategic phase view",
        ],
      },
    ],
    modes: [
      {
        title: "For people who want detailed control",
        description:
          "Transactions, categories, budgets and recurring closes for a precise daily picture.",
        tone: "green",
      },
      {
        title: "For people who want clarity with less friction",
        description:
          "Monthly reviews, net worth progress and aggregate indicators so you can keep moving without logging every expense.",
        tone: "blue",
      },
    ],
    phases: [
      {
        name: "Debt",
        description:
          "Structure liabilities, isolate bad debt and reduce the drag that keeps progress slow.",
      },
      {
        name: "Cash flow",
        description:
          "Build a stable surplus and understand whether the month is truly under control.",
      },
      {
        name: "Emergency fund",
        description:
          "Create a realistic safety buffer that protects daily operations and important decisions.",
      },
      {
        name: "Net worth health",
        description:
          "Understand how assets and liabilities balance out and how net worth evolves over time.",
      },
      {
        name: "Financial independence",
        description:
          "Measure how far productive assets are starting to support the life you want to live.",
      },
    ],
    stack: [
      "Django 6",
      "Django REST Framework",
      "SimpleJWT",
      "Vue 3",
      "Vite",
      "Pinia",
      "PostgreSQL",
      "Docker Compose",
    ],
    contact: {
      title:
        "If this way of approaching personal finance resonates with you, let’s talk.",
      body: "I can show where the product is heading and how I am turning the idea into a real app.",
    },
  },
} satisfies Record<Locale, LandingCopy>;
