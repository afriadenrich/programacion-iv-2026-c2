import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMinLength } from './error-min-length';

describe('ErrorMinLength', () => {
  let component: ErrorMinLength;
  let fixture: ComponentFixture<ErrorMinLength>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMinLength],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMinLength);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
