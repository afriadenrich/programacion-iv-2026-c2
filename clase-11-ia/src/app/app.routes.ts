import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'home',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'about',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'games',
    canActivate: [authGuard],
    children: [
      {
        path: 'hangman',
        loadComponent: () =>
          import('./pages/games/hangman/hangman.component').then((m) => m.HangmanComponent),
      },
      {
        path: 'higher-lower',
        loadComponent: () =>
          import('./pages/games/higher-lower/higher-lower.component').then(
            (m) => m.HigherLowerComponent,
          ),
      },
      {
        path: 'trivia',
        loadComponent: () =>
          import('./pages/games/trivia/trivia.component').then((m) => m.TriviaComponent),
      },
      {
        path: 'battleship',
        loadComponent: () =>
          import('./pages/games/battleship/battleship.component').then(
            (m) => m.BattleshipComponent,
          ),
      },
    ],
  },
  {
    path: 'rankings',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/rankings/rankings.component').then((m) => m.RankingsComponent),
  },
  {
    path: 'chat',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/chat/chat.component').then((m) => m.ChatComponent),
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
