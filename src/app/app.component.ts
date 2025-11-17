import { Component, inject } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  selector: 'app-root',
  template: `
    <main>
      <header>
          <img class="logo" src="assets/logo.svg" alt="logo" />
          <p *ngIf="isLoggedIn">Logged in as: {{userEmail}}</p>
      </header>

      <section class="content">
        <router-outlet></router-outlet>
      </section>
    </main>
  `,
  styleUrls: ['./app.component.css'],
  imports: [CommonModule, RouterModule],
})

export class AppComponent {
  authService: AuthService = inject(AuthService);
  title = 'homes';

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  get userEmail(): string {
    return this.authService.getUserEmail();
  }
}
