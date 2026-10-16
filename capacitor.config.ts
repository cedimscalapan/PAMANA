import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.smartpamana.app',
  appName: 'SMART PAMANA',
  webDir: 'dist/smart-pamana/browser',
  bundledWebRuntime: false,
  android: {
    backgroundColor: '#FFF9ED'
  }
};

export default config;
