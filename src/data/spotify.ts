import type { Locale } from "./site";
import { spotifySnapshot } from "./spotify-snapshot";

export type SpotifyTrack = {
  title: string;
  artists: readonly string[];
  album: string;
  albumImageUrl: string | null;
  trackUrl: string;
  isPlaying: boolean;
  playedAt: string | null;
};

export type SpotifySnapshot = {
  fetchedAt: string | null;
  profileUrl: string;
  track: SpotifyTrack | null;
};

export type SpotifyCardCopy = {
  label: string;
  title: string;
  summary: string;
  detail: string;
  href: string;
  hrefLabel: string;
  status: string | null;
  albumImageUrl: string | null;
};

const FALLBACK_COPY: Record<Locale, Omit<SpotifyCardCopy, "href">> = {
  es: {
    label: "Spotify",
    title: "Lo que estoy escuchando ultimamente",
    summary: "Metal, rock y lo que se cuele entre medias.",
    detail: "Perfil abierto, sin widgets fake ni ahora-suena inventados.",
    hrefLabel: "Ver perfil",
    status: null,
    albumImageUrl: null,
  },
  en: {
    label: "Spotify",
    title: "What I have been listening to lately",
    summary: "Mostly metal and rock, with room for detours.",
    detail: "An open profile, without fake live widgets.",
    hrefLabel: "View profile",
    status: null,
    albumImageUrl: null,
  },
};

function formatRelativeTime(locale: Locale, isoDate: string) {
  const target = new Date(isoDate).getTime();
  const now = Date.now();
  const diffMs = target - now;
  const absMs = Math.abs(diffMs);

  const ranges: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ["minute", 60 * 1000],
    ["hour", 60 * 60 * 1000],
    ["day", 24 * 60 * 60 * 1000],
  ];

  let unit: Intl.RelativeTimeFormatUnit = "day";
  let divisor = 24 * 60 * 60 * 1000;

  if (absMs < ranges[1][1]) {
    unit = "minute";
    divisor = ranges[0][1];
  } else if (absMs < ranges[2][1]) {
    unit = "hour";
    divisor = ranges[1][1];
  }

  const value = Math.round(diffMs / divisor);

  return new Intl.RelativeTimeFormat(locale, { numeric: "auto" }).format(
    value,
    unit,
  );
}

function buildSummary(track: SpotifyTrack) {
  return [track.artists.join(", "), track.album].filter(Boolean).join(" · ");
}

function getStatusCopy(
  locale: Locale,
  snapshot: SpotifySnapshot,
  track: SpotifyTrack,
) {
  if (track.isPlaying) {
    return locale === "es" ? "Ahora suena" : "Now playing";
  }

  if (track.playedAt) {
    const relative = formatRelativeTime(locale, track.playedAt);
    return locale === "es"
      ? `Ultima escucha ${relative}`
      : `Last played ${relative}`;
  }

  if (snapshot.fetchedAt) {
    const relative = formatRelativeTime(locale, snapshot.fetchedAt);
    return locale === "es" ? `Actualizado ${relative}` : `Updated ${relative}`;
  }

  return null;
}

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

export function isSpotifySnapshot(value: unknown): value is SpotifySnapshot {
  if (!value || typeof value !== "object") {
    return false;
  }

  const snapshot = value as Record<string, unknown>;

  if (
    !isHttpsUrl(snapshot.profileUrl) ||
    (snapshot.fetchedAt !== null && typeof snapshot.fetchedAt !== "string")
  ) {
    return false;
  }

  if (snapshot.track === null) {
    return true;
  }

  if (!snapshot.track || typeof snapshot.track !== "object") {
    return false;
  }

  const track = snapshot.track as Record<string, unknown>;

  return (
    typeof track.title === "string" &&
    Array.isArray(track.artists) &&
    track.artists.every((artist) => typeof artist === "string") &&
    typeof track.album === "string" &&
    (track.albumImageUrl === null || isHttpsUrl(track.albumImageUrl)) &&
    isHttpsUrl(track.trackUrl) &&
    typeof track.isPlaying === "boolean" &&
    (track.playedAt === null || typeof track.playedAt === "string")
  );
}

export function getSpotifyCard(
  locale: Locale,
  snapshot: SpotifySnapshot = spotifySnapshot as SpotifySnapshot,
): SpotifyCardCopy {
  const fallback = FALLBACK_COPY[locale];

  if (!snapshot.track) {
    return {
      ...fallback,
      href: snapshot.profileUrl,
    };
  }

  const track = snapshot.track;

  return {
    label: fallback.label,
    title: track.title,
    summary: buildSummary(track),
    detail: track.isPlaying
      ? locale === "es"
        ? "Escuchando ahora mismo en Spotify."
        : "Listening right now on Spotify."
      : locale === "es"
        ? "Ultima escucha real capturada desde mi cuenta."
        : "Latest real listening snapshot from my account.",
    href: track.trackUrl || snapshot.profileUrl,
    hrefLabel: locale === "es" ? "Abrir en Spotify" : "Open in Spotify",
    status: getStatusCopy(locale, snapshot, track),
    albumImageUrl: track.albumImageUrl,
  };
}
