/**
 * 03_web_events_simulator/js/core/EventRegistry.js
 * TẬP HỢP ĐỦ 100 SỰ KIỆN TƯƠNG TÁC WEB PHÂN LẠI THEO 10 NHÓM DỰ ÁN
 */

export const EVENT_GROUPS = {
    MOUSE: { id: 'mouse', name: 'Mouse Events', color: 'var(--accent-mouse)' },
    KEYBOARD: { id: 'keyboard', name: 'Keyboard Events', color: 'var(--accent-keyboard)' },
    TOUCH: { id: 'touch', name: 'Pointer & Touch', color: 'var(--accent-touch)' },
    FORM: { id: 'form', name: 'Form & Focus', color: 'var(--accent-form)' },
    DRAG: { id: 'drag', name: 'Drag & Drop', color: 'var(--accent-drag)' },
    WINDOW: { id: 'window', name: 'Window & Viewport', color: 'var(--accent-window)' },
    UI: { id: 'ui', name: 'UI & State', color: 'var(--accent-ui)' },
    MEDIA: { id: 'media', name: 'Media Events', color: 'var(--accent-media)' },
    NETWORK: { id: 'network', name: 'Network & State', color: 'var(--accent-network)' },
    CUSTOM: { id: 'custom', name: 'Custom & System', color: 'var(--accent-custom)' }
};

