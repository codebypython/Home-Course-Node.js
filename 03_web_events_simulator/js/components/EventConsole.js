/**
 * 03_web_events_simulator/js/components/EventConsole.js
 * COMPONENT CONSOLE STREAMING HỂN THỊ LOG SỰ KIỆN THỜI GIAN THỰC (60 FPS)
 */

import { eventDispatcher } from '../core/EventDispatcher.js';

export class EventConsoleComponent {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.maxLogs = 100;
        this.isAutoScroll = true;
        this.render();
        this.listenEvents();
    }

    render() {
        this.container.innerHTML = `
            <div class="console-card">
                <div class="console-header">
                    <span style="font-weight:600; font-size:0.875rem;">📟 Live Event Terminal <span style="font-size:0.7rem; color:var(--text-muted);">(Layer 100)</span></span>
                    <div class="console-controls">
                        <button class="btn-action" id="btn-pause-console">⏸ Pause</button>
                        <button class="btn-action" id="btn-clear-console">🧹 Clear</button>
                    </div>
                </div>
                <div class="console-body" id="console-stream-body">
                    <div class="log-entry" style="border-left-color: var(--accent-mouse);">
                        <span class="log-time">[System]</span>
                        <span class="log-event">Console Initialized</span>
                        <span class="log-target">Sẵn sàng nhận 100 sự kiện web...</span>
                    </div>
                </div>
            </div>
        `;

        this.body = this.container.querySelector('#console-stream-body');

        this.container.querySelector('#btn-pause-console').addEventListener('click', (e) => {
            eventDispatcher.isPaused = !eventDispatcher.isPaused;
            e.target.textContent = eventDispatcher.isPaused ? '▶ Resume' : '⏸ Pause';
        });

        this.container.querySelector('#btn-clear-console').addEventListener('click', () => {
            this.body.innerHTML = '';
        });
    }

    listenEvents() {
        eventDispatcher.on('*', (data) => {
            const entry = document.createElement('div');
            entry.className = 'log-entry';

            const payloadStr = Object.keys(data.payload).length > 0 
                ? JSON.stringify(data.payload) 
                : '';

            entry.innerHTML = `
                <span class="log-time">[${data.timestamp}]</span>
                <span class="log-event">${data.eventName}</span>
                <span class="log-target">${payloadStr}</span>
            `;

            this.body.appendChild(entry);

            // Cap logs at maxLogs for memory optimization
            if (this.body.children.length > this.maxLogs) {
                this.body.removeChild(this.body.firstChild);
            }

            // Auto scroll to bottom
            if (this.isAutoScroll) {
                this.body.scrollTop = this.body.scrollHeight;
            }
        });
    }
}
