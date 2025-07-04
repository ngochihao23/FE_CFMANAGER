import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { Observable } from 'rxjs/internal/Observable';
import Order = jasmine.Order;

// order.service.ts
@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(private http: HttpClient) {}

  getOrdersByTable(tableId: string) {
    return this.http.get<any[]>(`https://localhost:7249/api/Order/by-table/${tableId}`);
  }

}
