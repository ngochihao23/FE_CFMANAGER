import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface cho 1 bàn
export interface Table {
  id: string;
  tableNumber: string;
  status: 'Available' | 'Occupied';
  storeId: string;
}

// Interface cho món ăn trong đơn hàng
export interface TableItem {
  name: string;
  quantity: number;
  price: number;
}

@Injectable({
  providedIn: 'root',
})
export class TableService {
  private apiUrl = 'https://localhost:7249/api/Table' ; // Thay bằng URL backend thực tế

  constructor(private http: HttpClient) {}

  /** Lấy tất cả bàn trong hệ thống */
  getTables(): Observable<Table[]> {
    return this.http.get<Table[]>(`${this.apiUrl}`);
  }

  /** Lấy danh sách món ăn theo bàn */
  getOrderItemsByTable(tableId: string): Observable<any[]> {
    return this.http.get<any[]>(`https://localhost:7249/api/Table/${tableId}/orders`);
  }





  createTable(table: Table) {
    return this.http.post<Table>(`${this.apiUrl}/create`, table);
  }

  updateTable(id: string, table: Table) {
    return this.http.put(`${this.apiUrl}/update
`, table);
  }

  // table.service.ts
  deleteTable(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/Delete/${id}`);
  }



  updateTableStatus(id: string, status: number): Observable<any> {
    return this.http.put(`https://localhost:7249/api/Table/${id}/status`, status);
  }



  addItemToTable(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/add-item`, data);
  }


  getAllMenuItems(): Observable<any[]> {
    return this.http.get<any[]>('https://localhost:7249/api/MenuItems/getAll');
  }

}
