import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService, UserRegisterRequest } from 'src/app/Service/auth.service'; // đường dẫn tùy cấu trúc dự án

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
  standalone: false
})
export class SignUpPage implements OnInit {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {}

  onSubmit() {
    if (this.registerForm.invalid) return;

    const data: UserRegisterRequest = this.registerForm.value;

    this.authService.register(data).subscribe({
      next: res => {
        alert('Đăng ký thành công!');
        console.log(res);
      },
      error: err => {
        console.error('Lỗi đăng ký:', err);
        alert('Đăng ký thất bại!');
      }
    });
  }
}
