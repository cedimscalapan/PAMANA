import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AppStateService {
  readonly onboardingComplete = signal(localStorage.getItem('pamana.onboardingComplete') === 'true');
  readonly progress = signal({ lessons: 0, minutes: 0, streak: 1 });

  completeOnboarding(): void { localStorage.setItem('pamana.onboardingComplete', 'true'); this.onboardingComplete.set(true); }
}
