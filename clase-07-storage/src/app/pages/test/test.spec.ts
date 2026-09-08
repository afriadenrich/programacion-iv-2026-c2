import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Test } from './test';

describe('Test', () => {
  let component: Test;
  let fixture: ComponentFixture<Test>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Test],
    }).compileComponents();

    fixture = TestBed.createComponent(Test);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
