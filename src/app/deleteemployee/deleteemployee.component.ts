import { Component, OnInit, DoCheck, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeeModel } from '../EmployeeModel';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-deleteemployee',
  templateUrl: './deleteemployee.component.html',
  styleUrls: ['./deleteemployee.component.css']
})
export class DeleteemployeeComponent implements OnInit, DoCheck {

  errorMessage: string;  
  employees: Array<EmployeeModel> = new Array<EmployeeModel>();
  empID: string;
  EventValue = new FormControl();

  dialogRef: MatDialogRef<DeleteemployeeComponent>;

  registerForm: FormGroup = new FormGroup({
    EventValue: new FormControl()
  });

  constructor(private authService: AuthenticationService, dialogRef: MatDialogRef<DeleteemployeeComponent>) {
    this.dialogRef = dialogRef;
  }

  ngOnInit() {
    this.loadEvents();
  }

  ngDoCheck() {
    this.employees = this.authService.getEmployeesLists();
  }


  loadEvents() {
    this.authService.fetchEmployeesFromServer();
    this.employees = this.authService.getEmployeesLists();
  }

  ConfirmEvent() {
    this.empID = this.registerForm.get('EventValue').value;
    if ((this.empID !== '') && (this.empID !== null)) {

      this.authService.DeleteEmployee(this.empID).subscribe(addedNote => {
        alert('Employee deleted successfully');
        this.dialogRef.close();
      },
        error => {
          this.errorMessage = error.message;
        }
      );
    } else {
      this.errorMessage = 'Please select the employee to confirm';
    }
  }
}
