import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { URL_BASE } from '../conf/constant';
import { Session } from '../models/Session';

@Injectable({
  providedIn: 'root'
})
export class InterSessionService extends CrudService<Session> {

  constructor(http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/inter-session`);
  }
}
