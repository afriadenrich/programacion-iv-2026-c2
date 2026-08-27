import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ejemplo03 } from './ejemplo-03';

describe('Ejemplo03', () => {
  let component: Ejemplo03;
  let fixture: ComponentFixture<Ejemplo03>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ejemplo03],
    }).compileComponents();

    fixture = TestBed.createComponent(Ejemplo03);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
