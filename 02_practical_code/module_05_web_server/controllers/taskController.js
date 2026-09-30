/**
 * MODULE 5 PRACTICAL CODE: Task Controller (HTTP Handling Layer)
 * File: 02_practical_code/module_05_web_server/controllers/taskController.js
 * 
 * PHÂN TÍCH VAI TRÒ CỦA CONTROLLER:
 * Controller đóng vai trò người điều phối HTTP:
 * 1. Đọc dữ liệu từ `req.params`, `req.query`, `req.body`.
 * 2. Kiểm tra tính hợp lệ sơ bộ của Request (Validation & Guard Clause).
 * 3. Đưa dữ liệu cho `taskService` xử lý.
 * 4. Đóng gói kết quả thành chuẩn JSON và trả về kèm HTTP Status Code thích hợp (200, 201, 400, 404).
 */

const taskService = require('../services/taskService');

class TaskController {
    // [GET] /api/v1/tasks
    getAllTasks = (req, res, next) => {
        try {
            const { status } = req.query;
            const tasks = taskService.getAllTasks(status);
            return res.status(200).json({
                success: true,
                count: tasks.length,
                data: tasks
            });
        } catch (error) {
            next(error); // Đẩy lỗi cho Error Middleware trung tâm
        }
    };

    // [GET] /api/v1/tasks/:id
    getTaskById = (req, res, next) => {
        try {
            const { id } = req.params;
            const task = taskService.getTaskById(id);

            if (!task) {
                return res.status(404).json({
                    success: false,
                    error: `Không tìm thấy công việc với ID: ${id}`
                });
            }

            return res.status(200).json({
                success: true,
                data: task
            });
        } catch (error) {
            next(error);
        }
    };

    // [POST] /api/v1/tasks
    createTask = (req, res, next) => {
        try {
            const { title, description } = req.body;

            // Guard clause: Validation dữ liệu bắt buộc
            if (!title || typeof title !== 'string' || title.trim() === '') {
                return res.status(400).json({
                    success: false,
                    error: 'Tiêu đề công việc (title) là bắt buộc và phải là chuỗi ký tự.'
                });
            }

            const newTask = taskService.createTask(title, description);
            return res.status(201).json({
                success: true,
                message: 'Tạo công việc mới thành công.',
                data: newTask
            });
        } catch (error) {
            next(error);
        }
    };

    // [PUT] /api/v1/tasks/:id
    updateTask = (req, res, next) => {
        try {
            const { id } = req.params;
            const updatedTask = taskService.updateTask(id, req.body);

            if (!updatedTask) {
                return res.status(404).json({
                    success: false,
                    error: `Không thể cập nhật. Không tìm thấy ID: ${id}`
                });
            }

            return res.status(200).json({
                success: true,
                message: 'Cập nhật công việc thành công.',
                data: updatedTask
            });
        } catch (error) {
            next(error);
        }
    };

    // [DELETE] /api/v1/tasks/:id
    deleteTask = (req, res, next) => {
        try {
            const { id } = req.params;
            const isDeleted = taskService.deleteTask(id);

            if (!isDeleted) {
                return res.status(404).json({
                    success: false,
                    error: `Không thể xóa. Không tìm thấy ID: ${id}`
                });
            }

            return res.status(200).json({
                success: true,
                message: `Đã xóa công việc ID ${id} thành công.`
            });
        } catch (error) {
            next(error);
        }
    };
}

module.exports = new TaskController();
