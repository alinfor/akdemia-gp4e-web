import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Training } from '../models/Training';
import { HttpClient } from '@angular/common/http';
import { URL_BASE } from '../conf/constant';


@Injectable({
  providedIn: 'root'
})
export class TrainingService extends CrudService<Training> {

  constructor(http: HttpClient) {
    const url: string = URL_BASE;
    super(http, `${url}/training`);
  }

}
