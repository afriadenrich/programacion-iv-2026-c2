import { Injectable } from '@angular/core';
import Toastify from 'toastify-js';

export type NotificationType = 'success' | 'error' | 'info' | 'warning';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private colorMap: Record<NotificationType, string> = {
    success: '#10b981',
    error: '#ef4444',
    info: '#3b82f6',
    warning: '#f59e0b',
  };

  show(message: string, type: NotificationType = 'info', duration: number = 3000) {
    Toastify({
      text: message,
      duration,
      gravity: 'top',
      position: 'right',
      backgroundColor: this.colorMap[type],
      stopOnFocus: true,
    }).showToast();
  }

  success(message: string, duration: number = 3000) {
    this.show(message, 'success', duration);
  }

  error(message: string, duration: number = 3000) {
    this.show(message, 'error', duration);
  }

  info(message: string, duration: number = 3000) {
    this.show(message, 'info', duration);
  }

  warning(message: string, duration: number = 3000) {
    this.show(message, 'warning', duration);
  }
}
