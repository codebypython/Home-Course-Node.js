/**
 * MODULE 4 PRACTICAL CODE: Asynchronous Log File Manager
 * File: 02_practical_code/module_04_nodejs_cli/logManager.js
 * 
 * BỐI CẢNH BÀI TOÁN:
 * Xây dựng công cụ ghi nhật ký hệ thống (Log Manager) tự động:
 * 1. Đảm bảo thư mục lưu trữ log tồn tại (Tự động tạo thư mục nếu thiếu).
 * 2. Ghi nội dung log dạng JSON theo định dạng chuẩn (Timestamp, Level, Message) bất đồng bộ.
 * 3. Đọc và phân tích số lượng log theo từng cấp độ (INFO, WARN, ERROR).
 */

const fs = require('fs').promises;
const { getSafeLogPath } = require('./pathHelper');

// ==========================================
// 1. PHÂN TÍCH TƯ DUY & LỰA CHỌN THIẾT KẾ HÀM
// ==========================================

class LogManager {
    constructor(logDirectory = __dirname, logFileName = 'app.log') {
        const pathInfo = getSafeLogPath(logDirectory, 'logs', logFileName);
        this.logFilePath = pathInfo.absolutePath;
        this.logDir = pathInfo.dirName;
    }

    /**
     * HÀM 1: ensureDirectoryExists()
     * Tự động kiểm tra và khởi tạo thư mục chứa log nếu chưa có.
     * Sử dụng `fs.mkdir` với tùy chọn `{ recursive: true }`.
     */
    async ensureDirectoryExists() {
        try {
            await fs.mkdir(this.logDir, { recursive: true });
        } catch (error) {
            throw new Error(` Không thể khởi tạo thư mục log: ${error.message}`);
        }
    }

    /**
     * HÀM 2: writeLog(level, message, metadata = {})
     * 
     * PHÂN TÍCH HƯỚNG XÂY DỰNG:
     * - Hướng 1 (Loại bỏ): Dùng `fs.writeFileSync`.
     *   -> Nhược điểm NGUY HIỂM: Ghi đồng bộ (Synchronous I/O) gây nghẽn Thread.
     * - Hướng 2 (LỰA CHỌN): Sử dụng `fs.appendFile` với `fs.promises`.
     * 
     * LÝ DO CHỌN HƯỚNG 2:
     * `fs.appendFile` bất đồng bộ đẩy công việc xuống Libuv Thread Pool xử lý, 
     * giải phóng Main Thread tiếp tục nhận công việc mới.
     */
    async writeLog(level = 'INFO', message, metadata = {}) {
        await this.ensureDirectoryExists();

        const logEntry = {
            timestamp: new Date().toISOString(),
            level: level.toUpperCase(),
            message,
            metadata
        };

        const formattedLine = JSON.stringify(logEntry) + '\n';

        try {
            await fs.appendFile(this.logFilePath, formattedLine, 'utf8');
            console.log(`📝 [LOG SUCCESS] [${logEntry.level}] ${message}`);
            return logEntry;
        } catch (error) {
            console.error(`❌ [LOG FAILURE] Không thể ghi log: ${error.message}`);
            throw error;
        }
    }

    /**
     * HÀM 3: readAndAnalyzeLogs()
     * 
     * Đọc toàn bộ file log, giải mã từng dòng JSON và thống kê số lượng log theo Level.
     */
    async readAndAnalyzeLogs() {
        try {
            const data = await fs.readFile(this.logFilePath, 'utf8');
            const lines = data.trim().split('\n').filter(line => line.length > 0);

            const stats = {
                totalLogs: lines.length,
                byLevel: { INFO: 0, WARN: 0, ERROR: 0 }
            };

            const parsedLogs = lines.map(line => {
                const parsed = JSON.parse(line);
                if (stats.byLevel[parsed.level] !== undefined) {
                    stats.byLevel[parsed.level]++;
                }
                return parsed;
            });

            return { stats, parsedLogs };
        } catch (error) {
            if (error.code === 'ENOENT') {
                return { stats: { totalLogs: 0, byLevel: { INFO: 0, WARN: 0, ERROR: 0 } }, parsedLogs: [] };
            }
            throw new Error(`Không thể đọc file log: ${error.message}`);
        }
    }
}

// ==========================================
// 2. CHẠY THỬ VÀ XÁC MINH HÀM (DEMO EXECUTION)
// ==========================================
(async () => {
    console.log('--- KHỞI CHẠY KIỂM THỬ MODULE 4 (LOG MANAGER CLI) ---');

    const logger = new LogManager(__dirname, 'system_activity.log');

    // Bước 1: Ghi các nhật ký thử nghiệm
    await logger.writeLog('INFO', 'Hệ thống Server khởi động thành công.', { port: 3000, env: 'development' });
    await logger.writeLog('WARN', 'Cảnh báo bộ nhớ RAM sử dụng vượt quá 75%.', { memoryUsage: '78%' });
    await logger.writeLog('ERROR', 'Thất bại khi kết nối tới Database MySQL.', { errorCode: 'ECONNREFUSED' });
    await logger.writeLog('INFO', 'Người dùng Admin thực hiện đăng nhập thành công.', { userId: 'admin_01' });

    // Bước 2: Đọc và phân tích file log vừa ghi
    console.log('\n--- BẮT ĐẦU ĐỌC VÀ PHÂN TÍCH TỆP LOG ---');
    const analysis = await logger.readAndAnalyzeLogs();
    
    console.log('📊 Thống kê log:', analysis.stats);
    console.log('📄 Danh sách log mới nhất:', analysis.parsedLogs[analysis.parsedLogs.length - 1]);
})();

module.exports = LogManager;
