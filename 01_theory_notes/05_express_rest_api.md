# MODULE 5: XÂY DỰNG WEB SERVER & RESTFUL API VỚI EXPRESS.JS

## 📌 1. Nguồn Tài Liệu Học Tập (Citations)
1. **Express.js Official Documentation**: [Getting Started](https://expressjs.com/en/starter/installing.html) & [Writing Middleware](https://expressjs.com/en/guide/writing-middleware.html).
2. **REST API Tutorial**: [Best Practices for Designing a Pragmatic RESTful API](https://restfulapi.net/).
3. **MDN Web Docs**: [An overview of HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview) & [HTTP Response Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status).

---

## 📚 2. Ghi Chép Lý Thuyết Chi Tiết

### 2.1. Nền Tảng Giao Thức HTTP & Chuẩn RESTful API
- **Giao thức HTTP**: Mô hình Client - Server trao đổi qua Request và Response.
- **HTTP Verbs (Phương thức)**:
  - `GET`: Lấy tài nguyên (Read). Không có body.
  - `POST`: Tạo mới tài nguyên (Create).
  - `PUT` / `PATCH`: Cập nhật toàn bộ / một phần tài nguyên (Update).
  - `DELETE`: Xóa tài nguyên (Delete).
- **HTTP Status Codes (Mã trạng thái)**:
  - `200 OK`: Thành công.
  - `201 Created`: Tạo tài nguyên mới thành công.
  - `400 Bad Request`: Lỗi dữ liệu đầu vào từ phía Client (Client Error).
  - `404 Not Found`: Không tìm thấy tài nguyên yêu cầu.
  - `500 Internal Server Error`: Lỗi phát sinh trong máy chủ (Server Error).

### 2.2. Khái Niệm Middleware Trong Express.js
- **Middleware** là các hàm nằm giữa Request của Client và Response của Server.
- Cú pháp hàm Middleware: `(req, res, next) => { ... next(); }`.
- Nếu Middleware không gọi `next()`, Request sẽ bị treo vĩnh viễn!
- Tác dụng: Logging, Authentication, Data Validation, Parse Body (`express.json()`), Error Handling.

### 2.3. Kiến Trúc Phân Lớp (Layered Architecture Pattern)
Để tránh hiện tượng Spaghetti Code (tất cả logic dồn vào 1 file `app.js`), một dự án Backend chuyên nghiệp bắt buộc phải phân tách trách nhiệm (Separation of Concerns - SoC):
1. **Routes Layer (`routes/`)**: Định nghĩa Endpoint URL và gán Http Verb tới Controller tương ứng. Không chứa logic xử lý dữ liệu.
2. **Controllers Layer (`controllers/`)**: Tiếp nhận `req` (params, body, query), kiểm tra dữ liệu đầu vào và gọi Service. Trả về HTTP Status và JSON cho Client.
3. **Services Layer (`services/`)**: Chứa toàn bộ Logic nghiệp vụ (Business Logic), tính toán, thao tác với Database. Hoàn toàn độc lập với giao thức HTTP.

---

## 🔍 3. Note Phân Tích & Cách Hiểu Của Sinh Viên (Student's Learning Reflection)

> **Nhật ký phân tích góc nhìn cá nhân:**
> 1. *Tại sao phải dùng Kiến trúc 3 Lớp (Routes - Controllers - Services)?*
>    - Khi bắt đầu, viết tất cả code vào `app.get('/tasks', (req, res) => { ... })` rất nhanh. Nhưng khi ứng dụng phát triển lên 50 API, file `app.js` sẽ dài hàng nghìn dòng, không thể nào đọc hay kiểm thử được!
>    - Phân lớp giúp:
>      - Muốn sửa đường dẫn URL $\rightarrow$ Vào `routes/`.
>      - Muốn sửa cách định dạng dữ liệu trả về cho App $\rightarrow$ Vào `controllers/`.
>      - Muốn sửa công thức tính toán nghiệp vụ $\rightarrow$ Vào `services/`.
> 2. *Tư duy Xử lý Lỗi Trung Tâm (Centralized Error Handler Middleware)*:
>    - Thay vì phải viết `res.status(500).json(...)` ở khắp mọi nơi trong Controller, tôi chuyển lỗi sang `next(error)` để Middleware xử lý lỗi chung (Error Middleware) đứng cuối pipeline tiếp nhận. Điều này giữ cho code controller luôn sạch sẽ và nhất quán.

---
*Ghi chép hoàn tất bởi sinh viên - Ngày học: 03/08/2026*
