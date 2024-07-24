import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Session } from '../models/Session';
import { HttpClient } from '@angular/common/http';
import { URL_BASE } from '../conf/constant';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends CrudService<Session> {

  constructor(http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/session`);
  }

}
