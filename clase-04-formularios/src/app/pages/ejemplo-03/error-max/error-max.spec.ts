import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMax } from './error-max';

describe('ErrorMax', () => {
  let component: ErrorMax;
  let fixture: ComponentFixture<ErrorMax>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMax],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMax);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
