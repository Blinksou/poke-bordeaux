import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonAvatarComponent } from './pokemon-avatar.component';

describe('PokemonAvatarComponent', () => {
  let component: PokemonAvatarComponent;
  let fixture: ComponentFixture<PokemonAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ PokemonAvatarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
