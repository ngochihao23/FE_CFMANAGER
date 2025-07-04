// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://localhost:7249/api/User'; // 👉 Thay URL đúng của bạn

  constructor(private http: HttpClient) {}

  Create(userData: any): Observable<any> {
    // ❗ THÊM /Create vào URL
    return this.http.post(`${this.apiUrl}/Create`, userData);
  }



  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Getall`);
  }
// user.service.ts
  updateUser(user: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/Update`, user);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete?id=${id}`);
  }

}
