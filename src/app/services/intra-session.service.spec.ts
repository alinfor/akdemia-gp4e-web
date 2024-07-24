import { TestBed } from '@angular/core/testing';

import { IntraSessionService } from './intra-session.service';

describe('IntraSessionService', () => {
  let service: IntraSessionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntraSessionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
