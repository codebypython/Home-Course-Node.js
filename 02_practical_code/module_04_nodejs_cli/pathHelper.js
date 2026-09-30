/**
 * MODULE 4 PRACTICAL CODE: Safe Path Resolution Helper
 * File: 02_practical_code/module_04_nodejs_cli/pathHelper.js
 * 
 * BỐI CẢNH BÀI TOÁN:
 * Xây dựng Module tiện ích hỗ trợ định dạng và kiểm tra đường dẫn thư mục an toàn trên mọi Hệ điều hành (Windows/Linux/MacOS).
 */

const path = require('path');

// ==========================================
// 1. PHÂN TÍCH TƯ DUY & LỰA CHỌN THIẾT KẾ HÀM
// ==========================================

/**
 * HÀM: getSafeLogPath(baseDir, subDir, fileName)
 * 
 * PHÂN TÍCH HƯỚNG XÂY DỰNG:
 * - Hướng 1 (Loại bỏ): Nối chuỗi bằng toán tử `+`: `baseDir + '/' + subDir + '/' + fileName`.
 *   -> Nhược điểm NGUY HIỂM: Windows sử dụng dấu gạch ngược `\`, Linux sử dụng `/`. Nối chuỗi 
 *      thủ công gây ra lỗi Path Inconsistency hoặc Path Traversal vulnerability (`../../`).
 * - Hướng 2 (LỰA CHỌN): Sử dụng `path.resolve` kết hợp `path.join`.
 * 
 * LÝ DO CHỌN HƯỚNG 2:
 * `path.join` tự động chuyển đổi ký tự phân cách phù hợp với OS hiện tại. `path.resolve` đảm bảo 
 * trả về một đường dẫn tuyệt đối chuẩn hóa (Normalized Absolute Path).
 */
const getSafeLogPath = (baseDir, subDir, fileName) => {
    if (!baseDir || !fileName) {
        throw new Error('[Path Error] Cần cung cấp đầy đủ thư mục gốc và tên file.');
    }

    // Tự động làm sạch và nối đường dẫn an toàn
    const cleanSubDir = subDir || '';
    const resolvedPath = path.resolve(baseDir, cleanSubDir, fileName);

    return {
        absolutePath: resolvedPath,
        dirName: path.dirname(resolvedPath),
        extName: path.extname(resolvedPath),
        baseName: path.basename(resolvedPath)
    };
};

module.exports = {
    getSafeLogPath
};
