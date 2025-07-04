import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-order',
  templateUrl: './order.page.html',
  styleUrls: ['./order.page.scss'],
  standalone: false
})
export class OrderPage implements OnInit {

  tables: any[] = [];
  orders: any[] = [];
  orderItems: any[] = [];   // ✅ Đúng — luôn khởi tạo rỗng

  selectedTableId: string = '';
  isSidebarVisible: any;
  isMobile: boolean = false; // 👈 Thêm dòng này
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadTables();

  }
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  loadTables() {
    this.http.get<any[]>('https://localhost:7249/api/Table')
      .subscribe({
        next: (data) => {
          this.tables = data;
          if (this.tables.length > 0) {
            this.selectedTableId = this.tables[0].id;
            this.loadOrdersForTable();
          }
        },
        error: (err) => {
          console.error('Lỗi khi tải danh sách bàn:', err);
        }
      });
  }

  loadOrdersForTable() {
    if (!this.selectedTableId) return;

    this.http.get<any[]>(`https://localhost:7249/api/Order/by-table/${this.selectedTableId}`)
      .subscribe({
        next: (data) => {
          this.orders = data;
        },
        error: (err) => {
          console.error('Lỗi khi tải lịch sử đơn:', err);
        }
      });
  }
}
