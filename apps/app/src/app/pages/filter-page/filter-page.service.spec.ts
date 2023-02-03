import { TestBed } from '@angular/core/testing';
import { FilterPageComponent } from './filter-page.component';

describe('PokedexPageService', () => {
  let component: FilterPageComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    component = TestBed.inject(FilterPageComponent);
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
