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
  repoUrl?: string;
}

export const featuredProjectsConfig: FeaturedProjectConfig[] = [
  {
    repoName: 'FortressIdle',
    category: 'game',
    customTitle: 'Fortress Idle: Last Stand',
    customDescription: {
      vi: 'Dự án Tower Defense & Idle kết hợp trên Unity 6 LTS (URP) – Sprint 7 ngày, đạt Giải Triển Vọng GAME SPRINT 2026. Tối ưu 0 B GC Alloc trong combat loop, MaterialPropertyBlock triệt tiêu rò rỉ VRAM.',
      en: 'Hybrid Tower Defense & Idle game on Unity 6 LTS (URP) – Completed in 7-day sprint, won Promising Award at GAME SPRINT 2026. Features 0 B GC Alloc in combat loops and MaterialPropertyBlock.',
    },
    thumbnail: '',
    caseStudyId: 'fortress-idle',
    featuredOrder: 1,
    repoUrl: 'https://github.com/hoangmonpt-cell/FortressIdle',
  },
  {
    repoName: 'rise-of-the-elements',
    category: 'game',
    customTitle: 'Rise of the Elements',
    customDescription: {
      vi: 'Dự án Xưởng Game Hybrid Match-3 & Tower Defense (PC / Mobile). Kiến trúc phân tách Unity UI Toolkit (UXML/USS), DataManager tích hợp Firebase Realtime Database, cơ chế hồi Thể lực/Lives Server-Authoritative và hiệu ứng Currency VFX.',
      en: 'Hybrid Match-3 & Tower Defense Studio Capstone (PC / Mobile). Features modular Unity UI Toolkit (UXML/USS), Firebase Realtime Cloud Data, Server-Authoritative Lives/Stamina, and Currency VFX.',
    },
    thumbnail: '',
    caseStudyId: 'rise-of-the-elements',
    featuredOrder: 2,
    repoUrl: 'https://gitlab.com/duanxuong/rise-of-the-elements',
  },
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
    featuredOrder: 3,
    repoUrl: 'https://github.com/hoangmonpt-cell/personal-portfolio',
  },
];

/**
 * DANH SÁCH CASE STUDIES CHI TIẾT
 */
