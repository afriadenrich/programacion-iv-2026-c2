declare module 'toastify-js' {
  interface ToastifyOptions {
    text?: string;
    node?: HTMLElement;
    duration?: number;
    selector?: string | HTMLElement;
    destination?: (element: HTMLElement) => void;
    newWindow?: boolean;
    close?: boolean;
    gravity?: 'top' | 'bottom';
    position?: 'left' | 'center' | 'right';
    backgroundColor?: string;
    avatar?: string;
    className?: string;
    onClick?: () => void;
    offset?: {
      x?: number;
      y?: number;
    };
    escapeMarkup?: boolean;
    ariaLive?: 'polite' | 'assertive';
    stopOnFocus?: boolean;
  }

  interface Toast {
    showToast(): Toast;
    hideToast(): void;
  }

  function Toastify(options: ToastifyOptions): Toast;

  export default Toastify;
}
