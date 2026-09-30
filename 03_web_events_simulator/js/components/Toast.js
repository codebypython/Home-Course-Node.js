/**
 * 03_web_events_simulator/js/components/Toast.js
 * COMPONENT GLOBAL TOAST NOTIFICATION (HIỂN THỊ TRÊN CÙNG Z-INDEX 9000)
 */

import { eventDispatcher } from '../core/EventDispatcher.js';

export class ToastComponent {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'toast-container';
        document.body.appendChild(this.container);
        this.listenEvents();
    }

    showToast(message, duration = 3000) {
        const toast = document.createElement('div');
        toast.className = 'toast-message';
        toast.textContent = message;

        this.container.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                if (toast.parentNode) {
                    this.container.removeChild(toast);
                }
            }, 300);
        }, duration);
    }

    listenEvents() {
        eventDispatcher.on('toast:trigger', (data) => {
            const msg = data.payload.message || `Sự kiện ${data.eventName} được kích hoạt!`;
            this.showToast(msg);
        });

        eventDispatcher.on('shortcut:save', () => {
            this.showToast('💾 Đã lưu trạng thái ứng dụng (Shortcut Ctrl+S)!');
        });

        eventDispatcher.on('network:offline', () => {
            this.showToast('⚠️ Mất kết nối Internet (Network Offline Event)!');
        });

        eventDispatcher.on('network:online', () => {
            this.showToast('🟢 Đã khôi phục kết nối Internet (Network Online Event)!');
        });
    }
}
