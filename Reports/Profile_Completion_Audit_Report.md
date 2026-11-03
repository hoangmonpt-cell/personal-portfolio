# BÁO CÁO TOÀN DIỆN: HOÀN THIỆN DỮ LIỆU HỒ SƠ CÁ NHÂN & XUẤT BẢN CV (PROFILE & CV AUDIT REPORT)

- **Ngày thực hiện:** 04/11/2026
- **Vị trí mục tiêu:** Game Developer (Trọng tâm chính) // Software Engineering & AI-Assisted Workflows
- **Người thực hiện:** Senior Technical Lead & Hiring Reviewer
- **Workspace:** `S:\personal-portfolio`
- **Tình trạng:** HOÀN THÀNH (VERIFIED & AUDITED)

---

## A. Existing Profile Audit (Hiện trạng trước khi xử lý)

1. **Placeholder lộ liễu trên UI công khai:**
   - Trường tên hiển thị dấu ngoặc vuông placeholder: `name: '[Bùi Huy Hoàng]'`.
   - Tiểu sử đoạn 3 hiển thị cảnh báo: `[Vui lòng cập nhật chi tiết phần tự giới thiệu cá nhân, mục tiêu nghề nghiệp và triết lý lập trình tại src/data/profile.ts]` và `[Please customize your detailed bio...]`.
   - Thẻ thông báo trên Hero và Modal hiển thị văn bản hướng dẫn nội bộ: `Dữ liệu cá nhân có thể tùy chỉnh dễ dàng tại src/data/profile.ts` (`placeholderNotice`).
   - Thẻ thống kê chứa chuỗi giả: `yearsOfExperiencePlaceholder: '[Năm kinh nghiệm]'`.
2. **Liên kết mạng xã hội & CV không hợp lệ:**
   - LinkedIn trỏ đến URL placeholder: `https://linkedin.com/in/[your-profile]`.
   - CV trỏ đến ký tự `#` (`cvUrl: '#'`), các nút "Tải CV (PDF)" hoạt động như liên kết chết (dead link).
3. **Ảnh đại diện (Avatar):**
   - File ảnh `avt.jpg` ban đầu nằm ở thư mục root chưa được phân loại vào cấu trúc thư mục chuẩn.
4. **Dự án chưa hoàn thiện:**
   - Veldwild là nguyên mẫu nghiên cứu/phục dựng, chưa phải sản phẩm hoàn thiện để đưa vào CV tuyển dụng.

---

## B. Verified Personal & Project Information (Thông tin đã xác minh)

### 1. Thông tin cá nhân đã xác minh
- **Họ và tên:** Bùi Huy Hoàng (Xác minh từ Git author `Hoàng <hoangmon.pt@gmail.com>`).
- **Ảnh đại diện:** Ảnh chân dung suit đen phong thái chuyên nghiệp với ánh sáng studio nghệ thuật. Đã di chuyển an toàn vào `src/assets/images/avatar.jpg` và `public/images/avatar.jpg`.
- **Email liên hệ:** `hoangmon.pt@gmail.com`.
- **GitHub Profile:** `https://github.com/hoangmonpt-cell`.
- **GitLab Profile:** `https://gitlab.com/hoangmonpt-cell`.
- **Khu vực địa lý:** Việt Nam (Hỗ trợ On-site / Remote).

### 2. Dự án đưa vào CV (Chỉ chọn lọc dự án hoàn thiện & thực chiến)
1. **`Fortress Idle: Last Stand` (Unity 6 LTS, URP 17.4.0):**
   - Thể loại: Idle Tower Defense 3D.
   - Trọng tâm kỹ thuật: Generic Object Pooling (`SimplePool<T>`) triệt tiêu 100% GC Alloc (0 B/frame), MaterialPropertyBlock tối ưu hóa Draw Calls (giữ nguyên GPU instancing), Spatial Entity Registry O(1), công thức kinh tế số lớn Clamped Piecewise ($10^{45}$).
