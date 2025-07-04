// src/app/services/store.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Store } from '../models/store.model';
import {StoreCreateDto} from "../models/StoreCreateDto.model";


@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private apiUrl = 'https://localhost:7249/api/Store'; // ✅ Đổi thành API thật

  constructor(private http: HttpClient) {}

  getAllStores(): Observable<Store[]> {
    return this.http.get<Store[]>(this.apiUrl);
  }
  getById(id: string): Observable<Store> {
    return this.http.get<Store>(`${this.apiUrl}/GetById?id=${id}`);
  }

  addStore(store: StoreCreateDto): Observable<Store> {
    return this.http.post<Store>(`${this.apiUrl}/Create`, store); }



  update(store: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/update`, store);
  }



  delete(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete?id=${id}`, { responseType: 'text' });
  }


  }

