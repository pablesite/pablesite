import type { Locale } from "./site";

export type StravaActivity = {
  id: string;
  name: string;
  sportType: string;
  startedAt: string;
  distanceMeters: number;
  movingTimeSeconds: number;
  elevationGainMeters: number;
  activityUrl: string;
};

export type StravaSnapshot = {
  provider: "strava";
  fetchedAt: string;
  profileUrl: string;
  latestActivity: StravaActivity | null;
  recent: {
    periodDays: number;
    activityCount: number;
    distanceMeters: number;
    movingTimeSeconds: number;
    elevationGainMeters: number;
  };
};

export type StravaCardCopy = {
  label: string;
  title: string;
  summary: string;
  detail: string;
  href: string;
  hrefLabel: string;
  status: string | null;
};

const PROFILE_URL = "https://www.strava.com/athletes/16376516";
const FALLBACK_COPY: Record<Locale, Omit<StravaCardCopy, "href">> = {
  es: {
    label: "Strava",
    title: "Rutas, rodillo y volver a coger ritmo",
    summary: "Salidas cuando puedo y métricas para no engañarme.",
    detail: "Actividad real desde mi perfil público de Strava.",
    hrefLabel: "Ver perfil",
    status: null,
  },
  en: {
    label: "Strava",
    title: "Rides, indoor sessions and getting back in shape",
    summary: "Actual rides when life allows it, plus honest metrics.",
    detail: "Real activity from my public Strava profile.",
    hrefLabel: "View profile",
    status: null,
  },
};

const SPORT_LABELS: Record<string, Record<Locale, string>> = {
  Ride: { es: "Ciclismo", en: "Ride" },
  VirtualRide: { es: "Rodillo", en: "Indoor ride" },
  MountainBikeRide: { es: "Mountain bike", en: "Mountain bike ride" },
  GravelRide: { es: "Gravel", en: "Gravel ride" },
  Run: { es: "Carrera", en: "Run" },
  Walk: { es: "Paseo", en: "Walk" },
  Hike: { es: "Senderismo", en: "Hike" },
  WeightTraining: { es: "Fuerza", en: "Weight training" },
  Workout: { es: "Entrenamiento", en: "Workout" },
};

function isHttpsUrl(value: unknown) {
  if (typeof value !== "string") {
    return false;
  }

  try {
    return new URL(value).protocol === "https:";
  } catch {
    return false;
  }
}

function isFiniteNonNegative(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

function formatDistance(locale: Locale, meters: number) {
  const kilometers = meters / 1000;
  const digits = kilometers >= 100 ? 0 : 1;

  return `${new Intl.NumberFormat(locale, {
    maximumFractionDigits: digits,
    minimumFractionDigits: digits,
  }).format(kilometers)} km`;
}

function formatDuration(locale: Locale, seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.round((seconds % 3600) / 60);

  if (hours === 0) {
    return `${minutes} min`;
  }

  return locale === "es"
    ? `${hours} h ${minutes} min`
    : `${hours}h ${minutes}m`;
}

function formatElevation(locale: Locale, meters: number) {
  return `${new Intl.NumberFormat(locale, {
    maximumFractionDigits: 0,
  }).format(meters)} m+`;
}

function formatRelativeDate(locale: Locale, isoDate: string) {
  const days = Math.round(
    (new Date(isoDate).getTime() - Date.now()) / (24 * 60 * 60 * 1000),
  );
  const relative = new Intl.RelativeTimeFormat(locale, {
    numeric: "auto",
  }).format(days, "day");

  return locale === "es" ? `Actividad ${relative}` : `Activity ${relative}`;
}

function sportLabel(locale: Locale, sportType: string) {
  return SPORT_LABELS[sportType]?.[locale] || sportType;
}

export function isStravaSnapshot(value: unknown): value is StravaSnapshot {
  if (!value || typeof value !== "object") {
    return false;
  }

  const snapshot = value as Record<string, unknown>;

  if (
    snapshot.provider !== "strava" ||
    typeof snapshot.fetchedAt !== "string" ||
    !isHttpsUrl(snapshot.profileUrl) ||
    !snapshot.recent ||
    typeof snapshot.recent !== "object"
  ) {
    return false;
  }

  const recent = snapshot.recent as Record<string, unknown>;
  const validRecent =
    isFiniteNonNegative(recent.periodDays) &&
    isFiniteNonNegative(recent.activityCount) &&
    isFiniteNonNegative(recent.distanceMeters) &&
    isFiniteNonNegative(recent.movingTimeSeconds) &&
    isFiniteNonNegative(recent.elevationGainMeters);

  if (!validRecent || snapshot.latestActivity === null) {
    return validRecent && snapshot.latestActivity === null;
  }

  if (!snapshot.latestActivity || typeof snapshot.latestActivity !== "object") {
    return false;
  }

  const activity = snapshot.latestActivity as Record<string, unknown>;

  return (
    typeof activity.id === "string" &&
    typeof activity.name === "string" &&
    typeof activity.sportType === "string" &&
    typeof activity.startedAt === "string" &&
    isFiniteNonNegative(activity.distanceMeters) &&
    isFiniteNonNegative(activity.movingTimeSeconds) &&
    isFiniteNonNegative(activity.elevationGainMeters) &&
    isHttpsUrl(activity.activityUrl)
  );
}

export function getStravaCard(
  locale: Locale,
  snapshot?: StravaSnapshot,
): StravaCardCopy {
  const fallback = FALLBACK_COPY[locale];

  if (!snapshot?.latestActivity) {
    return {
      ...fallback,
      href: snapshot?.profileUrl || PROFILE_URL,
    };
  }

  const activity = snapshot.latestActivity;
  const activitySummary = [
    sportLabel(locale, activity.sportType),
    formatDistance(locale, activity.distanceMeters),
    formatDuration(locale, activity.movingTimeSeconds),
  ].join(" · ");
  const periodSummary = [
    locale === "es"
      ? `${snapshot.recent.activityCount} actividades`
      : `${snapshot.recent.activityCount} activities`,
    formatDistance(locale, snapshot.recent.distanceMeters),
    formatElevation(locale, snapshot.recent.elevationGainMeters),
  ].join(" · ");

  return {
    label: fallback.label,
    title: activity.name,
    summary: activitySummary,
    detail:
      locale === "es"
        ? `Últimos ${snapshot.recent.periodDays} días: ${periodSummary}.`
        : `Last ${snapshot.recent.periodDays} days: ${periodSummary}.`,
    href: activity.activityUrl,
    hrefLabel: locale === "es" ? "Abrir en Strava" : "Open in Strava",
    status: formatRelativeDate(locale, activity.startedAt),
  };
}