2. **`Ottershi (Unity Port)` (Unity 2D Mobile):**
   - Thể loại: 2D Arcade / Physics Action.
   - Trọng tâm kỹ thuật: Kiến trúc phân tầng Manager-Controller, toán học quỹ đạo elip cho băng chuyền, thuật toán vuốt chạm tính vector vận tốc ném sushi, Fever Mode & Data-Driven ScriptableObjects.
3. **`3D Interactive Developer Room Portfolio` (React 19, TypeScript, Three.js/R3F, Vite, Vitest):**
   - Thể loại: Ứng dụng Web 3D Tương tác.
   - Trọng tâm kỹ thuật: Không gian 3D tương tác với raycasting điều khiển camera, tự động đồng bộ hóa Dual-API (GitHub + GitLab) với bộ nhớ đệm kép, thiết lập CI/CD tự động kiểm thử và triển khai GitHub Pages.
*(Dự án Veldwild được chủ động lược bỏ khỏi CV theo yêu cầu của người dùng vì đang ở giai đoạn nguyên mẫu).*

---

## C. Thiết kế & Xuất bản CV Chuẩn 1 Trang A4 (Executive Steel Blue Style)

Dựa trên mẫu thiết kế 2 cột hiện đại theo ảnh tham khảo của người dùng:
- **Kích thước chuẩn:** Đúng 1 trang A4 (210mm $\times$ 297mm, margin 0, zero vertical overflow).
- **Phối màu:** Nền Dark Charcoal (`#33363a`) kết hợp Slate Steel Blue (`#5b80a6`) và nền nội dung trắng ngà sang trọng.
- **Header:** Họ tên, danh xưng chuyên môn, dải phân cách tech dots, và ảnh đại diện bo tròn lồng trong các cung tròn trang trí Steel Blue.
- **Cột trái (Sidebar):**
  - Banner bo tròn: **VỀ TÔI**, **LIÊN HỆ**, **KỸ NĂNG**.
  - Icon liên hệ hình tròn, danh mục kỹ năng phân nhóm rõ ràng (Game Engine, Gameplay, Runtime Optimization, Data & UI, Web & AI).
- **Cột phải (Main Content):**
  - **HỌC VẤN:** Lập trình & Thiết kế Game (FPT Polytechnic 2024 - 2026).
  - **DỰ ÁN GAME THỰC CHIẾN:** 3 dự án cốt lõi với bullet points chi tiết về số liệu hiệu năng (0 B GC Alloc, MaterialPropertyBlock, Spatial cache O(1)).
- **Ngôn ngữ xuất bản:**
  - Bản Tiếng Việt: `public/documents/cv-vi.pdf`
  - Bản Tiếng Anh: `public/documents/cv-en.pdf`
  - Bản mặc định: `public/documents/cv.pdf`

---

## D. Tình trạng kiểm thử kỹ thuật

| Hạng mục kiểm tra | Lệnh thực tế | Kết quả | Ghi chú chi tiết |
| :--- | :--- | :---: | :--- |
| **TypeScript Typecheck** | `npx.cmd tsc -b` | **PASS** | 0 lỗi compilation. Data contracts khớp 100%. |
| **ESLint / Oxlint** | `npm.cmd run lint` | **PASS** | 0 errors. |
| **Unit Tests (Vitest)** | `npm.cmd test` | **PASS** | 2/2 test files passed, 7/7 tests passed. |
| **Production Build** | `npm.cmd run build` | **PASS** | Bundle Vite thành công trong 807ms (`avatar-ESqpA1O3.jpg` được hash & đóng gói). |
| **CV Layout & Page Fit** | Playwright page audit | **PASS** | Chiều cao scrollHeight 1123px = 297mm. Vừa khít đúng 1 trang A4. |
| **Smart CV Download** | Language toggle test | **PASS** | Xem web tiếng Việt tải `cv-vi.pdf`, xem tiếng Anh tải `cv-en.pdf`. |
