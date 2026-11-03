import type { CaseStudyData } from '../types/project';

/**
 * CẤU HÌNH DỰ ÁN NỔI BẬT (FEATURED PROJECTS CONFIG)
 * Liệt kê repo name để website đánh dấu Featured.
 * Cho phép bổ sung thumbnail, screenshots, video demo và link case study mà không cần sửa code API.
 */
export interface FeaturedProjectConfig {
  repoName: string; // Tên repo trùng khớp trên GitHub / GitLab
  category: 'game' | 'software' | 'ai' | 'tool';
  customTitle?: string;
  customDescription?: {
    vi: string;
    en: string;
  };
  thumbnail?: string;
  screenshots?: string[];
  caseStudyId?: string;
  featuredOrder?: number;
}

export const featuredProjectsConfig: FeaturedProjectConfig[] = [
  {
    repoName: 'personal-portfolio',
    category: 'software',
    customTitle: 'Game Dev Portfolio & Auto-Sync Engine',
    customDescription: {
      vi: 'Website portfolio chuyên nghiệp dành cho Game Developer với kiến trúc game HUD sci-fi, tự động đồng bộ repository GitHub/GitLab, song ngữ Việt - Anh và CI/CD GitHub Actions.',
      en: 'A high-performance Game Developer portfolio featuring a sci-fi HUD theme, automated GitHub & GitLab sync, bilingual localization, and GitHub Actions CI/CD.',
    },
    thumbnail: '',
    caseStudyId: 'portfolio-engine',
    featuredOrder: 1,
  },
];

/**
 * DANH SÁCH CASE STUDIES CHI TIẾT
 */
