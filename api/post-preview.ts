import type { VercelRequest, VercelResponse } from "@vercel/node";

const SITE_ORIGIN = "https://www.agrocom.cloud";
const FALLBACK_IMAGE = `${SITE_ORIGIN}/web-app-manifest-512x512.png`;
const DEFAULT_DESCRIPTION =
  "See this post and join the Agrocom farming community.";

type PostPreview = {
  description?: unknown;
  images?: unknown;
  media?: unknown;
  farmer?: { farmerName?: unknown };
};

function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (char) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}

function text(value: unknown): string {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}

function getImage(post: PostPreview): string {
  const media = Array.isArray(post.media) ? post.media : [];
  const imageMedia = media.find(
    (item) =>
      item &&
      typeof item === "object" &&
      (item as { type?: unknown }).type === "image" &&
      typeof (item as { url?: unknown }).url === "string",
  ) as { url: string } | undefined;
  const images = Array.isArray(post.images) ? post.images : [];
  const raw = imageMedia?.url ?? images.find((item) => typeof item === "string");
  if (typeof raw !== "string") return FALLBACK_IMAGE;
  try {
    const url = new URL(raw, SITE_ORIGIN);
    return url.protocol === "https:" ? url.toString() : FALLBACK_IMAGE;
  } catch {
    return FALLBACK_IMAGE;
  }
}

function previewHtml(postId: string, post?: PostPreview): string {
  const url = `${SITE_ORIGIN}/p/${encodeURIComponent(postId)}`;
  const author = text(post?.farmer?.farmerName) || "Agrocom user";
  const caption = text(post?.description).slice(0, 400) || DEFAULT_DESCRIPTION;
  const title = `${author} on Agrocom`;
  const image = post ? getImage(post) : FALLBACK_IMAGE;
  const values: Record<string, string> = {
    title,
    description: caption,
    canonical: url,
    image,
  };

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${escapeHtml(values.title)}</title>
    <meta name="description" content="${escapeHtml(values.description)}" />
    <link rel="canonical" href="${escapeHtml(values.canonical)}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Agrocom" />
    <meta property="og:title" content="${escapeHtml(values.title)}" />
    <meta property="og:description" content="${escapeHtml(values.description)}" />
    <meta property="og:url" content="${escapeHtml(values.canonical)}" />
    <meta property="og:image" content="${escapeHtml(values.image)}" />
    <meta property="og:image:alt" content="${escapeHtml(values.title)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(values.title)}" />
    <meta name="twitter:description" content="${escapeHtml(values.description)}" />
    <meta name="twitter:image" content="${escapeHtml(values.image)}" />
  </head>
  <body><p><a href="${escapeHtml(values.canonical)}">Open this post in Agrocom</a></p></body>
</html>`;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).send("Method not allowed");
  }

  const postId = typeof req.query.postId === "string" ? req.query.postId.trim() : "";
  if (!postId || postId.length > 200) {
    return res.status(400).send("Invalid post id");
  }

  const apiBase = (
    process.env.AGROCOM_API_BASE_URL || "https://apidev.agrocom.cloud/api/v1"
  ).replace(/\/+$/, "");
  let post: PostPreview | undefined;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 5000);

  try {
    const response = await fetch(`${apiBase}/posts/${encodeURIComponent(postId)}`, {
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (response.ok) {
      const payload = (await response.json()) as {
        data?: PostPreview | { post?: PostPreview };
      };
      const data = payload.data;
      if (data && typeof data === "object") {
        if ("post" in data) post = data.post;
        else post = data as PostPreview;
      }
    }
  } catch (error) {
    console.error("Post preview lookup failed", error);
  } finally {
    clearTimeout(timeout);
  }

  res.setHeader("Content-Type", "text/html; charset=utf-8");
  res.setHeader("Cache-Control", "public, s-maxage=300, stale-while-revalidate=3600");
  return res.status(200).send(previewHtml(postId, post));
}