import { Component, OnInit, Inject } from '@angular/core';
import { EmployeeModel } from '../EmployeeModel';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthenticationService } from '../services/authentication.service';
import { FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent implements OnInit {

  employee: EmployeeModel = new EmployeeModel();
  emp: EmployeeModel = new EmployeeModel();
  submitMessage;
  errorMessage: string;

  empId = new FormControl();
  empName = new FormControl();
  empAddress = new FormControl();
  empSkillSets = new FormControl();
  empRole = new FormControl();
  dob = new FormControl();
  doj = new FormControl();
  addEmployeeForm: FormGroup = new FormGroup({
    empId: new FormControl(),
    empName: new FormControl(),
    empAddress: new FormControl(),
    empSkillSets: new FormControl(),
    empRole: new FormControl(),
    dob: new FormControl(),
    doj: new FormControl()
  });

  constructor(public dialogRef: MatDialogRef<EditemployeeComponent>,
    @Inject(MAT_DIALOG_DATA) public empIdVal: any, private authenticateService: AuthenticationService) { }

  ngOnInit() {

    this.addEmployeeForm.patchValue({
      empId: this.empIdVal.empIdVal.empId,
      empName: this.empIdVal.empIdVal.empName,
      empAddress: this.empIdVal.empIdVal.empAddress,
      empSkillSets: this.empIdVal.empIdVal.empSkillSets,
      empRole: this.empIdVal.empIdVal.empRole,
      dob: this.empIdVal.empIdVal.dob,
      doj: this.empIdVal.empIdVal.doj
    });
  }

  UpdateEmployee() {
    this.authenticateService.UpdateEmployee(this.addEmployeeForm.value)
      .subscribe(res => {
        alert('Employee Update Successfully');
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



