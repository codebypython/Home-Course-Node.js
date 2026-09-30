/**
 * 03_web_events_simulator/js/core/EventDispatcher.js
 * HỆ THỐNG ĐIỀU PHỐI SỰ KIỆN, THROTTLE, DEBOUNCE & LOGGING STREAM
 */

class EventDispatcher {
    constructor() {
        this.listeners = new Map();
        this.totalTriggeredCount = 0;
        this.lastTriggerTime = Date.now();
        this.isPaused = false;
    }

    /**
     * Kỹ thuật Throttle: Đảm bảo hàm chỉ chạy 1 lần trong khoảng thời gian limit (ms)
     */
    throttle(fn, limit = 100) {
        let inThrottle;
        return (...args) => {
            if (!inThrottle) {
                fn.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }

    /**
     * Kỹ thuật Debounce: Chờ người dùng ngừng thao tác delay (ms) rồi mới thực thi
     */
    debounce(fn, delay = 300) {
        let timeoutId;
        return (...args) => {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                fn.apply(this, args);
            }, delay);
        };
    }

    /**
     * Đăng ký Lắng nghe sự kiện
     */
    on(eventName, callback) {
        if (!this.listeners.has(eventName)) {
            this.listeners.set(eventName, []);
        }
        this.listeners.get(eventName).push(callback);
    }

    /**
     * Phát kích hoạt sự kiện (Dispatch Event)
     */
    dispatch(eventName, payload = {}) {
        if (this.isPaused) return;

        this.totalTriggeredCount++;
        const eventData = {
            eventName,
            timestamp: new Date().toLocaleTimeString('vi-VN', { hour12: false }) + '.' + String(Date.now() % 1000).padStart(3, '0'),
            payload,
            count: this.totalTriggeredCount
        };

        // Kích hoạt các callback lắng nghe
        if (this.listeners.has(eventName)) {
            this.listeners.get(eventName).forEach(cb => cb(eventData));
        }

        // Kích hoạt callback toàn cục (Wildcard Listener)
        if (this.listeners.has('*')) {
            this.listeners.get('*').forEach(cb => cb(eventData));
        }
    }
}

export const eventDispatcher = new EventDispatcher();
