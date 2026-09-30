/**
 * MODULE 5 PRACTICAL CODE: Task Management Service (Business Logic Layer)
 * File: 02_practical_code/module_05_web_server/services/taskService.js
 * 
 * BỐI CẢNH BÀI TOÁN:
 * Tầng Service quản lý trạng thái dữ liệu công việc (Tasks) và thực hiện các nghiệp vụ:
 * 1. Lấy danh sách tasks (Lọc theo trạng thái completed nếu có query).
 * 2. Tìm task theo ID.
 * 3. Tạo task mới (Tự động gán ID và thời gian khởi tạo).
 * 4. Cập nhật task (Chỉnh sửa tên, mô tả, trạng thái).
 * 5. Xóa task.
 */

class TaskService {
    constructor() {
        // Khởi tạo bộ nhớ tạm (In-Memory Database) cho demo
        this.tasks = [
            { id: 1, title: 'Học lý thuyết JavaScript ES6', description: 'Nắm vững let/const, Arrow function, HOF', completed: true, createdAt: '2026-08-01T08:00:00.000Z' },
            { id: 2, title: 'Thực hành Node.js Core Modules', description: 'Viết công cụ logManager bằng fs.promises', completed: true, createdAt: '2026-08-02T10:30:00.000Z' },
            { id: 3, title: 'Xây dựng Web Server Express.js', description: 'Hoàn thiện RESTful API Task Management', completed: false, createdAt: '2026-08-03T12:00:00.000Z' }
        ];
        this.nextId = 4;
    }

    getAllTasks(statusFilter) {
        if (statusFilter === 'completed') {
            return this.tasks.filter(t => t.completed === true);
        }
        if (statusFilter === 'pending') {
            return this.tasks.filter(t => t.completed === false);
        }
        return this.tasks;
    }

    getTaskById(id) {
        const numericId = Number(id);
        return this.tasks.find(t => t.id === numericId) || null;
    }

    createTask(title, description = '') {
        const newTask = {
            id: this.nextId++,
            title: title.trim(),
            description: description.trim(),
            completed: false,
            createdAt: new Date().toISOString()
        };
        this.tasks.push(newTask);
        return newTask;
    }

    updateTask(id, updates) {
        const task = this.getTaskById(id);
        if (!task) return null;

        if (updates.title !== undefined) task.title = updates.title.trim();
        if (updates.description !== undefined) task.description = updates.description.trim();
        if (updates.completed !== undefined) task.completed = Boolean(updates.completed);

        return task;
    }

    deleteTask(id) {
        const numericId = Number(id);
        const index = this.tasks.findIndex(t => t.id === numericId);
        if (index === -1) return false;

        this.tasks.splice(index, 1);
        return true;
    }
}

// Singleton Pattern cho Service Instance
module.exports = new TaskService();
