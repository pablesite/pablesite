import type { Locale } from "./site";

interface ArkenstoneDecisionGroup {
  title: string;
  description: string;
  examples: string[];
}

interface ArkenstoneMetric {
  title: string;
  description: string;
}

interface ArkenstoneDataMode {
  title: string;
  description: string;
  bullets: string[];
}

interface ArkenstoneModule {
  id: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

interface ArkenstoneImprovementGroup {
  title: string;
  description: string;
  bullets: string[];
}

interface ArkenstoneLandingCopy {
  seoDescription: string;
  backLabel: string;
  hero: {
    title: string;
    description: string;
    chips: string[];
    primaryCta: string;
    image: string;
    imageAlt: string;
  };
  decisions: {
    title: string;
    intro: string;
    groups: ArkenstoneDecisionGroup[];
    image: string;
    imageAlt: string;
  };
  simulation: {
    title: string;
    intro: string;
    summaryTitle: string;
    summaryDescription: string;
    image: string;
    imageAlt: string;
    metrics: ArkenstoneMetric[];
  };
  dataModes: {
    title: string;
    intro: string;
    items: ArkenstoneDataMode[];
  };
  modules: {
    title: string;
    intro: string;
    items: ArkenstoneModule[];
  };
  improvements: {
    title: string;
    intro: string;
    groups: ArkenstoneImprovementGroup[];
  };
  cta: {
    title: string;
    body: string;
  };
}

export const arkenstoneLanding = {
  es: {
    seoDescription:
      "The Arkenstone es una herramienta para evaluar decisiones financieras importantes viendo su impacto antes de comprometer patrimonio, deuda y flujo de caja.",
    backLabel: "← pablesite.es",
    hero: {
      title:
        "Una herramienta para decidir con criterio qué hacer con tu dinero.",
      description:
        "Te ayuda a evaluar compras, deuda y cambios patrimoniales viendo su impacto antes de comprometer tu economía.",
      chips: [
        "Comprar vivienda",
        "Comprar vehículo",
        "Asumir deuda",
        "Reorganizar patrimonio",
      ],
      primaryCta: "Únete como beta tester",
      image: "/arkenstone-patrimonio-neto.png",
      imageAlt:
        "Captura de The Arkenstone mostrando la evolución del patrimonio neto",
    },
    decisions: {
      title: "Qué decisiones puedes evaluar con Arkenstone",
      intro:
        "Arkenstone te ayuda a estudiar decisiones financieras importantes antes de incorporarlas a tu realidad.",
      groups: [
        {
          title: "Grandes compras",
          description:
            "Evalúa decisiones que cambian tu patrimonio y tu nivel de compromiso a largo plazo.",
          examples: ["Coche", "Vivienda", "Reforma"],
        },
        {
          title: "Cambios en ingresos y trabajo",
          description:
            "Compara cómo afectaría a tu economía cambiar tu capacidad de ingreso durante meses o años.",
          examples: ["Estudios", "Reducción de jornada", "Excedencia"],
        },
        {
          title: "Deuda y equilibrio financiero",
          description:
            "Entiende cuánto margen tienes para endeudarte, amortizar o rebalancear sin tensionar tu caja.",
          examples: [
            "Amortizar deuda",
            "Asumir nueva deuda",
            "Reorganizar patrimonio",
          ],
        },
        {
          title: "Proyectos personales o profesionales",
          description:
            "Explora decisiones más abiertas, con impacto incierto, antes de comprometer tiempo y dinero.",
          examples: ["Negocio", "Decisión genérica"],
        },
      ],
      image: "/arkenstone-mi-plan-resumen.png",
      imageAlt:
        "Captura de Mi Plan mostrando una proyección patrimonial y el capital productivo",
    },
    simulation: {
      title: "Qué te devuelve la simulación",
      intro:
        "Arkenstone traduce cada decisión a un escenario concreto para que veas su impacto antes de incorporarla a tu plan.",
      summaryTitle: "Un resumen claro del escenario",
      summaryDescription:
        "La simulación no se queda en un número aislado. Te enseña cómo cambia la trayectoria esperada, qué sacrificio inicial exige y qué compromisos recurrentes introduce antes de aceptar la decisión dentro de tu plan.",
      image: "/arkenstone-mi-plan-resumen.png",
      imageAlt:
        "Captura de The Arkenstone mostrando la evolución proyectada del patrimonio en Mi Plan",
      metrics: [
        {
          title: "Impacto inicial",
          description:
            "Cuánto capital sale de inicio para ejecutar la decisión.",
        },
        {
          title: "Impacto mensual",
          description:
            "Cómo cambia tu flujo mensual con nuevos gastos, ingresos o aportaciones.",
        },
        {
          title: "Activo o deuda que introduces",
          description:
            "Qué patrimonio añades y qué obligaciones nuevas asumes al incorporarlo.",
        },
        {
          title: "Comparación con tu plan actual",
          description:
            "Qué cambia frente al plan vigente en fechas, patrimonio y capital productivo.",
        },
      ],
    },
    dataModes: {
      title: "Cómo cambia Arkenstone según el nivel de detalle que quieras",
      intro:
        "Puedes usar Arkenstone con una base suficiente para simular decisiones importantes o llevarlo a un nivel mucho más preciso si trabajas también con contabilidad.",
      items: [
        {
          title: "Datos básicos",
          description:
            "Para simular decisiones importantes con una visión suficiente de patrimonio, deuda, ingresos y gastos.",
          bullets: [
            "Patrimonio, deuda, ingresos y gastos principales",
            "Simulaciones rápidas para decisiones importantes",
            "Visión suficiente para comparar escenarios sin meter toda tu operativa",
          ],
        },
        {
          title: "Datos avanzados",
          description:
            "Para afinar el análisis con contabilidad, más detalle operativo y una lectura más precisa de tu situación.",
          bullets: [
            "Contabilidad y movimientos con más detalle",
            "Análisis más preciso del impacto real de cada decisión",
            "Mejor base para seguimiento, cierres y recomendaciones futuras",
          ],
        },
      ],
    },
    modules: {
      title: "Lo que Arkenstone ya hace hoy",
      intro:
        "Arkenstone ya cubre varias piezas importantes de la gestión financiera personal, desde la lectura del patrimonio hasta la comparación de decisiones dentro de Mi Plan.",
      items: [
        {
          id: "net-worth",
          title: "Patrimonio",
          description:
            "Visualiza cómo se reparte tu patrimonio y cómo evoluciona con el tiempo.",
          image: "/arkenstone-module-net-worth-v2.png",
          imageAlt:
            "Captura de la vista de patrimonio de The Arkenstone con evolución temporal",
        },
        {
          id: "budget",
          title: "Presupuesto",
          description:
            "Ordena ingresos y gastos para entender cuánto margen real tienes cada mes.",
          image: "/arkenstone-module-budget-v2.png",
          imageAlt:
            "Captura del presupuesto anual de The Arkenstone con balance previsto",
        },
        {
          id: "monthly-close",
          title: "Cierre mensual",
          description:
            "Convierte la actividad del mes en una lectura clara de avance, desvíos y prioridades.",
          image: "/arkenstone-module-monthly-close-v2.png",
          imageAlt:
            "Captura de The Arkenstone mostrando un resumen presupuestario mensual",
        },
        {
          id: "accounting",
          title: "Contabilidad",
          description:
            "Añade más precisión y trazabilidad cuando necesitas trabajar con más detalle.",
          image: "/arkenstone-module-accounting-v2.png",
          imageAlt:
            "Captura de The Arkenstone mostrando datos financieros detallados",
        },
        {
          id: "plan",
          title: "Mi Plan",
          description:
            "Conecta tu situación actual con decisiones futuras y compara escenarios antes de incorporarlos.",
          image: "/arkenstone-module-plan-v2.png",
          imageAlt:
            "Captura de Mi Plan comparando el plan vigente con un escenario alternativo",
        },
      ],
    },
    improvements: {
      title: "En qué está mejorando ahora",
      intro:
        "La base ya está en marcha. Ahora el foco está en hacer la experiencia más sencilla y en ampliar la capacidad analítica de la herramienta.",
      groups: [
        {
          title: "Experiencia de usuario",
          description:
            "Mejoras orientadas a que la herramienta sea más fácil de usar y encaje mejor en distintos niveles de implicación.",
          bullets: [
            "Flujo de trabajo para quien no usa contabilidad",
            'Simplificación de la app si no se usa la característica "ownership"',
            "Registro de usuarios y login",
          ],
        },
        {
          title: "Profundidad analítica",
          description:
            "Mejoras orientadas a ampliar la capacidad de análisis y hacer más útil la lectura financiera.",
          bullets: [
            "Informes por categorías de ingresos y gastos",
            "Monitorización de la cartera de inversión",
          ],
        },
      ],
    },
    cta: {
      title: "Únete como beta tester",
      body: "Estoy buscando personas que quieran probar Arkenstone, dar feedback real y ayudar a afinar el producto.",
    },
  },
  en: {
    seoDescription:
      "The Arkenstone helps you evaluate important financial decisions by showing their impact before you commit your cash flow, debt and net worth.",
    backLabel: "← pablesite.es",
    hero: {
      title: "A tool to decide wisely what to do with your money.",
      description:
        "It helps you evaluate purchases, debt and net worth changes by showing their impact before you commit your finances.",
      chips: [
        "Buying a home",
        "Buying a vehicle",
        "Taking on debt",
        "Rebalancing net worth",
      ],
      primaryCta: "Join as a beta tester",
      image: "/arkenstone-patrimonio-neto.png",
      imageAlt: "The Arkenstone screenshot showing net worth evolution",
    },
    decisions: {
      title: "What decisions can you evaluate with Arkenstone",
      intro:
        "Arkenstone helps you study important financial decisions before you turn them into reality.",
      groups: [
        {
          title: "Major purchases",
          description:
            "Evaluate decisions that reshape your net worth and your long-term commitments.",
          examples: ["Vehicle", "Home", "Renovation"],
        },
        {
          title: "Income and work changes",
          description:
            "Compare how your finances would react if your earning capacity changes for months or years.",
          examples: ["Studies", "Reduced hours", "Career break"],
        },
        {
          title: "Debt and financial balance",
          description:
            "Understand how much room you have to borrow, repay or rebalance without squeezing your cash flow.",
          examples: [
            "Repaying debt",
            "Taking on new debt",
            "Rebalancing net worth",
          ],
        },
        {
          title: "Personal or professional projects",
          description:
            "Explore more open-ended decisions with uncertain impact before committing time and money.",
          examples: ["Business", "Generic decision"],
        },
      ],
      image: "/arkenstone-mi-plan-resumen.png",
      imageAlt:
        "My Plan screenshot showing net worth projection and productive capital",
    },
    simulation: {
      title: "What the simulation gives you back",
      intro:
        "Arkenstone turns each decision into a concrete scenario so you can see its impact before adding it to your plan.",
      summaryTitle: "A clear scenario summary",
      summaryDescription:
        "The simulation does not stop at a single number. It shows how the expected path changes, what upfront sacrifice is required and what recurring commitments appear before you accept the decision into your plan.",
      image: "/arkenstone-mi-plan-resumen.png",
      imageAlt:
        "The Arkenstone screenshot showing projected net worth evolution in My Plan",
      metrics: [
        {
          title: "Upfront impact",
          description:
            "How much capital leaves on day one to execute the decision.",
        },
        {
          title: "Monthly impact",
          description:
            "How your monthly cash flow changes with new costs, income or contributions.",
        },
        {
          title: "Asset or debt introduced",
          description:
            "What new net worth you add and what obligations come with it.",
        },
        {
          title: "Comparison against your current plan",
          description:
            "What changes versus the active plan in timing, net worth and productive capital.",
        },
      ],
    },
    dataModes: {
      title: "How Arkenstone changes with the level of detail you want",
      intro:
        "You can use Arkenstone with just enough information to simulate important decisions, or take it much further if you also work with accounting data.",
      items: [
        {
          title: "Basic data",
          description:
            "For simulating important decisions with a sufficient view of net worth, debt, income and expenses.",
          bullets: [
            "Main net worth, debt, income and expense figures",
            "Fast simulations for important decisions",
            "Enough context to compare scenarios without logging your full operation",
          ],
        },
        {
          title: "Advanced data",
          description:
            "For sharper analysis through accounting, more operational detail and a more precise reading of your situation.",
          bullets: [
            "Accounting and movements with more detail",
            "More accurate analysis of each decision's real impact",
            "A better base for monitoring, closes and future recommendations",
          ],
        },
      ],
    },
    modules: {
      title: "What Arkenstone already does today",
      intro:
        "Arkenstone already covers several important parts of personal finance, from reading your net worth to comparing decisions inside My Plan.",
      items: [
        {
          id: "net-worth",
          title: "Net worth",
          description:
            "See how your net worth is distributed and how it evolves over time.",
          image: "/arkenstone-module-net-worth-v2.png",
          imageAlt: "The Arkenstone net worth view with long-term evolution",
        },
        {
          id: "budget",
          title: "Budget",
          description:
            "Structure income and expenses so you understand your real monthly margin.",
          image: "/arkenstone-module-budget-v2.png",
          imageAlt: "The Arkenstone annual budget view with projected balance",
        },
        {
          id: "monthly-close",
          title: "Monthly close",
          description:
            "Turn the month into a clear reading of progress, deviations and priorities.",
          image: "/arkenstone-module-monthly-close-v2.png",
          imageAlt:
            "The Arkenstone screenshot showing a monthly financial summary",
        },
        {
          id: "accounting",
          title: "Accounting",
          description:
            "Add more precision and traceability when you need deeper detail.",
          image: "/arkenstone-module-accounting-v2.png",
          imageAlt: "The Arkenstone screenshot showing detailed financial data",
        },
        {
          id: "plan",
          title: "My Plan",
          description:
            "Connect your current situation to future decisions and compare scenarios before accepting them.",
          image: "/arkenstone-module-plan-v2.png",
          imageAlt:
            "My Plan screenshot comparing the current plan with an alternative scenario",
        },
      ],
    },
    improvements: {
      title: "What is improving right now",
      intro:
        "The foundation is already there. The focus now is making the experience simpler and expanding the analytical depth of the tool.",
      groups: [
        {
          title: "User experience",
          description:
            "Improvements aimed at making the product easier to use and a better fit for different levels of involvement.",
          bullets: [
            "A clearer workflow for people who do not use accounting",
            'Simplifying the app when the "ownership" feature is not used',
            "User registration and login",
          ],
        },
        {
          title: "Analytical depth",
          description:
            "Improvements aimed at extending the analytical capabilities and making the financial reading more useful.",
          bullets: [
            "Income and expense reporting by category",
            "Investment portfolio monitoring",
          ],
        },
      ],
    },
    cta: {
      title: "Join as a beta tester",
      body: "I am looking for people who want to try Arkenstone, give real feedback and help sharpen the product.",
    },
  },
} satisfies Record<Locale, ArkenstoneLandingCopy>;
