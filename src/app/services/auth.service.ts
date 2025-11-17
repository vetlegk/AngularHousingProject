import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private isLoggedIn = false;
  private user: User | null = null;
  private url = "http://localhost:3000/users";

  constructor() { 
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  }

  async login(email: string, password: string): Promise<boolean> {
    const user = await this.getUserFromDb(email, password);
    if (user) {
      localStorage.setItem('isLoggedIn', 'true');
      this.isLoggedIn = true;
      this.user = user;
      return true;
    }

    return false;
  }

  logout(): void {
    localStorage.removeItem('isLoggedIn');
    this.isLoggedIn = false;
    this.user = null;
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn || localStorage.getItem('isLoggedIn') === 'true';
  }

  async getUserFromDb(email: string, password: string): Promise<User | null> {
    const user = await fetch(`${this.url}?email=${email}&password=${password}`);
    return await user.json() ?? null;
  }

  getUserEmail(): string {
    return this.user?.email || '';
  }
}
