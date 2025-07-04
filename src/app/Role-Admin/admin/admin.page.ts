import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
  standalone: false
})
export class AdminPage implements OnInit {
  currentTime = '';
  currentYear = new Date().getFullYear();

  dashboardWidgets = [
    {
      title: 'Tổng khách hàng',
      count: '56 khách hàng',
      desc: 'Tổng số khách hàng được quản lý.',
      icon: 'bx bxs-user-account',
      color: 'primary'
    },
    {
      title: 'Tổng sản phẩm',
      count: '1850 sản phẩm',
      desc: 'Tổng số sản phẩm được quản lý.',
      icon: 'bx bxs-data',
      color: 'info'
    },
    {
      title: 'Tổng đơn hàng',
      count: '247 đơn hàng',
      desc: 'Tổng số hóa đơn bán hàng trong tháng.',
      icon: 'bx bxs-shopping-bags',
      color: 'warning'
    },
    {
      title: 'Sắp hết hàng',
      count: '4 sản phẩm',
      desc: 'Sản phẩm cần nhập thêm.',
      icon: 'bx bxs-error-alt',
      color: 'danger'
    },
  ];

  orders = [
    {id: 'AL3947', name: 'Phạm Thị Ngọc', amount: '50.000 đ', status: 'Chờ', statusClass: 'bg-info'},
    {
      id: 'ER3835',
      name: 'Nguyễn Thị Mỹ Yến',
      amount: '170.000 đ',
      status: 'Đang Pha Chế',
      statusClass: 'bg-warning'
    },
    {id: 'MD0837', name: 'Triệu Thanh Phú', amount: '400.000 đ', status: 'Đã hoàn thành', statusClass: 'bg-success'},
    {id: 'MT9835', name: 'Đặng Hoàng Phúc', amount: '650.000 đ', status: 'Đã hủy', statusClass: 'bg-danger'},
  ];

  newCustomers = [
    {id: '#183', name: 'Hột vịt muối', birth: '21/7/1992', phone: '0921387221', tagClass: 'tag-success'},
    {id: '#219', name: 'Bánh tráng trộn', birth: '30/4/1975', phone: '0912376352', tagClass: 'tag-warning'},
    {id: '#627', name: 'Cút rang bơ', birth: '12/3/1999', phone: '01287326654', tagClass: 'tag-primary'},
    {id: '#175', name: 'Hủ tiếu nam vang', birth: '4/12/2000', phone: '0912376763', tagClass: 'tag-danger'},
  ];



  ngOnInit() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000);
    this.initCharts();
    this.pageLoaded = true;
  }

  updateClock() {
    const now = new Date();
    const days = ["Chủ Nhật", "Thứ Hai", "Thứ Ba", "Thứ Tư", "Thứ Năm", "Thứ Sáu", "Thứ Bảy"];
    const day = days[now.getDay()];
    const time = `${day}, ${this.pad(now.getDate())}/${this.pad(now.getMonth() + 1)}/${now.getFullYear()} - ${this.pad(now.getHours())} giờ ${this.pad(now.getMinutes())} phút ${this.pad(now.getSeconds())} giây`;
    this.currentTime = time;
  }

  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  initCharts() {
    // Gọi Chart.js khởi tạo biểu đồ như lineChart và barChart
  }

  pageLoaded = true;
  sidebarOpen = false;


  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
    const appElement = document.querySelector('.app');
    if (this.sidebarOpen) {
      appElement?.classList.add('sidebar-mini');
    } else {
      appElement?.classList.remove('sidebar-mini');
    }
  }


}
