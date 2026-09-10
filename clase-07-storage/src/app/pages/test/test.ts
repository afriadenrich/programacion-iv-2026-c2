import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { StorageService } from '../../services/storage-service';

@Component({
  imports: [ReactiveFormsModule],
  selector: 'app-test',
  styleUrl: './test.css',
  templateUrl: './test.html',
})
export class Test {
  fb = inject(FormBuilder);
  storage = inject(StorageService);

  error = signal<any>(null);

  formulario = this.fb.group({
    ruta: ['perfil/01.png', [Validators.required]],
    foto: new FormControl<File | null>(null, [Validators.required]), // Esto no obtiene el FILE, obtiene el string del fakepath
  });

  cargarImagen(evento: InputEvent) {
    const elemento = evento.target as HTMLInputElement;
    if (elemento.files) {
      this.formulario.controls.foto.setValue(elemento.files[0]);
    }
  }

  async enviar() {
    console.log(this.formulario.value);
    if (this.formulario.valid) {
      const url = await this.storage.subirArchivo(
        this.formulario.value.foto!,
        // this.formulario.value.ruta,
      );

      if (!url) {
        this.error.set('Error al subir la imagen');
      }
    }
  }
}
