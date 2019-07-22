import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'http://127.0.0.1:8000/api';

  constructor(private http:HttpClient) { }

  signup(data): any {
    return this.http.post( this.baseUrl + `/signup`, data);
  }

  login(userData): any {
    return this.http.post( this.baseUrl + `/login`, userData);
  }

  me(userData): any {
    return this.http.get( this.baseUrl + `/me`, userData);
  }

  sendPasswordResetLink(data) {
    return this.http.post( this.baseUrl + `/reset-password`, data);
  }

  changePassword(data) {
    return this.http.post( this.baseUrl + `/change-password`, data);
  }
}
