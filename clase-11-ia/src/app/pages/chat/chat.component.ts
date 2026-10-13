import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  inject,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../services/chat.service';
import { signal } from '@angular/core';

@Component({
  selector: 'app-chat',
  template: `
    <div class="flex flex-col h-screen bg-background">
      <!-- Header -->
      <div class="bg-primary text-white p-4 shadow-md">
        <h1 class="text-2xl font-bold">Global Chat</h1>
        <p class="text-sm text-white/80">Connect with other players</p>
      </div>

      <!-- Messages Container -->
      <div class="flex-1 overflow-y-auto p-4 space-y-4" #messagesContainer>
        @if (chatService.isLoading()) {
          <div class="text-center py-8">
            <div
              class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-primary"
            ></div>
            <p class="mt-2 text-dark/70">Loading messages...</p>
          </div>
        }

        @if (!chatService.isLoading() && chatService.messages().length === 0) {
          <div class="text-center py-12">
            <p class="text-dark/60">No messages yet. Start the conversation!</p>
          </div>
        }

        @for (message of chatService.messages(); track message.id) {
          <div class="bg-white rounded-lg p-4 shadow-sm">
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-semibold text-dark">{{ message.username }}</h3>
              <span class="text-xs text-dark/50">{{
                chatService.formatTimestamp(message.created_at)
              }}</span>
            </div>
            <p class="text-dark/80 break-words">{{ message.content }}</p>
          </div>
        }
      </div>

      <!-- Message Input -->
      <div class="bg-white border-t border-dark/20 p-4">
        <form (ngSubmit)="sendMessage()" class="flex gap-2">
          <input
            [(ngModel)]="messageText"
            name="message"
            type="text"
            placeholder="Type your message..."
            class="flex-1 px-4 py-2 border border-dark/30 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary text-dark bg-white placeholder-dark/50"
            [disabled]="chatService.isSending()"
            aria-label="Message input"
          />
          <button
            type="submit"
            [disabled]="chatService.isSending() || !messageText.trim()"
            class="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {{ chatService.isSending() ? 'Sending...' : 'Send' }}
          </button>
        </form>
      </div>
    </div>
  `,
  standalone: true,
  imports: [CommonModule, FormsModule],
  host: { class: 'block w-full h-screen' },
})
export class ChatComponent implements OnInit, OnDestroy {
  chatService = inject(ChatService);
  messageText = '';
  @ViewChild('messagesContainer') messagesContainer!: ElementRef;

  ngOnInit(): void {
    this.chatService.loadMessages();
    this.chatService.subscribeToMessages();
  }

  ngOnDestroy(): void {
    this.chatService.unsubscribeFromMessages();
  }

  async sendMessage(): Promise<void> {
    const content = this.messageText;
    if (!content.trim()) return;

    await this.chatService.sendMessage(content);
    this.messageText = '';
  }

  ngAfterViewInit(): void {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    if (this.messagesContainer) {
      setTimeout(() => {
        this.messagesContainer.nativeElement.scrollTop =
          this.messagesContainer.nativeElement.scrollHeight;
      });
    }
  }
}
