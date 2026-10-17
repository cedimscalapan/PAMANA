import React from 'react';
import { createRoot } from 'react-dom/client';
import { setupIonicReact } from '@ionic/react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { useEffect, useState } from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import App from './App';
import { initializeStorage } from './services/storage';
import { applyPersonalization } from './services/personalization';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import './theme/pamana-personalization.css';
import './global.css';
import './heritage.css';

setupIonicReact();

function StorageGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    initializeStorage().finally(() => { applyPersonalization(); setReady(true); });
  }, []);

  if (!ready) {
    return <div className="app-boot"><strong>SMART PAMANA</strong><span>Preparing your offline library…</span></div>;
  }
  return <>{children}</>;
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IonApp>
      <StorageGate>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/" exact><Redirect to="/home" /></Route>
            <Route path="/" component={App} />
          </IonRouterOutlet>
        </IonReactRouter>
      </StorageGate>
    </IonApp>
  </React.StrictMode>,
);
