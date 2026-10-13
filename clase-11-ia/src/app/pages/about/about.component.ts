import { Component, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

@Component({
  selector: 'app-about',
  template: `
    <div class="min-h-screen bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-2xl mx-auto">
        <h1 class="text-4xl font-bold text-dark mb-8 text-center">About the Creator</h1>

        @if (isLoading()) {
          <div class="text-center py-12">
            <div
              class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
            ></div>
            <p class="mt-4 text-dark/70">Loading profile...</p>
          </div>
        }

        @if (error()) {
          <div class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p class="text-red-700 mb-4">{{ error() }}</p>
            <button
              (click)="loadGitHubProfile()"
              class="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Try Again
            </button>
          </div>
        }

        @if (profile() && !isLoading()) {
          <div class="bg-white rounded-lg shadow-lg overflow-hidden">
            <!-- Profile Header -->
            <div class="bg-gradient-to-r from-primary to-secondary h-32"></div>

            <!-- Profile Content -->
            <div class="px-6 pb-6">
              <!-- Avatar -->
              <div class="flex justify-center -mt-20 mb-6">
                <img
                  [src]="profile()!.avatar_url"
                  [alt]="'Profile picture of ' + profile()!.name"
                  class="w-40 h-40 rounded-full border-4 border-white shadow-lg"
                />
              </div>

              <!-- User Info -->
              <div class="text-center mb-6">
                <h2 class="text-3xl font-bold text-dark">{{ profile()!.name }}</h2>
                <p class="text-primary font-semibold mb-2">@{{ profile()!.login }}</p>
                <p class="text-dark/70">{{ profile()!.bio }}</p>
              </div>

              <!-- Stats -->
              <div class="grid grid-cols-3 gap-4 mb-6 py-6 border-y border-dark/10">
                <div class="text-center">
                  <p class="text-2xl font-bold text-primary">{{ profile()!.public_repos }}</p>
                  <p class="text-sm text-dark/70">Repositories</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-bold text-primary">{{ profile()!.followers }}</p>
                  <p class="text-sm text-dark/70">Followers</p>
                </div>
                <div class="text-center">
                  <p class="text-2xl font-bold text-primary">{{ profile()!.following }}</p>
                  <p class="text-sm text-dark/70">Following</p>
                </div>
              </div>

              <!-- GitHub Link -->
              <div class="text-center">
                <a
                  [href]="profile()!.html_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="inline-block px-6 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                  aria-label="Visit GitHub profile"
                >
                  Visit GitHub Profile
                </a>
              </div>
            </div>
          </div>

          <!-- About the Platform -->
          <div class="bg-white rounded-lg shadow-lg p-6 mt-8">
            <h3 class="text-2xl font-bold text-dark mb-4">About This Platform</h3>
            <p class="text-dark/70 mb-4">
              This gaming platform was built with Angular 22 and Supabase to provide an engaging
              experience with multiple games, real-time chat, and competitive rankings.
            </p>
            <p class="text-dark/70">
              Features include four unique games, user authentication, game result tracking, and a
              global chat system. The platform emphasizes responsive design, accessibility, and
              secure data handling.
            </p>
          </div>
        }
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule],
  host: { class: 'block w-full' },
})
export class AboutComponent implements OnInit {
  private http = inject(HttpClient);
  profile = signal<GitHubUser | null>(null);
  isLoading = signal(false);
  error = signal('');

  ngOnInit(): void {
    this.loadGitHubProfile();
  }

  loadGitHubProfile(): void {
    this.isLoading.set(true);
    this.error.set('');

    this.http.get<GitHubUser>('https://api.github.com/users/afriadenrich').subscribe({
      next: (data) => {
        this.profile.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Error loading GitHub profile:', err);
        this.error.set('Failed to load GitHub profile. Please try again.');
        this.isLoading.set(false);
      },
    });
  }
}
