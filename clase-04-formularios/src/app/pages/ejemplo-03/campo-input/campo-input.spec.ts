import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CampoInput } from './campo-input';

describe('CampoInput', () => {
  let component: CampoInput;
  let fixture: ComponentFixture<CampoInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CampoInput],
    }).compileComponents();

    fixture = TestBed.createComponent(CampoInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
