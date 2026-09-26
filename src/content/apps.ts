/** Store + deep-link constants shared by download CTAs and open-in-app pages. */
export const APP_PACKAGE = "com.mybizpushorg.agrocom";
export const APP_SCHEME = "agrocom";

export const APP_LINKS = {
  playStore: `https://play.google.com/store/apps/details?id=${APP_PACKAGE}`,
  /** App Store Connect ID from agrocom_mobile/eas.json (`ascAppId`). */
  appStore: "https://apps.apple.com/app/id6779301070",
} as const;

export type DeepLinkKind = "profile" | "post" | "live" | "community" | "call" | "meeting" | "referral";

export const DEEP_LINK_COPY: Record<
  DeepLinkKind,
  { eyebrow: string; title: string; body: string }
> = {
  profile: {
    eyebrow: "Shared profile",
    title: "Open this profile in Agrocom",
    body: "Profiles live in the Agrocom app. Open it if you already have Agrocom, or download it to continue.",
  },
  post: {
    eyebrow: "Shared post",
    title: "Open this post in Agrocom",
    body: "Posts live in the Agrocom app. Open it if you already have Agrocom, or download it to continue.",
  },
  live: {
    eyebrow: "Live stream",
    title: "Join this stream in Agrocom",
    body: "Live streams open in the Agrocom app. Open it if you already have Agrocom, or download it to continue.",
  },
  community: {
    eyebrow: "Community invite",
    title: "Join this community in Agrocom",
    body: "Community invites open in the Agrocom app. Open it if you already have Agrocom, or download it to continue.",
  },
  call: {
    eyebrow: "Call invitation",
    title: "Join this call in Agrocom",
    body: "Calls open in the Agrocom app. Open it if you already have Agrocom, or download it to continue.",
  },
  meeting: {
    eyebrow: "Meeting invitation",
    title: "Join this meeting in Agrocom",
    body: "Meetings open in the Agrocom app. Open it if you already have Agrocom, or download it to continue.",
  },
  referral: {
    eyebrow: "Agrocom invitation",
    title: "Join Agrocom",
    body: "Open Agrocom to use this invitation, or download the app to get started.",
  },
};

/** Build the custom-scheme URL that mirrors the https path (e.g. agrocom://u/abc). */
export function buildCustomSchemeUrl(pathname: string, search = ""): string {
  const path = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  return `${APP_SCHEME}://${path}${search}`;
}

/** Android intent URL that falls back to Play Store when the app is missing. */
export function buildAndroidIntentUrl(httpsUrl: string): string {
  const withoutScheme = httpsUrl.replace(/^https?:\/\//, "");
  return `intent://${withoutScheme}#Intent;scheme=https;package=${APP_PACKAGE};S.browser_fallback_url=${encodeURIComponent(
    APP_LINKS.playStore
  )};end`;
}
