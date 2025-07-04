import { Component, OnInit } from '@angular/core';
import { TableService, Table, TableItem } from 'src/app/Service/table.service';
import { Modal } from 'bootstrap';


@Component({
  selector: 'app-table',
  templateUrl: './table.page.html',
  styleUrls: ['./table.page.scss'],
  standalone: false
})
export class TablePage implements OnInit {
  tables: Table[] = [];
  tableItems: TableItem[] = [];
  menuItems: any[] = [];
  selectedTableId: string | null = null;

  // Form tạo/sửa bàn
  newTable: Table = {
    id: '',
    tableNumber: '',
    status: 'Available',
    storeId: ''
  };
  editMode: boolean = false;
  isSidebarVisible: boolean = false;
  menuService: any;
  isLoading: boolean | undefined;

  constructor(private tableService: TableService) {}

  ngOnInit() {
    this.loadTables();
  }

  // Lấy danh sách bàn
  loadTables() {
    this.tableService.getTables().subscribe({
      next: (data) => this.tables = data,
      error: (err) => console.error('Lỗi khi load danh sách bàn:', err)
    });
  }

  // Xem món đã gọi và menu khi chọn bàn
  showItems(tableId: string | null) {
    if (!tableId) {

      console.warn('Không có tableId');
      return;
    }

    this.selectedTableId = tableId;

    // Lấy món đã gọi
    this.tableService.getOrderItemsByTable(tableId).subscribe({
      next: (items) => this.tableItems = items,
      error: (err) => {
        console.warn('Lỗi khi lấy món đã gọi:', err);
        this.tableItems = [];
      }
    });

    // Lấy danh sách món ăn (menu)
    this.tableService.getAllMenuItems().subscribe({
      next: (items) => this.menuItems = items,
      error: (err) => {
        console.warn('Lỗi khi lấy menu:', err);
        this.menuItems = [];
      }
    });
  }
  getAllMenuItems() {
    this.tableService.getAllMenuItems().subscribe({
      next: (items) => {
        this.menuItems = items;
      },
      error: (err) => {
        console.error('Lỗi khi lấy menu:', err);
        this.menuItems = [];
      }
    });
  }


  // Trả lại số bàn hiển thị
  getSelectedTableNumber(): string {
    const table = this.tables.find(t => t.id === this.selectedTableId);
    return table ? table.tableNumber : '';
  }

  // Thêm món vào bàn
  addItemToTable(menuItem: any) {
    if (!this.selectedTableId) return;

    const request = {
      tableId: this.selectedTableId,
      menuItemId: menuItem.id,
      quantity: 1
    };

    console.log('📤 Dữ liệu gửi đi:', request); // 👈 THÊM DÒNG NÀY

    this.tableService.addItemToTable(request).subscribe({
      next: () => {
        console.log('✅ Thêm món thành công');
        this.showItems(this.selectedTableId);
      },
      error: (err) => {
        console.error('❌ Lỗi khi thêm món:', err);
      }
    });
  }




  orderedItems: any[] = [];

  // Toggle trạng thái bàn
  toggleStatus(table: Table) {
    const newStatus = table.status === 'Available' ? 'Occupied' : 'Available';

    this.tableService.updateTableStatus(table.id, newStatus === 'Occupied' ? 1 : 0).subscribe({
      next: () => {
        console.log('Cập nhật trạng thái thành công');
        this.loadTables();
      },
      error: (err) => console.error('Lỗi khi cập nhật trạng thái:', err)
    });
  }

  // Bắt đầu sửa bàn
  editTable(table: Table) {
    this.newTable = { ...table };
    this.editMode = true;
  }

  // Tạo bàn mới
  createTable() {
    this.tableService.createTable(this.newTable).subscribe({
      next: () => {
        this.loadTables();
        this.resetForm();
      },
      error: (err) => console.error('Lỗi khi tạo bàn:', err)
    });
  }

  // Cập nhật bàn
  updateTable() {
    this.tableService.updateTable(this.newTable.id, this.newTable).subscribe({
      next: () => {
        this.loadTables();
        this.resetForm();
      },
      error: (err) => console.error('Lỗi khi cập nhật bàn:', err)
    });
  }

  // Xoá bàn
  deleteTable(tableId: string) {
    if (confirm('Bạn có chắc chắn muốn xoá bàn này không?')) {
      this.tableService.deleteTable(tableId).subscribe({
        next: () => this.loadTables(),
        error: (err: any) => console.error('Lỗi khi xoá bàn:', err)
      });
    }
  }

  // Reset form
  resetForm() {
    this.newTable = {
      id: '',
      tableNumber: '',
      status: 'Available',
      storeId: ''
    };
    this.editMode = false;
  }

  // Mở/tắt sidebar
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  increaseQuantity(item: any) {
    item.quantity++;
  }

// Giảm số lượng món, xoá nếu = 0
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity--;
    } else {
      const confirmDelete = confirm(`Xoá món "${item.name}" khỏi danh sách?`);
      if (confirmDelete) {
        const index = this.tableItems.indexOf(item);
        if (index > -1) {
          this.tableItems.splice(index, 1);
        }
      }
    }
  }

// Tính tổng tiền
  getTotal(): number {
    return this.tableItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

// Thanh toán (chỉ frontend)
  checkout() {
    const confirmPay = confirm(`Xác nhận thanh toán bàn số ${this.getSelectedTableNumber()} với tổng cộng ${this.getTotal().toLocaleString()} VND?`);
    if (confirmPay) {
      alert('✅ Thanh toán thành công!');
      this.tableItems = []; // Xoá món sau khi thanh toán
    }
  }
  openMenuModal() {
    this.isLoading = true;
    this.menuService.getAllMenuItems().subscribe({
      next: (items: any[]) => {
        this.menuItems = items;
        this.isLoading = false;

        const modalElement = document.getElementById('menuModal');
        if (modalElement) {
          const modal = new Modal(document.getElementById('menuModal')!);
          modal.show();

          modal.show();
        }
      },
      error: (err: any) => {
        console.error('Lỗi khi tải menu:', err);
        this.isLoading = false;
      }
    });
  }
  handleCallItem(item: any) {
    console.log('👉 Gọi món:', item); // kiểm tra xem có chạy không

    this.addItemToTable(item);

    const modalEl = document.getElementById('menuModal');
    if (modalEl) {
      const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
      modal.hide();
    }
  }




}
