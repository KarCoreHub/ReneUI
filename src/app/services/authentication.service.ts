import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


import { EmployeeModel } from '../EmployeeModel';

@Injectable()
export class AuthenticationService {

  employeeList: Array<EmployeeModel>;

  empUrl = 'https://employeeservice20200910221822.azurewebsites.net/';
  // serviceUrl:string='https://otmsserviceapi.azurewebsites.net/';
  errorMessage = '';
  constructor(private httpClient: HttpClient) {
  }

  fetchEmployeesFromServer() {
    const headers = new HttpHeaders().set('content-type', 'text/plain')
      .set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Methods', 'GET');
    return this.httpClient.get<Array<EmployeeModel>>(this.empUrl + 'auth/ViewEmployeeList', { headers })
      .subscribe((emplist) => this.employeeList = emplist)
      , error => {
        this.errorMessage = error.message;
      };
  }

  getEmployeesLists() {
    return this.employeeList;
  }

  AddEmployee(data) {
    const headers = new HttpHeaders().set('content-type', 'application/json').set
      ('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Methods', 'POST');
    return this.httpClient.post(this.empUrl + 'auth/AddEmployee', data, {
      headers
    });
  }

  DeleteEmployee(data) {
    const headers = new HttpHeaders().set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Methods', 'POST');
    return this.httpClient.post<EmployeeModel>(this.empUrl + 'auth/DeleteEmployee', data, { headers });
  }

  UpdateEmployee(empID: string) {
    const headers = new HttpHeaders().set('content-type', 'application/json').set
      ('Access-Control-Allow-Origin', '*').set('Access-Control-Allow-Methods', 'POST');
    return this.httpClient.post(this.empUrl + 'auth/UpdateEmployee', empID, {
      headers
    });
  }
}
