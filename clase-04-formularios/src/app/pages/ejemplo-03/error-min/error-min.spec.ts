import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorMin } from './error-min';

describe('ErrorMin', () => {
  let component: ErrorMin;
  let fixture: ComponentFixture<ErrorMin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorMin],
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
