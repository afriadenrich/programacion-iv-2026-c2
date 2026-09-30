import { Injectable, inject } from '@angular/core';
import { signal } from '@angular/core';
import { supabase } from '../lib/supabase.client';
import { AuthService } from './auth.service';

export interface ChatMessage {
  id: string;
  username: string;
  content: string;
  created_at: string;
}

@Injectable({ providedIn: 'root' })
export class ChatService {
  private authService = inject(AuthService);

  messages = signal<ChatMessage[]>([]);
  isLoading = signal(false);
  isSending = signal(false);
  subscription: any = null;

  async loadMessages(): Promise<void> {
    this.isLoading.set(true);
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .order('created_at', { ascending: true })
        .limit(100);

      if (error) throw error;
      this.messages.set((data || []) as ChatMessage[]);
    } finally {
      this.isLoading.set(false);
    }
  }

  async sendMessage(content: string): Promise<void> {
    const user = this.authService.currentUser();
    if (!user || !content.trim()) return;

    this.isSending.set(true);
    try {
      const { error } = await supabase.from('chat_messages').insert({
        username: user.username,
        content: content.trim(),
      });

      if (error) throw error;
    } finally {
      this.isSending.set(false);
    }
  }

  subscribeToMessages(): void {
    this.subscription = supabase
      .channel('public:chat_messages')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'chat_messages' },
        (payload: any) => {
          const newMessage = payload.new as ChatMessage;
          this.messages.update((msgs) => [...msgs, newMessage]);
        },
      )
      .subscribe();
  }

  unsubscribeFromMessages(): void {
    if (this.subscription) {
      supabase.removeChannel(this.subscription);
      this.subscription = null;
    }
  }

  formatTimestamp(timestamp: string): string {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }
}
