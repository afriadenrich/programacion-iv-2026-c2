import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Esenciales } from './esenciales';

describe('Esenciales', () => {
  let component: Esenciales;
  let fixture: ComponentFixture<Esenciales>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Esenciales],
    }).compileComponents();

    fixture = TestBed.createComponent(Esenciales);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
