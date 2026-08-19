import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Titulo } from './titulo';

describe('Titulo', () => {
  let component: Titulo;
  let fixture: ComponentFixture<Titulo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Titulo],
    }).compileComponents();

    fixture = TestBed.createComponent(Titulo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
