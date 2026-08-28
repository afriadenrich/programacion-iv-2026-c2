import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorPattern } from './error-pattern';

describe('ErrorPattern', () => {
  let component: ErrorPattern;
  let fixture: ComponentFixture<ErrorPattern>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorPattern],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorPattern);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
