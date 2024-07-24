import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { URL_BASE } from '../conf/constant';
import { CrudService } from './crud.service';

import { Session } from '../models/Session';

@Injectable({
  providedIn: 'root'
})
export class IntraSessionService extends CrudService<Session> {

  constructor(http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/intra-session`);
  }
}
