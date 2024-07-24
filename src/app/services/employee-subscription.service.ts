import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { EmployeeSubscription } from '../models/EmployeeSubscription';
import { HttpClient } from '@angular/common/http';
import { URL_BASE } from '../conf/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeSubscriptionService extends CrudService<EmployeeSubscription>{

  constructor(private http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/emplsubscriptions`);
   }

   attach(sessionId: number, employeeIds: number[]): Observable<any>{
    return this.http.get(URL_BASE+'/emplsubscriptions/attach/'+sessionId+'?employeesId='+employeeIds);
  }
}






