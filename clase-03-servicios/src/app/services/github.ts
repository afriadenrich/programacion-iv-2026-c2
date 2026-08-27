import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface UsuarioGithub {
  login: string;
  avatar_url: string;
  bio: string;
}

@Service()
export class Github {
  http = inject(HttpClient);
  apiUrl = 'https://api.github.com/users/pepe';

  traerUsuarioGithub() {
    return this.http.get<UsuarioGithub>(this.apiUrl);
  }
}
