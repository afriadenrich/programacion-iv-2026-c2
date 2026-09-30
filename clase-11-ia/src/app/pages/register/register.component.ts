import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { supabase } from '../../lib/supabase.client';
import Toastify from 'toastify-js';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div
      class="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div class="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">Register</h2>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" class="space-y-4">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              formControlName="email"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              [class.border-red-500]="isFieldInvalid('email')"
              placeholder="your@email.com"
            />
            @if (isFieldInvalid('email')) {
              <p class="mt-1 text-sm text-red-600">{{ getFieldError('email') }}</p>
            }
          </div>

          <!-- Name -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">First Name</label>
            <input
              type="text"
              id="name"
              formControlName="name"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              [class.border-red-500]="isFieldInvalid('name')"
              placeholder="John"
            />
            @if (isFieldInvalid('name')) {
              <p class="mt-1 text-sm text-red-600">{{ getFieldError('name') }}</p>
            }
          </div>

          <!-- Surname -->
          <div>
            <label for="surname" class="block text-sm font-medium text-gray-700">Last Name</label>
            <input
              type="text"
              id="surname"
              formControlName="surname"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              [class.border-red-500]="isFieldInvalid('surname')"
              placeholder="Doe"
            />
            @if (isFieldInvalid('surname')) {
              <p class="mt-1 text-sm text-red-600">{{ getFieldError('surname') }}</p>
            }
          </div>

          <!-- Username -->
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">Username</label>
            <input
              type="text"
              id="username"
              formControlName="username"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              [class.border-red-500]="isFieldInvalid('username')"
              placeholder="john_doe"
            />
            @if (isFieldInvalid('username')) {
              <p class="mt-1 text-sm text-red-600">{{ getFieldError('username') }}</p>
            }
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              formControlName="password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              [class.border-red-500]="isFieldInvalid('password')"
              placeholder="••••••••"
            />
            @if (isFieldInvalid('password')) {
              <p class="mt-1 text-sm text-red-600">{{ getFieldError('password') }}</p>
            }
          </div>

          <!-- Birth Date -->
          <div>
            <label for="birthDate" class="block text-sm font-medium text-gray-700"
              >Birth Date</label
            >
            <input
              type="date"
              id="birthDate"
              formControlName="birthDate"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              [class.border-red-500]="isFieldInvalid('birthDate')"
            />
            @if (isFieldInvalid('birthDate')) {
              <p class="mt-1 text-sm text-red-600">{{ getFieldError('birthDate') }}</p>
            }
          </div>

          <!-- Profile Photo -->
          <div>
            <label for="profilePhoto" class="block text-sm font-medium text-gray-700"
              >Profile Photo</label
            >
            <input
              type="file"
              id="profilePhoto"
              accept="image/*"
              (change)="onFileSelected($event)"
              class="mt-1 block w-full text-sm text-gray-500"
            />
            @if (selectedFileName()) {
              <p class="mt-1 text-sm text-green-600">✓ {{ selectedFileName() }}</p>
            }
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            [disabled]="form.invalid || isLoading()"
            class="w-full bg-primary-600 hover:bg-primary-700 disabled:bg-gray-400 text-white font-bold py-2 px-4 rounded-md transition duration-200"
          >
            {{ isLoading() ? 'Registering...' : 'Register' }}
          </button>
        </form>

        <!-- Login Link -->
        <p class="mt-4 text-center text-gray-600">
          Already have an account?
          <a routerLink="/login" class="text-primary-600 hover:text-primary-700 font-medium">
            Login here
          </a>
        </p>
      </div>
    </div>
  `,
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  isLoading = this.authService.isLoading;
  selectedFile = signal<File | null>(null);
  selectedFileName = signal<string>('');

  form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    name: ['', [Validators.required, Validators.minLength(2)]],
    surname: ['', [Validators.required, Validators.minLength(2)]],
    username: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    birthDate: ['', Validators.required],
  });

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    if (files && files.length > 0) {
      this.selectedFile.set(files[0]);
      this.selectedFileName.set(files[0].name);
    }
  }

  async onSubmit() {
    if (this.form.invalid) return;

    this.authService.isLoading.set(true);
    try {
      const { email, name, surname, username, password, birthDate } = this.form.value;

      let profilePhotoUrl = '';

      // Upload profile photo if selected
      if (this.selectedFile()) {
        const file = this.selectedFile()!;
        const fileExt = file.name.split('.').pop();
        const fileName = `${username}-${Date.now()}.${fileExt}`;

        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('profile-photos')
          .upload(`public/${fileName}`, file);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('profile-photos')
          .getPublicUrl(`public/${fileName}`);

        profilePhotoUrl = urlData.publicUrl;
      }

      // Register user
      const result = await this.authService.register({
        email: email || '',
        name: name || '',
        surname: surname || '',
        username: username || '',
        password: password || '',
        birth_date: birthDate || '',
        profile_photo_url: profilePhotoUrl,
      });

      if (result.success) {
        Toastify({
          text: 'Registration successful! Please login.',
          duration: 3000,
          gravity: 'top',
          position: 'right',
          backgroundColor: '#10b981',
        }).showToast();
        this.router.navigate(['/login']);
      } else {
        throw new Error(result.error);
      }
    } catch (error: any) {
      Toastify({
        text: error.message || 'Registration failed',
        duration: 3000,
        gravity: 'top',
        position: 'right',
        backgroundColor: '#ef4444',
      }).showToast();
    } finally {
      this.authService.isLoading.set(false);
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
    if (field.hasError('email')) return 'Invalid email format';
    if (field.hasError('minlength'))
      return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
    if (field.hasError('maxlength'))
      return `${fieldName} must be no more than ${field.errors['maxlength'].requiredLength} characters`;
    return 'Invalid input';
  }
}
