import type { ProfileData, SkillItem } from '../types/project';
import avatarImg from '../assets/images/avatar.jpg';

/**
 * THÔNG TIN HỒ SƠ CHUYÊN MÔN (VERIFIED PROFILE DATA)
 * Vị trí trọng tâm: Game Developer
 * Năng lực bổ trợ: Software Engineering & AI-Assisted Workflows
 * Toàn bộ thông tin được xác minh từ mã nguồn và repository thực tế.
 */
export const profileData: ProfileData = {
  name: 'Bùi Huy Hoàng',
  title: {
    vi: 'Game Developer | Gameplay Systems & Software Engineering',
    en: 'Game Developer | Gameplay Systems & Software Engineering',
  },
  tagline: {
    vi: 'Xây dựng gameplay có chiều sâu, tối ưu hóa runtime loops và ứng dụng AI tăng tốc quy trình phát triển game.',
    en: 'Building responsive gameplay mechanics, optimizing runtime loops, and leveraging AI to accelerate game development cycles.',
  },
  bio: {
    vi: [
      'Tôi là Bùi Huy Hoàng, lập trình viên định hướng chuyên sâu vào Game Development trên nền tảng Unity (C#), kết hợp tư duy kiến trúc phần mềm chặt chẽ và kỷ luật kỹ thuật cao.',
      'Các dự án của tôi tập trung vào game Idle / Tower Defense (Fortress Idle) và game 2D tương tác vật lý (Ottershi). Trọng tâm của tôi là hiện thực hóa các cơ chế gameplay mượt mà, quản lý trạng thái qua FSM và cấu trúc dữ liệu theo định hướng data-driven (ScriptableObject).',
      'Trong quy trình phát triển, tôi đặc biệt chú trọng kiểm soát hiệu năng runtime: áp dụng Generic Object Pooling (SimplePool) nhằm triệt tiêu cấp phát bộ nhớ rác (GC Alloc) trong combat loop, dùng MaterialPropertyBlock giảm thiểu Draw Calls, và ứng dụng AI agents để tăng tốc kiểm thử, sinh mã nguyên mẫu và viết tài liệu kỹ thuật.',
      'Mục tiêu của tôi là đồng hành cùng đội ngũ phát triển game chuyên nghiệp với vai trò Game Developer, mang lại mã nguồn sạch, dễ mở rộng, sẵn sàng đóng góp từ tầng gameplay logic đến tối ưu hóa hệ thống.',
    ],
    en: [
      'I am Bui Huy Hoang, a game developer focused on Unity (C#) development, combining disciplined software architecture with strong engineering principles.',
      'My projects focus on Idle / Tower Defense hybrids (Fortress Idle) and physics-driven 2D games (Ottershi). My core focus is implementing responsive gameplay mechanics, robust FSM state handling, and scalable data-driven pipelines with ScriptableObjects.',
      'In day-to-day engineering, I prioritize runtime performance: leveraging Generic Object Pooling to eliminate combat loop garbage allocation (GC Alloc), utilizing MaterialPropertyBlock to batch draw calls, and adopting AI-assisted workflows to accelerate prototyping, test scaffolding, and technical documentation.',
      'My goal is to contribute to a professional game studio as a Game Developer, delivering clean, maintainable code and solving engineering challenges from gameplay mechanics to system-level optimization.',
    ],
  },
  avatarUrl: avatarImg, // Ảnh đại diện chuyên nghiệp
  avatarPlaceholderText: 'DEV',
  status: {
    vi: 'Sẵn sàng cho cơ hội việc làm Game Developer',
    en: 'Open to Game Developer opportunities',
  },
  location: {
    vi: 'Việt Nam',
    en: 'Vietnam',
  },
  socialLinks: {
    github: 'https://github.com/hoangmonpt-cell',
    gitlab: 'https://gitlab.com/hoangmonpt-cell',
    linkedin: '', // Để trống an toàn khi chưa cung cấp URL xác minh
    email: 'hoangmon.pt@gmail.com',
    cvUrl: './documents/cv.pdf', // CV đã được tạo và lưu trữ tại public/documents/
  },
  stats: {
    reposCountPlaceholder: 5,
    gameProjectsPlaceholder: 4,
  },
};

/**
 * DANH MỤC KỸ NĂNG CHUYÊN MÔN ĐÃ XÁC MINH
 * Phân loại theo tiêu chuẩn tuyển dụng Game Developer.
 * Chỉ liệt kê công nghệ đã triển khai thực tế trong codebase, không đưa công nghệ chưa xác minh.
 */
