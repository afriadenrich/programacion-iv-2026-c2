import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Autos } from './autos';

describe('Autos', () => {
  let component: Autos;
  let fixture: ComponentFixture<Autos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Autos],
    }).compileComponents();

    fixture = TestBed.createComponent(Autos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
