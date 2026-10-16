import React from 'react';
import { createRoot } from 'react-dom/client';
import { setupIonicReact } from '@ionic/react';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import App from './App';
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import './theme/variables.css';
import './global.css';

setupIonicReact();
createRoot(document.getElementById('root')!).render(<React.StrictMode><IonApp><IonReactRouter><IonRouterOutlet><Route path="/" exact><Redirect to="/home" /></Route><Route path="/" component={App} /></IonRouterOutlet></IonReactRouter></IonApp></React.StrictMode>);
