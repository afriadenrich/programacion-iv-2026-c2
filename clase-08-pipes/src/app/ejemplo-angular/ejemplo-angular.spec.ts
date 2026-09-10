import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EjemploAngular } from './ejemplo-angular';

describe('EjemploAngular', () => {
  let component: EjemploAngular;
  let fixture: ComponentFixture<EjemploAngular>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjemploAngular],
    }).compileComponents();

    fixture = TestBed.createComponent(EjemploAngular);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
