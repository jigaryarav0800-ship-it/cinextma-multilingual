import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.cinextma.multilingual",
  appName: "CineTMA",
  webDir: "out",
  server: process.env.CAP_SERVER_URL
    ? {
        url: process.env.CAP_SERVER_URL,
        cleartext: false,
      }
    : undefined,
  android: {
    allowMixedContent: false,
  },
};

export default config;
