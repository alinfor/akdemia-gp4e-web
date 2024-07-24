import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFormateurComponent } from './add-formateur.component';

describe('AddFormateurComponent', () => {
  let component: AddFormateurComponent;
  let fixture: ComponentFixture<AddFormateurComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFormateurComponent]
    });
    fixture = TestBed.createComponent(AddFormateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
