#!/usr/bin/env node

import { writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, "..");
const SNAPSHOT_PATH = path.join(ROOT_DIR, "src/data/spotify-snapshot.ts");
const PROFILE_URL =
  process.env.SPOTIFY_PROFILE_URL ||
  "https://open.spotify.com/user/pablesite?si=0793724c165f4439";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function fetchJson(url, options) {
  const response = await fetch(url, options);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Spotify API request failed (${response.status}): ${body}`);
  }

  return response.json();
}

async function getAccessToken() {
  const clientId = requireEnv("SPOTIFY_CLIENT_ID");
  const clientSecret = requireEnv("SPOTIFY_CLIENT_SECRET");
  const refreshToken = requireEnv("SPOTIFY_REFRESH_TOKEN");

  const body = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body,
  });

  if (!response.ok) {
    const payload = await response.text();
    throw new Error(
      `Unable to refresh Spotify access token (${response.status}): ${payload}`,
    );
  }

  const payload = await response.json();

  if (!payload.access_token) {
    throw new Error("Spotify token response did not include access_token");
  }

  return payload.access_token;
}

function mapTrack(item, isPlaying) {
  if (!item?.name || !item?.external_urls?.spotify) {
    return null;
  }

  const album = item.album ?? {};
  const image = Array.isArray(album.images)
    ? album.images.find((entry) => entry?.url)?.url || null
    : null;

  return {
    title: item.name,
    artists: Array.isArray(item.artists)
      ? item.artists.map((artist) => artist.name).filter(Boolean)
      : [],
    album: album.name || "",
    albumImageUrl: image,
    trackUrl: item.external_urls.spotify,
    isPlaying,
  };
}

async function getCurrentPlayback(accessToken) {
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (response.status === 204) {
    return null;
  }

  if (!response.ok) {
    const body = await response.text();
    throw new Error(
      `Unable to fetch current playback (${response.status}): ${body}`,
    );
  }

  const payload = await response.json();

  if (!payload?.item || !payload?.is_playing) {
    return null;
  }

  return {
    ...mapTrack(payload.item, true),
    playedAt: new Date().toISOString(),
  };
}

async function getRecentlyPlayed(accessToken) {
  const payload = await fetchJson(
    "https://api.spotify.com/v1/me/player/recently-played?limit=1",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const recentItem = payload?.items?.[0];
  if (!recentItem?.track) {
    return null;
  }

  return {
    ...mapTrack(recentItem.track, false),
    playedAt: recentItem.played_at || null,
  };
}

function serializeSnapshot(snapshot) {
  return `export const spotifySnapshot = ${JSON.stringify(snapshot, null, 2)} as const;\n`;
}

async function main() {
  const accessToken = await getAccessToken();
  const currentTrack = await getCurrentPlayback(accessToken);
  const recentTrack = currentTrack || (await getRecentlyPlayed(accessToken));

  const snapshot = {
    fetchedAt: new Date().toISOString(),
    profileUrl: PROFILE_URL,
    track: recentTrack,
  };

  await writeFile(SNAPSHOT_PATH, serializeSnapshot(snapshot), "utf8");

  const label = currentTrack
    ? `Now playing: ${currentTrack.title}`
    : recentTrack
      ? `Latest track: ${recentTrack.title}`
      : "No listening data returned";

  console.log(`Spotify snapshot updated. ${label}`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
