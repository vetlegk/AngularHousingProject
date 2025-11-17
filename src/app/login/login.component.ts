import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section>
      <h1>
        Welcome to the <span>Homes</span> application!
      </h1>
      <section>
        <h2>Login</h2>
        <form [formGroup]="loginForm" (submit)="submitLogin()">
          <label for="email">Email:</label>
          <input id="email" type="email" formControlName="email" />

          <label for="password">Password:</label>
          <input id="password" type="password" formControlName="password" />

          <button type="submit">Log In</button>
        </form>
      </section>
    </section>
  `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  authService: AuthService = new AuthService();
  router = inject(Router);

  email = new FormControl('');
  password = new FormControl('');
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor() { 
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/home']);
    }
  }

  submitLogin() {
    const email = this.loginForm.get('email')?.value || '';
    const password = this.loginForm.get('password')?.value || '';

    this.authService.login(email, password).then((isLoggedIn) => {
      if (isLoggedIn) {
        this.router.navigate(['/home']);
      } else {
        alert('Invalid email or password. Please try again.');
      }
    });
  }
}
