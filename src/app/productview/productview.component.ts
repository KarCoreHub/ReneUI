import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';

import { EmployeeModel } from '../EmployeeModel';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { EditemployeeComponent } from '../editemployee/editemployee.component';

@Component({
  selector: 'app-productview',
  templateUrl: './productview.component.html',
  styleUrls: ['./productview.component.css']
})
export class ProductviewComponent implements OnInit, DoCheck {

  errorMessage: string;
  employees: Array<any> = new Array<any>();
  employee: EmployeeModel = new EmployeeModel();
  empTemp: any ;
  authenticationServ: AuthenticationService;
  submitMessage: string;
  EventValue = new FormControl();
  testData = '';

  registerForm: FormGroup = new FormGroup({
    EventValue: new FormControl()
  });

  constructor(public dialogRef: MatDialogRef<ProductviewComponent>, private authService: AuthenticationService,
    // tslint:disable-next-line:align
    private dialog: MatDialog) {
    this.authenticationServ = authService;
  }

  ngOnInit() {
    this.loadEvents();
  }

  ngDoCheck() {
    this.loadEvents();
  }

  loadEvents() {
    this.authenticationServ.fetchEmployeesFromServer();
    this.employees = this.authenticationServ.getEmployeesLists();
  }

  ConfirmEvent() {
    this.testData = this.registerForm.get('EventValue').value;

    if ((this.testData !== '') && (this.testData !== null)) {
      {

        this.empTemp = this.employees.filter(item => item.empId === this.testData)[0];
        this.employee.empId = this.empTemp.empId;
        this.employee.empName = this.empTemp.empName;
        this.employee.empAddress = this.empTemp.empAddress;
        this.employee.empSkillSets = this.empTemp.empSkillSets;
        this.employee.empRole = this.empTemp.empRole;
        this.employee.dob = this.empTemp.dob;
        this.employee.doj = this.empTemp.doj;
        this.dialog.open(EditemployeeComponent, {
          data: {
            empIdVal: this.employee
          }
        }).afterClosed().subscribe(result => {
          this.dialogRef.close();
        });
      }
    }
  }
}

