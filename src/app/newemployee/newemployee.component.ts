import { Component, ViewChild } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-newemployee',
  templateUrl: './newemployee.component.html',
  styleUrls: ['./newemployee.component.css']
})
export class NewemployeeComponent {

  errorMessage: string;
  submitMessage: string;
  empName = new FormControl();
  empRole = new FormControl();
  empAddress = new FormControl();
  empSkillSets = new FormControl();
  dob = new FormControl();
  doj = new FormControl();
  addEmployeeForm: FormGroup = new FormGroup({
    empName: new FormControl(),
    empAddress: new FormControl(),
    empSkillSets: new FormControl(),
    empRole : new FormControl(),
    dob: new FormControl(),
    doj: new FormControl()
  });
  @ViewChild(FormGroupDirective)
  formGroupDirective: FormGroupDirective;

  constructor(public dialogRef: MatDialogRef<NewemployeeComponent>, private authenticateService: AuthenticationService) {

  }


  AddEmployee() {
    this.authenticateService.AddEmployee(this.addEmployeeForm.value)
      .subscribe(res => {
        alert('Employee Added Successfully');
        this.dialogRef.close();
      },
        err => {
          if (err.error) {
            this.errorMessage = err.error.message;
          } else {
            this.errorMessage = err.message;
          }
        });
  }
}
