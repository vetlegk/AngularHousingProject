import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { get } from 'http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  isLoggedIn = false;
  user: User | null = null;
  private url = "http://localhost:3000/users";

  constructor() { }

  async getUser(email: string): Promise<User | null> {
    const user = await fetch(`${this.url}?email=${email}`)
    return await user.json() ?? null;
  }
}
