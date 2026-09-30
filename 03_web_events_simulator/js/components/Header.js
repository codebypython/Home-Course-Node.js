/**
 * 03_web_events_simulator/js/components/Header.js
 * COMPONENT HEADER & THANH TRẠNG THÁI HỆ THỐNG
 */

import { eventDispatcher } from '../core/EventDispatcher.js';
import { layerManager } from '../core/LayerManager.js';

export class HeaderComponent {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.fps = 60;
        this.frameCount = 0;
        this.lastTime = performance.now();
        this.render();
        this.startFPSCounter();
        this.listenEvents();
    }

    render() {
        this.container.innerHTML = `
            <div class="brand-title">
                <span>⚡ 100 WEB EVENTS SIMULATOR</span>
            </div>
            <div class="header-stats">
                <div class="stat-badge">
                    <span>Trạng thái FPS:</span>
                    <span class="stat-value" id="fps-counter">60 FPS</span>
                </div>
                <div class="stat-badge">
                    <span>Tổng Sự Kiện:</span>
                    <span class="stat-value" id="total-event-counter">0</span>
                </div>
                <button class="btn-action btn-accent" id="btn-inspect-layers">
                    🥞 Inspect Z-Index Layers
                </button>
            </div>
        `;

        // Bind button event
        this.container.querySelector('#btn-inspect-layers').addEventListener('click', () => {
            eventDispatcher.dispatch('modal:open', { target: 'LayerInspectorModal' });
            layerManager.openModal('#modal-layer-inspector', '#modal-backdrop');
        });
    }

    listenEvents() {
        eventDispatcher.on('*', () => {
            const counterEl = this.container.querySelector('#total-event-counter');
            if (counterEl) {
                counterEl.textContent = eventDispatcher.totalTriggeredCount;
            }
        });
    }

    startFPSCounter() {
        const calcFPS = (now) => {
            this.frameCount++;
            if (now - this.lastTime >= 1000) {
                this.fps = Math.round((this.frameCount * 1000) / (now - this.lastTime));
                this.frameCount = 0;
                this.lastTime = now;
                const fpsEl = this.container.querySelector('#fps-counter');
                if (fpsEl) fpsEl.textContent = `${this.fps} FPS`;
            }
            requestAnimationFrame(calcFPS);
        };
        requestAnimationFrame(calcFPS);
    }
}
