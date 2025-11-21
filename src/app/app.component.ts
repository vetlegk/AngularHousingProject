import { Component, inject } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <main>
      <header *ngIf="isLoggedIn$ | async">
          <img class="logo" src="assets/logo.svg" alt="logo" />
          <p *ngIf="authToken$ | async" class="alert-text">Logged in as: {{authToken$}}</p>
          <p *ngIf="showAlert">{{alertText}}</p>
          <button type="button" class="primary" (click)="logout()">Logout</button>
      </header>

      <section>
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterModule],
})

export class AppComponent {
  authService: AuthService = inject(AuthService);
  router = inject(Router);

  showAlert = false;
  alertText = '';

  isLoggedIn$ = this.authService.isLoggedIn$
  authToken$ = this.authService.authToken$

  constructor() {}

  logout() {
    if (this.authService.logout()) {
      this.router.navigate([''])
    };
  }

  setAlert(message: string) {
    if (message != '') {
      this.alertText = message;
      this.showAlert = true;
      return;
    };

    this.alertText = message;
    this.showAlert = false;
  }
}
