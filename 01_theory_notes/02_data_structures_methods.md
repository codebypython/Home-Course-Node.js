# MODULE 2: CẤU TRÚC DỮ LIỆU & PHƯƠNG THỨC XỬ LÝ MẢNG (ARRAYS, OBJECTS & HOF)

## 📌 1. Nguồn Tài Liệu Học Tập (Citations)
1. **Sách "Eloquent JavaScript" (Marijn Haverbeke)**: [Chapter 4: Data Structures: Objects and Arrays](https://eloquentjavascript.net/04_data.html) & [Chapter 5: Higher-Order Functions](https://eloquentjavascript.net/05_higher_order.html).
2. **MDN Web Docs**: [Array Higher-Order Methods](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array) (`map`, `filter`, `reduce`).
3. **Khóa học JavaScript Algorithms and Data Structures** - freeCodeCamp.org.

---

## 📚 2. Ghi Chép Lý Thuyết Chi Tiết

### 2.1. Object (Đối Tượng) & Array (Mảng)
- **Object**: Tập hợp các cặp key-value. Dữ liệu được lưu trữ dạng tham chiếu (Reference).
  - Thao tác: Destructuring (giải nén thuộc tính), Spread Operator `...` (tạo bản sao nông - Shallow Copy).
- **Array**: Danh sách các phần tử có thứ tự (Indexed List).
  - Thuộc tính cơ bản: `.length`, truy cập qua chỉ số `array[index]`.

### 2.2. Phương Thức Mảng Bậc Cao (Array Higher-Order Functions - HOF)
Các hàm HOF là các hàm nhận một hàm khác làm đối số (Callback) để xử lý dữ liệu mà không làm biến đổi mảng gốc (Immutable Operations):

1. **`Array.prototype.filter(callback)`**:
   - Duyệt qua từng phần tử và trả về mảng mới chỉ chứa các phần tử mà `callback(item)` trả về `true`.
2. **`Array.prototype.map(callback)`**:
   - Biến đổi từng phần tử trong mảng theo công thức của `callback` và trả về mảng mới có độ dài tương đương mảng gốc.
3. **`Array.prototype.reduce(callback, initialValue)`**:
   - Dùng để tích tụ (Accumulate) toàn bộ mảng thành một giá trị duy nhất (có thể là một số, một object tổng hợp, hoặc một mảng mới).
   - Hàm callback nhận 4 tham số: `(accumulator, currentValue, currentIndex, array)`.

### 2.3. Cú Pháp Hiện Đại ES6+: Destructuring, Rest & Spread
- **Destructuring**:
  ```javascript
  const product = { id: 101, name: 'Laptop', price: 1500 };
  const { name, price } = product; // Lấy trực tiếp name và price
  ```
- **Spread Operator (`...`)**:
  - Dùng để gộp mảng hoặc gộp thuộc tính object mà không làm thay đổi biến ban đầu (Immutability pattern).

---

## 🔍 3. Note Phân Tích & Cách Hiểu Của Sinh Viên (Student's Learning Reflection)

> **Nhật ký phân tích góc nhìn cá nhân:**
> 1. *Thay đổi tư duy từ vòng lặp Imperative (`for`) sang Functional (`map`/`filter`/`reduce`)*:
>    - Khi mới học, tôi quen dùng vòng lặp `for (let i = 0; i < arr.length; i++)` để tính tổng hay lọc phần tử. Tuy nhiên, cách làm này bắt tôi phải tự quản lý biến chỉ số `i`, tạo mảng rỗng tạm thời, và có nguy cơ lỗi "Off-by-one error" (lặp thừa/thiếu 1 phần tử).
>    - Dùng `filter` và `map` giúp code mang tính **Khai báo (Declarative)**: Tôi chỉ cần mô tả *tôi muốn làm gì với dữ liệu* thay vì phải viết chi tiết *máy tính phải duyệt như thế nào*.
> 2. *Tư duy về Tính Không Biến Đổi (Immutability)*:
>    - Việc sử dụng `slice()`, `concat()`, `map()`, `spread (...)` tạo mảng mới giúp ứng dụng cực kỳ an toàn. Nếu sửa trực tiếp mảng gốc (Mutation), các phần khác trong chương trình đang dùng chung mảng đó sẽ bị ảnh hưởng ngoài tầm kiểm soát.

---
*Ghi chép hoàn tất bởi sinh viên - Ngày học: 03/08/2026*
