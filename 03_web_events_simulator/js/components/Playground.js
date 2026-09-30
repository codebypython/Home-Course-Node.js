/**
 * 03_web_events_simulator/js/components/Playground.js
 * KHU VỰC TƯƠNG TÁC THỰC TẾ (INTERACTIVE PLAYGROUND)
 * Bắt và phát kích hoạt thực sự các sự kiện Chuột, Phím, Cảm ứng, Form, Kéo thả, Media...
 */

import { eventDispatcher } from '../core/EventDispatcher.js';

export class PlaygroundComponent {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.render();
        this.bindDOMEvents();
    }

    render() {
        this.container.innerHTML = `
            <div class="playground-grid">
                <!-- 1. MOUSE & POINTER INTERACTION BOX -->
                <div class="interactive-box" id="box-mouse-touch">
                    <h4>🖱️ Mouse & Touch Zone <span style="font-size:0.7rem; color:var(--accent-mouse)">Layer 10</span></h4>
                    <div class="touch-canvas-area" id="interactive-canvas">
                        Di chuột, Bấm, DblClick, Chuột phải hoặc Chạm cảm ứng vào đây
                    </div>
                </div>

                <!-- 2. FORM & KEYBOARD INPUT BOX -->
                <div class="interactive-box">
                    <h4>⌨️ Form & Keyboard Zone</h4>
                    <input type="text" class="form-control-input" id="interactive-input" placeholder="Gõ phím, Select text, Focus, Blur tại đây..." />
                    <div style="display:flex; gap:8px;">
                        <button class="btn-action" id="btn-trigger-form">Submit Form</button>
                        <button class="btn-action" id="btn-trigger-reset">Reset Form</button>
                    </div>
                </div>

                <!-- 3. DRAG & DROP BOX -->
                <div class="interactive-box">
                    <h4>📦 Drag & Drop Zone</h4>
                    <div class="drag-zone-wrapper">
                        <div class="drag-item" draggable="true" id="draggable-card">Kéo tôi 📦</div>
                        <div class="drop-target" id="drop-target-box">Thả vào đây</div>
                    </div>
                </div>

                <!-- 4. MEDIA & SYSTEM CONTROLS -->
                <div class="interactive-box">
                    <h4>🎵 Media & System Triggers</h4>
                    <div style="display:flex; flex-wrap:wrap; gap:8px;">
                        <button class="btn-action" id="btn-media-play">▶️ Play</button>
                        <button class="btn-action" id="btn-media-pause">⏸️ Pause</button>
                        <button class="btn-action" id="btn-toast-trigger">🔔 Trigger Toast</button>
                        <button class="btn-action" id="btn-custom-idle">💤 Idle Test</button>
                    </div>
                </div>
            </div>
        `;
    }

    bindDOMEvents() {
        // --- 1. MOUSE EVENTS ---
        const canvas = this.container.querySelector('#interactive-canvas');

        ['click', 'dblclick', 'mousedown', 'mouseup', 'mouseenter', 'mouseleave', 'mouseover', 'mouseout', 'contextmenu'].forEach(evt => {
            canvas.addEventListener(evt, (e) => {
                if (evt === 'contextmenu') e.preventDefault();
                eventDispatcher.dispatch(evt, { x: e.offsetX, y: e.offsetY });
            });
        });

        // Throttle mousemove
        const throttledMouseMove = eventDispatcher.throttle((e) => {
            eventDispatcher.dispatch('mousemove', { x: e.clientX, y: e.clientY });
            eventDispatcher.dispatch('event:throttled', { type: 'mousemove throttled' });
        }, 80);
        canvas.addEventListener('mousemove', throttledMouseMove);

        // --- 2. POINTER & TOUCH EVENTS ---
        ['pointerdown', 'pointermove', 'pointerup', 'pointercancel', 'pointerover', 'pointerout'].forEach(evt => {
            canvas.addEventListener(evt, (e) => eventDispatcher.dispatch(evt, { pointerId: e.pointerId }));
        });

        ['touchstart', 'touchmove', 'touchend', 'touchcancel'].forEach(evt => {
            canvas.addEventListener(evt, (e) => eventDispatcher.dispatch(evt, { touches: e.touches.length }), { passive: true });
        });

        // --- 3. FORM & KEYBOARD EVENTS ---
        const input = this.container.querySelector('#interactive-input');

        ['focus', 'blur', 'focusin', 'focusout', 'change', 'input', 'select', 'invalid'].forEach(evt => {
            input.addEventListener(evt, () => eventDispatcher.dispatch(evt, { value: input.value }));
        });

        // Keyboard shortcuts
        input.addEventListener('keydown', (e) => {
            eventDispatcher.dispatch('keydown', { key: e.key, code: e.code });
            if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                e.preventDefault();
                eventDispatcher.dispatch('shortcut:save', { shortcut: 'Ctrl+S' });
            }
            if (e.key === 'Escape') eventDispatcher.dispatch('shortcut:esc', { shortcut: 'ESC' });
            if (e.key === 'Tab') eventDispatcher.dispatch('shortcut:tab', { shortcut: 'Tab' });
        });

        ['keyup', 'keypress', 'compositionstart', 'compositionupdate', 'compositionend'].forEach(evt => {
            input.addEventListener(evt, (e) => eventDispatcher.dispatch(evt, { key: e.key }));
        });

        this.container.querySelector('#btn-trigger-form').addEventListener('click', () => eventDispatcher.dispatch('submit', { form: 'MockForm' }));
        this.container.querySelector('#btn-trigger-reset').addEventListener('click', () => eventDispatcher.dispatch('reset', { form: 'MockForm' }));

        // --- 4. DRAG & DROP EVENTS ---
        const dragItem = this.container.querySelector('#draggable-card');
        const dropTarget = this.container.querySelector('#drop-target-box');

        ['dragstart', 'drag', 'dragend'].forEach(evt => {
            dragItem.addEventListener(evt, () => eventDispatcher.dispatch(evt, { itemId: dragItem.id }));
        });

        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evt => {
            dropTarget.addEventListener(evt, (e) => {
                e.preventDefault();
                if (evt === 'dragover') dropTarget.classList.add('drag-over');
                if (evt === 'dragleave' || evt === 'drop') dropTarget.classList.remove('drag-over');
                eventDispatcher.dispatch(evt, { target: 'DropTargetBox' });
            });
        });

        // Clipboard
        document.addEventListener('copy', () => eventDispatcher.dispatch('clipboard:copy'));
        document.addEventListener('cut', () => eventDispatcher.dispatch('clipboard:cut'));
        document.addEventListener('paste', () => eventDispatcher.dispatch('clipboard:paste'));

        // --- 5. MEDIA & CUSTOM TRIGGERS ---
        this.container.querySelector('#btn-media-play').addEventListener('click', () => eventDispatcher.dispatch('media:play'));
        this.container.querySelector('#btn-media-pause').addEventListener('click', () => eventDispatcher.dispatch('media:pause'));
        this.container.querySelector('#btn-toast-trigger').addEventListener('click', () => eventDispatcher.dispatch('toast:trigger', { message: 'Thông báo Toast hiển thị ở Layer 9000!' }));
        this.container.querySelector('#btn-custom-idle').addEventListener('click', () => eventDispatcher.dispatch('system:idle'));

        // --- 6. WINDOW EVENTS ---
        window.addEventListener('resize', eventDispatcher.debounce(() => eventDispatcher.dispatch('resize', { w: window.innerWidth, h: window.innerHeight }), 200));
        window.addEventListener('scroll', eventDispatcher.throttle(() => eventDispatcher.dispatch('scroll', { scrollY: window.scrollY }), 100));
        window.addEventListener('online', () => eventDispatcher.dispatch('network:online'));
        window.addEventListener('offline', () => eventDispatcher.dispatch('network:offline'));
        window.addEventListener('visibilitychange', () => eventDispatcher.dispatch('visibilitychange', { hidden: document.hidden }));
    }
}
