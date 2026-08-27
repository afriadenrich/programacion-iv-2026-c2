import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ejemplo01 } from './ejemplo-01';

describe('Ejemplo01', () => {
  let component: Ejemplo01;
  let fixture: ComponentFixture<Ejemplo01>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ejemplo01],
    }).compileComponents();

    fixture = TestBed.createComponent(Ejemplo01);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
