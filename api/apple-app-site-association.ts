import type { VercelRequest, VercelResponse } from "@vercel/node";

/**
 * Serves Apple App Site Association with the real Team ID from env.
 * Set APPLE_TEAM_ID in Vercel → Project → Settings → Environment Variables
 * (Production + Preview). Redeploy after setting it.
 */
export default function handler(_req: VercelRequest, res: VercelResponse) {
  const teamId = (
    process.env.APPLE_TEAM_ID ||
    process.env.VITE_APPLE_TEAM_ID ||
    "P244MH3Q2V"
  ).trim();

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
            "/call/*",
            "/meet/*",
            "/join",
            "/communities/join",
            "/communities/join/*",
          ],
        },
      ],
    },
  };

  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "public, max-age=300");
  if (!teamId || teamId === "TEAMID") {
    res.setHeader("X-Agrocom-Aasa-Warning", "APPLE_TEAM_ID not set");
  }
  res.status(200).send(JSON.stringify(body, null, 2));
}
