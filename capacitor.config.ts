import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.smartpamana.app',
  appName: 'SMART PAMANA',
  webDir: 'dist',
  bundledWebRuntime: false,
  android: {
    backgroundColor: '#FFF9EF'
  }
};

export default config;
