import { TestBed } from '@angular/core/testing';

import { HuntService } from './hunt.service';

describe('HuntServiceService', () => {
  let service: HuntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HuntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
