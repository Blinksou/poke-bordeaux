import { TestBed } from '@angular/core/testing';

import { FilterPageService } from './filter-page.service';

describe('PokedexPageService', () => {
  let service: FilterPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
