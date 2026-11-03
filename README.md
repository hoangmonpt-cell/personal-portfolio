# 🎮 3D Stylized Game Developer Portfolio Studio

> **Hồ sơ năng lực cá nhân dạng Phòng Làm Việc 3D Tương Tác (3D Stylized Developer Room)**  
> Trải nghiệm không gian studio game development 3D sống động được xây dựng bằng **React Three Fiber (Three.js)**, tích hợp hệ thống **Camera Hybrid (Guided & Free Explore)**, tự động đồng bộ kho mã nguồn từ **GitHub REST API** và **GitLab Projects API**, hỗ trợ song ngữ **Việt - Anh (i18n)**, chế độ chuyển đổi linh hoạt **3D Room <-> 2D Classic Fallback** và tự động CI/CD lên **GitHub Pages**.

---

## 📑 Mục lục
1. [Tổng quan dự án & Ý tưởng 3D Room](#-tổng-quan-dự-án--ý-tưởng-3d-room)
2. [Các trạm tương tác trong phòng (3D Stations)](#-các-trạm-tương-tác-trong-phòng-3d-stations)
3. [Hệ thống Camera Hybrid (Guided & Explore)](#-hệ-thống-camera-hybrid)
4. [Công nghệ sử dụng (Tech Stack)](#-công-nghệ-sử-dụng)
5. [Hướng dẫn cài đặt & Chạy Local](#-hướng-dẫn-cài-đặt--chạy-local)
6. [Cấu hình thông tin cá nhân (Profile Configuration)](#-cấu-hình-thông-tin-cá-nhân)
7. [Cơ chế đồng bộ GitHub & GitLab (Repo Sync)](#-cơ-chế-đồng-bộ-github--gitlab)
8. [Triển khai GitHub Pages & CI/CD](#-triển-khai-github-pages--cicd)
9. [Kiểm thử tự động & Bằng chứng Browser Audit](#-kiểm-thử-tự-động--bằng-chứng-browser-audit)
10. [Xử lý sự cố (Troubleshooting)](#-xử-lý-sự-cố)

---

## 🚀 Tổng quan dự án & Ý tưởng 3D Room

Thay vì một trang CV cuộn văn bản đơn điệu, portfolio được biến đổi thành một **Phòng Làm Việc Game Developer 3D Stylized** đầy tính nghệ thuật:
- **Art Direction**: Gam màu Deep Navy / Muted Blue kết hợp gỗ ấm (Warm Wood), ánh sáng đèn vàng ấm áp và các dải viền neon Cyan / Emerald sắc sảo.
- **Không gian studio sống động**: Có bàn làm việc đa màn hình (chạy game engine mô phỏng và code cuộn), tháp PC tản nhiệt quạt RGB, ghế gaming công thái học, cửa sổ ngắm đường chân trời thành phố về đêm, kệ vũ khí công nghệ và bục chiếu hologram dự án.
- **Tính thực chiến 100%**: Mọi thông tin dự án vẫn được lấy trực tiếp từ GitHub/GitLab thật, hỗ trợ lọc, tìm kiếm, xem case study và tải CV verified.
- **Khả năng tiếp cận (Accessibility) & 2D Fallback**: Bất kỳ lúc nào, người xem có thể chuyển đổi nhanh sang **2D Classic View** chỉ bằng 1 cú click trên thanh HUD.

---

## 🛋 Các trạm tương tác trong phòng (3D Stations)

| Trạm không gian 3D | Vị trí | Chức năng tương tác |
| :--- | :---: | :--- |
| **1. Bàn Dev Chính (Main Workstation)** | Trung tâm | Bàn làm việc đa màn hình, PC case RGB, bàn phím cơ, tay cầm gamepad và cốc cà phê. Khi click sẽ zoom camera vào bàn và mở hồ sơ ứng viên, định hướng nghề nghiệp và nút tải CV. |
| **2. Bục Chiếu Dự Án (Project Display Kiosk)** | Bên phải | Bục lục giác công nghệ với hologram 3D xoay vòng. Khi click sẽ mở kho lưu trữ repository tự động đồng bộ từ GitHub/GitLab, có bộ lọc Fork, tìm kiếm và trigger Case Study. |
| **3. Tủ Vũ Khí Kỹ Thuật (Skills Arsenal Rack)** | Bên trái | Kệ công nghiệp bằng kim loại và gỗ chứa các cartridge game, tài liệu clean code và module AI, phân loại theo Game Dev, Software Rigor và AI Workflows. |
| **4. Bức Tường Thành Tựu (Achievements Wall)** | Tường trái | Kệ kính gắn huân chương, cúp sao đa diện vàng và kỷ niệm chương kiểm thử, thể hiện các tiêu chuẩn kỹ thuật nghiêm ngặt (Lighthouse 100, Strict Types, CI/CD). |
| **5. Trạm Truyền Tín Hiệu (Contact Station)** | Phía trước phải | Bàn console truyền tin với ăng-ten vệ tinh và màn hình radar xung nhịp, cung cấp sao chép email trực tiếp, link GitHub, GitLab, LinkedIn và CV. |

---

## 🎥 Hệ thống Camera Hybrid

Website hỗ trợ 2 chế độ camera chuyên nghiệp:
1. **Chế độ Hướng dẫn (Guided Mode - Mặc định)**:
   - Camera lướt điện ảnh (cinematic smooth lerp) mượt mà đến từng trạm khi bạn chọn trên thanh HUD hoặc click vào vật thể trong phòng.
   - Luôn căn góc và bố cục tối ưu, không bị kẹt hay xuyên tường.
2. **Chế độ Tự do khám phá (Free Exploration Mode)**:
   - Cho phép người xem dùng chuột kéo để xoay 360 độ quanh phòng và cuộn chuột để zoom.
   - Giới hạn góc nâng (`maxPolarAngle`) đảm bảo camera không bao giờ chui xuống dưới sàn.
3. **Nút "Đặt lại Camera (Reset)"**: Đưa camera ngay lập tức về góc nhìn toàn cảnh studio (`overview`).

---

## 🛠 Công nghệ sử dụng

- **3D Graphics Engine**: [Three.js](https://threejs.org/), [@react-three/fiber](https://r3f.docs.pmnd.rs/), [@react-three/drei](https://github.com/pmndrs/drei)
- **Frontend Core**: [React 19](https://react.dev/), [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 8](https://vitejs.dev/) (kết hợp Rolldown manual chunk splitting)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Data APIs**: GitHub REST API v3, GitLab Projects API v4
- **Testing**: [Vitest](https://vitest.dev/), Testing Library, Playwright Browser Automation, Oxlint
- **CI/CD & Hosting**: GitHub Actions, GitHub Pages

---

## 💻 Hướng dẫn cài đặt & Chạy Local

### Yêu cầu môi trường
- **Node.js**: Phiên bản `>= 20.x` (khuyến nghị 22.x LTS)
- **npm**: Phiên bản `>= 10.x`

### Các bước thực hiện:

1. **Clone repository về máy local:**
   ```bash
   git clone https://github.com/hoangmonpt-cell/personal-portfolio.git
   cd personal-portfolio
   ```

2. **Cài đặt các gói phụ thuộc:**
   ```bash
   npm install
   ```

3. **Tạo file biến môi trường:**
   Tạo file `.env` (dựa trên `.env.example`):
   ```ini
   # Tài khoản GitHub cần đồng bộ repo
   VITE_GITHUB_USERNAME=hoangmonpt-cell

   # Tài khoản GitLab (để trống nếu chưa dùng)
   VITE_GITLAB_USERNAME=
   VITE_GITLAB_BASE_URL=https://gitlab.com

   # Base path khi chạy local là ./
   VITE_BASE_PATH=./
   ```

4. **Khởi chạy máy chủ phát triển (Dev Server):**
   ```bash
   npm run dev
   ```
   Mở trình duyệt truy cập: `http://localhost:5173/`

5. **Build kiểm tra phiên bản Production:**
   ```bash
   npm run build
   npm run preview
   ```

---

## 👤 Cấu hình thông tin cá nhân

Toàn bộ thông tin cá nhân được quản lý **tập trung và độc lập** với logic giao diện tại thư mục `src/data/`:

### 1. Cập nhật thông tin profile chính
Mở file [`src/data/profile.ts`](file:///s:/personal-portfolio/src/data/profile.ts):
- `name`: Thay thế placeholder `[Họ và Tên]` bằng họ tên thật.
- `title`: Điều chỉnh chức danh song ngữ (VD: *Senior Gameplay Programmer*).
- `tagline` & `bio`: Cập nhật đoạn giới thiệu, mục tiêu nghề nghiệp và triết lý cá nhân.
- `location`: Địa điểm làm việc (On-site / Hybrid / Remote).
- `socialLinks`:
  - `github`: Đường dẫn trang cá nhân GitHub.
  - `gitlab`: Đường dẫn trang cá nhân GitLab.
  - `linkedin`: URL trang cá nhân LinkedIn.
  - `email`: Địa chỉ hòm thư liên hệ chính thức.
  - `cvUrl`: Đặt file CV của bạn vào `public/documents/cv.pdf` và cấu hình đường dẫn `./documents/cv.pdf`.

### 2. Cập nhật danh mục Kỹ năng (Skills)
Tại file [`src/data/profile.ts`](file:///s:/personal-portfolio/src/data/profile.ts), bạn có thể thêm/bớt/sửa đổi mảng `skillsData` theo 3 nhóm:
- `'game-dev'`: Kỹ năng Unity, Unreal, C#, Gameplay Systems, Shader, Physics,...
- `'software-dev'`: Kiến trúc SOLID, C++, Design Patterns, Memory Profiling,...
- `'ai-tools'`: Kỹ năng ứng dụng AI pair programming, LLM workflow, testing tự động,...

### 3. Đánh dấu Dự án Nổi bật & Case Study
Mở file [`src/data/featuredProjects.ts`](file:///s:/personal-portfolio/src/data/featuredProjects.ts):
- `repoName`: Điền chính xác tên repository trên GitHub/GitLab bạn muốn gắn cờ nổi bật (`FEATURED`).
- `caseStudiesData`: Điền chi tiết bối cảnh, giải pháp, khó khăn và kết quả của dự án để hiển thị trên màn hình Case Study tương tác.

---

## 🔄 Cơ chế đồng bộ GitHub & GitLab

Hệ thống sử dụng cơ chế **Client-side Hybrid Fetch & Cache**:
1. **Truy vấn an toàn**: Gọi API công khai của GitHub (`/users/{username}/repos`) và GitLab (`/users/{username}/projects`) mà không yêu cầu secret token hay personal access token nhạy cảm ở client.
2. **Adapter Normalization**: Toàn bộ dữ liệu được chuẩn hóa về model `UnifiedProject` (chuẩn hóa tên, số sao, số fork, danh mục, ngôn ngữ, đường dẫn repo, demo URL).
3. **Smart Cache (TTL 15 phút)**: Kết quả đồng bộ được lưu trong `localStorage`. Trong vòng 15 phút, người dùng tải lại trang sẽ không gọi lại API, giúp triệt tiêu nguy cơ bị GitHub chặn vì Rate Limit (60 req/giờ đối với unauthenticated requests).
4. **Nút làm mới tức thì (Force Refresh)**: Nhà tuyển dụng hoặc ứng viên có thể bấm nút **Thử lại đồng bộ** để xóa cache và kéo phiên bản repo mới nhất.
5. **Fallback Resilience**: Nếu mạng gặp sự cố hoặc username không tồn tại, hệ thống kích hoạt chế độ dự phòng an toàn (Fallback Snapshot) để trang web không bao giờ bị trống hoặc crash.

---

## 🌐 Triển khai GitHub Pages & CI/CD

Dự án đã được cấu hình sẵn pipeline tự động hóa hoàn chỉnh thông qua **GitHub Actions** tại file [`.github/workflows/deploy.yml`](file:///s:/personal-portfolio/.github/workflows/deploy.yml).

### Các bước kích hoạt GitHub Pages trên kho mã nguồn của bạn:

1. **Đẩy mã nguồn lên branch `main` của GitHub:**
   ```bash
   git add .
   git commit -m "feat: complete game developer portfolio with auto-sync and i18n"
   git push origin main
   ```

2. **Kích hoạt quyền Deploy trên GitHub Repository:**
   - Truy cập vào GitHub: `https://github.com/hoangmonpt-cell/personal-portfolio`
   - Vào tab **Settings** -> mục **Pages** (ở cột bên trái).
   - Tại mục **Build and deployment** -> **Source**: Chọn **GitHub Actions**.

3. **Theo dõi tiến trình:**
   - Vào tab **Actions** trên repository để theo dõi workflow chạy:
     1. Checkout mã nguồn
     2. Cài đặt Node.js 22 & Dependencies
     3. Kiểm tra kiểu dữ liệu (`tsc -b`)
     4. Chạy kiểm thử tự động (`vitest`)
     5. Build gói bundle tối ưu với base path `/personal-portfolio/`
     6. Xuất bản website lên domain GitHub Pages:
        `https://hoangmonpt-cell.github.io/personal-portfolio/`

---

## 🧪 Kiểm thử mã nguồn

Dự án được bảo vệ bởi bộ kiểm thử tự động, linter và type checking nghiêm ngặt:

```bash
# 1. Chạy Unit Tests (Vitest)
npm test

# 2. Chạy kiểm tra TypeScript Types
npx tsc -b

# 3. Chạy Linter (Oxlint)
npm run lint

# 4. Kiểm tra Production Build
npm run build

# 5. Chạy Browser Regression & Screenshot Verification (Playwright + Edge Headless)
node scripts/auditBrowser.mjs
```

### 📊 Điểm số đo lường thực tế (Google Lighthouse v13.6):
- **Performance**: `100 / 100` ⚡
- **Accessibility**: `95 / 100` ♿
- **Best Practices**: `100 / 100` 🛡️
- **SEO**: `91 / 100` 🔍

---

## 🔧 Xử lý sự cố (Troubleshooting)

### 1. Gặp thông báo lỗi "GitHub API rate limit exceeded"
- **Nguyên nhân**: GitHub giới hạn 60 lượt gọi/giờ đối với IP công khai khi không đăng nhập.
- **Giải pháp**: Website tự động chuyển sang đọc từ LocalStorage Cache hoặc Fallback Mode. Sau khi hết thời gian giới hạn (khoảng 15-60 phút), hệ thống sẽ tự động đồng bộ lại bình thường.

### 2. Đường dẫn tài nguyên bị 404 khi deploy lên GitHub Pages
- **Nguyên nhân**: Thiếu base path của repository name.
- **Giải pháp**: Trong file `.github/workflows/deploy.yml`, biến `VITE_BASE_PATH` đã được đặt tự động thành `/${{ github.event.repository.name }}/`. Nếu sử dụng custom domain riêng (VD: `portfolio.yourname.com`), hãy sửa `VITE_BASE_PATH` thành `/`.

### 3. PowerShell trên Windows chặn chạy file script (`npm.ps1`)
- **Giải pháp**: Sử dụng lệnh có đuôi `.cmd` trên PowerShell (ví dụ: `npm.cmd run dev`, `npx.cmd tsc`), hoặc cấp quyền thực thi tạm thời: `Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass`.

---

© 2026 Designed and Engineered for Game Developer & Software Engineer Career Opportunities.
