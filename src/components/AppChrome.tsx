import { IonButton, IonIcon } from '@ionic/react';
import {
  arrowBackOutline,
  bookOutline,
  homeOutline,
  mapOutline,
  menuOutline,
  pencilOutline,
  trophyOutline,
} from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import type { ReactNode } from 'react';
import kaPamanaIcon from '../assets/reference/ka-pamana-icon.png';

type Icon = typeof homeOutline;

export type ModuleTone = 'green' | 'blue' | 'amber' | 'purple' | 'red' | 'brown';
export type ActiveTab = 'home' | 'learn' | 'writing' | 'explore' | 'quest';

type ModuleHeaderProps = {
  title: string;
  subtitle: string;
  tone?: ModuleTone;
  icon: Icon;
  onBack?: () => void;
};

export function ModuleHeader({ title, subtitle, tone = 'green', icon, onBack }: ModuleHeaderProps) {
  const history = useHistory();
  return (
    <header className={`module-hero module-hero-${tone}`}>
      <div className="module-hero-topline">
        <IonButton
          fill="clear"
          className="module-hero-back"
          onClick={onBack ?? (() => history.push('/home'))}
          aria-label="Back to home"
        >
          <IonIcon icon={arrowBackOutline} />
        </IonButton>
        <span>SMART PAMANA</span>
        <button
          type="button"
          className="module-hero-avatar"
          style={{ backgroundImage: `url(${kaPamanaIcon})` }}
          onClick={() => history.push('/settings')}
          aria-label="Open settings"
        />
      </div>
      <div className="module-hero-title-row">
        <div>
          <p className="module-hero-kicker">KULTURA NG MINDORO</p>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <div className="module-hero-icon"><IonIcon icon={icon} /></div>
      </div>
    </header>
  );
}

type AppBottomNavProps = {
  active: ActiveTab;
};

const defaultNavItems: Array<{ id: ActiveTab; label: string; path: string; icon: Icon }> = [
  { id: 'home', label: 'Home', path: '/home', icon: homeOutline },
  { id: 'learn', label: 'Matuto', path: '/learn', icon: bookOutline },
  { id: 'explore', label: 'Lakbay', path: '/explore', icon: mapOutline },
  { id: 'quest', label: 'Quest', path: '/quest', icon: trophyOutline },
  { id: 'home', label: 'Higit Pa', path: '/settings', icon: menuOutline },
];

const writingNavItems: Array<{ id: ActiveTab; label: string; path: string; icon: Icon }> = [
  { id: 'home', label: 'Home', path: '/home', icon: homeOutline },
  { id: 'learn', label: 'Matuto', path: '/learn', icon: bookOutline },
  { id: 'writing', label: 'Sulat', path: '/writing', icon: pencilOutline },
  { id: 'explore', label: 'Lakbay', path: '/explore', icon: mapOutline },
  { id: 'quest', label: 'Quest', path: '/quest', icon: trophyOutline },
];

export function AppBottomNav({ active }: AppBottomNavProps) {
  const history = useHistory();
  const navItems = active === 'writing' ? writingNavItems : defaultNavItems;
  return (
    <nav className="app-bottom-nav" aria-label="Main navigation">
      {navItems.map((item) => (
        <IonButton
          key={item.id}
          fill="clear"
          className={active === item.id ? 'active' : ''}
          onClick={() => history.push(item.path)}
        >
          <IonIcon icon={item.icon} />
          <span>{item.label}</span>
        </IonButton>
      ))}
    </nav>
  );
}

export function PageFrame({ children, active }: { children: ReactNode; active: ActiveTab }) {
  return <main className="page-frame">{children}<AppBottomNav active={active} /></main>;
}
