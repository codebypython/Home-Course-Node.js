/**
 * 03_web_events_simulator/js/core/LayerManager.js
 * QUẢN LÝ QUY HOẠCH CÁC TẦNG HỂN THỊ Z-INDEX & STACKING CONTEXTS
 */

export const LAYER_STACK = [
    { name: 'Layer -1: Matrix Canvas Background', zIndex: -1, selector: '#layer-matrix-bg', role: 'Hiệu ứng phông nền ma trận tĩnh' },
    { name: 'Layer 0: Main Base App Layout', zIndex: 0, selector: '#app-container', role: 'Khung bố cục chính và bảng sự kiện' },
    { name: 'Layer 10: Interactive Playground', zIndex: 10, selector: '.playground-section', role: 'Khu vực thao tác kéo thả, bấm chuột, gõ phím' },
    { name: 'Layer 100: Floating Control Console', zIndex: 100, selector: '.console-section', role: 'Bảng log sự kiện thời gian thực' },
    { name: 'Layer 500: Glassmorphic Backdrop', zIndex: 500, selector: '.modal-backdrop', role: 'Tấm nền tối mờ kính khi mở Modal' },
    { name: 'Layer 1000: Modal Inspector Window', zIndex: 1000, selector: '.modal-window', role: 'Cửa sổ Pop-up soi thứ tự các lớp Layer' },
    { name: 'Layer 9000: Global Notification Toast', zIndex: 9000, selector: '.toast-container', role: 'Hệ thống Toast thông báo trên cùng' }
];

class LayerManager {
    constructor() {
        this.activeModal = null;
    }

    openModal(modalSelector, backdropSelector) {
        const modal = document.querySelector(modalSelector);
        const backdrop = document.querySelector(backdropSelector);

        if (modal && backdrop) {
            backdrop.classList.add('show');
            modal.classList.add('show');
            this.activeModal = modal;
        }
    }

    closeModal(modalSelector, backdropSelector) {
        const modal = document.querySelector(modalSelector);
        const backdrop = document.querySelector(backdropSelector);

        if (modal && backdrop) {
            backdrop.classList.remove('show');
            modal.classList.remove('show');
            this.activeModal = null;
        }
    }

    getStackDetails() {
        return LAYER_STACK;
    }
}

export const layerManager = new LayerManager();
