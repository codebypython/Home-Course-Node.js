/**
 * 03_web_events_simulator/js/components/EventGrid.js
 * COMPONENT HIỂN THỊ BẢNG 100 THẺ SỰ KIỆN WEB VỚI HIỆU ỨNG GLOW KHI PHÁT SỰ KIỆN
 */

import { WEB_100_EVENTS } from '../core/EventRegistry.js';
import { eventDispatcher } from '../core/EventDispatcher.js';

export class EventGridComponent {
    constructor(containerSelector) {
        this.container = document.querySelector(containerSelector);
        this.cardMap = new Map();
        this.render();
        this.listenEvents();
    }

    render() {
        this.container.innerHTML = WEB_100_EVENTS.map(event => `
            <div class="event-card" data-event-name="${event.name}" data-group="${event.group}" title="${event.desc}">
                <span class="event-id">#${String(event.id).padStart(3, '0')}</span>
                <span class="event-name">${event.name}</span>
            </div>
        `).join('');

        // Cache DOM cards for ultra-fast lookup
        this.container.querySelectorAll('.event-card').forEach(card => {
            const eventName = card.getAttribute('data-event-name');
            this.cardMap.set(eventName, card);
        });

        // Event Delegation for clicking a card directly
        this.container.addEventListener('click', (e) => {
            const card = e.target.closest('.event-card');
            if (card) {
                const eventName = card.getAttribute('data-event-name');
                eventDispatcher.dispatch(eventName, { source: 'Manual Card Click' });
            }
        });
    }

    listenEvents() {
        eventDispatcher.on('*', (data) => {
            const card = this.cardMap.get(data.eventName);
            if (card) {
                card.classList.add('active-trigger');
                setTimeout(() => {
                    card.classList.remove('active-trigger');
                }, 300);
            }
        });
    }
}
