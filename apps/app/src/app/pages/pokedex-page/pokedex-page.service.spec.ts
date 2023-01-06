import { TestBed } from '@angular/core/testing';

import { PokedexPageService } from './pokedex-page.service';

describe('PokedexPageService', () => {
  let service: PokedexPageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokedexPageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
