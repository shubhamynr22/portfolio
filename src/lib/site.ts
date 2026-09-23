/**
 * Single source of truth for the deployed origin.
 * Set NEXT_PUBLIC_SITE_URL in Vercel once a custom domain is attached.
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  "https://portfolio-kohl-iota-hhgp6wh6p9.vercel.app";
