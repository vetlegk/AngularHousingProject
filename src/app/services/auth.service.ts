import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  private authTokenSubject = new BehaviorSubject<string>('');

  isLoggedIn$ = this.isLoggedInSubject.asObservable();
  authToken$ = this.authTokenSubject.asObservable();

  private url = "http://localhost:3000/users";
  router = inject(Router);

  constructor() { 
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (isLoggedIn) {
      this.isLoggedInSubject.next(isLoggedIn);

      const storedToken = localStorage.getItem('authToken');
      if (storedToken && storedToken !== '') {
        this.authTokenSubject.next(storedToken);
      }
      return;
    }

    localStorage.setItem('isLoggedIn', 'false');
    localStorage.setItem('authToken', ''); 
  }

  async login(email: string, password: string): Promise<boolean> {
    return await this.checkUserCredentials(email, password).then(value => {
      if (value != null) {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('authToken', value);
        this.isLoggedInSubject.next(true);
        this.authTokenSubject.next(value);
        return true;
      }
      return false;
    })
  }

  logout(): boolean {
    this.isLoggedInSubject.next(false);
    this.authTokenSubject.next('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('authToken');
    
    return true;
  }

  async register(email: string, password: string): Promise<boolean> {
    const id = crypto.randomUUID(); // This will practically always return a unique number.

    const res = await fetch(this.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, email, password })
    });
    
    if (res.ok) {
      return this.login(email, password) ?? false;
    };
    return false;
  }

  async checkUserCredentials(email: string, password: string): Promise<string | null> {
    const res = await fetch(`${this.url}?email=${email}&password=${password}`);

    return await res.json().then(data => {
      if (data.length > 0 && data[0].email === email && data[0].password === password) {      
        return data.id;
      }
      return null;
    });
  }
}
