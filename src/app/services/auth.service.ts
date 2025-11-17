import { inject, Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isLoggedIn = false;
  private user: User | null = null;
  private url = "http://localhost:3000/users";
  router = inject(Router);

  constructor() { 
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    const user = await this.getUserFromDb(email, password);

    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', JSON.stringify(user[0]));
      this.isLoggedIn = true;
      this.user = user[0];
      return true;
    }

    alert('Invalid email or password');
    return false;
  }

  logout(): boolean {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedIn = false;
    this.user = null;
    
    return true;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn || localStorage.getItem('isLoggedIn') === 'true';
  }

  async getUserFromDb(email: string, password: string): Promise<User[] | null> {
    const user = (await fetch(`${this.url}?email=${email}&password=${password}`)).json();
    return await user ?? null;
  }

  getUser(): User | null {
    if (this.user || localStorage.getItem('user')) {
      return this.user || JSON.parse(localStorage.getItem('user')!);
    }
    return null;
  } 
}
