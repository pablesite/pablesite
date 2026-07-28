#!/usr/bin/env node

import process from "node:process";

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

async function main() {
  const clientId = requireEnv("SPOTIFY_CLIENT_ID");
  const clientSecret = requireEnv("SPOTIFY_CLIENT_SECRET");
  const code = requireEnv("SPOTIFY_AUTH_CODE");
  const redirectUri =
    process.env.SPOTIFY_REDIRECT_URI || "http://127.0.0.1:3000/callback";

  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code,
    redirect_uri: redirectUri,
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
    const text = await response.text();
    throw new Error(
      `Unable to exchange authorization code (${response.status}): ${text}`,
    );
  }

  const payload = await response.json();

  console.log("Spotify token exchange succeeded.\n");
  console.log(`SPOTIFY_REFRESH_TOKEN=${payload.refresh_token || ""}`);
  console.log(`SPOTIFY_ACCESS_TOKEN=${payload.access_token || ""}`);
  console.log(`expires_in=${payload.expires_in || ""}`);
  console.log("\nKeep the refresh token. The access token is temporary.");
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
