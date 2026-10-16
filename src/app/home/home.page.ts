import { Component, HostListener, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { Router, RouterLink } from '@angular/router';
import { AppStateService } from '../core/app-state.service';

@Component({ selector: 'app-home', standalone: true, imports: [IonContent, IonIcon, NgFor, RouterLink], templateUrl: './home.page.html', styleUrl: './home.page.scss' })
export class HomePage {
  readonly state = inject(AppStateService);
  private readonly router = inject(Router);
  readonly modules = [
    { label: 'Matuto', sub: 'Learn', icon: '▣', tone: 'brown' }, { label: 'Sulat', sub: 'Write', icon: '✎', tone: 'green' },
    { label: 'Lakbay', sub: 'Explore', icon: '⌖', tone: 'blue' }, { label: 'Quest', sub: 'Play', icon: '♜', tone: 'amber' },
    { label: 'Kuwento', sub: 'Stories', icon: '◉', tone: 'purple' }, { label: 'Koleksyon', sub: 'Collect', icon: '▤', tone: 'red' }
  ];
  readonly facts = ['The word pamana means heritage—what we receive, care for, and pass on.', 'Oriental Mindoro is home to distinct Mangyan communities with their own languages and traditions.'];
  fact = this.facts[0];
  @HostListener('click', ['$event']) handleModuleClick(event: Event): void {
    const button = (event.target as HTMLElement).closest('button.module');
    if (!button) return;
    const index = Array.from(button.parentElement?.children ?? []).indexOf(button);
    const routes = ['learn', 'writing', 'explore', 'quest', 'stories', 'collection'];
    if (index >= 0 && index < routes.length) this.router.navigateByUrl('/' + routes[index]);
  }
  rotateFact(): void { this.fact = this.facts[this.facts.indexOf(this.fact) === 0 ? 1 : 0]; }
  openModule(index: number): void { const routes = ['learn', 'writing', 'explore', 'quest', 'stories', 'collection']; this.router.navigateByUrl('/' + routes[index]); }
}
