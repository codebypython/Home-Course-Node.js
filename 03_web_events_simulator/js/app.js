/**
 * 03_web_events_simulator/js/app.js
 * ENTRY POINT BOOTSTRAPPER CHO DỰ ÁN MÔ PHỎNG 100 SỰ KIỆN WEB
 */

import { HeaderComponent } from './components/Header.js';
import { EventGridComponent } from './components/EventGrid.js';
import { PlaygroundComponent } from './components/Playground.js';
import { EventConsoleComponent } from './components/EventConsole.js';
import { LayerInspectorModalComponent } from './components/LayerInspectorModal.js';
import { ToastComponent } from './components/Toast.js';
import { eventDispatcher } from './core/EventDispatcher.js';

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Khởi chạy ứng dụng Web 100 Events Simulator...');

    // 1. Khởi tạo các Component Frontend tái sử dụng
    new HeaderComponent('#header-root');
    new EventGridComponent('#event-grid-root');
    new PlaygroundComponent('#playground-root');
    new EventConsoleComponent('#console-root');
    new LayerInspectorModalComponent();
    new ToastComponent();

    // 2. Phát sự kiện chào mừng
    eventDispatcher.dispatch('DOMContentLoaded', { status: 'Success', initializedAt: new Date().toISOString() });
});
