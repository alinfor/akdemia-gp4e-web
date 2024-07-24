import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { ParticularSubscription } from '../models/ParticularSubscription';
import { HttpClient } from '@angular/common/http';
import { URL_BASE } from '../conf/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParticularSubscriptionService extends CrudService<ParticularSubscription>{

  constructor(private http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/partsubscriptions`);
   }

  attach(sessionId: number, particularIds: number[]): Observable<any>{
    return this.http.get(URL_BASE+'/partsubscriptions/attach/'+sessionId+'?particularsId='+particularIds);
  } 
}
