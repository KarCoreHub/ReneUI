import { Component, DoCheck } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { RouterService } from '../services/router.service';
import { MatDialog } from '@angular/material/dialog';

import { NewemployeeComponent } from '../newemployee/newemployee.component';
import { DeleteemployeeComponent } from '../deleteemployee/deleteemployee.component';
import { ProductviewComponent } from '../productview/productview.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private _authService: AuthenticationService, private routerService: RouterService, private dialog: MatDialog) {
  }

  AddEmployee() {
    this.dialog.open(NewemployeeComponent);
    this.routerService.routeToLogin();
  }

  EditEmployee() {
    this.dialog.open(ProductviewComponent);
    this.routerService.routeToLogin();
  }

  DeleteEmployee() {
    this.dialog.open(DeleteemployeeComponent);
    this.routerService.routeToLogin();
  }
}
