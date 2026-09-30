/**
 * 03_web_events_simulator/js/components/LayerInspectorModal.js
 * COMPONENT MODAL INSPECTOR SOI THỨ TỰ CÁC LỚP DISPLAY LAYER Z-INDEX
 */

import { LAYER_STACK, layerManager } from '../core/LayerManager.js';
import { eventDispatcher } from '../core/EventDispatcher.js';

export class LayerInspectorModalComponent {
    constructor() {
        this.render();
        this.bindEvents();
    }

    render() {
        const backdrop = document.createElement('div');
        backdrop.className = 'modal-backdrop';
        backdrop.id = 'modal-backdrop';

        const modal = document.createElement('div');
        modal.className = 'modal-window';
        modal.id = 'modal-layer-inspector';

        modal.innerHTML = `
            <div class="modal-header">
                <h3>🥞 Z-Index Layer Stacking Architecture</h3>
                <button class="btn-action" id="btn-close-modal" style="padding:4px 10px;">✕</button>
            </div>
            <p style="font-size:0.85rem; color:var(--text-secondary);">
                Hệ thống phân lớp Layer được thiết lập nghiêm ngặt để đảm bảo giao diện luôn hiển thị chính xác, 
                không bao giờ bị lỗi đè lớp hay mất tiêu điểm tương tác khi có nhiều sự kiện phức tạp.
            </p>
            <div class="layer-stack-list">
                ${LAYER_STACK.map(layer => `
                    <div class="layer-item">
                        <div>
                            <strong>${layer.name}</strong>
                            <div style="font-size:0.75rem; color:var(--text-muted);">${layer.role}</div>
                        </div>
                        <span style="color:var(--accent-mouse); font-weight:700;">z-index: ${layer.zIndex}</span>
                    </div>
                `).join('')}
            </div>
        `;

        document.body.appendChild(backdrop);
        document.body.appendChild(modal);
    }

    bindEvents() {
        const closeModal = () => {
            eventDispatcher.dispatch('modal:close', { target: 'LayerInspectorModal' });
            layerManager.closeModal('#modal-layer-inspector', '#modal-backdrop');
        };

        document.querySelector('#btn-close-modal').addEventListener('click', closeModal);
        document.querySelector('#modal-backdrop').addEventListener('click', closeModal);
    }
}
