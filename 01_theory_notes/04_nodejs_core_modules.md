# MODULE 4: NODE.JS CORE MODULES & QUẢN LÝ HỆ THỐNG FILE (FILE SYSTEM)

## 📌 1. Nguồn Tài Liệu Học Tập (Citations)
1. **Node.js Official Documentation**: [File System Module (`fs`)](https://nodejs.org/api/fs.html) & [Path Module (`path`)](https://nodejs.org/api/path.html).
2. **Sách "Node.js Design Patterns" (Mario Casciaro)**: Chapter 2: Node.js Essential Patterns (CommonJS, Module System & Async Control Flow).
3. **Khóa học YouTube**: *Node.js Crash Course* - Traversy Media / freeCodeCamp.

---

## 📚 2. Ghi Chép Lý Thuyết Chi Tiết

### 2.1. Node.js Architecture: V8 Engine & Libuv
- Node.js không phải là một ngôn ngữ lập trình, mà là một **Môi trường thực thi JavaScript (JavaScript Runtime Environment)** trên máy chủ (Server-side).
- Thành phần cốt lõi:
  1. **Google V8 Engine**: Biên dịch JavaScript trực tiếp thành mã máy (Native Machine Code).
  2. **Libuv (C Library)**: Thư viện xử lý Asynchronous I/O, Event Loop, và Thread Pool (gồm 4 worker threads mặc định) cho các tác vụ nặng trên hệ điều hành (Disk I/O, DNS lookup, Network sockets).

### 2.2. Hệ Thống Module: CommonJS vs ES Modules
- **CommonJS (CJS)**:
  - Cú pháp mặc định lịch sử của Node.js (`require('module')` và `module.exports = {}`).
  - Nạp module theo cơ chế **Đồng bộ (Synchronous loading)**.
- **ES Modules (ESM)**:
  - Cú pháp chuẩn ECMAScript hiện đại (`import` và `export`).
  - Nạp module bất đồng bộ.

### 2.3. Các Core Modules Quan Trọng Trong Node.js
1. **`path`**: Xử lý đường dẫn tập tin và thư mục an toàn giữa các hệ điều hành (Windows dùng `\`, POSIX/Linux dùng `/`).
   - `path.join(...)`: Nối chuỗi đường dẫn tự động hóa phân cách.
   - `path.resolve(...)`: Trả về đường dẫn tuyệt đối chuẩn hóa (Absolute Path).
2. **`fs` (File System)**: Thao tác đọc, ghi, sửa, xóa tập tin và thư mục.
   - **`fs.readFileSync` (Đồng bộ)**: Treo Main Thread cho đến khi đọc xong file $\rightarrow$ **Cấm dùng** trong Web Server production!
   - **`fs.promises` (Bất đồng bộ với Promise)**: Trả về Promise, cho phép dùng `async/await` kết hợp Thread Pool xử lý nền mà không làm treo ứng dụng.
3. **`events` (EventEmitter)**: Mô hình Publish-Subscribe giúp xây dựng kiến trúc hướng sự kiện (Event-driven Architecture).

---

## 🔍 3. Note Phân Tích & Cách Hiểu Của Sinh Viên (Student's Learning Reflection)

> **Nhật ký phân tích góc nhìn cá nhân:**
> 1. *Bài học đắt giá về Cross-Platform Path*:
>    - Khi viết code chạy trên Windows (`C:\Users\name\...`), nếu tôi nối chuỗi đường dẫn thủ công dạng `'logs/' + filename`, code sẽ bị lỗi crash khi deploy lên máy chủ Ubuntu/Linux! Sử dụng `path.join(__dirname, 'logs', filename)` là quy tắc bắt buộc để đảm bảo tính tương thích đa nền tảng (Cross-platform compatibility).
> 2. *Tư duy chọn Async I/O thay vì Sync I/O*:
>    - Nhiều người mới thường thích dùng `fs.readFileSync` vì cú pháp ngắn gọn, không phải dùng `await`. Tuy nhiên, nếu file log dài vài trăm Megabyte, `readFileSync` sẽ chặn đứng (Block) toàn bộ các Request của người dùng khác truy cập vào Web Server! Tôi đưa ra kỷ luật cá nhân: **Luôn ưu tiên `fs.promises` trong mọi tác vụ I/O hệ thống**.

---
*Ghi chép hoàn tất bởi sinh viên - Ngày học: 03/08/2026*
