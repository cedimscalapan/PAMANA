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
import {hasCompletedOnboarding} from './services/onboarding';
import BootSplash from './components/adventure/BootSplash';
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
import './theme/pamana-refresh.css';
import './theme/pamana-soft-light.css';
import './theme/pamana-journey.css';
import './theme/pamana-discoveries.css';
import './theme/pamana-adventure-design.css';
import './theme/pamana-welcome.css';

setupIonicReact();

function StorageGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [failed,setFailed]=useState(false);

  useEffect(() => {
    let mounted=true;
    initializeStorage().then(()=>{if(mounted){applyPersonalization();setReady(true);}})
      .catch(()=>{if(mounted)setFailed(true);});
    return ()=>{mounted=false;};
  }, []);

  if (!ready) {
    return <BootSplash failed={failed} onRetry={()=>window.location.reload()}/>;
  }
  return <>{children}</>;
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <IonApp>
      <StorageGate>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/" exact><Redirect to={hasCompletedOnboarding()?"/home":"/welcome"} /></Route>
            <Route path="/" component={App} />
          </IonRouterOutlet>
        </IonReactRouter>
      </StorageGate>
    </IonApp>
  </React.StrictMode>,
);
