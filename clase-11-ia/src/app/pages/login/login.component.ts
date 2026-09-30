import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Toastify from 'toastify-js';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div
      class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Login</h2>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
          <!-- Email or Username -->
          <div>
            <label for="emailOrUsername" class="block text-sm font-medium text-gray-700">
              Email or Username
            </label>
            <input
              type="text"
              id="emailOrUsername"
              formControlName="emailOrUsername"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              [class.border-red-500]="isFieldInvalid('emailOrUsername')"
              placeholder="Enter your email or username"
            />
            @if (isFieldInvalid('emailOrUsername')) {
              <p class="mt-1 text-sm text-red-600">{{ getFieldError('emailOrUsername') }}</p>
            }
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
            <input
              type="password"
              id="password"
              formControlName="password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              [class.border-red-500]="isFieldInvalid('password')"
              placeholder="Enter your password"
            />
            @if (isFieldInvalid('password')) {
              <p class="mt-1 text-sm text-red-600">{{ getFieldError('password') }}</p>
            }
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="form.invalid || isLoading()"
            class="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-md transition duration-200"
          >
            {{ isLoading() ? 'Logging in...' : 'Login' }}
          </button>
        </form>

        <!-- Register Link -->
        <p class="mt-4 text-center text-gray-600">
          Don't have an account?
          <a routerLink="/register" class="text-primary-600 hover:text-primary-700 font-medium">
            Register here
          </a>
        </p>
      </div>
    </div>
  `,
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = this.authService.isLoading;

  form = this.fb.group({
    emailOrUsername: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  async onSubmit() {
    if (this.form.invalid) return;

    const { emailOrUsername, password } = this.form.value;
    const result = await this.authService.login(emailOrUsername || '', password || '');

    if (result.success) {
      Toastify({
        text: 'Login successful!',
        duration: 3000,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#10b981',
      }).showToast();
      this.router.navigate(['/home']);
    } else {
      Toastify({
        text: result.error || 'Login failed',
        duration: 3000,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#ef4444',
      }).showToast();
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (!field?.errors) return '';

    if (field.hasError('required')) return `${fieldName} is required`;
    if (field.hasError('minlength'))
      return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
    return 'Invalid input';
  }
}
