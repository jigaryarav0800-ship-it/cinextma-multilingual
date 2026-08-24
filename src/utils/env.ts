import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    PROTECTED_PATHS: z.string().optional().default(""),
    SUPABASE_SERVICE_ROLE_KEY: z.string().min(1).optional().default("build-placeholder"),
  },
  client: {
    NEXT_PUBLIC_TMDB_ACCESS_TOKEN: z.string().min(1).optional().default(""),
    NEXT_PUBLIC_SUPABASE_URL: z.url().min(1).optional().default("https://example.supabase.co"),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: z.string().min(1).optional().default("build-placeholder"),
    NEXT_PUBLIC_CAPTCHA_SITE_KEY: z.string().optional().default(""),
    NEXT_PUBLIC_AVATAR_PROVIDER_URL: z.url().min(1).optional().default("https://api.dicebear.com/9.x/initials/svg?seed="),
  },
  experimental__runtimeEnv: {
    NEXT_PUBLIC_TMDB_ACCESS_TOKEN: process.env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN ?? "",
    NEXT_PUBLIC_SUPABASE_URL:
      process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://example.supabase.co",
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "build-placeholder",
    NEXT_PUBLIC_CAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY ?? "build-placeholder",
    NEXT_PUBLIC_AVATAR_PROVIDER_URL:
      process.env.NEXT_PUBLIC_AVATAR_PROVIDER_URL ?? "https://api.dicebear.com/9.x/initials/svg?seed=",
  },
});
