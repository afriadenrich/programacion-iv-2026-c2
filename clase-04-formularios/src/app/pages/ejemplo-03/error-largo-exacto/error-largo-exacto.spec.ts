import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorLargoExacto } from './error-largo-exacto';

describe('ErrorLargoExacto', () => {
  let component: ErrorLargoExacto;
  let fixture: ComponentFixture<ErrorLargoExacto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorLargoExacto],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorLargoExacto);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
