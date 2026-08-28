import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorRequired } from './error-required';

describe('ErrorRequired', () => {
  let component: ErrorRequired;
  let fixture: ComponentFixture<ErrorRequired>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorRequired],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorRequired);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
