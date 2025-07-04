import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { UsersPage } from './users.page';
import { UserService } from 'src/app/Users/service/user.service';
import { of, throwError } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { User } from 'src/app/models/user.model';

describe('UsersPage', () => {
  let component: UsersPage;
  let fixture: ComponentFixture<UsersPage>;
  let userServiceSpy: jasmine.SpyObj<UserService>;

  // ✅ Mock user data
  function mockUsers(): User[] {
    return [
      {
        id: '1',
        username: 'nguyenvana',
        fullname: 'Nguyễn Văn A',
        email: 'a@example.com',
        phoneNumber: '0909000111',
        role: 'Quản lý'
      },
      {
        id: '2',
        username: 'tranthib',
        fullname: 'Trần Thị B',
        email: 'b@example.com',
        phoneNumber: '0909000222',
        role: 'Nhân viên'
      },
      {
        id: '3',
        username: 'lemacd',
        fullname: 'Lê Mạnh C',
        email: 'c@example.com',
        phoneNumber: '0909000333',
        role: 'Kế toán'
      }
    ];
  }

  beforeEach(waitForAsync(() => {
    const spy = jasmine.createSpyObj('UserService', ['getAllUsers']); // ✅ đúng tên phương thức

    TestBed.configureTestingModule({
      declarations: [UsersPage],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: UserService, useValue: spy }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    userServiceSpy = TestBed.inject(UserService) as jasmine.SpyObj<UserService>;
    fixture = TestBed.createComponent(UsersPage);
    component = fixture.componentInstance;
  }));

  it('should create the UsersPage', () => {
    expect(component).toBeTruthy();
  });

  it('should load users on init', () => {
    userServiceSpy.getAllUsers.and.returnValue(of(mockUsers())); // ✅ gọi mockUsers()

    component.ngOnInit();

    expect(userServiceSpy.getAllUsers).toHaveBeenCalled();
    expect(component.users.length).toBe(3); // ✅ sửa đúng số user
    expect(component.isLoading).toBeFalse();
  });

  it('should handle error when loading users', () => {
    userServiceSpy.getAllUsers.and.returnValue(throwError(() => new Error('Lỗi server')));

    component.ngOnInit();

    expect(userServiceSpy.getAllUsers).toHaveBeenCalled();
    expect(component.errorMessage).toBe('Không thể tải danh sách người dùng.');
    expect(component.users.length).toBe(0);
    expect(component.isLoading).toBeFalse();
  });
});
