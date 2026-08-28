import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-campo-input',
  styleUrl: './campo-input.css',
  templateUrl: './campo-input.html',
})
export class CampoInput {
  id = input('');
  label = input('');
  control = input<FormControl>();
  type = input('');
}
