import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import fs from "fs";

/**
 * Rewrites TEAMID in AASA at build time when APPLE_TEAM_ID (or VITE_APPLE_TEAM_ID) is set.
 * Without it, Universal Links stay broken on iOS — set the env var in Vercel before deploy.
 */
function appleTeamIdPlugin(): Plugin {
  return {
    name: "apple-team-id-aasa",
    closeBundle() {
      const teamId = process.env.APPLE_TEAM_ID || process.env.VITE_APPLE_TEAM_ID;
      if (!teamId || teamId === "TEAMID") return;

      const outPath = path.resolve(__dirname, "dist/.well-known/apple-app-site-association");
      if (!fs.existsSync(outPath)) return;

      const raw = fs.readFileSync(outPath, "utf8");
      fs.writeFileSync(outPath, raw.replaceAll("TEAMID", teamId));
    },
  };
}

export default defineConfig({
  plugins: [react(), appleTeamIdPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
