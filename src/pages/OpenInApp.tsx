import { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation, useParams, useSearchParams } from "react-router-dom";
import logo from "@/assets/agrocom-logo.png";
import {
  APP_LINKS,
  DEEP_LINK_COPY,
  type DeepLinkKind,
  buildAndroidIntentUrl,
  buildCustomSchemeUrl,
} from "@/content/apps";

type OpenInAppProps = {
  kind: DeepLinkKind;
};

const AppStoreIcon = () => (
  <svg className="h-7 w-7 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
  </svg>
);

const PlayStoreIcon = () => (
  <svg className="h-7 w-7 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M3.18 23.76c.3.17.64.22.99.14l12.86-7.42-2.82-2.82-11.03 10.1zM.5 1.48C.19 1.8 0 2.29 0 2.93v18.14c0 .64.19 1.13.5 1.45l.08.07 10.16-10.16v-.24L.58 1.4l-.08.08zM20.67 10.52l-2.89-1.67-3.17 3.17 3.17 3.17 2.91-1.68c.83-.48.83-1.26-.02-1.99zM4.17.24L17.03 7.66l-2.82 2.82L3.18.38C3.52.3 3.87.07 4.17.24z" />
  </svg>
);

function detectPlatform(): "ios" | "android" | "other" {
  if (typeof navigator === "undefined") return "other";
  const ua = navigator.userAgent || "";
  if (/iPhone|iPad|iPod/i.test(ua)) return "ios";
  if (/Android/i.test(ua)) return "android";
  return "other";
}

const OpenInApp = ({ kind }: OpenInAppProps) => {
  const { pathname, search } = useLocation();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const [attempted, setAttempted] = useState(false);
  const triedRef = useRef(false);
  const copy = DEEP_LINK_COPY[kind];
  const platform = useMemo(() => detectPlatform(), []);

  const httpsUrl = useMemo(() => {
    if (typeof window === "undefined") return pathname + search;
    return `${window.location.origin}${pathname}${search}`;
  }, [pathname, search]);

  const customSchemeUrl = useMemo(
    () => buildCustomSchemeUrl(pathname, search),
    [pathname, search]
  );

  const detailLabel = useMemo(() => {
    if (kind === "profile" && params.userId) return params.userId;
    if (kind === "post" && params.postId) return params.postId;
    if (kind === "live" && params.joinStreamId) return params.joinStreamId;
    if (kind === "community") {
      return searchParams.get("inviteToken") ? "Invite ready" : "Community join";
    }
    return null;
  }, [kind, params, searchParams]);

  const openApp = () => {
    if (platform === "android") {
      window.location.href = buildAndroidIntentUrl(httpsUrl);
      return;
    }
    window.location.href = customSchemeUrl;
  };

  useEffect(() => {
    if (triedRef.current) return;
    triedRef.current = true;

    // Soft attempt: only on mobile, so desktop visitors stay on the CTA page.
    if (platform === "other") {
      setAttempted(true);
      return;
    }

    const timer = window.setTimeout(() => {
      if (platform === "android") {
        window.location.href = buildAndroidIntentUrl(httpsUrl);
      } else {
        window.location.href = customSchemeUrl;
      }
      setAttempted(true);
    }, 350);

    return () => window.clearTimeout(timer);
  }, [platform, httpsUrl, customSchemeUrl]);

  return (
    <main className="relative flex min-h-svh flex-col overflow-hidden bg-pine text-cream">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, #C8F06C 0%, transparent 45%), radial-gradient(circle at 80% 80%, #F4F0E4 0%, transparent 40%)",
        }}
      />

      <header className="relative z-10 flex items-center justify-between px-5 py-6 sm:px-8 lg:px-14">
        <Link to="/" className="flex items-center gap-3" aria-label="Agrocom home">
          <img src={logo} alt="" className="h-9 w-9 rounded-full bg-cream object-contain p-1" />
          <span className="font-display text-xl font-semibold tracking-tight">Agrocom</span>
        </Link>
        <Link to="/#download" className="btn-lime px-5 py-2.5 text-xs">
          Get the app
        </Link>
      </header>

      <div className="relative z-10 mx-auto flex w-full max-w-3xl flex-1 flex-col justify-center px-5 pb-16 pt-8 sm:px-8">
        <p className="eyebrow mb-5 text-lime">{copy.eyebrow}</p>
        <h1 className="display-huge mb-5 text-4xl sm:text-6xl">{copy.title}</h1>
        <p className="mb-4 max-w-xl text-base leading-relaxed text-cream/65 sm:text-lg">
          {copy.body}
        </p>
        {detailLabel && (
          <p className="mb-10 truncate font-mono text-xs text-cream/40 sm:text-sm">{detailLabel}</p>
        )}
        {!detailLabel && <div className="mb-10" />}

        <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <button type="button" onClick={openApp} className="btn-lime px-8 py-4">
            {attempted ? "Try opening again" : "Open in Agrocom"}
          </button>

          <a
            href={APP_LINKS.appStore}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl bg-cream px-6 py-3.5 text-ink transition-transform hover:-translate-y-0.5"
            aria-label="Download on the App Store"
          >
            <AppStoreIcon />
            <span className="text-left">
              <span className="block text-[10px] leading-none opacity-60">Download on the</span>
              <span className="block text-base font-bold leading-tight">App Store</span>
            </span>
          </a>

          <a
            href={APP_LINKS.playStore}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-2xl bg-cream px-6 py-3.5 text-ink transition-transform hover:-translate-y-0.5"
            aria-label="Get it on Google Play"
          >
            <PlayStoreIcon />
            <span className="text-left">
              <span className="block text-[10px] leading-none opacity-60">Get it on</span>
              <span className="block text-base font-bold leading-tight">Google Play</span>
            </span>
          </a>
        </div>

        <p className="mt-10 text-sm text-cream/45">
          Already installed? Use Open in Agrocom. New here?{" "}
          <Link to="/" className="text-lime underline-offset-4 hover:underline">
            Learn more about Agrocom
          </Link>
          .
        </p>
      </div>
    </main>
  );
};

export default OpenInApp;
