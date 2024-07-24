import { TestBed } from '@angular/core/testing';

import { InterSessionService } from './inter-session.service';

describe('InterSessionService', () => {
  let service: InterSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InterSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
