import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private loggedIn = new BehaviorSubject<boolean>(this.tokenService.loggedIn());

  authStatus = this.loggedIn.asObservable();

  constructor(private tokenService: TokenService) { }

  changeStatus(status: boolean): void {
    this.loggedIn.next(status);
  }

  getStatus(): Observable<boolean> {
    return this.authStatus;
  }

  logout(): void {
    this.tokenService.remove();
    this.changeStatus(false);
  }
}