export const caseStudiesData: Record<string, CaseStudyData> = {
  'portfolio-engine': {
    id: 'portfolio-engine',
    title: 'Personal Portfolio & Multi-Source Repo Synchronizer',
    subtitle: {
      vi: 'Hệ thống Portfolio tương tác phong cách Game HUD với cơ chế đồng bộ kho mã nguồn thông minh',
      en: 'Interactive Game HUD Portfolio with Intelligent Multi-Source Code Synchronizer',
    },
    overview: {
      vi: 'Xây dựng website portfolio tối ưu hóa cho Game Developer, kết hợp giữa tư duy thiết kế giao diện Game HUD sáng tạo và kỹ thuật phần mềm hiện đại: TypeScript, Vite, tự động hóa fetch và chuẩn hóa dữ liệu từ GitHub REST API và GitLab Projects API.',
      en: 'Built an optimized portfolio tailored for Game Developers, merging immersive sci-fi game HUD UI principles with robust web engineering: TypeScript, Vite, automated fetch & normalization from GitHub REST API and GitLab Projects API.',
    },
    goal: {
      vi: 'Giải quyết bài toán cập nhật portfolio thủ công bằng cách tự động đồng bộ hóa kho dự án mở, đồng thời tạo ra trải nghiệm thị giác ấn tượng nhưng vẫn đảm bảo tải nhanh, hỗ trợ song ngữ và tương thích hoàn toàn với GitHub Pages.',
      en: 'Eliminated manual portfolio maintenance through continuous repo synchronization, delivering a memorable game-inspired aesthetic without sacrificing bundle efficiency or accessibility.',
    },
    techStack: ['React 19', 'TypeScript', 'Vite', 'Tailwind CSS', 'GitHub Actions', 'Lucide Icons', 'Vitest'],
    architecture: {
      vi: [
        'Tách biệt 3 tầng kiến trúc: Data Providers (GitHub/GitLab API & Fallback), Normalization Adapter, Presentation UI Layer.',
        'Chiến lược Hybrid Cache lưu trữ LocalStorage thông minh, chống nghẽn rate limit (403/429) và tự phục hồi khi offline.',
        'Hệ thống Localization không re-render toàn trang, hỗ trợ fallback song ngữ linh hoạt.',
      ],
      en: [
        'Clean 3-layer architecture: Data Providers (GitHub/GitLab APIs & Fallbacks), Normalization Adapter, and Game HUD UI Layer.',
        'Resilient Hybrid Caching via LocalStorage to mitigate API rate limits (403/429) with seamless offline fallback.',
        'Lightweight decoupled Localization engine preventing full-page reloads with zero-dependency bilingual switches.',
      ],
    },
    keyFeatures: {
      vi: [
        'Đồng bộ hóa tự động GitHub & GitLab repositories.',
        'Bộ lọc đa chiều: Nền tảng (GitHub/GitLab), Danh mục (Game/AI/Software/Tool), Tìm kiếm tên/mô tả theo thời gian thực.',
        'Giao diện Sci-Fi Tactical HUD với âm hưởng game development, responsive trên mọi kích thước màn hình.',
        'Hỗ trợ chế độ song ngữ Tiếng Việt & English chuẩn mực kỹ thuật.',
      ],
      en: [
        'Real-time automated sync for GitHub & GitLab public projects.',
        'Multi-axis filtering: Source provider, project category, and instant search.',
        'Sci-Fi Tactical HUD visual experience responsive across mobile, tablet, and desktop viewports.',
        'Seamless Vietnamese / English bilingual toggling across all interface modules.',
      ],
    },
    challenges: {
      vi: [
        'Xử lý cấu trúc dữ liệu không đồng nhất giữa GitHub API (REST v3) và GitLab Projects API (v4).',
        'GitHub unauthenticated API rate limit (60 requests/giờ) có thể làm gián đoạn trải nghiệm nhà tuyển dụng.',
        'Đảm bảo visual gaming HUD độc đáo nhưng vẫn duy trì chỉ số tiếp cận Accessibility (contrast, semantic HTML, screen reader).',
      ],
      en: [
        'Reconciling data schema disparities between GitHub REST v3 and GitLab Projects API v4.',
        'Overcoming unauthenticated GitHub rate limits (60 req/hr) to ensure uninterrupted recruiter browsing.',
        'Crafting a distinct gaming visual style while maintaining strict accessibility contrast and keyboard navigability.',
      ],
    },
    solutions: {
      vi: [
        'Thiết kế UnifiedProject Model với Adapter pattern chuẩn hóa id, sao, forks, ngôn ngữ, tag, và metadata.',
        'Triển khai Cache-First với TTL (Time-To-Live) 15 phút kết hợp Bundled Fallback Snapshot để website không bao giờ bị trống dữ liệu.',
        'Sử dụng bảng màu neon-cyan / emerald tactical kết hợp dark slate nền sâu, kiểm tra độ tương phản WCAG AA.',
      ],
      en: [
        'Engineered a UnifiedProject Adapter model mapping disparate fields into an immutable schema.',
        'Implemented TTL-backed LocalStorage cache paired with Bundled Snapshot Fallbacks for 100% uptime.',
        'Adopted a balanced high-contrast cyberpunk/tactical HUD palette tested against WCAG AA standards.',
      ],
    },
    personalContribution: {
      vi: [
        'Thiết kế toàn bộ kiến trúc frontend, hệ thống types và data adapters.',
        'Lập trình Game HUD Design System và các hiệu ứng visual state.',
        'Cấu hình CI/CD GitHub Actions deploy tự động lên GitHub Pages.',
      ],
      en: [
        'Architected full frontend structure, TypeScript interfaces, and normalization adapters.',
        'Engineered the game HUD design components, visual feedback states, and sound fx toggles.',
        'Automated CI/CD validation and deployment pipelines targeting GitHub Pages.',
      ],
    },
    testingResults: {
      vi: '100% TypeScript type-check thành công, vượt qua toàn bộ unit test normalization và build production hoàn tất trong dưới 5 giây.',
      en: '100% TypeScript type-check passed, comprehensive adapter unit tests verified, sub-5-second production builds.',
    },
    repoUrl: 'https://github.com/hoangmonpt-cell/personal-portfolio',
  },
};
