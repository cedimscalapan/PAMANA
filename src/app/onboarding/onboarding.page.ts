import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { AppStateService } from '../core/app-state.service';

@Component({ selector: 'app-onboarding', standalone: true, imports: [IonContent, IonButton, IonIcon], templateUrl: './onboarding.page.html', styleUrl: './onboarding.page.scss' })
export class OnboardingPage {
  private readonly state = inject(AppStateService); private readonly router = inject(Router);
  step = 0;
  readonly slides = [
    { title: 'Discover Oriental Mindoro', text: 'Meet Pamana and explore the people, places, and living traditions of Mindoro.', icon: '✦' },
    { title: 'Learn our heritage', text: 'Build your knowledge through local lessons, writing practice, and stories.', icon: '⌁' },
    { title: 'Explore and play', text: 'Visit heritage places, answer quests, and earn badges as you learn.', icon: '★' },
    { title: 'Learn anywhere, anytime', text: 'Everything you need is stored on your device and works offline.', icon: '◌' }
  ];
  next(): void { if (this.step < this.slides.length - 1) this.step++; else this.start(); }
  skip(): void { this.start(); }
  start(): void { this.state.completeOnboarding(); this.router.navigateByUrl('/home'); }
}
