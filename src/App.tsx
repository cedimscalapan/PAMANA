import { IonRouterOutlet } from '@ionic/react';
import { Redirect, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LearnPage from './pages/LearnPage';
import WritingPage from './pages/WritingPage';
import ExplorePage from './pages/ExplorePage';
import QuestPage from './pages/QuestPage';
import StoriesPage from './pages/StoriesPage';
import CollectionPage from './pages/CollectionPage';
import SettingsPage from './pages/SettingsPage';
import OnboardingPage from './pages/OnboardingPage';
import WelcomePage from './pages/WelcomePage';
import ProfilePage from './pages/ProfilePage';
import MorePage from './pages/MorePage';
import MyPamanaPage from './pages/MyPamanaPage';
import JourneyPage from './pages/JourneyPage';
import JourneyActivityPage from './pages/JourneyActivityPage';

export default function App() {
  return <IonRouterOutlet>
    <Route exact path="/home" component={HomePage} />
    <Route exact path="/journey" component={JourneyPage} />
    <Route exact path="/journey/activity" component={JourneyActivityPage} />
    <Route exact path="/learn" component={LearnPage} />
    <Route exact path="/writing" component={WritingPage} />
    <Route exact path="/explore" component={ExplorePage} />
    <Route exact path="/quest" component={QuestPage} />
    <Route exact path="/stories" component={StoriesPage} />
    <Route exact path="/collection" component={CollectionPage} />
    <Route exact path="/settings" component={SettingsPage} />
    <Route exact path="/my-pamana" component={MyPamanaPage} />
    <Route exact path="/more" component={MorePage} />
    <Route exact path="/profile" component={ProfilePage} />
    <Route exact path="/onboarding" component={OnboardingPage} />
    <Route exact path="/welcome" component={WelcomePage} />
    <Redirect to="/home" />
  </IonRouterOutlet>;
}
