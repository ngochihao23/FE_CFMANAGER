import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-noibo',
  templateUrl: './noibo.page.html',
  styleUrls: ['./noibo.page.scss'],
  standalone :false
})
export class NoiboPage implements OnInit {
  roles: string[] = [
    'Bán hàng', 'Tư vấn', 'Dịch vụ', 'Thu Ngân',
    'Quản kho', 'Bảo trì', 'Kiểm hàng', 'Bảo vệ', 'Tạp vụ'
  ];

  statuses: string[] = ['Sa thải', 'Khóa tài khoản'];
  isModalOpen: boolean = false;
  newStatus: string = '';

  formData = {
    fullName: '',
    birthDate: '',
    role: '',
    reason: '',
    status: ''
  };

  constructor() {}

  ngOnInit() {}

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.newStatus = '';
    this.isModalOpen = false;
  }

  addStatus() {
    if (this.newStatus.trim() !== '') {
      this.statuses.push(this.newStatus.trim());
      this.closeModal();
    }
  }

  save() {
    if (!this.formData.fullName || !this.formData.role || !this.formData.status) {
      alert('Vui lòng điền đầy đủ các trường bắt buộc.');
      return;
    }

    console.log('Dữ liệu gửi đi:', this.formData);
    alert('Đã lưu thành công!');
    // TODO: Gửi API lưu thông tin
  }
  isSidebarVisible: boolean = false;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

}
