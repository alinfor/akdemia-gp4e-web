import { Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SessionFormService {

  constructor(private fb: FormBuilder) { }

  getSessionForm() {
    return this.fb.group({
      id: [''],
      code: ['', Validators.required],
      duration	: ['', Validators.required],
      description	: ['',Validators.required],
      status: [null],
      date: ['', [Validators.required]],
      price: ['', Validators.required],
      location: ['',Validators.required],
      sessionScore	: ['',Validators.required],
      minParticipants: ['',Validators.required],
      company: [],
      trainer: [],
      training: [],
    })
  }

  getLoginForm() {
    return this.fb.group({
      email: ['', Validators.email],
      password: [''],
    })
  }
}
