import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone : false
})
export class AppComponent implements OnInit {
  fullName: string = '';
  isLoggedIn: boolean = false;
  user: any = {};

  constructor(private storage: Storage, private router: Router) {}

  async ngOnInit() {
    await this.storage.create();
    const user = await this.storage.get('user');
    if (user) {
      this.user = user;
      this.fullName = user.Name;
      this.isLoggedIn = true;
    }
  }

  async logout() {
    await this.storage.remove('user');
    this.isLoggedIn = false;
    this.fullName = '';
    this.user = {};
    this.router.navigate(['/login']);
  }
}
