import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.koodoreader.app",
  appName: "Koodo Reader",
  webDir: "build",
  bundledWebRuntime: false,
  android: {
    allowMixedContent: true,
  },
};

export default config;