export const caseStudiesData: Record<string, CaseStudyData> = {
  'rise-of-the-elements': {
    id: 'rise-of-the-elements',
    title: 'Rise of the Elements: Hybrid Match-3 & Tower Defense',
    subtitle: {
      vi: 'Kiến trúc UI Toolkit phân tách, đồng bộ Firebase Auth/Database và hệ thống điều phối vòng đời màn chơi',
      en: 'Modular UI Toolkit Architecture, Firebase Cloud Synchronization, and Robust Game Lifecycle Management',
    },
    overview: {
      vi: 'Dự án Xưởng Game FPT Polytechnic kết hợp giữa cơ chế giải đố Match-3 và phòng thủ tháp Tower Defense theo chủ đề 5 nguyên tố. Dự án đòi hỏi hệ thống giao diện phản hồi tức thì, bảo đảm 60 FPS không giật lag khi chuyển Scene, và đồng bộ dữ liệu người chơi qua Firebase an toàn.',
      en: 'An FPT Polytechnic Studio capstone hybrid merging Match-3 elemental puzzles with tactical Tower Defense mechanics. Built with modern Unity UI Toolkit, resilient scene orchestration, and server-authoritative cloud synchronization.',
    },
    goal: {
      vi: 'Xây dựng toàn bộ hệ thống giao diện người dùng theo chuẩn Unity UI Toolkit (UXML/USS), kiến trúc DataManager tập trung tích hợp Firebase Auth & Cloud Database, và thiết kế hệ thống điều phối vòng đời GameInitializer ngăn ngừa rò rỉ bộ nhớ khi chuyển màn.',
      en: 'Develop the complete UI/UX pipeline using modern Unity UI Toolkit (UXML/USS), engineer a centralized DataManager with Firebase Auth and Realtime Database, and establish a robust GameInitializer lifecycle preventing scene transition memory leaks.',
    },
    techStack: [
      'Unity 2022 LTS',
      'C# (.NET)',
      'UI Toolkit (UXML/USS)',
      'Firebase Auth & Realtime Database',
      'LeanTween',
      'SceneManager & Boot Pattern',
      'GitLab Flow',
    ],
    architecture: {
      vi: [
        'Kiến trúc UI Toolkit hiện đại: Phân tách hoàn toàn giữa layout (UXML), stylesheet (USS) và logic C# theo mô hình vòng đời OnEnable/OnDisable.',
        'Hệ thống DataManager tập trung: Quản lý ProgressData (Score, Coin, Gem, Tickets, Level Map) đồng bộ song song giữa bộ nhớ cục bộ và Firebase Cloud.',
        'GameInitializer Boot Scene Pattern: Khởi tạo các Prefab dịch vụ singleton và quản lý chuyển cảnh an toàn giữa Menu, Lobby và Combat.',
        'CurrencyVFXSystem: Hệ thống hiệu ứng hạt tiền tệ bay mượt mà vào HUD mà không gây nghẽn UI Draw Calls.',
      ],
      en: [
        'Modern UI Toolkit Architecture: Decoupled layout (UXML), styling (USS), and C# controllers with clean OnEnable/OnDisable lifecycles.',
        'Centralized DataManager: Synchronizes player ProgressData (Score, Coin, Gem, Tickets, Level unlocks) seamlessly with Firebase Realtime Database.',
        'GameInitializer Boot Scene Pattern: Manages singleton services and delivers safe scene transitions between Menu, Lobby, and Gameplay.',
        'CurrencyVFXSystem: Polished UI particle flight animations for earned coins and gems into the HUD with zero frame drops.',
      ],
    },
    keyFeatures: {
      vi: [
        'Hệ thống Lobby Navigation: Điều phối mượt mà giữa Main Menu, Level Map Selection, Character/Tower Upgrade và Combat HUD.',
        'Hệ thống Thể lực/Tim (Server-Authoritative Lives): Quản lý lượt chơi và bộ đếm ngược thời gian hồi phục thể lực độc lập qua DataManager.',
        'Đồng bộ tài khoản thời gian thực với Firebase: Tự động lưu trữ tiến trình qua màn, tiền tệ và sao nâng cấp ngay khi kết thúc trận đánh (Victory/Defeat).',
        'Hoạt ảnh giao diện tương tác: Tích hợp LeanTween vào hệ thống Popup Toast, Dialog và hiệu ứng chuyển cảnh mềm mại.',
      ],
      en: [
        'Lobby Navigation Pipeline: Smooth state switching between Main Menu, Level Map Selection, Upgrades, and Combat HUD.',
        'Server-Authoritative Lives/Stamina System: Independent stamina countdown and ticket deduction logic managed via DataManager.',
        'Real-time Cloud Synchronization: Automatic persisting of victory rewards, currencies, and star upgrades directly to Firebase Database.',
        'Interactive UI Choreography: Integrated LeanTween animations for dynamic toast alerts, modal dialogs, and smooth panel transitions.',
      ],
    },
    challenges: {
      vi: [
        'Xung đột TimeScale và Crash khi chuyển Scene: Khi người chơi ấn Restart hoặc Home trong lúc đang thi triển chiêu thức đạn SkillProjectile, Scene bị hủy gây NullReferenceException hoặc đóng băng TimeScale tại 0.',
        'Độ trễ bất đồng bộ khi nạp Firebase Auth: Quá trình nạp dữ liệu đám mây Firebase mất vài giây dẫn đến race condition khiến UI Lobby hiển thị tài nguyên bằng 0 hoặc dùng nhầm demo data.',
        'Lớp phủ HUD che khuất bàn cờ Match-3: Canvas UIDocument mặc định có background che khuất layer Match-3 tương tác phía dưới.',
      ],
      en: [
        'TimeScale Desync & Scene Transition Crashes: Destroying active scenes mid-ability projectile flight triggered NullReferenceExceptions and trapped TimeScale at zero.',
        'Asynchronous Race Conditions in Cloud Hydration: Latency during Firebase Auth login caused initial Lobby frames to display 0 resources or stale demo presets.',
        'HUD Canvas Occlusion: Default UI Toolkit layout backgrounds unintentionally masked the interactive Match-3 board underneath.',
      ],
    },
    solutions: {
      vi: [
        'Bao bọc ngoại lệ Try-Catch và Kiểm tra vòng đời an toàn: Đảm bảo SkillProjectile tự hủy an toàn khi Scene bị Unload, tự động chuẩn hóa TimeScale = 1 trong GameInitializer.',
        'Chiến lược Caching cục bộ + Event-Driven Cloud Hydration: Khởi tạo giao diện tức thì từ cache máy, sau đó đăng ký sự kiện Firebase Auth để cập nhật dữ liệu tài khoản thực tế.',
        'Trong suốt hóa HUD Layer: Cấu hình USS match3-layer trong suốt và tách riêng các popup đè lên trên bằng LeanTween pop-in animation.',
      ],
      en: [
        'Defensive Exception Catching & Safe Teardowns: Null-checked all projectile targets during scene teardown and enforced TimeScale normalization in GameInitializer.',
        'Local Cache & Event-Driven Cloud Hydration: Instantly hydrated UI from local state while streaming asynchronous Firebase deltas upon auth resolution.',
        'Alpha-layered HUD Toolkit Styling: Normalized match3-layer USS backgrounds to fully transparent with non-blocking click-through regions.',
      ],
    },
    personalContribution: {
      vi: [
        'Trực tiếp thiết kế và lập trình toàn bộ hệ thống UI/UX từ Menu, Lobby Navigation, LevelMap, Combat HUD đến các Popup Thắng/Thua/Cài đặt bằng Unity UI Toolkit.',
        'Tái cấu trúc DataManager, tích hợp thành công Firebase Authentication và hệ thống đếm ngược hồi Thể lực/Lives Server-Authoritative.',
        'Lập trình CurrencyVFXSystem và hiệu ứng LeanTween cho toàn bộ giao diện game.',
        'Khắc phục triệt để lỗi crash Scene Transition và đồng bộ TimeScale cho toàn đội đồ án.',
      ],
      en: [
        'Single-handedly architected and implemented the entire UI/UX pipeline from Main Menu, Lobby Navigation, LevelMap, Combat HUD to Popups using Unity UI Toolkit.',
        'Overhauled DataManager, successfully integrating Firebase Auth and server-authoritative lives/stamina regeneration timers.',
        'Programmed CurrencyVFXSystem and custom LeanTween animation choreography across all interface elements.',
        'Resolved critical scene transition crashes and TimeScale synchronization issues for the entire development team.',
      ],
    },
    testingResults: {
      vi: 'Giao diện đạt 60 FPS mượt mà trên cả PC và Mobile, đồng bộ Firebase không giật lag, loại bỏ hoàn toàn hiện tượng crash khi chuyển scene.',
      en: 'Rock-solid 60 FPS UI performance across PC and mobile targets, seamless Firebase synchronization with zero scene transition exceptions.',
    },
    repoUrl: 'https://gitlab.com/duanxuong/rise-of-the-elements',
  },
  'fortress-idle': {
    id: 'fortress-idle',
    title: 'Fortress Idle: Last Stand',
    subtitle: {
      vi: 'Dự án Tower Defense & Idle trên Unity 6 URP – Đạt Giải Triển Vọng GAME SPRINT 2026',
      en: 'Tower Defense & Idle on Unity 6 URP – Won Promising Award at GAME SPRINT 2026',
    },
    overview: {
      vi: 'Dự án Game kết hợp giữa cơ chế Tower Defense chiến thuật và tiến trình Idle tự động hóa. Đạt giải Triển Vọng cuộc thi GAME SPRINT 2026 với yêu cầu hoàn thiện toàn bộ sản phẩm trong vòng 7 ngày.',
      en: 'A high-intensity project merging tactical Tower Defense and automated Idle systems, completed within a rigorous 7-day sprint and awarded the Promising Prize at GAME SPRINT 2026.',
    },
    goal: {
      vi: 'Xây dựng một tựa game hoàn chỉnh trong thời gian thần tốc 7 ngày với vai trò Leader nhóm 2 thành viên; tối ưu hóa triệt để 0 byte rác bộ nhớ (GC Alloc) trong combat loop và xử lý số học quy mô lớn.',
      en: 'Lead a 2-person team to ship a complete, commercial-ready game within 7 days; achieve 0 byte GC allocation in active combat and handle extreme exponential idle math without overflow.',
    },
    techStack: [
      'Unity 6 LTS',
      'C# (.NET Standard)',
      'Universal Render Pipeline (URP)',
      'Generic Object Pooling',
      'MaterialPropertyBlock',
      'FSM State Machine',
      'Double-Precision Math',
    ],
    architecture: {
      vi: [
        'Máy trạng thái hữu hạn (FSM): Tách biệt logic tháp phòng thủ và quái vật thành các trạng thái Idle, Targeting, Attack, Cooldown độc lập.',
        'Hệ thống Generic Object Pool (SimplePool<T>): Quản lý tái sử dụng creep, đạn và floating damage text, loại bỏ hoàn toàn GC Alloc trong runtime.',
        'Tối ưu Draw Calls qua MaterialPropertyBlock: Xử lý hiệu ứng chớp sáng trúng đòn (Hit Flash) mà không nhân bản runtime material.',
        'Bộ chuyển đổi BigNumberFormatter: Xử lý số học quy mô lớn với 15 hậu tố lũy thừa mà không tràn số thực.',
      ],
      en: [
        'Finite State Machine (FSM): Decoupled tower and creep logic into modular states (Idle, Targeting, Attack, Cooldown).',
        'Generic Object Pool (SimplePool<T>): Reused projectiles, creeps, and floating damage labels, guaranteeing 0 B runtime GC Alloc.',
        'Draw Call Batching with MaterialPropertyBlock: Routed hit-flash shader properties through a shared block without instantiating cloned materials.',
        'BigNumberFormatter: Supported extreme exponential idle progression with 15-suffix notation without precision breakdown.',
      ],
    },
    keyFeatures: {
      vi: [
        'Combat Loop mượt mà 60 FPS với số lượng creep lớn cùng lúc.',
        'Hệ thống nâng cấp kinh tế và chỉ số tháp thời gian thực.',
        'Xử lý va chạm và tìm mục tiêu O(1) qua Spatial Registry.',
        'Giao diện trực quan phong cách quân sự sci-fi.',
      ],
      en: [
        'Locked 60 FPS combat loop handling heavy creep waves.',
        'Real-time economic and turret upgrade progression.',
        'O(1) spatial query system replacing costly physics sweeps.',
        'Tactical military sci-fi HUD aesthetic.',
      ],
    },
    challenges: {
      vi: [
        'Áp lực thời gian hoàn thiện chỉ trong 7 ngày của cuộc thi GAME SPRINT 2026.',
        'Nguy cơ tụt FPS và giật lag do Garbage Collection khi quái và đạn sinh hủy liên tục.',
        'Lỗi rò rỉ VRAM và phá vỡ SRP Batching do nhân bản Material khi tạo hiệu ứng trúng đòn.',
      ],
      en: [
        'Extreme 7-day delivery deadline under GAME SPRINT 2026 competition constraints.',
        'Frame drops and micro-stutters from GC allocations during high-frequency projectile and creep spawning.',
        'VRAM bloat and SRP Batcher disruption caused by runtime Material cloning for hit-flash visual feedback.',
      ],
    },
    solutions: {
      vi: [
        'Thiết kế kiến trúc module hóa cao giúp 2 thành viên song song phát triển không xung đột mã nguồn.',
        'Áp dụng Generic Object Pooling triệt tiêu 100% GC Alloc trong combat loop.',
        'Sử dụng MaterialPropertyBlock dùng chung, bảo toàn 100% GPU Instancing và SRP Batching.',
      ],
      en: [
        'Architected decoupled modular systems enabling frictionless parallel development within the 2-person team.',
        'Eliminated runtime GC allocation through strict Generic Object Pooling.',
        'Preserved 100% GPU instancing and SRP batching via shared MaterialPropertyBlock buffers.',
      ],
    },
    personalContribution: {
      vi: [
        'Đảm nhận vai trò Leader và Lead Engineer, dẫn dắt đội ngũ 2 thành viên hoàn thành xuất sắc đồ án trong 7 ngày.',
        'Trực tiếp thiết kế hệ thống FSM, Generic Object Pool và tối ưu 0 B GC Alloc.',
        'Lập trình công thức kinh tế Idle và tích hợp hiệu ứng đồ họa chiến đấu URP.',
      ],
      en: [
        'Served as Project Leader and Lead Engineer, steering the 2-person team to deliver the complete game within 7 days.',
        'Architected core FSM combat state machines, Generic Object Pool, and achieved 0 B GC allocation.',
        'Programmed exponential idle math formulas and integrated URP combat visual shaders.',
      ],
    },
    testingResults: {
      vi: 'Đạt Giải Triển Vọng cuộc thi GAME SPRINT 2026, khóa cứng 60 FPS ổn định, GC Alloc đạt 0 byte/frame trong combat loop.',
      en: 'Won the Promising Award at GAME SPRINT 2026, sustained locked 60 FPS with 0 byte GC allocation in combat frames.',
    },
    repoUrl: 'https://github.com/hoangmonpt-cell/FortressIdle',
  },
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
    techStack: ['React 19', 'TypeScript', 'Vite', 'Three.js / R3F', 'Tailwind CSS', 'GitHub Actions', 'Vitest'],
    architecture: {
      vi: [
        'Tách biệt 3 tầng kiến trúc: Data Providers (GitHub/GitLab API & Fallback), Normalization Adapter, Presentation UI Layer.',
        'Chiến lược Hybrid Cache lưu trữ LocalStorage thông minh, chống nghẽn rate limit (403/429) và tự phục hồi khi offline.',
        'Hệ thống Không gian 3D tương tác kết hợp UI HUD Sci-Fi song ngữ Việt - Anh.',
      ],
      en: [
        'Clean 3-layer architecture: Data Providers (GitHub/GitLab APIs & Fallbacks), Normalization Adapter, and Game HUD UI Layer.',
        'Resilient Hybrid Caching via LocalStorage to mitigate API rate limits (403/429) with seamless offline fallback.',
        'Interactive 3D space combined with bilingual Sci-Fi tactical HUD interface.',
      ],
    },
    keyFeatures: {
      vi: [
        'Đồng bộ hóa tự động GitHub & GitLab repositories.',
        'Không gian 3D tương tác phòng làm việc Game Developer & đường hành trình Cinematic Scroll 3D.',
        'Bộ lọc đa chiều và popup Case Study chi tiết cho từng dự án thực chiến.',
      ],
      en: [
        'Automated synchronization across GitHub & GitLab repositories.',
        'Interactive 3D Developer Room & Cinematic 3D Scroll Journey.',
        'Multi-dimensional filtering and deep-dive technical case study modals.',
      ],
    },
    challenges: {
      vi: [
        'Giới hạn tỷ lệ truy vấn API khắt khe từ GitHub và GitLab (60 req/h đối với IP unauthenticated).',
        'Tối ưu hóa bundle và hiệu năng WebGL 60 FPS khi render mô hình 3D cùng lúc với giao diện HUD.',
      ],
      en: [
        'Strict API rate limits from GitHub and GitLab for unauthenticated requests.',
        'Bundle optimization and maintaining smooth 60 FPS WebGL rendering alongside complex HUD DOM.',
      ],
    },
    solutions: {
      vi: [
        'Xây dựng lớp Hybrid Cache thông minh với TTL 15 phút và cơ chế Fallback tự phục hồi dữ liệu.',
        'Tách bundle Three.js/R3F bằng dynamic import, nén asset và kiểm soát render loop bằng useFrame.',
      ],
      en: [
        'Engineered an intelligent hybrid caching layer with 15-minute TTL and resilient static fallbacks.',
        'Code-split Three.js/R3F bundles with dynamic imports, asset compression, and frame-budgeted render loops.',
      ],
    },
    personalContribution: {
      vi: [
        'Toàn quyền thiết kế và phát triển toàn bộ hệ thống frontend, 3D WebGL scenes và logic đồng bộ API.',
        'Xây dựng hệ thống âm thanh HUD Sound Synthesizer qua Web Audio API không phụ thuộc file audio ngoài.',
      ],
      en: [
        'Full-stack architecture and development of the entire frontend, 3D WebGL scenes, and sync adapters.',
        'Engineered a standalone procedural Web Audio API sound synthesizer for interactive HUD clicks.',
      ],
    },
    testingResults: {
      vi: '100% test suites vượt qua (Vitest), Lighthouse Performance đạt mức cao, build production tối ưu dưới 1 giây.',
      en: '100% Vitest test pass rate, excellent Lighthouse metrics, and lightning-fast <1s production builds.',
    },
    repoUrl: 'https://github.com/hoangmonpt-cell/personal-portfolio',
  },
};
