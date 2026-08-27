import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Ejemplo02 } from './ejemplo-02';

describe('Ejemplo02', () => {
  let component: Ejemplo02;
  let fixture: ComponentFixture<Ejemplo02>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ejemplo02],
    }).compileComponents();

    fixture = TestBed.createComponent(Ejemplo02);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
