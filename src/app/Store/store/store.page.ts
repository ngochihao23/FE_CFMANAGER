// src/app/Store/store/store.page.ts
import { Component, OnInit } from '@angular/core';
import { StoreService } from '../../Service/store.service'; // dùng đúng đường dẫn
import { Store } from '../../models/store.model';
import {AlertController, AlertInput} from '@ionic/angular';
import { StoreCreateDto } from 'src/app/models/StoreCreateDto.model';
import {UserService} from "../../Users/service/user.service";





@Component({
  selector: 'app-store',
  templateUrl: './store.page.html',
  styleUrls: ['./store.page.scss'],
  standalone: false
})
export class StorePage implements OnInit {
  searchText = '';

  async editStore(item: any) {
    if (!item) return;

    const alert = await this.alertCtrl.create({
      header: 'Sửa thông tin cửa hàng',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Tên cửa hàng',
          value: item.name
        },
        {
          name: 'address',
          type: 'text',
          placeholder: 'Địa chỉ',
          value: item.address
        },
        {
          name: 'phoneNumber',
          type: 'text',
          placeholder: 'Số điện thoại',
          value: item.phoneNumber
        },
        {
          name: 'managerId',
          type: 'text',
          placeholder: 'ID người quản lý',
          value: item.managerId
        }
      ],
      buttons: [
        { text: 'Hủy', role: 'cancel' },
        {
          text: 'Lưu',
          handler: data => {
            const updatedStore = {
              id: item.id,
              name: data.name,
              address: data.address,
              phoneNumber: data.phoneNumber,
              managerId: data.managerId
            };

            this.storeService.update(updatedStore).subscribe({
              next: () => {
                Object.assign(item, updatedStore); // Cập nhật ngay trong danh sách nếu cần
                this.loadStores(); // Tải lại nếu muốn
                console.log('✔️ Cập nhật cửa hàng thành công');
              },
              error: err => {
                console.error('❌ Lỗi khi cập nhật cửa hàng:', err);
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }



  deleteStore(item: any) {
    if (confirm('Bạn có chắc muốn xóa cửa hàng này không?')) {
      this.storeService.delete(item.id).subscribe({
        next: () => {
          alert('Đã xóa cửa hàng.');
          this.loadStores(); // reload danh sách
        },
        error: err => {
          console.error('Lỗi xóa:', err);
        }
      });
    }
  }
  stores: Store[] = [];
  isSidebarVisible: boolean = false;
  isLoading: boolean = true;
  errorMessage: string = '';


  constructor(private storeService: StoreService,private alertCtrl: AlertController, private userService: UserService
  ) {}
  users: any[] = [];  // lưu danh sách user
  ngOnInit(): void {
    this.loadStores();
    this.loadUsers(); // 👈 thêm dòng này
  }

  item = {
    id: 'a2f1-345b-...',          // mã định danh duy nhất
    name: 'Cửa hàng Trung Tâm',
    address: '123 Lê Lợi, Q1',
    phone: '0123456789',
    // có thể có thêm các trường khác
  };


  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  loadUsers() {
    this.userService.getAllUsers().subscribe({
      next: (res: any[]) => {
        this.users = res;
      },
      error: err => {
        console.error('Lỗi khi load danh sách user:', err);
        this.errorMessage = 'Không thể tải danh sách người dùng.';
      }
    });
  }


  loadStores(): void {
    this.isLoading = true;
    this.storeService.getAllStores().subscribe({
      next: (data) => {
        this.stores = data || []; // ✅ Đảm bảo luôn là mảng
        console.log('Dữ liệu nhận được từ API:', this.stores);

        this.isLoading = false;
        this.errorMessage = '';
      },
      error: (error: any) => {
        console.error({error: 'Lỗi khi tải danh sách cửa hàng:'}, error);
        this.errorMessage = 'Không thể tải danh sách cửa hàng. Vui lòng thử lại.';
        this.isLoading = false;
      }
    });
  }
  async addStore() {
    const managers = this.users.filter(user => user.role === 'manager' || 'Admin'); // Hoặc user.isManager === true

    const managerOptions: AlertInput[] = managers.map((user, index) => ({
      type: 'radio' as const,
      label: `${user.fullname} (${user.email})`,
      value: user.id,
      checked: index === 0
    }));


    const alertManager = await this.alertCtrl.create({
      header: 'Chọn người quản lý',
      inputs: managerOptions,
      buttons: [
        {text: 'Hủy', role: 'cancel'},
        {
          text: 'Tiếp tục',
          handler: async (selectedManagerId) => {
            if (!selectedManagerId) {
              console.warn("⚠️ Chưa chọn người quản lý");
              return;
            }

            // Hiển thị form nhập thông tin cửa hàng
            const alertStore = await this.alertCtrl.create({
              header: 'Thêm cửa hàng',
              inputs: [
                {name: 'name', type: 'text', placeholder: 'Tên cửa hàng'},
                {name: 'address', type: 'text', placeholder: 'Địa chỉ'},
                {name: 'phoneNumber', type: 'text', placeholder: 'Số điện thoại'}
              ],
              buttons: [
                {text: 'Hủy', role: 'cancel'},
                {
                  text: 'Lưu',
                  handler: (data) => {
                    if (data.name && data.address && data.phoneNumber) {
                      const payload: StoreCreateDto = {
                        name: data.name,
                        address: data.address,
                        phoneNumber: data.phoneNumber,
                        managerId: selectedManagerId
                      };

                      this.storeService.addStore(payload).subscribe({
                        next: res => {
                          this.stores.push(res);
                          console.log("✅ Thêm cửa hàng thành công");
                        },
                        error: err => {
                          console.error("❌ Lỗi khi thêm cửa hàng:", err);
                        }
                      });
                    } else {
                      console.warn("⚠️ Vui lòng nhập đủ thông tin");
                    }
                  }
                }
              ]
            });

            await alertStore.present();
          }
        }
      ]
    });


    await alertManager.present();
  }

// store.page.ts

// Đảm bảo bạn đã có các biến sau:
  filteredStoresList: Store[] = []; // kết quả sau khi lọc nếu có tìm kiếm
  currentPage: number = 1;
  pageSize: number = 3; // số dòng mỗi trang



// Di chuyển trang
  nextPage() {
    if (this.currentPage < this.totalPages) this.currentPage++;
  }

  prevPage() {
    if (this.currentPage > 1) this.currentPage--;
  }

  firstPage() {
    this.currentPage = 1;
  }

  lastPage() {
    this.currentPage = this.totalPages;
  }

  get filteredStores(): Store[] {
    if (!this.searchText || !this.searchText.trim()) return this.stores;
    return this.stores.filter(store =>
      store.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  get totalPages(): number {
    return Math.ceil(this.filteredStores.length / this.pageSize);
  }

  get paginatedStores(): Store[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredStores.slice(startIndex, startIndex + this.pageSize);
  }





}