export const skillsData: SkillItem[] = [
  // ─── A. GAME DEVELOPMENT ───
  {
    name: 'Unity Engine & C#',
    category: 'game-dev',
    tags: ['Unity 6 (LTS)', 'C#', 'Universal Render Pipeline (URP)', 'Component-Based'],
    description: {
      vi: 'Lập trình gameplay systems, kiến trúc Component-based, quản lý vòng lặp game loop và tích hợp URP.',
      en: 'Developing gameplay systems, component-based architectures, game loops, and URP integration.',
    },
  },
  {
    name: 'Gameplay Mechanics & State Machines',
    category: 'game-dev',
    tags: ['Combat Logic', 'Finite State Machine (FSM)', 'Tower Defense Systems', 'Touch / Drag Physics'],
    description: {
      vi: 'Hiện thực hóa cơ chế chiến đấu theo đợt, điều khiển trạng thái nhân vật/quái vật qua FSM và xử lý va chạm vật lý.',
      en: 'Implementing wave-based combat mechanics, FSM character/enemy states, and physics interactions.',
    },
  },
  {
    name: 'Object Pooling & Runtime Performance',
    category: 'game-dev',
    tags: ['Generic Object Pooling', 'Zero-Alloc Combat Loop', 'MaterialPropertyBlock', 'Draw Call Batching'],
    description: {
      vi: 'Áp dụng Object Pooling để triệt tiêu GC Alloc trong vòng lặp combat và sử dụng MaterialPropertyBlock để tối ưu hóa render batching.',
      en: 'Applying Generic Object Pooling to eliminate combat GC allocations and leveraging MaterialPropertyBlock for render batching.',
    },
  },
  {
    name: 'Game UI & Systems Architecture',
    category: 'game-dev',
    tags: ['UI Toolkit (USS/UXML)', 'UGUI Canvas', 'ScriptableObject Architecture', 'BigNumber Formatter'],
    description: {
      vi: 'Xây dựng giao diện game bằng UI Toolkit và UGUI, quản lý cấu hình dữ liệu qua ScriptableObjects và định dạng số lớn (BigNumber).',
      en: 'Building in-game interfaces with UI Toolkit and UGUI, managing data configs via ScriptableObjects, and handling large numeric scaling.',
    },
  },

  // ─── B. SOFTWARE ENGINEERING ───
  {
    name: 'Software Architecture & Design Patterns',
    category: 'software-dev',
    tags: ['Observer Pattern', 'Singleton / Manager Pattern', 'Spatial Registry', 'Flyweight Pattern'],
    description: {
      vi: 'Tổ chức mã nguồn module hóa, phân tách rõ ràng giữa dữ liệu và presentation, giảm bớt phụ thuộc chéo giữa các hệ thống.',
      en: 'Designing modular codebases with clean data-presentation separation, minimizing coupling across game systems.',
    },
  },
  {
    name: 'Modern Web & Frontend Engineering',
    category: 'software-dev',
    tags: ['TypeScript', 'React 19', 'Vite', 'Three.js / R3F', 'Tailwind CSS'],
    description: {
      vi: 'Xây dựng ứng dụng web tương tác 3D với Three.js / R3F, tích hợp REST API đồng bộ dữ liệu và tối ưu bundle Vite.',
      en: 'Building interactive 3D web experiences with Three.js / R3F, integrating REST APIs for dynamic sync, and optimizing Vite builds.',
    },
  },
  {
    name: 'Version Control & CI/CD Pipelines',
    category: 'software-dev',
    tags: ['Git', 'GitHub Actions', 'GitLab CI/CD', 'Automated Deployment'],
    description: {
      vi: 'Quản lý mã nguồn trên GitHub và GitLab, thiết lập GitHub Actions tự động kiểm thử (Vitest) và triển khai sản phẩm.',
      en: 'Managing source code on GitHub and GitLab, configuring automated GitHub Actions for testing (Vitest) and continuous deployment.',
    },
  },
  {
    name: 'Testing & Quality Assurance',
    category: 'software-dev',
    tags: ['Automated Unit Testing', 'Vitest', 'Game QA Scenarios', 'Diagnostic Logging'],
    description: {
      vi: 'Thiết kế kịch bản kiểm thử tự động cho game logic và hệ thống web, kiểm tra tính toán dữ liệu và xử lý ngoại lệ biên.',
      en: 'Authoring automated unit test suites for web and game logic, validating numeric bounds, and handling edge cases.',
    },
  },

  // ─── C. AI & DEVELOPMENT WORKFLOW ───
  {
    name: 'AI-Assisted Engineering & Workflows',
    category: 'ai-tools',
    tags: ['AI Pair Programming', 'Prompt Orchestration', 'Automated Code Review', 'Agentic Workflows'],
    description: {
      vi: 'Ứng dụng AI agents như một cộng sự kỹ thuật (pair programmer) để tăng tốc viết mã khung, sinh bộ dữ liệu mẫu và chuẩn hóa tài liệu kỹ thuật.',
      en: 'Leveraging AI agents as an engineering pair programmer to accelerate scaffolding, mock data generation, and technical documentation.',
    },
  },
  {
    name: 'Rapid Prototyping & Technical Documentation',
    category: 'ai-tools',
    tags: ['GDD Generation', 'Architecture Specs', 'Data Contracts', 'Automated QA Reports'],
    description: {
      vi: 'Dựng nhanh nguyên mẫu tính năng, cấu trúc hóa tài liệu thiết kế game (GDD) và xây dựng báo cáo kiểm thử tự động.',
      en: 'Rapid feature prototyping, game design document (GDD) structuring, and automated test reporting.',
    },
  },
];
