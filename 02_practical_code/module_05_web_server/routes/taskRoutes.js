/**
 * MODULE 5 PRACTICAL CODE: Task Routes (Routing Layer)
 * File: 02_practical_code/module_05_web_server/routes/taskRoutes.js
 * 
 * PHÂN TÍCH VAI TRÒ CỦA ROUTING:
 * Đảm nhiệm duy nhất chức năng định tuyến (Endpoint Mapping): Ánh xạ từng đường dẫn URL 
 * và HTTP Method (GET, POST, PUT, DELETE) tới hàm xử lý trong Controller tương ứng.
 */

const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// [GET] Lấy danh sách tasks & [POST] Tạo task mới
router.route('/')
    .get(taskController.getAllTasks)
    .post(taskController.createTask);

// [GET] Chi tiết task, [PUT] Cập nhật task & [DELETE] Xóa task theo ID
router.route('/:id')
    .get(taskController.getTaskById)
    .put(taskController.updateTask)
    .delete(taskController.deleteTask);

module.exports = router;
