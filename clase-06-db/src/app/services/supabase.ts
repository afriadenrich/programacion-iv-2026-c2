import { Service } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Service()
export class Supabase {
  private sup: SupabaseClient;

  constructor() {
    this.sup = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY);
  }

  public get Sup() {
    return this.sup;
  }
}
