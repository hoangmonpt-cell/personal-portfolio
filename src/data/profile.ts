import type { ProfileData, SkillItem } from '../types/project';

/**
 * THÔNG TIN HỒ SƠ CÁ NHÂN (PROFILE DATA)
 * Lưu ý quan trọng: Toàn bộ thông tin dưới đây là placeholder mang ý nghĩa cấu trúc.
 * Người dùng hãy cập nhật thông tin thực tế của mình tại file này.
 */
export const profileData: ProfileData = {
  name: '[Bùi Huy Hoàng]',
  title: {
    vi: 'Game Developer & Software Engineer (AI-Assisted)',
    en: 'Game Developer & Software Engineer (AI-Assisted)',
  },
  tagline: {
    vi: 'Phát triển Game tương tác cao, kiến trúc phần mềm tối ưu và tích hợp AI workflows.',
    en: 'Crafting immersive interactive games, optimized software architectures, and AI-accelerated workflows.',
  },
  bio: {
    vi: [
      'Xin chào! Tôi là một lập trình viên tập trung vào Game Development, Software Engineering và ứng dụng AI trong quy trình sản xuất phần mềm.',
      'Định hướng của tôi là xây dựng các hệ thống gameplay mượt mà, tối ưu hóa hiệu năng render/memory, và áp dụng AI để tăng tốc độ lặp (iteration cycle) trong quy trình phát triển.',
      '[Vui lòng cập nhật chi tiết phần tự giới thiệu cá nhân, mục tiêu nghề nghiệp và triết lý lập trình tại src/data/profile.ts]',
    ],
    en: [
      'Hello! I am a developer specialized in Game Development, Software Engineering, and AI-assisted workflow integration.',
      'My focus is on creating responsive gameplay mechanics, optimizing runtime performance & memory, and leveraging AI tools to accelerate development iterations.',
      '[Please customize your detailed bio, career trajectory, and engineering philosophies in src/data/profile.ts]',
    ],
  },
  avatarUrl: '', // Để trống nếu dùng visual placeholder HUD avatar
  avatarPlaceholderText: 'DEV',
  status: {
    vi: 'Đang sẵn sàng cho cơ hội việc làm mới (Open to Work)',
    en: 'Open to new career opportunities (Open to Work)',
  },
  location: {
    vi: 'Việt Nam (Hỗ trợ On-site / Remote / Hybrid)',
    en: 'Vietnam (Available for On-site / Remote / Hybrid)',
  },
  socialLinks: {
    github: 'https://github.com/hoangmonpt-cell',
    gitlab: 'https://gitlab.com/hoangmonpt-cell',
    linkedin: 'https://linkedin.com/in/[your-profile]', // placeholder
    email: 'hoangmon.pt@gmail.com', // placeholder
    cvUrl: '#', // placeholder: đặt file CV vào /public/documents/cv.pdf và điền '/documents/cv.pdf'
  },
  stats: {
    reposCountPlaceholder: 0,
    gameProjectsPlaceholder: 0,
    yearsOfExperiencePlaceholder: '[Năm kinh nghiệm]',
  },
};

/**
 * DANH MỤC KỸ NĂNG CHUYÊN MÔN
 * Được phân nhóm theo chuẩn tuyển dụng Game Developer & Software Engineer.
 * Không bịa % trình độ, chỉ hiển thị tech stack và các giải pháp thực tế.
 */
