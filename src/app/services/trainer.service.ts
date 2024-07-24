import { Injectable } from '@angular/core';
import { Trainer } from '../models/Trainer';
import { HttpClient } from '@angular/common/http';
import { URL_BASE } from '../conf/constant';
import { CrudService } from './crud.service';


@Injectable({
  providedIn: 'root'
})
export class TrainerService extends CrudService<Trainer> {

  constructor(http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/trainers`);
  }

}
