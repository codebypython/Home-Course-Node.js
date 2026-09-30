# MODULE 1: JAVASCRIPT CĂN BẢN (JS FUNDAMENTALS)

## 📌 1. Nguồn Tài Liệu Học Tập (Citations)
1. **MDN Web Docs**: [JavaScript First Steps](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/First_steps) & [JavaScript Building Blocks](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks).
2. **Sách "You Don't Know JS Yet" (Kyle Simpson)**: Tập *Get Started* & *Scope & Closures*.
3. **Khóa học YouTube**: *JavaScript for Beginners* - freeCodeCamp.org.

---

## 📚 2. Ghi Chép Lý Thuyết Chi Tiết

### 2.1. Khai Báo Biến: `var`, `let`, và `const`
- **`var` (ES5 trở về trước)**:
  - Có phạm vi hàm (Function Scope) hoặc toàn cục (Global Scope).
  - Bị cơ chế **Hoisting** (kéo lên đầu phạm vi) với giá trị ban đầu là `undefined`.
  - Có thể khai báo lại và gán lại giá trị tự do $\rightarrow$ Dễ gây ra lỗi đè biến ngầm mà không có cảnh báo.
- **`let` (ES6/2015)**:
  - Có phạm vi khối (Block Scope - nằm trong cặp dấu `{}`).
  - Bị Hoisting nhưng nằm trong vùng chết tạm thời (**Temporal Dead Zone - TDZ**). Truy cập biến trước khi khai báo sẽ gây lỗi `ReferenceError`.
  - Cho phép gán lại giá trị, nhưng không cho phép khai báo lại cùng tên biến trong một Scope.
- **`const` (ES6/2015)**:
  - Có phạm vi khối (Block Scope) giống `let`.
  - Phải gán giá trị ngay khi khai báo. Không cho phép gán lại (Reassignment) địa chỉ tham chiếu/giá trị cơ bản.
  - *Lưu ý quan trọng*: `const` không làm cho Object/Array bị hằng hóa (immutable), nó chỉ ngăn việc gán biến sang một vùng nhớ khác.

### 2.2. Kiểu Dữ Liệu (Data Types)
JavaScript là ngôn ngữ kiểu động (Dynamically Typed). Kiểu dữ liệu được chia làm 2 nhóm:
1. **Kiểu Nguyên Thủy (Primitive Types)**: Truyền bằng giá trị (Passed by Value), không thể thay đổi giá trị gốc (Immutable).
   - `String`, `Number`, `Boolean`, `Null`, `Undefined`, `Symbol`, `BigInt`.
2. **Kiểu Tham Chiếu (Reference Types / Objects)**: Truyền bằng địa chỉ vùng nhớ (Passed by Reference), có thể thay đổi (Mutable).
   - `Object`, `Array`, `Function`, `Date`, v.v.

### 2.3. Hàm (Functions) & Cấu Trúc Khai Báo
- **Function Declaration**:
  ```javascript
  function calculateTotal(price, quantity) {
      return price * quantity;
  }
  ```
  - Được Hoisting hoàn toàn $\rightarrow$ Có thể gọi hàm trước khi định nghĩa trong file code.
- **Arrow Function (ES6)**:
  ```javascript
  const calculateTotal = (price, quantity) => price * quantity;
  ```
  - Cú pháp ngắn gọn. Không sở hữu ngữ cảnh `this` riêng (ràng buộc `this` từ Lexical Scope ngoài).
- **Pure Function (Hàm Thuần Khiết)**:
  - Với cùng một đầu vào (arguments), luôn trả về cùng một đầu ra (return value).
  - Không gây ra tác dụng phụ (No Side Effects) như sửa biến toàn cục, sửa tham số truyền vào hay thực hiện I/O trực tiếp bên trong logic tính toán.

---

## 🔍 3. Note Phân Tích & Cách Hiểu Của Sinh Viên (Student's Learning Reflection)

> **Nhật ký phân tích góc nhìn cá nhân:**
> 1. *Về việc chọn biến*: Ban đầu khi chưa học kĩ, tôi nghĩ dùng `var` cho tiện vì không lo lỗi gán lại. Nhưng sau khi đọc tài liệu về TDZ và Scope, tôi hiểu rằng dùng `var` giống như xây nhà không có tường ngăn—các phòng bị lẫn lộn dữ liệu. Quy tắc vàng tôi đúc kết: **Luôn mặc định dùng `const`**, chỉ chuyển sang `let` khi chắc chắn biến đó cần thay đổi giá trị (ví dụ: biến đếm trong vòng lặp), và **tuyệt đối loại bỏ `var`** trong dự án hiện đại.
> 2. *Về so sánh kiểu dữ liệu*: Tôi phát hiện ra `==` (so sánh lỏng lẻo) tự động ép kiểu (Type Coercion) ngầm cực kỳ nguy hiểm (ví dụ: `'0' == 0` cho ra `true`). Tôi quyết định luôn dùng `===` (so sánh nghiêm ngặt) để đảm bảo cả kiểu dữ liệu và giá trị đều chính xác.
> 3. *Về thiết kế Hàm (Pure Function)*: Việc giữ cho hàm "thuần khiết" giúp code cực kỳ dễ kiểm thử (unit test). Hàm không phụ thuộc vào biến bên ngoài sẽ không bao giờ bị hỏng đột ngột do ai đó sửa biến toàn cục ở chỗ khác.

---
*Ghi chép hoàn tất bởi sinh viên - Ngày học: 03/08/2026*
