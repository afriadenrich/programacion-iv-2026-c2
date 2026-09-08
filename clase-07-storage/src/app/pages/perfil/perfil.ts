import { Component, inject } from '@angular/core';
import { Auth } from '../../services/auth.service';

@Component({
  imports: [],
  selector: 'app-perfil',
  styleUrl: './perfil.css',
  templateUrl: './perfil.html',
})
export class Perfil {
  protected authS = inject(Auth);
}
