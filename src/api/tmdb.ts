import { env } from "@/utils/env";
import { TMDB } from "tmdb-ts";

const token = env.NEXT_PUBLIC_TMDB_ACCESS_TOKEN ?? "";

// The client can be constructed during a static build without a secret.
// Requests still require NEXT_PUBLIC_TMDB_ACCESS_TOKEN at runtime.
export const tmdb = new TMDB(token);
