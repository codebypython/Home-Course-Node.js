/**
 * MODULE 1 PRACTICAL CODE: Grade Calculator System
 * File: 02_practical_code/module_01_fundamentals/gradeCalculator.js
 * 
 * BỐI CẢNH BÀI TOÁN:
 * Xây dựng hệ thống nhận điểm số của sinh viên (từ 0 đến 10), xác minh tính hợp lệ của dữ liệu,
 * tính điểm trung bình và phân loại học lực (Xuất sắc, Giỏi, Khá, Trung bình, Yếu).
 */

// ==========================================
// 1. PHÂN TÍCH TƯ DUY & LỰA CHỌN THIẾT KẾ HÀM
// ==========================================

/**
 * HÀM 1: isValidScore(score)
 * 
 * PHÂN TÍCH HƯỚNG XÂY DỰNG:
 * - Hướng 1 (Loại bỏ): Kiểm tra score trong hàm tính toán chung bằng if/else lồng nhau.
 *   -> Nhược điểm: Làm hàm chính bị cồng kềnh, vi phạm Single Responsibility Principle (SRP).
 * - Hướng 2 (LỰA CHỌN): Tách thành hàm Validator riêng biệt.
 * 
 * LÝ DO CHỌN HƯỚNG 2:
 * Tách biệt logic xác thực (Validation) giúp hàm gọn gàng, tái sử dụng được ở nhiều nơi 
 * và trả về giá trị Boolean minh bạch.
 */
const isValidScore = (score) => {
    // Kiểm tra xem score có phải kiểu number hợp lệ và nằm trong thang điểm [0, 10]
    return typeof score === 'number' && !isNaN(score) && score >= 0 && score <= 10;
};

/**
 * HÀM 2: calculateGradeLetter(score)
 * 
 * PHÂN TÍCH HƯỚNG XÂY DỰNG:
 * - Hướng 1 (Loại bỏ): Dùng Toán tử ba ngôi (Ternary Operator) lồng nhau.
 *   -> Nhược điểm: Khó đọc, dễ nhầm lẫn điều kiện khi có 5 mức xếp loại.
 * - Hướng 2 (Loại bỏ): Dùng cấu trúc if/else lồng nhau sâu (nested if/else).
 *   -> Nhược điểm: Tạo hiệu ứng "Arrow Anti-pattern" (code bị đẩy sâu vào trong).
 * - Hướng 3 (LỰA CHỌN): Sử dụng Kỹ thuật Guard Clauses (Mẫu mẫu bảo vệ) với Return sớm (Early Return).
 * 
 * LÝ DO CHỌN HƯỚNG 3:
 * Giúp phẳng hóa luồng xử lý (Flat Code structure), từng mức điểm được kiểm tra 
 * và kết thúc ngay khi thỏa mãn, tối ưu hiệu năng và cực kỳ dễ bảo trì.
 */
const calculateGradeLetter = (score) => {
    // Bước 1: Bảo vệ hàm bằng Guard Clause
    if (!isValidScore(score)) {
        throw new Error(`Điểm số không hợp lệ: "${score}". Điểm phải là một số từ 0 đến 10.`);
    }

    // Bước 2: Phân loại theo thang điểm (Giảm dần từ cao xuống thấp)
    if (score >= 9.0) return { letter: 'A+', ranking: 'Xuất sắc' };
    if (score >= 8.0) return { letter: 'A',  ranking: 'Giỏi' };
    if (score >= 6.5) return { letter: 'B',  ranking: 'Khá' };
    if (score >= 5.0) return { letter: 'C',  ranking: 'Trung bình' };
    return { letter: 'F', ranking: 'Yếu / Học lại' };
};

/**
 * HÀM 3: processStudentSummary(studentName, scores)
 * 
 * PHÂN TÍCH HƯỚNG XÂY DỰNG:
 * Hàm Pure Function nhận vào tên sinh viên và mảng điểm thành phần, tính tổng điểm trung bình,
 * xếp loại và trả về thông tin hoàn chỉnh.
 */
const processStudentSummary = (studentName, scores) => {
    if (!studentName || typeof studentName !== 'string') {
        throw new Error('Tên sinh viên không hợp lệ.');
    }
    if (!Array.isArray(scores) || scores.length === 0) {
        throw new Error('Danh sách điểm phải là mảng chứa ít nhất 1 điểm số.');
    }

    // Tính tổng điểm đơn giản
    let totalScore = 0;
    for (let i = 0; i < scores.length; i++) {
        const score = scores[i];
        if (!isValidScore(score)) {
            throw new Error(`Phát hiện điểm không hợp lệ tại vị trí ${i}: ${score}`);
        }
        totalScore += score;
    }

    const averageScore = Number((totalScore / scores.length).toFixed(2));
    const gradeResult = calculateGradeLetter(averageScore);

    return {
        studentName,
        averageScore,
        gradeLetter: gradeResult.letter,
        ranking: gradeResult.ranking
    };
};

// ==========================================
// 2. CHẠY THỬ VÀ XÁC MINH HÀM (DEMO EXECUTION)
// ==========================================
console.log('--- KHỞI CHẠY KIỂM THỬ MODULE 1 (GRADE CALCULATOR) ---');

try {
    const student1 = processStudentSummary('Nguyen Van A', [8.5, 9.0, 9.5]);
    console.log('✅ Kết quả sinh viên 1:', student1);

    const student2 = processStudentSummary('Tran Thi B', [6.0, 7.0, 6.5]);
    console.log('✅ Kết quả sinh viên 2:', student2);

    console.log('\n--- KIỂM THỬ BẮT LỖI VỚI DỮ LIỆU SAI (GUARD CLAUSE) ---');
    processStudentSummary('Le Van C', [8.0, 12.0]); // 12.0 vượt quá 10
} catch (error) {
    console.error('❌ Phát hiện lỗi ngắt luồng an toàn:', error.message);
}

module.exports = {
    isValidScore,
    calculateGradeLetter,
    processStudentSummary
};
