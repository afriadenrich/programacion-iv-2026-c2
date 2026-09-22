import { Service } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Service()
export class SupabaseService {
  private sup: SupabaseClient;

  constructor() {
    this.sup = createClient(environment.SUPABASE_URL, environment.SUPABASE_KEY);
  }

  public get Sup() {
    return this.sup;
  }

  public get Stg() {
    return this.sup.storage;
  }
  public get Auth() {
    return this.sup.auth;
  }
}
