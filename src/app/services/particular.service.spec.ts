import { TestBed } from '@angular/core/testing';

import { ParticularService } from './particular.service';

describe('ParticularService', () => {
  let service: ParticularService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParticularService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
