import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/Service/Menu.service';
import { MenuItem } from 'src/app/models/menu.models';
import {FormsModule} from "@angular/forms";
import {CurrencyPipe} from "@angular/common";
import { CommonModule } from '@angular/common';
import {IonicModule} from "@ionic/angular";
import {RouterLink} from "@angular/router";
@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.page.html',
  imports: [
    CommonModule,
    FormsModule,
    CurrencyPipe,
    IonicModule,
    RouterLink
  ],
  styleUrls: ['./menu-item.page.scss'],
})
export class MenuItemPage implements OnInit {
  menuItems: MenuItem[] = [];
  searchText: string = '';
  selectedCategory: string = 'Tất cả';
  isSidebarVisible: boolean = false;

  constructor(private menuItemService: MenuService) {}

  ngOnInit() {
    this.loadMenuItems();
  }
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  loadMenuItems() {
    this.menuItemService.getAll().subscribe({
      next: (data) => {
        this.menuItems = data;
      },
      error: (err) => {
        console.error('Lỗi khi lấy menu:', err);
      }
    });
  }

  get uniqueCategories(): string[] {
    const categories = this.menuItems.map(item => item.category);
    return ['Tất cả', ...Array.from(new Set(categories))];
  }

  get filteredMenuItems(): MenuItem[] {
    let items = this.menuItems;

    if (this.searchText) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }

    if (this.selectedCategory !== 'Tất cả') {
      items = items.filter(item => item.category === this.selectedCategory);
    }

    return items;
  }


}
