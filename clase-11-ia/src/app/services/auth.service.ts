import { Injectable, signal, computed, inject } from '@angular/core';
import { supabase } from '../lib/supabase.client';
import { Router } from '@angular/router';

export interface User {
  id: string;
  email: string;
  username: string;
  name: string;
  surname: string;
  birth_date: string;
  profile_photo_url: string;
  role: 'regular' | 'admin';
  created_at: string;
  updated_at: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private router = inject(Router);

  // Signals for state management
  currentUser = signal<User | null>(null);
  isLoading = signal(false);
  mobileMenuOpen = signal(false);

  // Computed properties
  isAuthenticated = computed(() => this.currentUser() !== null);
  currentUsername = computed(() => this.currentUser()?.username || '');
  currentUserId = computed(() => this.currentUser()?.id || '');

  constructor() {
    this.initializeAuth();
  }

  private async initializeAuth() {
    try {
      const { data } = await supabase.auth.getSession();
      if (data.session?.user?.id) {
        // Load user profile from database
        await this.loadUserProfile(data.session.user.id);
      }
    } catch (error) {
      console.error('Failed to initialize auth:', error);
    }
  }

  private async loadUserProfile(userId: string) {
    try {
      const { data, error } = await supabase.from('users').select('*').eq('id', userId).single();

      if (error) throw error;
      this.currentUser.set(data);
    } catch (error) {
      console.error('Failed to load user profile:', error);
    }
  }

  async login(emailOrUsername: string, password: string) {
    this.isLoading.set(true);
    try {
      // Try login with email first
      let { data, error } = await supabase.auth.signInWithPassword({
        email: emailOrUsername,
        password,
      });

      if (error && error.message.includes('Invalid login credentials')) {
        // If email fails, try to find user by username and get their email
        const { data: userData } = await supabase
          .from('users')
          .select('email')
          .eq('username', emailOrUsername)
          .single();

        if (userData?.email) {
          ({ data, error } = await supabase.auth.signInWithPassword({
            email: userData.email,
            password,
          }));
        }
      }

      if (error) throw error;

      if (data.session?.user?.id) {
        await this.loadUserProfile(data.session.user.id);
      }

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Login failed',
      };
    } finally {
      this.isLoading.set(false);
    }
  }

  async register(userData: Partial<User> & { password: string }) {
    this.isLoading.set(true);
    try {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: userData.email!,
        password: userData.password,
      });

      if (authError) throw authError;

      if (!authData.user?.id) throw new Error('Failed to create user');

      // Create user profile
      const { error: profileError } = await supabase.from('users').insert([
        {
          id: authData.user.id,
          email: userData.email,
          username: userData.username,
          name: userData.name,
          surname: userData.surname,
          birth_date: userData.birth_date,
          profile_photo_url: userData.profile_photo_url || '',
          role: 'regular',
        },
      ]);

      if (profileError) throw profileError;

      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Registration failed',
      };
    } finally {
      this.isLoading.set(false);
    }
  }

  async logout() {
    try {
      await supabase.auth.signOut();
      this.currentUser.set(null);
      this.mobileMenuOpen.set(false);
      return { success: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Logout failed',
      };
    }
  }

  toggleMobileMenu() {
    this.mobileMenuOpen.update((v) => !v);
  }
}
