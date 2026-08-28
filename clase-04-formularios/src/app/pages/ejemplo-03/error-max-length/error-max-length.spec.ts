import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMaxLength } from './error-max-length';

describe('ErrorMaxLength', () => {
  let component: ErrorMaxLength;
  let fixture: ComponentFixture<ErrorMaxLength>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMaxLength],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMaxLength);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
