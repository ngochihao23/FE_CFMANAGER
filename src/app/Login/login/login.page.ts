import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {FormsModule} from "@angular/forms";
import {IonicModule} from "@ionic/angular";
import {jwtDecode} from "jwt-decode";
import {Storage} from "@ionic/storage-angular";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [
    FormsModule,
    IonicModule,
    NgClass
  ]
})
export class LoginPage implements OnInit {
  loginData = {
    email: '',
    password: ''
  };

  errorMessage = '';

  constructor(private http: HttpClient, private router: Router, private apiStorage: Storage) {
  }

  ngOnInit() {
  }

  loading = false;

  login() {
    this.loading = true;
    this.http.post<any>('https://localhost:7249/api/User/Login', this.loginData)
      .subscribe({
        next: (res) => {
          this.loading = false;
          try {
            const decoded = jwtDecode(res.data);
            this.apiStorage.set('user', decoded);
            this.router.navigate(['/home']);
          } catch (e) {
            console.error('Lỗi decode:', e);
            this.errorMessage = 'Token không hợp lệ!';
          }
        },
        error: (err) => {
          this.loading = false;
          console.error('Lỗi đăng nhập:', err);
          this.errorMessage = 'Sai tài khoản hoặc mật khẩu!';
        }
      });
  }
  showPassword: boolean = false;

  currentYear: number = new Date().getFullYear();

  togglePassword() {
    this.showPassword = !this.showPassword;
  }


}
