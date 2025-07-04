import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { User } from 'src/app/models/user.model';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
  standalone: false
})
export class UsersPage implements OnInit {
  searchText = '';
  selectedUser: User | null = null;
  users: User[] = [];
  isSidebarVisible = false;
  isLoading = false;
  errorMessage: string = '';
  totalPages!: number;



  constructor(
    private alertCtrl: AlertController,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.loadUsers();
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


  selectUser(user: User) {
    this.selectedUser = user;
  }

  async addUser() {
    const alert = await this.alertCtrl.create({
      header: 'Thêm nhân viên',
      inputs: [
        {name: 'username', type: 'text', placeholder: 'Tên đăng nhập'},
        {name: 'fullname', type: 'text', placeholder: 'Họ tên đầy đủ'},
        {name: 'email', type: 'text', placeholder: 'Email'},
        {name: 'position', type: 'text', placeholder: 'Chức vụ (tùy chọn)'}
      ],
      buttons: [
        {text: 'Hủy', role: 'cancel'},
        {
          text: 'Lưu',
          handler: data => {
            if (data.username && data.fullname && data.email) {
              const userPayload = {
                username: data.username,
                fullname: data.fullname,
                email: data.email,
                password: '123456',
                role: 0 // Mặc định là Admin hoặc điều chỉnh theo enum
              };

              this.userService.Create(userPayload).subscribe({
                next: res => {
                  this.users.push(res);
                  console.log('Thêm thành công');
                },
                error: err => {
                  console.error('Lỗi khi thêm user:', err);
                }
              });
            } else {
              console.warn("Vui lòng điền đầy đủ thông tin bắt buộc");
            }
          }
        }
      ]
    });

    await alert.present();
  }

  async editUser() {
    if (!this.selectedUser) return;
    const user = this.selectedUser;

    const alert = await this.alertCtrl.create({
      header: 'Sửa thông tin nhân viên',
      inputs: [
        {name: 'username', type: 'text', value: user.username},
        {name: 'fullname', type: 'text', value: user.fullname},
        {name: 'email', type: 'text', value: user.email},
        {name: 'role', type: 'number', value: user.role?.toString()}
      ],
      buttons: [
        {text: 'Hủy', role: 'cancel'},
        {
          text: 'Lưu',
          handler: data => {
            const updatedUser = {
              id: user.id,
              name: data.fullname, // ✅ Đổi từ fullname thành name
              username: data.username,
              email: data.email,
              role: Number(data.role)
            };


            this.userService.updateUser(updatedUser).subscribe({
              next: res => {
                Object.assign(user, updatedUser);
                console.log('Cập nhật thành công');
              },
              error: err => {
                console.error('Lỗi khi cập nhật:', err);
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async confirmDelete(user: User) {
    const alert = await this.alertCtrl.create({
      header: 'Xóa nhân viên?',
      message: `Bạn có chắc chắn muốn xóa ${user.username}?`,
      buttons: [
        { text: 'Hủy', role: 'cancel' },
        {
          text: 'Xóa',
          handler: () => {
            this.userService.deleteUser(user.id).subscribe({
              next: () => {
                this.users = this.users.filter(u => u.id !== user.id);
                console.log('Đã xóa');
              },
              error: err => {
                console.error('Lỗi khi xóa:', err);
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  currentPage = 1;
  pageSize = 3;


// ⚠️ Quan trọng: filteredUsers là biến (để dùng được trong paginatedUsers
  get paginatedUsers(): User[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    return this.filteredUsers().slice(startIndex, startIndex + this.pageSize);
  }


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


  filteredUsers(): User[] {
    const filtered = !this.searchText.trim()
      ? this.users
      : this.users.filter(user =>
        user.username.toLowerCase().includes(this.searchText.toLowerCase())
      );

    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    return filtered;
  }



}
