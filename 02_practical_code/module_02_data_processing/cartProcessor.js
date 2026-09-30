/**
 * MODULE 2 PRACTICAL CODE: E-Commerce Shopping Cart Processor
 * File: 02_practical_code/module_02_data_processing/cartProcessor.js
 * 
 * BỐI CẢNH BÀI TOÁN:
 * Xây dựng hệ thống xử lý giỏ hàng thương mại điện tử:
 * 1. Lọc sản phẩm hợp lệ còn hàng (filter).
 * 2. Tính tiền chiết khấu theo mã giảm giá cho từng sản phẩm (map).
 * 3. Tổng hợp hóa đơn cuối cùng bao gồm tổng tiền hàng, tiền thuế VAT và phí vận chuyển (reduce).
 */

// ==========================================
// 1. PHÂN TÍCH TƯ DUY & LỰA CHỌN THIẾT KẾ HÀM
// ==========================================

/**
 * HÀM 1: filterAvailableItems(cartItems)
 * 
 * PHÂN TÍCH HƯỚNG XÂY DỰNG:
 * - Hướng 1 (Loại bỏ): Dùng vòng lặp `for` tạo mảng mới và `push` phần tử thỏa điều kiện.
 *   -> Nhược điểm: Phải khai báo biến trung gian `const result = []`, code bị dài dòng.
 * - Hướng 2 (LỰA CHỌN): Sử dụng `Array.prototype.filter()`.
 * 
 * LÝ DO CHỌN HƯỚNG 2:
 * `filter` giúp code mang phong cách Functional Programming, loại bỏ hoàn toàn biến phụ, 
 * tự động trả về mảng mới mà không xâm phạm mảng `cartItems` ban đầu.
 */
const filterAvailableItems = (cartItems) => {
    if (!Array.isArray(cartItems)) {
        throw new Error('Dữ liệu giỏ hàng phải là mảng sản phẩm.');
    }

    return cartItems.filter(item => {
        const isStockAvailable = typeof item.stock === 'number' && item.stock > 0;
        const isValidPrice = typeof item.price === 'number' && item.price >= 0;
        return item.inCart && isStockAvailable && isValidPrice;
    });
};

/**
 * HÀM 2: applyDiscountToItems(items, discountRate = 0)
 * 
 * PHÂN TÍCH HƯỚNG XÂY DỰNG:
 * - Hướng 1 (Loại bỏ): Duyệt bằng `forEach` và sửa trực tiếp `item.price = item.price * (1 - discountRate)`.
 *   -> Nhược điểm NGUY HIỂM: Sửa đổi trực tiếp dữ liệu gốc (Mutation side-effect). Nếu nơi khác 
 *      đang dùng mảng gốc, giá sản phẩm sẽ bị thay đổi vĩnh viễn.
 * - Hướng 2 (LỰA CHỌN): Sử dụng `map()` kết hợp với Spread Operator `...` để sao chép Immutability.
 * 
 * LÝ DO CHỌN HƯỚNG 2:
 * Đảm bảo nguyên tắc Immutable. Mỗi sản phẩm được nhân bản ra object mới với thuộc tính `discountedPrice`
 * đã được cập nhật, giữ nguyên giá gốc `price`.
 */
const applyDiscountToItems = (items, discountRate = 0) => {
    if (discountRate < 0 || discountRate > 1) {
        throw new Error('Tỷ lệ giảm giá phải nằm trong khoảng từ 0.0 đến 1.0 (ví dụ 0.1 = 10%).');
    }

    return items.map(item => {
        const discountedPrice = item.price * (1 - discountRate);
        return {
            ...item, // Sao chép tất cả thuộc tính cũ
            discountedPrice: Number(discountedPrice.toFixed(2)),
            itemTotal: Number((discountedPrice * item.quantity).toFixed(2))
        };
    });
};

/**
 * HÀM 3: generateReceiptSummary(items, vatRate = 0.1, shippingFee = 30000)
 * 
 * PHÂN TÍCH HƯỚNG XÂY DỰNG:
 * - Hướng 1 (Loại bỏ): Dùng 3 vòng lặp tách biệt để tính subtotal, vat và final total.
 *   -> Nhược điểm: Duyệt mảng nhiều lần không cần thiết.
 * - Hướng 2 (LỰA CHỌN): Dùng `reduce()` để tích tụ dữ liệu trong một lần duyệt duy nhất.
 * 
 * LÝ DO CHỌN HƯỚNG 2:
 * `reduce` là công cụ mạnh nhất trong JS để chuyển đổi một mảng danh sách thành một đối tượng 
 * tổng hợp (Receipt Object) đầy đủ thông số thống kê chỉ trong O(N) thời gian.
 */
const generateReceiptSummary = (items, vatRate = 0.1, shippingFee = 30000) => {
    const initialAccumulator = {
        totalQuantity: 0,
        subtotal: 0
    };

    const accumulated = items.reduce((acc, item) => {
        const currentItemTotal = item.itemTotal || (item.price * item.quantity);
        return {
            totalQuantity: acc.totalQuantity + item.quantity,
            subtotal: acc.subtotal + currentItemTotal
        };
    }, initialAccumulator);

    // Tính toán thuế VAT và tổng tiền thanh toán cuối cùng
    const vatAmount = Number((accumulated.subtotal * vatRate).toFixed(2));
    const grandTotal = Number((accumulated.subtotal + vatAmount + shippingFee).toFixed(2));

    return {
        itemCount: items.length,
        totalQuantity: accumulated.totalQuantity,
        subtotal: accumulated.subtotal,
        vatAmount,
        shippingFee,
        grandTotal
    };
};

// ==========================================
// 2. CHẠY THỬ VÀ XÁC MINH HÀM (DEMO EXECUTION)
// ==========================================
console.log('--- KHỞI CHẠY KIỂM THỬ MODULE 2 (CART PROCESSOR) ---');

const mockCart = [
    { id: 'P01', name: 'Bàn phím cơ', price: 1200000, quantity: 1, stock: 5, inCart: true },
    { id: 'P02', name: 'Chuột không dây', price: 450000, quantity: 2, stock: 0, inCart: true }, // Hết hàng -> Sẽ bị lọc
    { id: 'P03', name: 'Tai nghe Bluetooth', price: 800000, quantity: 1, stock: 10, inCart: true },
    { id: 'P04', name: 'Miếng lót chuột', price: 150000, quantity: 3, stock: 20, inCart: false } // Chưa chọn -> Sẽ bị lọc
];

console.log('1. Mảng giỏ hàng ban đầu (Số lượng:', mockCart.length, ')');

// Bước 1: Lọc hàng có thể bán
const availableItems = filterAvailableItems(mockCart);
console.log('2. Sản phẩm hợp lệ sau khi filter (Số lượng:', availableItems.length, '):', availableItems.map(i => i.name));

// Bước 2: Áp dụng mã giảm giá 15% (0.15)
const discountedItems = applyDiscountToItems(availableItems, 0.15);
console.log('3. Chi tiết sản phẩm sau giảm giá 15%:', discountedItems);

// Bước 3: Xuất hóa đơn tổng hợp
const receipt = generateReceiptSummary(discountedItems, 0.1, 30000);
console.log('4. HÓA ĐƠN TỔNG HỢP (RECEIPT):', receipt);

module.exports = {
    filterAvailableItems,
    applyDiscountToItems,
    generateReceiptSummary
};
