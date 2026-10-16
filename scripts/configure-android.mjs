import { readFileSync, writeFileSync } from 'node:fs';

// Capacitor's WebChromeClient handles permission requests for HTML media capture
// and navigator.geolocation. Declare the corresponding Android capabilities.
const manifestPath = new URL('../android/app/src/main/AndroidManifest.xml', import.meta.url);
let manifest = readFileSync(manifestPath, 'utf8');
for (const name of ['CAMERA', 'RECORD_AUDIO', 'MODIFY_AUDIO_SETTINGS', 'ACCESS_COARSE_LOCATION', 'ACCESS_FINE_LOCATION']) {
  const permission = `android.permission.${name}`;
  if (!manifest.includes(`android:name="${permission}"`)) manifest = manifest.replace('</manifest>', `    <uses-permission android:name="${permission}" />\n</manifest>`);
}
if (!manifest.includes('android.hardware.camera.any')) manifest = manifest.replace('</manifest>', '    <uses-feature android:name="android.hardware.camera.any" android:required="false" />\n</manifest>');
writeFileSync(manifestPath, manifest);
