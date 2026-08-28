import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ejemplo04 } from './ejemplo-04';

describe('Ejemplo04', () => {
  let component: Ejemplo04;
  let fixture: ComponentFixture<Ejemplo04>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ejemplo04],
    }).compileComponents();

    fixture = TestBed.createComponent(Ejemplo04);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
