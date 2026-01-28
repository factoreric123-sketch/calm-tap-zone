import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.b53d4cbc85124bab8599d2f2943412a7',
  appName: 'Brick',
  webDir: 'dist',
  server: {
    url: 'https://b53d4cbc-8512-4bab-8599-d2f2943412a7.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  plugins: {
    // NFC plugin configuration
  }
};

export default config;
