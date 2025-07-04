import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface UserRegisterRequest {
  fullName: string;
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://localhost:7249/api/User';

  constructor(private http: HttpClient) {}

  register(data: UserRegisterRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, data);
  }
}