export const skillsData: SkillItem[] = [
  // Game Development
  {
    name: 'Unity Engine & C#',
    category: 'game-dev',
    tags: ['Unity 2022/6', 'C#', 'DOTS/ECS', 'Universal Render Pipeline (URP)'],
    description: {
      vi: 'Lập trình gameplay systems, physics, state machine, pooling pattern và URP shader graph.',
      en: 'Gameplay systems, physics simulation, state machines, object pooling, and URP shader graphs.',
    },
  },
  {
    name: 'Gameplay Mechanics & Physics',
    category: 'game-dev',
    tags: ['Movement', 'Combat Systems', 'Input System', '2D/3D Physics'],
    description: {
      vi: 'Thiết kế cơ chế điều khiển nhạy bén, hitbox/hurtbox, camera control và AI kẻ địch (FSM/Behavior Tree).',
      en: 'Responsive controller mechanics, collision detection, camera dynamics, and enemy AI behaviors.',
    },
  },
  {
    name: 'Game Optimization & Profiling',
    category: 'game-dev',
    tags: ['Unity Profiler', 'Memory Leak Detection', 'Draw Calls', 'Occlusion Culling'],
    description: {
      vi: 'Giảm thiểu Draw Calls, tối ưu Garbage Collection (GC Alloc), atlas hóa textures và tối ưu hóa frame rate.',
      en: 'Draw call batching, Garbage Collection minimization, texture atlasing, and stable frame pacing.',
    },
  },
  {
    name: 'Game UI/UX Systems',
    category: 'game-dev',
    tags: ['UI Toolkit', 'Canvas Optimization', 'HUD Panels', 'Localization'],
    description: {
      vi: 'Xây dựng giao diện HUD tương tác trực quan, dynamic inventory và dynamic menu animation.',
      en: 'Dynamic HUD designs, responsive inventory matrices, and high-performance UI state handling.',
    },
  },

  // Software Development
  {
    name: 'Software Architecture & Design Patterns',
    category: 'software-dev',
    tags: ['SOLID', 'Observer Pattern', 'Singleton / Service Locator', 'Command Pattern'],
    description: {
      vi: 'Thiết kế kiến trúc code module hóa, phân tách rõ model - view - controller, dễ mở rộng và bảo trì.',
      en: 'Modular architecture, decoupled event-driven systems, and scalable structural paradigms.',
    },
  },
  {
    name: 'Core Languages',
    category: 'software-dev',
    tags: ['C#', 'C++', 'TypeScript', 'Python'],
    description: {
      vi: 'Lập trình hướng đối tượng vững chắc, quản lý bộ nhớ, thuật toán dữ liệu và tư duy lập trình hệ thống.',
      en: 'Strong OOP foundations, memory awareness, algorithmic thinking, and system-level execution.',
    },
  },
  {
    name: 'Version Control & Team Workflow',
    category: 'software-dev',
    tags: ['Git', 'GitHub', 'GitLab', 'CI/CD Pipelines'],
    description: {
      vi: 'Quản lý Git branching, pull request review, merge conflict resolution và tích hợp tự động build/deploy.',
      en: 'Git branch lifecycle, clean PR reviews, merge resolutions, and automated CI/CD pipelines.',
    },
  },
  {
    name: 'Testing & Debugging',
    category: 'software-dev',
    tags: ['Unit Testing', 'Visual Studio Debugger', 'Log Diagnostics', 'Vitest'],
    description: {
      vi: 'Kỹ năng cô lập lỗi, step-by-step debugging, profiling log và viết test kiểm thử logic quan trọng.',
      en: 'Root cause isolation, interactive debugging, structured diagnostic logging, and test automation.',
    },
  },

  // AI & Development Tools
  {
    name: 'AI-assisted Development',
    category: 'ai-tools',
    tags: ['Prompt Engineering', 'AI Pair Programming', 'Automated Refactoring', 'LLM Integration'],
    description: {
      vi: 'Ứng dụng AI agents và LLMs để tăng tốc code generation, unit test creation và tài liệu hóa source code.',
      en: 'Leveraging AI agents and LLMs for accelerated feature iteration, automated test suites, and docs.',
    },
  },
  {
    name: 'Game Asset & AI Prototyping',
    category: 'ai-tools',
    tags: ['Procedural Content', 'AI Texture Generation', 'Rapid Prototyping'],
    description: {
      vi: 'Thử nghiệm nhanh ý tưởng game, procedural level layout và sử dụng AI hỗ trợ dựng asset prototype.',
      en: 'Rapid game prototyping, procedural level layouts, and AI-assisted asset ideation pipelines.',
    },
  },
  {
    name: 'Build & Automation Tools',
    category: 'ai-tools',
    tags: ['GitHub Actions', 'Vite', 'Node.js', 'Automated QA'],
    description: {
      vi: 'Thiết lập quy trình tự động hóa kiểm thử mã nguồn, linting và xuất bản ứng dụng lên web/hosting.',
      en: 'Automated code quality gates, smoke testing pipelines, and zero-touch deployments.',
    },
  },
];
