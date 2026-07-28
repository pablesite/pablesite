#!/usr/bin/env node

import crypto from "node:crypto";
import process from "node:process";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const redirectUri =
  process.env.SPOTIFY_REDIRECT_URI || "http://127.0.0.1:3000/callback";
const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
].join(" ");

if (!clientId) {
  console.error("Missing required environment variable: SPOTIFY_CLIENT_ID");
  process.exit(1);
}

const state = crypto.randomBytes(12).toString("hex");
const url = new URL("https://accounts.spotify.com/authorize");

url.searchParams.set("response_type", "code");
url.searchParams.set("client_id", clientId);
url.searchParams.set("scope", scopes);
url.searchParams.set("redirect_uri", redirectUri);
url.searchParams.set("state", state);

console.log("Open this URL in your browser and authorize the app:\n");
console.log(url.toString());
console.log("\nExpected redirect URI:");
console.log(redirectUri);
console.log("\nSave this state if you want to verify it on return:");
console.log(state);
