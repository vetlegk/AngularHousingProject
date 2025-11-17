import { Component, inject } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule, Router } from '@angular/router';
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
          <button type="button" class="primary" (click)="logout()" *ngIf="isLoggedIn">Logout</button>
          <button type="button" class="primary" (click)="login()" *ngIf="!isLoggedIn">Login</button>
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
  router = inject(Router);
  title = 'homes';

  get isLoggedIn(): boolean {
    return this.authService.isAuthenticated();
  }

  get userEmail(): string {
    const user = this.authService.getUser();
    return user?.email || 'fail';
  }

  logout() {
    if (this.authService.logout()) {
      this.router.navigate(['/login']);
    }
  }

  login() {
    this.router.navigate(['/login']);
  }
}
