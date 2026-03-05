import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

const USER_KEY = 'moneywise_user';
const SESSION_KEY = 'moneywise_session';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private storageService: StorageService,
    private router: Router
  ) {}

 async init() {
  const session = await this.storageService.get(SESSION_KEY);

  if (session) {
    const user = await this.storageService.get(USER_KEY);
    this.currentUserSubject.next(user);
  }
}

async register(email: string, password: string) {

  const newUser: User = {
    id: Date.now().toString(),
    email,
    password,
    createdAt: new Date()
  };

  await this.storageService.set(USER_KEY, newUser);
  await this.storageService.set(SESSION_KEY, true);  

  this.currentUserSubject.next(newUser);
  this.router.navigateByUrl('/dashboard', { replaceUrl: true });
}

async login(email: string, password: string) {

  const storedUser = await this.storageService.get(USER_KEY);

  if (!storedUser) {
    throw new Error('Usuario no registrado');
  }

  if (storedUser.email !== email || storedUser.password !== password) {
    throw new Error('Credenciales incorrectas');
  }

  await this.storageService.set(SESSION_KEY, true); 
  this.currentUserSubject.next(storedUser);
  this.router.navigateByUrl('/dashboard', { replaceUrl: true });
}

  async logout() {
    await this.storageService.remove(SESSION_KEY);
    this.currentUserSubject.next(null);
    this.router.navigateByUrl('/auth/login', { replaceUrl: true });
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }
}