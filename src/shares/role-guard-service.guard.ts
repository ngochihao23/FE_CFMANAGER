import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Storage} from "@ionic/storage-angular";

@Injectable({
  providedIn: 'root'
})
export class RoleGuardServiceGuard implements CanActivate {
  constructor(private apiStorage: Storage, private router: Router) {
  }

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    try {
      const expectedRoles = route.data['expectedRoles'];
      const role = await this.apiStorage.get('user') as any;

      if (role && expectedRoles.includes(role.Role)) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    } catch (error) {
      this.router.navigate(['/login']);
      return false;
    }
  }


}

export class roleGuardServiceGuard {
}
