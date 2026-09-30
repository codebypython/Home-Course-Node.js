# MODULE 6: MÔ PHỎNG 100 SỰ KIỆN TƯƠNG TÁC WEB, THIẾT KẾ COMPONENT & KIẾN TRÚC PHÂN LỚP (Z-INDEX LAYERS)

## 📌 1. Nguồn Tài Liệu Học Tập (Citations)
1. **MDN Web Docs**: [Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events) & [Understanding CSS z-index and Stacking Contexts](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_positioned_layout/Understanding_z-index/Stacking_context).
2. **W3C UI Events Specification**: [DOM Level 3 Events Standard](https://www.w3.org/TR/uievents/).
3. **Google Web Fundamentals**: [High Performance Animations & Rendering Pipeline](https://web.dev/rendering-performance/).

---

## 📚 2. Ghi Chép Lý Thuyết Chi Tiết

### 2.1. Cấu Trúc Luồng Sự Kiện Trong DOM (DOM Event Flow)
Khi một thao tác xảy ra trên trang web (ví dụ: click chuột vào một chiếc nút), trình duyệt xử lý sự kiện qua 3 giai đoạn (Phases):
1. **Capturing Phase (Giai đoạn Bắt)**: Sự kiện đi từ `Window` $\rightarrow$ `Document` $\rightarrow$ `<html>` $\rightarrow$ `<body>` down dần xuống phần tử cha trực tiếp của Target.
2. **Target Phase (Giai đoạn Đích)**: Sự kiện kích hoạt ngay tại chính phần tử mục tiêu (Target Element).
3. **Bubbling Phase (Giai đoạn Nổi bọt)**: Sự kiện "nổi bọt" ngược lại từ Target Element up dần lên các phần tử cha đến `Window`.
- **Event Delegation (Ủy quyền Sự kiện)**: Thay vì gán 100 Event Listener vào 100 thẻ riêng biệt (tốn bộ nhớ và giảm hiệu năng), ta gán 1 Event Listener duy nhất lên phần tử cha chung (`Event Delegation`), sử dụng `event.target` để xác định chính xác phần tử con được tương tác.

### 2.2. Kỹ Thuật Tối Ưu Hiệu Năng Với Sự Kiện Tần Số Cao (High-Frequency Events)
Các sự kiện như `mousemove`, `scroll`, `resize`, `touchmove` có thể kích hoạt đến 100-200 lần/giây. Nếu thực hiện tính toán DOM phức tạp bên trong các sự kiện này mà không tối ưu, giao diện sẽ bị hiện tượng **Jank / Lag (Tụt FPS)**:
- **Debounce**: Chờ người dùng dừng thao tác trong một khoảng thời gian `X` ms rồi mới thực thi hàm (Phù hợp cho Ô tìm kiếm Search input, Window resize).
- **Throttle**: Đảm bảo hàm chỉ được thực thi tối đa 1 lần trong mỗi khoảng thời gian `X` ms (Phù hợp cho Scroll position tracking, Canvas drawing).
- **`requestAnimationFrame` (rAF)**: Đồng bộ việc cập nhật giao diện trực tiếp với tần số quét của màn hình (thường là 60Hz - 120Hz).

### 2.3. Kiến Trúc Phân Lớp Hiển Thị Z-Index & Stacking Context
Trong Frontend, thứ tự hiển thị không chỉ phụ thuộc vào chỉ số `z-index`, mà phụ thuộc vào **Ngữ cảnh Xếp chồng (Stacking Context)**. Một phần tử có `z-index: 9999` vẫn có thể bị đè bên dưới phần tử `z-index: 1` nếu phần tử cha của nó nằm trong một Stacking Context thấp hơn!

#### Bảng Quy Hoạch Tầng Thứ Tự Layer Standard:
| Tầng Layer | Giá trị Z-Index | Vai Trò & Thành Phần Giao Diện |
| :--- | :--- | :--- |
| **Layer -1 (Matrix Canvas)** | `z-index: -1` | Phông nền Matrix, hiệu ứng hạt background. |
| **Layer 0 (Base Container)** | `z-index: 0` | Bố cục trang web chính, layout Grid/Flex. |
| **Layer 10 (Interactive Canvas)**| `z-index: 10` | Thẻ Playground tương tác chuột, bàn phím, kéo thả. |
| **Layer 100 (Floating Controls)**| `z-index: 100` | Bảng điều khiển floating, console log panel. |
| **Layer 500 (Backdrop Layer)** | `z-index: 500` | Tấm nền tối mờ kính (Glassmorphic Backdrop) cho Modal. |
| **Layer 1000 (Modal Layer)** | `z-index: 1000` | Cửa sổ Pop-up, Modal xem Layer Inspector. |
| **Layer 9000 (Notification)** | `z-index: 9000` | Hệ thống Toast thông báo toàn cục (Luôn đè lên trên cùng). |

---

## 📋 3. Danh Mục 100 Sự Kiện Tương Tác Web Được Mô Phỏng

### Nhóm 1: Mouse Events (Sự kiện Chuột)
1. `click`: Bấm chuột trái.
2. `dblclick`: Bấm đúp chuột 2 lần liên tiếp.
3. `mousedown`: Nhấn giữ phím chuột.
4. `mouseup`: Nhả phím chuột.
5. `mousemove`: Di chuyển con trỏ chuột.
6. `mouseenter`: Di chuột vào ranh giới phần tử (Không nổi bọt).
7. `mouseleave`: Di chuột rời ranh giới phần tử (Không nổi bọt).
8. `mouseover`: Di chuột vào phần tử hoặc phần tử con.
9. `mouseout`: Rời chuột khỏi phần tử hoặc phần tử con.
10. `contextmenu`: Bấm chuột phải mở Menu ngữ cảnh.

### Nhóm 2: Keyboard Events (Sự kiện Phím)
11. `keydown`: Nhấn phím bất kỳ xuống.
12. `keyup`: Nhả phím phím ra.
13. `keypress`: Nhấn phím tạo ra ký tự văn bản.
14. `input`: Thay đổi giá trị trong ô nhập văn bản.
15. `compositionstart`: Bắt đầu gõ tiếng Việt / ký tự IME.
16. `compositionupdate`: Cập nhật đoạn gõ IME.
17. `compositionend`: Hoàn tất gõ IME tiếng Việt.
18. `shortcut:save`: Phím tắt `Ctrl + S` / `Cmd + S`.
19. `shortcut:esc`: Phím `Escape` để thoát.
20. `shortcut:tab`: Phím `Tab` chuyển ô focus.

### Nhóm 3: Pointer & Touch Events (Cảm ứng & Con trỏ)
21. `pointerdown`: Chạm ngón tay / con trỏ lên màn hình.
22. `pointermove`: Di chuyển ngón tay / con trỏ cảm ứng.
23. `pointerup`: Rời ngón tay / con trỏ cảm ứng.
24. `pointercancel`: Thao tác con trỏ bị hủy ngắt.
25. `pointerover`: Con trỏ di vào vùng cảm ứng.
26. `pointerout`: Con trỏ rời vùng cảm ứng.
27. `touchstart`: Bắt đầu điểm chạm cảm ứng trên Mobile.
28. `touchmove`: Di chuyển điểm chạm trên Mobile.
29. `touchend`: Kết thúc điểm chạm Mobile.
30. `touchcancel`: Điểm chạm Mobile bị gián đoạn.

### Nhóm 4: Form & Focus Events (Biểu mẫu & Tiêu điểm)
31. `focus`: Phần tử nhận tiêu điểm nhập liệu.
32. `blur`: Phần tử mất tiêu điểm nhập liệu.
33. `focusin`: Tiêu điểm đi vào phần tử (Nổi bọt).
34. `focusout`: Tiêu điểm đi ra khỏi phần tử (Nổi bọt).
35. `change`: Dữ liệu trong ô Form bị thay đổi và xác nhận.
36. `submit`: Gửi dữ liệu Form.
37. `reset`: Đặt lại dữ liệu Form ban đầu.
38. `invalid`: Dữ liệu nhập vào vi phạm quy tắc Validate.
39. `select`: Người dùng bôi đen văn bản trong ô input.
40. `form:autofill`: Trình duyệt tự động điền dữ liệu Form.

### Nhóm 5: Drag & Drop & Clipboard Events (Kéo thả & Sao chép)
41. `dragstart`: Bắt đầu kéo một phần tử.
42. `drag`: Đang trong quá trình kéo phần tử.
43. `dragenter`: Phần tử kéo đi vào vùng thả (Drop zone).
44. `dragover`: Phần tử kéo di chuyển trên vùng thả.
45. `dragleave`: Phần tử kéo rời khỏi vùng thả.
46. `drop`: Thả phần tử vào vùng thả.
47. `dragend`: Kết thúc quá trình kéo thả.
48. `clipboard:copy`: Thao tác sao chép văn bản (`Ctrl + C`).
49. `clipboard:cut`: Thao tác cắt văn bản (`Ctrl + X`).
50. `clipboard:paste`: Thao tác dán văn bản (`Ctrl + V`).

### Nhóm 6: Window & Viewport Events (Cửa sổ & Khung nhìn)
51. `resize`: Thay đổi kích thước cửa sổ trình duyệt.
52. `scroll`: Cuộn trang web.
53. `orientationchange`: Xoay màn hình thiết bị di động.
54. `load`: Toàn bộ trang web và tài nguyên đã tải xong.
55. `DOMContentLoaded`: Cây DOM HTML đã dựng xong.
56. `beforeunload`: Người dùng sắp thoát hoặc Reload trang.
57. `visibilitychange`: Chuyển Tab trình duyệt (Ẩn/Hiện).
58. `pagehide`: Trang web bị ẩn vào Cache.
59. `pageshow`: Trang web hiển thị lại từ Cache.
60. `fullscreenchange`: Bật/tắt chế độ toàn màn hình (Full Screen).

### Nhóm 7: UI Component & State Events (Lớp Giao diện)
61. `modal:open`: Mở cửa sổ Modal.
62. `modal:close`: Đóng cửa sổ Modal.
63. `tab:change`: Chuyển đổi Tab nội dung.
64. `accordion:toggle`: Đóng/Mở thanh Accordion.
65. `dropdown:open`: Mở danh sách sổ xuống.
66. `dropdown:close`: Đóng danh sách sổ xuống.
67. `tooltip:show`: Hiển thị chú thích Tooltip.
68. `tooltip:hide`: Ẩn chú thích Tooltip.
69. `toast:trigger`: Phát thông báo Toast Toast.
70. `theme:toggle`: Bật/Tắt chế độ Giao diện Dark/Light Mode.

### Nhóm 8: Media & Audio/Video Events (Truyền thông)
71. `media:play`: Phát nhạc / Video.
72. `media:pause`: Tạm dừng nhạc / Video.
73. `media:ended`: Đã phát hết bài / Video.
74. `media:volumechange`: Thay đổi âm lượng.
75. `media:seeking`: Đang Tua đến vị trí mới.
76. `media:seeked`: Đã tua xong đến vị trí mới.
77. `media:timeupdate`: Thời gian phát được cập nhật liên tục.
78. `media:canplay`: Đủ dữ liệu để bắt đầu phát.
79. `media:waiting`: Chờ tải thêm dữ liệu (Buffering).
80. `media:stalled`: Mạng bị nghẽn không thể tải media.

### Nhóm 9: Network, Battery & Storage Events (Mạng & Trạng thái)
81. `network:online`: Đã khôi phục kết nối Internet.
82. `network:offline`: Bị mất kết nối Internet.
83. `storage:change`: Dữ liệu `localStorage` thay đổi ở Tab khác.
84. `hashchange`: Thay đổi thẻ địa chỉ `#hash` trên URL.
85. `popstate`: Người dùng bấm nút Back/Forward trên trình duyệt.
86. `error:global`: Phát sinh lỗi JavaScript toàn cục.
87. `unhandledrejection`: Promise bị Reject nhưng không có `catch`.
88. `battery:change`: Trạng thái pin thiết bị thay đổi.
89. `pointerlock:change`: Khóa con trỏ chuột vào vùng Canvas.
90. `selection:change`: Vùng chọn văn bản trên trang thay đổi.

### Nhóm 10: Custom System & Performance Events (Hệ thống & Hiệu năng)
91. `event:throttled`: Sự kiện bị giới hạn tần suất (Throttled).
92. `event:debounced`: Sự kiện trì hoãn thực thi (Debounced).
93. `layer:reorder`: Thay đổi thứ tự Z-Index Layer.
94. `canvas:paint`: Vẽ đối tượng lên Canvas 2D.
95. `dom:mutation`: Phát hiện cây DOM bị thay đổi (MutationObserver).
96. `node:attached`: Phần tử mới được gắn vào DOM Tree.
97. `node:detached`: Phần tử bị gỡ khỏi DOM Tree.
98. `performance:warning`: Cảnh báo thao tác làm tụt FPS màn hình.
99. `worker:message`: Nhận tin nhắn từ Web Worker background thread.
100. `system:idle`: Người dùng không thao tác trong 10 giây (Idle State).

---

## 🔍 4. Note Phân Tích & Cách Hiểu Của Sinh Viên (Student's Learning Reflection)

> **Nhật ký phân tích góc nhìn cá nhân:**
> 1. *Tư duy Event Delegation trong UI 100 sự kiện*:
>    - Khi cần hiển thị 100 thẻ sự kiện trên màn hình, nếu tôi dùng `document.querySelectorAll('.event-card').forEach(card => card.addEventListener(...))` sẽ tạo ra 100 Event Listeners nằm trong RAM!
>    - Thay vào đó, tôi dùng 1 Event Listener duy nhất trên container chứa 100 thẻ: `gridContainer.addEventListener('click', (e) => { const card = e.target.closest('.event-card'); ... })`. Cách này giúp giảm tải bộ nhớ tối đa và dễ dàng thêm/xóa thẻ động.
> 2. *Tư duy Phân Lớp Z-Index Layer*:
>    - Tôi nhận ra rằng đặt `z-index: 9999` bừa bãi là nguyên nhân hàng đầu khiến giao diện bị "lỗi đè hiển thị". Để giải quyết triệt để, tôi thiết lập một tệp CSS Token `variables.css` định nghĩa sẵn biến `--layer-modal: 1000; --layer-toast: 9000;`. Tất cả các component bắt buộc phải dùng biến này, tuyệt đối không hardcode số nguyên tự do!

---
*Ghi chép hoàn tất bởi sinh viên - Ngày học: 03/08/2026*
