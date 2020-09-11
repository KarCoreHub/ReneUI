import { Component, OnInit, DoCheck } from '@angular/core';
import { EmployeeModel } from '../EmployeeModel';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, DoCheck {

  public userId: any;
  submitMessage: string;
  errorMessage: string;
  type: string;
  employees: Array<EmployeeModel> = new Array<EmployeeModel>();

  constructor(private authService: AuthenticationService) {
    this.errorMessage = '';
    this.type = '';
    this.loadEvents();
  }

  ngOnInit() {
    this.loadEvents();
  }

  ngDoCheck() {
    this.loadEvents();
  }

  loadEvents() {
    this.authService.fetchEmployeesFromServer();
    this.employees = this.authService.getEmployeesLists();
  }
}
