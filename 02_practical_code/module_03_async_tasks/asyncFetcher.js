/**
 * MODULE 3 PRACTICAL CODE: Asynchronous Data Fetcher & Retry Mechanism
 * File: 02_practical_code/module_03_async_tasks/asyncFetcher.js
 * 
 * BỐI CẢNH BÀI TOÁN:
 * Giả lập hệ thống kết nối API bất đồng bộ có độ trễ mạng (Network Latency) và xác suất thất bại ngẫu nhiên.
 * Yêu cầu:
 * 1. Viết hàm mô phỏng lấy dữ liệu người dùng (mockFetchUserData).
 * 2. Viết hàm bọc xử lý cơ chế thử lại tự động (retryWithDelay) khi gặp sự cố mạng.
 * 3. Viết hàm lấy dữ liệu hàng loạt song song (fetchBatchUsersParallel) để tối ưu thời gian phản hồi.
 */

// ==========================================
// 1. PHÂN TÍCH TƯ DUY & LỰA CHỌN THIẾT KẾ HÀM
// ==========================================

/**
 * HÀM 1: mockFetchUserData(userId)
 * 
 * Mô phỏng việc gọi API bất đồng bộ trả về một Promise.
 * Tỷ lệ thất bại ngẫu nhiên 30% để kiểm thử cơ chế bắt lỗi.
 */
const mockFetchUserData = (userId) => {
    return new Promise((resolve, reject) => {
        const delay = Math.floor(Math.random() * 300) + 100; // Độ trễ 100ms - 400ms

        setTimeout(() => {
            // Giả lập xác suất 30% lỗi kết nối mạng
            const isSuccess = Math.random() > 0.3;

            if (isSuccess) {
                resolve({
                    id: userId,
                    username: `user_${userId}`,
                    email: `user_${userId}@domain.com`,
                    fetchedAt: new Date().toISOString()
                });
            } else {
                reject(new Error(`[Network Error] Không thể kết nối tới Server cho User ID: ${userId}`));
            }
        }, delay);
    });
};

/**
 * HÀM 2: fetchWithRetry(fetchFn, maxRetries = 3, delayMs = 500)
 * 
 * PHÂN TÍCH HƯỚNG XÂY DỰNG:
 * - Hướng 1 (Loại bỏ): Dùng Callback truyền tiếp lồng nhau để thử lại.
 *   -> Nhược điểm: Dẫn đến Callback Hell, vỡ cấu trúc mã nguồn khi maxRetries lớn.
 * - Hướng 2 (LỰA CHỌN): Kết hợp `async/await` với vòng lặp `for` và `try/catch`.
 * 
 * LÝ DO CHỌN HƯỚNG 2:
 * Cấu trúc vòng lặp `for` kết hợp `await` giúp logic thử lại (Retry Loop) trở nên 
 * tuyến tính (Linear), vô cùng dễ đọc, dễ kiểm soát số lần thử còn lại.
 */
const fetchWithRetry = async (fetchFn, maxRetries = 3, delayMs = 300) => {
    let lastError;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
        try {
            // Chờ tác vụ thực thi
            const result = await fetchFn();
            if (attempt > 1) {
                console.log(`  ↪ 🟢 [Thành công ở lần thử thứ ${attempt}]`);
            }
            return result;
        } catch (error) {
            lastError = error;
            console.warn(`  ⚠️ [Lần thử ${attempt}/${maxRetries} thất bại]: ${error.message}`);

            // Nếu chưa hết số lần thử, nghỉ một khoảng delayMs rồi tiếp tục
            if (attempt < maxRetries) {
                await new Promise(res => setTimeout(res, delayMs));
            }
        }
    }

    // Nếu vượt quá maxRetries mà vẫn thất bại, ném lỗi ra ngoài
    throw new Error(`[Thất bại toàn bộ] Đã thử ${maxRetries} lần nhưng bất thành. Lỗi cuối: ${lastError.message}`);
};

/**
 * HÀM 3: fetchBatchUsersParallel(userIds)
 * 
 * PHÂN TÍCH HƯỚNG XÂY DỰNG:
 * - Hướng 1 (Loại bỏ): Dùng `for...of` lặp qua mảng và `await fetchWithRetry` từng user một.
 *   -> Nhược điểm NGUY HIỂM: Xử lý tuần tự (Sequential). Nếu 5 users, mỗi user tốn 300ms, 
 *      tổng thời gian chờ sẽ là 1500ms (1.5 giây).
 * - Hướng 2 (LỰA CHỌN): Dùng `Promise.allSettled()` hoặc `Promise.all()`.
 * 
 * LÝ DO CHỌN HƯỚNG 2:
 * Gọi tất cả API đồng thời (Parallel execution). Tổng thời gian hoàn tất chỉ bằng 
 * thời gian của API chậm nhất (~300ms).
 */
const fetchBatchUsersParallel = async (userIds) => {
    console.log(`🚀 Bắt đầu lấy dữ liệu song song cho ${userIds.length} người dùng...`);
    const startTime = Date.now();

    // Tạo mảng các Promises đã được bọc Retry
    const fetchPromises = userIds.map(id => 
        fetchWithRetry(() => mockFetchUserData(id), 3, 200)
            .then(data => ({ status: 'FULFILLED', data }))
            .catch(error => ({ status: 'REJECTED', error: error.message, userId: id }))
    );

    // Chờ tất cả Promises hoàn tất song song
    const results = await Promise.all(fetchPromises);
    const duration = Date.now() - startTime;

    console.log(`⏱️ Hoàn tất tải dữ liệu song song trong ${duration}ms!`);
    return results;
};

// ==========================================
// 2. CHẠY THỬ VÀ XÁC MINH HÀM (DEMO EXECUTION)
// ==========================================
(async () => {
    console.log('--- KHỞI CHẠY KIỂM THỬ MODULE 3 (ASYNC FETCHER) ---');

    const userIdsToFetch = [101, 102, 103, 104];
    
    try {
        const batchResults = await fetchBatchUsersParallel(userIdsToFetch);
        
        console.log('\n--- KẾT QUẢ TỔNG HỢP ---');
        batchResults.forEach((res, idx) => {
            if (res.status === 'FULFILLED') {
                console.log(`✅ User ${res.data.id}:`, res.data.username, '| Fetched at:', res.data.fetchedAt);
            } else {
                console.log(`❌ User ${res.userId} gặp lỗi:`, res.error);
            }
        });
    } catch (err) {
        console.error('Lỗi ngoài dự kiến:', err);
    }
})();

module.exports = {
    mockFetchUserData,
    fetchWithRetry,
    fetchBatchUsersParallel
};
