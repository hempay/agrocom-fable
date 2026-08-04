import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Serves Apple App Site Association with the real Team ID from env.
 * Set APPLE_TEAM_ID in Vercel (Project → Settings → Environment Variables).
 *
 * Static public/.well-known/apple-app-site-association keeps TEAMID as a
 * fallback for local/preview when the env var is missing.
 */
export default function handler(_req: VercelRequest, res: VercelResponse) {
  const teamId = (process.env.APPLE_TEAM_ID || process.env.VITE_APPLE_TEAM_ID || "TEAMID").trim();

  const body = {
    applinks: {
      apps: [],
      details: [
        {
          appID: `${teamId}.com.mybizpushorg.agrocom`,
          paths: [
            "/u/*",
            "/p/*",
            "/live/*",
            "/stream/*",
            "/communities/join",
            "/communities/join/*",
          ],
        },
      ],
    },
  };

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "public, max-age=300");
  // Helpful when debugging wrong Team ID in production.
  if (!teamId || teamId === "TEAMID") {
    res.setHeader("X-Agrocom-Aasa-Warning", "APPLE_TEAM_ID not set");
  }
  res.status(200).send(JSON.stringify(body, null, 2));
}
