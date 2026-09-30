# MODULE 3: LẬP TRÌNH BẤT ĐỒNG BỘ (ASYNCHRONOUS JAVASCRIPT)

## 📌 1. Nguồn Tài Liệu Học Tập (Citations)
1. **Node.js Official Documentation**: [The Node.js Event Loop, Timers, and process.nextTick()](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/).
2. **MDN Web Docs**: [How to use Promises](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises) & [async and await](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises#async_and_await).
3. **Công cụ Trực Quan**: [JS Visualizer 9000 (Event Loop Simulator)](https://www.jsv9000.app/).

---

## 📚 2. Ghi Chép Lý Thuyết Chi Tiết

### 2.1. Đơn Luồng (Single-Threaded) & Event Loop
- JavaScript chạy trên một luồng chính duy nhất (Main Thread / Call Stack).
- Để xử lý các tác vụ tốn thời gian (truy vấn Database, đọc/ghi File, gọi API mạng) mà **không làm đứng ứng dụng (Non-blocking)**, JavaScript sử dụng mô hình **Event Loop** phối hợp cùng Web APIs (trên Browser) hoặc C++ Background Worker Threads / Libuv (trên Node.js).
- **Cơ chế Event Loop**:
  1. Các câu lệnh đồng bộ (Synchronous) được đẩy vào **Call Stack** và thực thi ngay.
  2. Các tác vụ bất đồng bộ được giao cho hệ thống xử lý bên dưới. Khi hoàn thành, callback của chúng được đẩy vào hàng chờ:
     - **Microtask Queue**: Chứa `Promise.then/catch/finally`, `process.nextTick`, `queueMicrotask`. Có độ ưu tiên CAO NHẤT (Event Loop sẽ rút hết Microtask Queue trước khi sang Macrotask Queue).
     - **Macrotask Queue**: Chứa `setTimeout`, `setInterval`, `setImmediate`, I/O operations.

### 2.2. Tiến Trình Phát Triển Xử Lý Bất Đồng Bộ
1. **Callback Function**:
   - Truyền một hàm làm tham số để chạy sau khi tác vụ xong.
   - Nhược điểm: Dễ rớt vào **Callback Hell** (mã nguồn bị lồng lấp pyramid of doom, cực kỳ khó quản lý lỗi).
2. **Promise (ES6)**:
   - Đại diện cho một giá trị sẽ có trong tương lai.
   - Có 3 trạng thái: `Pending` (đang chờ), `Fulfilled` (thành công - trả về giá trị với `resolve`), `Rejected` (thất bại - trả về lỗi với `reject`).
   - Giúp chuỗi hóa logic qua `.then()`, `.catch()`, `.finally()`.
3. **Async / Await (ES8/2017)**:
   - Cú pháp đường (Syntactic Sugar) dựng trên nền Promise.
   - Cho phép viết mã bất đồng bộ trông giống như mã đồng bộ (Synchronous-looking code).
   - Sử dụng khối `try / catch` để quản lý lỗi tự nhiên và minh bạch.

---

## 🔍 3. Note Phân Tích & Cách Hiểu Của Sinh Viên (Student's Learning Reflection)

> **Nhật ký phân tích góc nhìn cá nhân:**
> 1. *Hiểu đúng về `await`*: Khi tôi dùng `await promiseFn()`, JS không làm treo toàn bộ máy tính hay làm treo chương trình. Thực chất, `await` tạm thời giải phóng luồng chính (Main Thread) cho các công việc khác chạy, và chờ đến khi Microtask của Promise đó xong thì mới tiếp tục dòng lệnh tiếp theo.
> 2. *Tư duy Xử lý Lỗi (Error Handling)*:
>    - Trong code bất đồng bộ dùng `async/await`, nếu không bao quanh bằng `try/catch`, khi Promise bị `reject`, Node.js sẽ ném ra lỗi `UnhandledPromiseRejection`. Từ Node.js v15 trở đi, lỗi này sẽ khiến toàn bộ ứng dụng bị crash ngay lập tức! Do đó, **mọi khối code `await` đều phải có chiến lược bắt lỗi (Catch/Retry) rõ ràng**.
> 3. *Tối ưu hóa thời gian chờ (Parallel execution)*:
>    - Nếu tôi cần gọi 3 API độc lập nhau, gọi `await API1(); await API2(); await API3();` sẽ mất tổng thời gian = $T_1 + T_2 + T_3$ (Sequential).
>    - Thay vào đó, dùng `Promise.all([API1(), API2(), API3()])` sẽ chạy song song (Parallel) và chỉ mất thời gian bằng $\max(T_1, T_2, T_3)$. Đây là bài học tối ưu hiệu năng vô cùng quan trọng!

---
*Ghi chép hoàn tất bởi sinh viên - Ngày học: 03/08/2026*
