/**
 * MODULE 5 PRACTICAL CODE: Express REST API Application Entry Point
 * File: 02_practical_code/module_05_web_server/app.js
 * 
 * BỐI CẢNH BÀI TOÁN:
 * Tệp cấu hình khởi chạy Web Server với Express.js:
 * 1. Tích hợp các Middleware toàn cục (`express.json()`, Request Logger).
 * 2. Đăng ký các Endpoint Routes (`/api/v1/tasks`).
 * 3. Bắt các Endpoint không tồn tại (404 Not Found Handler).
 * 4. Tích hợp Error Middleware xử lý lỗi trung tâm (Centralized Error Handler).
 * 5. Tự động kiểm thử API tự động khi máy chủ sẵn sàng.
 */

const express = require('express');
const taskRoutes = require('./routes/taskRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ==========================================
// 1. TÍCH HỢP MIDDLEWARE TOÀN CỤC
// ==========================================

// Middleware Parse Body dạng JSON
app.use(express.json());

// Middleware Request Logger tự tạo: Ghi lại thông tin HTTP Request tới Server
app.use((req, res, next) => {
    const timestamp = new Date().toISOString();
    console.log(`📡 [HTTP REQUEST] ${timestamp} | ${req.method} ${req.originalUrl}`);
    next();
});

// ==========================================
// 2. KHỞI TẠO ENDPOINTS / ROUTES
// ==========================================

app.use('/api/v1/tasks', taskRoutes);

// Endpoint kiểm tra sức khỏe hệ thống (Health Check)
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// Middleware Bắt Lỗi 404 (Khi route không tồn tại)
app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        error: `Đường dẫn không tồn tại: ${req.method} ${req.originalUrl}`
    });
});

// Middleware Xử lý Lỗi Trung Tâm (Centralized Error Handling Middleware)
app.use((err, req, res, next) => {
    console.error('💥 [GLOBAL ERROR HANDLER]:', err.stack);
    res.status(err.status || 500).json({
        success: false,
        error: err.message || 'Lỗi máy chủ nội bộ (Internal Server Error).'
    });
});

// ==========================================
// 3. KHỞI CHẠY SERVER VÀ TỰ ĐỘNG VERIFY
// ==========================================
const server = app.listen(PORT, async () => {
    console.log(`\n✅ Express Server đang chạy tại: http://localhost:${PORT}`);
    console.log('--- KHỞI CHẠY KIỂM THỬ TỰ ĐỘNG API TASK MANAGEMENT ---');

    const BASE_URL = `http://localhost:${PORT}/api/v1/tasks`;

    try {
        // 1. Test GET /api/v1/tasks
        const getRes = await fetch(BASE_URL);
        const getResult = await getRes.json();
        console.log('1. [GET /tasks] Status:', getRes.status, '| Total Tasks:', getResult.count);

        // 2. Test POST /api/v1/tasks (Tạo task mới)
        const postRes = await fetch(BASE_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                title: 'Học CV Chuẩn Harvard & Chuẩn bị Phỏng vấn Backend',
                description: 'Tổng hợp toàn bộ kiến thức JS/Node.js để tự tin ứng tuyển'
            })
        });
        const postResult = await postRes.json();
        console.log('2. [POST /tasks] Status:', postRes.status, '| Created Task ID:', postResult.data?.id);

        // 3. Test PUT /api/v1/tasks/:id (Cập nhật task)
        const createdId = postResult.data.id;
        const putRes = await fetch(`${BASE_URL}/${createdId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ completed: true })
        });
        const putResult = await putRes.json();
        console.log('3. [PUT /tasks/:id] Status:', putRes.status, '| Updated Completed Status:', putResult.data?.completed);

        // 4. Test DELETE /api/v1/tasks/:id (Xóa task)
        const deleteRes = await fetch(`${BASE_URL}/${createdId}`, { method: 'DELETE' });
        const deleteResult = await deleteRes.json();
        console.log('4. [DELETE /tasks/:id] Status:', deleteRes.status, '| Message:', deleteResult.message);

        console.log('\n✨ XÁC MINH RESTFUL API EXPRESS THÀNH CÔNG RỰC RỠ!');
    } catch (err) {
        console.error('❌ Lỗi kiểm thử API:', err.message);
    } finally {
        // Đóng server sau khi kiểm thử xong
        server.close(() => {
            console.log('🔒 Đã đóng Web Server an toàn sau khi hoàn tất kiểm thử.');
        });
    }
});

module.exports = app;