export const WEB_100_EVENTS = [
    // --- 1. MOUSE EVENTS (1 - 10) ---
    { id: 1, name: 'click', group: 'mouse', desc: 'Bấm chuột trái vào phần tử' },
    { id: 2, name: 'dblclick', group: 'mouse', desc: 'Bấm đúp chuột 2 lần liên tiếp' },
    { id: 3, name: 'mousedown', group: 'mouse', desc: 'Nhấn giữ phím chuột xuống' },
    { id: 4, name: 'mouseup', group: 'mouse', desc: 'Nhả phím chuột ra' },
    { id: 5, name: 'mousemove', group: 'mouse', desc: 'Di chuyển con trỏ chuột trên vùng tương tác' },
    { id: 6, name: 'mouseenter', group: 'mouse', desc: 'Con trỏ chuột bắt đầu đi vào ranh giới phần tử' },
    { id: 7, name: 'mouseleave', group: 'mouse', desc: 'Con trỏ chuột đi ra khỏi ranh giới phần tử' },
    { id: 8, name: 'mouseover', group: 'mouse', desc: 'Con trỏ di vào phần tử hoặc phần tử con' },
    { id: 9, name: 'mouseout', group: 'mouse', desc: 'Con trỏ rời khỏi phần tử hoặc phần tử con' },
    { id: 10, name: 'contextmenu', group: 'mouse', desc: 'Bấm chuột phải mở Menu ngữ cảnh' },

    // --- 2. KEYBOARD EVENTS (11 - 20) ---
    { id: 11, name: 'keydown', group: 'keyboard', desc: 'Nhấn một phím trên bàn phím xuống' },
    { id: 12, name: 'keyup', group: 'keyboard', desc: 'Nhả phím bàn phím ra' },
    { id: 13, name: 'keypress', group: 'keyboard', desc: 'Nhấn phím tạo ra ký tự văn bản' },
    { id: 14, name: 'input', group: 'keyboard', desc: 'Giá trị trong ô input bị thay đổi' },
    { id: 15, name: 'compositionstart', group: 'keyboard', desc: 'Bắt đầu gõ ký tự bộ gõ IME (Tiếng Việt)' },
    { id: 16, name: 'compositionupdate', group: 'keyboard', desc: 'Cập nhật đoạn gõ bộ gõ IME' },
    { id: 17, name: 'compositionend', group: 'keyboard', desc: 'Kết thúc gõ bộ gõ IME' },
    { id: 18, name: 'shortcut:save', group: 'keyboard', desc: 'Bấm tổ hợp phím tắt Ctrl+S / Cmd+S' },
    { id: 19, name: 'shortcut:esc', group: 'keyboard', desc: 'Bấm phím Escape để hủy bỏ' },
    { id: 20, name: 'shortcut:tab', group: 'keyboard', desc: 'Bấm phím Tab chuyển tiêu điểm' },

    // --- 3. POINTER & TOUCH EVENTS (21 - 30) ---
    { id: 21, name: 'pointerdown', group: 'touch', desc: 'Con trỏ cảm ứng/bút vẽ chạm xuống' },
    { id: 22, name: 'pointermove', group: 'touch', desc: 'Di chuyển con trỏ cảm ứng/bút vẽ' },
    { id: 23, name: 'pointerup', group: 'touch', desc: 'Rời con trỏ cảm ứng/bút vẽ' },
    { id: 24, name: 'pointercancel', group: 'touch', desc: 'Thao tác con trỏ cảm ứng bị hủy ngắt' },
    { id: 25, name: 'pointerover', group: 'touch', desc: 'Con trỏ cảm ứng đi vào vùng phần tử' },
    { id: 26, name: 'pointerout', group: 'touch', desc: 'Con trỏ cảm ứng rời khỏi vùng phần tử' },
    { id: 27, name: 'touchstart', group: 'touch', desc: 'Ngón tay chạm vào màn hình di động' },
    { id: 28, name: 'touchmove', group: 'touch', desc: 'Ngón tay vuốt di chuyển trên màn hình' },
    { id: 29, name: 'touchend', group: 'touch', desc: 'Ngón tay nhấc khỏi màn hình di động' },
    { id: 30, name: 'touchcancel', group: 'touch', desc: 'Điểm chạm cảm ứng bị gián đoạn' },

    // --- 4. FORM & FOCUS EVENTS (31 - 40) ---
    { id: 31, name: 'focus', group: 'form', desc: 'Phần tử nhận được tiêu điểm nhập liệu' },
    { id: 32, name: 'blur', group: 'form', desc: 'Phần tử bị mất tiêu điểm nhập liệu' },
    { id: 33, name: 'focusin', group: 'form', desc: 'Tiêu điểm đi vào phần tử (Có nổi bọt)' },
    { id: 34, name: 'focusout', group: 'form', desc: 'Tiêu điểm đi ra khỏi phần tử (Có nổi bọt)' },
    { id: 35, name: 'change', group: 'form', desc: 'Giá trị ô Form được xác nhận thay đổi' },
    { id: 36, name: 'submit', group: 'form', desc: 'Người dùng bấm gởi Form' },
    { id: 37, name: 'reset', group: 'form', desc: 'Khôi phục dữ liệu Form về ban đầu' },
    { id: 38, name: 'invalid', group: 'form', desc: 'Dữ liệu nhập vào vi phạm định dạng Rule' },
    { id: 39, name: 'select', group: 'form', desc: 'Văn bản trong ô input được bôi đen' },
    { id: 40, name: 'form:autofill', group: 'form', desc: 'Trình duyệt tự động điền Form' },

    // --- 5. DRAG & DROP & CLIPBOARD (41 - 50) ---
    { id: 41, name: 'dragstart', group: 'drag', desc: 'Bắt đầu kéo một thẻ đối tượng' },
    { id: 42, name: 'drag', group: 'drag', desc: 'Đang di chuyển thẻ đối tượng được kéo' },
    { id: 43, name: 'dragenter', group: 'drag', desc: 'Thẻ kéo đi vào vùng thả Drop Target' },
    { id: 44, name: 'dragover', group: 'drag', desc: 'Thẻ kéo lướt qua trên vùng thả Drop Target' },
    { id: 45, name: 'dragleave', group: 'drag', desc: 'Thẻ kéo rời khỏi vùng thả Drop Target' },
    { id: 46, name: 'drop', group: 'drag', desc: 'Thả thẻ đối tượng vào vùng thả' },
    { id: 47, name: 'dragend', group: 'drag', desc: 'Kết thúc hoàn toàn hành động kéo thả' },
    { id: 48, name: 'clipboard:copy', group: 'drag', desc: 'Thao tác sao chép dữ liệu (Ctrl+C)' },
    { id: 49, name: 'clipboard:cut', group: 'drag', desc: 'Thao tác cắt dữ liệu (Ctrl+X)' },
    { id: 50, name: 'clipboard:paste', group: 'drag', desc: 'Thao tác dán dữ liệu (Ctrl+V)' },

    // --- 6. WINDOW & VIEWPORT (51 - 60) ---
    { id: 51, name: 'resize', group: 'window', desc: 'Thay đổi kích thước khung hình trình duyệt' },
    { id: 52, name: 'scroll', group: 'window', desc: 'Cuộn trang web lên/xuống' },
    { id: 53, name: 'orientationchange', group: 'window', desc: 'Xoay màn hình thiết bị (Ngang/Dọc)' },
    { id: 54, name: 'load', group: 'window', desc: 'Trang web và tất cả tài nguyên đã tải xong' },
    { id: 55, name: 'DOMContentLoaded', group: 'window', desc: 'Cây DOM HTML đã được phân tích xong' },
    { id: 56, name: 'beforeunload', group: 'window', desc: 'Người dùng chuẩn bị thoát hoặc Reload trang' },
    { id: 57, name: 'visibilitychange', group: 'window', desc: 'Chuyển đổi ẩn/hiện Tab trình duyệt' },
    { id: 58, name: 'pagehide', group: 'window', desc: 'Trang web bị ẩn vào Memory Cache' },
    { id: 59, name: 'pageshow', group: 'window', desc: 'Trang web hiển thị lại từ Cache' },
    { id: 60, name: 'fullscreenchange', group: 'window', desc: 'Bật/tắt chế độ toàn màn hình Fullscreen' },

    // --- 7. UI COMPONENT & STATE (61 - 70) ---
    { id: 61, name: 'modal:open', group: 'ui', desc: 'Mở cửa sổ Modal Inspector (Layer 1000)' },
    { id: 62, name: 'modal:close', group: 'ui', desc: 'Đóng cửa sổ Modal Inspector' },
    { id: 63, name: 'tab:change', group: 'ui', desc: 'Chuyển đổi Tab danh mục sự kiện' },
    { id: 64, name: 'accordion:toggle', group: 'ui', desc: 'Đóng/mở thẻ Accordion nội dung' },
    { id: 65, name: 'dropdown:open', group: 'ui', desc: 'Mở danh sách xổ xuống Options' },
    { id: 66, name: 'dropdown:close', group: 'ui', desc: 'Đóng danh sách xổ xuống Options' },
    { id: 67, name: 'tooltip:show', group: 'ui', desc: 'Hiển thị chú thích Tooltip' },
    { id: 68, name: 'tooltip:hide', group: 'ui', desc: 'Ẩn chú thích Tooltip' },
    { id: 69, name: 'toast:trigger', group: 'ui', desc: 'Phát thông báo Toast Toast (Layer 9000)' },
    { id: 70, name: 'theme:toggle', group: 'ui', desc: 'Bật/tắt chế độ giao diện Dark/Light' },

    // --- 8. MEDIA EVENTS (71 - 80) ---
    { id: 71, name: 'media:play', group: 'media', desc: 'Bắt đầu phát Audio/Video' },
    { id: 72, name: 'media:pause', group: 'media', desc: 'Tạm dừng phát Audio/Video' },
    { id: 73, name: 'media:ended', group: 'media', desc: 'Đã phát hết thời lượng Audio/Video' },
    { id: 74, name: 'media:volumechange', group: 'media', desc: 'Thay đổi mức âm lượng Audio' },
    { id: 75, name: 'media:seeking', group: 'media', desc: 'Đang tua đến mốc thời gian mới' },
    { id: 76, name: 'media:seeked', group: 'media', desc: 'Đã hoàn tất tua mốc thời gian mới' },
    { id: 77, name: 'media:timeupdate', group: 'media', desc: 'Thời gian phát cập nhật liên tục' },
    { id: 78, name: 'media:canplay', group: 'media', desc: 'Đủ dữ liệu Buffer để bắt đầu phát' },
    { id: 79, name: 'media:waiting', group: 'media', desc: 'Tạm dừng chờ tải thêm Buffer dữ liệu' },
    { id: 80, name: 'media:stalled', group: 'media', desc: 'Tải media bị nghẽn mạng ngắt đoạn' },

    // --- 9. NETWORK & STATE (81 - 90) ---
    { id: 81, name: 'network:online', group: 'network', desc: 'Đã khôi phục kết nối mạng Internet' },
    { id: 82, name: 'network:offline', group: 'network', desc: 'Mất kết nối mạng Internet' },
    { id: 83, name: 'storage:change', group: 'network', desc: 'Dữ liệu localStorage bị thay đổi' },
    { id: 84, name: 'hashchange', group: 'network', desc: 'Thẻ địa chỉ Hash URL # bị thay đổi' },
    { id: 85, name: 'popstate', group: 'network', desc: 'Người dùng bấm nút Back/Forward' },
    { id: 86, name: 'error:global', group: 'network', desc: 'Phát sinh lỗi JavaScript runtime toàn cục' },
    { id: 87, name: 'unhandledrejection', group: 'network', desc: 'Promise bị Reject không có catch' },
    { id: 88, name: 'battery:change', group: 'network', desc: 'Trạng thái pin thiết bị thay đổi' },
    { id: 89, name: 'pointerlock:change', group: 'network', desc: 'Bật/tắt khóa con trỏ chuột vào Canvas' },
    { id: 90, name: 'selection:change', group: 'network', desc: 'Vùng chọn văn bản người dùng bị thay đổi' },

    // --- 10. CUSTOM & SYSTEM (91 - 100) ---
    { id: 91, name: 'event:throttled', group: 'custom', desc: 'Sự kiện tần số cao đã được Throttled' },
    { id: 92, name: 'event:debounced', group: 'custom', desc: 'Sự kiện đã được hoãn Debounced' },
    { id: 93, name: 'layer:reorder', group: 'custom', desc: 'Thay đổi thứ tự hiển thị Z-Index Layer' },
    { id: 94, name: 'canvas:paint', group: 'custom', desc: 'Thực hiện vẽ mượt 60fps trên Canvas' },
    { id: 95, name: 'dom:mutation', group: 'custom', desc: 'Phát hiện cây DOM bị biến đổi Mutation' },
    { id: 96, name: 'node:attached', group: 'custom', desc: 'Nút phần tử mới được gắn vào DOM' },
    { id: 97, name: 'node:detached', group: 'custom', desc: 'Nút phần tử bị gỡ bỏ khỏi DOM' },
    { id: 98, name: 'performance:warning', group: 'custom', desc: 'Cảnh báo thao tác nặng làm tụt FPS' },
    { id: 99, name: 'worker:message', group: 'custom', desc: 'Nhận thông điệp từ Web Worker background' },
    { id: 100, name: 'system:idle', group: 'custom', desc: 'Người dùng tạm dừng tương tác 10 giây' }
];
