import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class RouterService {

  constructor(private router: Router) { }

  routeToDashboard() {
    this.router.navigate(['app-admin-dashboard']);
  }

  routeToLogin() {
    this.router.navigate(['app-login']);
  }

  routeToCustomerDashboard() {
    this.router.navigate(['app-customerdashboard']);
  }
}
