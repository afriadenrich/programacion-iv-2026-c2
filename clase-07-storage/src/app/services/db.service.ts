import { inject, Service } from '@angular/core';
import { SupabaseService } from './supabase';

@Service()
export class DbService {
  private supS = inject(SupabaseService);
}
