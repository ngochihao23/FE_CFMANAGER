import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {RoleGuardServiceGuard} from "../shares/role-guard-service.guard";

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },

  {
    path: 'about',
    loadChildren: () => import('./About/about/about.module').then( m => m.AboutPageModule)
  },

  {
    path: 'menus',
    loadChildren: () => import('./Menus/menus/menus.module').then( m => m.MenusPageModule)
  },

  {
    path: 'location',
    loadChildren: () => import('./Location/location/location.module').then( m => m.LocationPageModule)
  },

  {
    path: 'contact',
    loadChildren: () => import('./Contact us/contact/contact.module').then( m => m.ContactPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./Login/login/login.module').then( m => m.LoginPageModule)
  },

  {
    path: 'sign-up',
    loadChildren: () => import('./SignUp/sign-up/sign-up.module').then( m => m.SignUpPageModule)
  },
    {
      path: 'admin',

      canActivate: [RoleGuardServiceGuard],
      data: {expectedRoles: ['Admin']},
      loadChildren: () => import('./Role-Admin/admin/admin.module').then( m => m.AdminPageModule)
    },
  {
    path: 'users',
    loadChildren: () => import('./Users/users/users.module').then( m => m.UsersPageModule)
  },
  {
    path: 'store',
    loadChildren: () => import('./Store/store/store.module').then( m => m.StorePageModule)
  },
  {
    path: 'table',
    loadChildren: () => import('./Table/table/table.module').then( m => m.TablePageModule)
  },
  {
    path: 'order',
    loadChildren: () => import('./Order/order/order.module').then( m => m.OrderPageModule)
  },
  {
    path: 'revenue',
    loadChildren: () => import('./DoanhThu/revenue/revenue.module').then( m => m.RevenuePageModule)
  },
  {
    path: 'discount',
    loadChildren: () => import('./Discount/discount/discount.module').then( m => m.DiscountPageModule)
  },
  {
    path: 'noibo',
    loadChildren: () => import('./noibo/noibo/noibo.module').then( m => m.NoiboPageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'table',
    loadChildren: () => import('./Table/table/table.module').then( m => m.TablePageModule)
  },
  {
    path: 'menu-item',
    loadChildren: () => import('./menu-item/menu-item/menu-item.module').then( m => m.MenuItemPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
