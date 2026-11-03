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
    repoName: 'FortressIdle',
    category: 'game',
    customTitle: 'Fortress Idle: Last Stand',
    customDescription: {
      vi: 'Dự án Tower Defense & Idle kết hợp trên Unity 6 LTS (URP). Tối ưu 0 B GC Alloc trong combat loop, hệ thống MaterialPropertyBlock triệt tiêu rò rỉ VRAM, và thuật toán scale kinh tế Double-precision 15 hậu tố.',
      en: 'Hybrid Tower Defense & Idle game built on Unity 6 LTS (URP). Features 0 B GC Alloc in combat loops, MaterialPropertyBlock VRAM leak prevention, and 15-suffix double-precision idle math scaling.',
    },
    thumbnail: '',
    caseStudyId: 'fortress-idle',
    featuredOrder: 1,
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
    featuredOrder: 2,
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
  'fortress-idle': {
    id: 'fortress-idle',
    title: 'Fortress Idle: Last Stand - Unity 6 LTS & URP Architecture',
    subtitle: {
      vi: 'Kiến trúc Game tối ưu hóa 0 B GC Alloc, Dual UI Toolkit & UGUI Pipeline và Hệ thống toán học Idle phân đoạn',
      en: 'Zero-Allocation Combat Loop Architecture, Hybrid UI Toolkit Stack, and Piecewise Clamped Idle Mathematics',
    },
    overview: {
      vi: 'Fortress Idle: Last Stand là dự án game kết hợp giữa chiến thuật Thủ thành (Tower Defense) và cơ chế cày cuốc nhàn rỗi (Incremental Idle) được xây dựng trên Unity 6000.4.10f1 LTS và Universal Render Pipeline (URP 17.4.0). Dự án tập trung giải quyết triệt để các bài toán hóc búa về hiệu năng di động: triệt tiêu rò rỉ material, khống chế GC Alloc về 0 byte/frame, và điều tiết pathfinding NavMesh cho các đợt quái dồn dập.',
      en: 'Fortress Idle: Last Stand is an incremental tower defense game engineered on Unity 6000.4.10f1 LTS and Universal Render Pipeline (URP 17.4.0). The project demonstrates rigorous mobile performance engineering: zero runtime material duplication, 0 B GC allocation per frame in active combat, and throttled NavMesh agent concurrency under heavy swarm pressure.',
    },
    goal: {
      vi: 'Đạt chuẩn 60 FPS khóa cứng trên đa dạng phần cứng PC và Mobile, loại bỏ hoàn toàn hiện tượng khựng khung hình (hitching/spikes) khi combat bùng nổ, và thiết kế hệ thống kinh tế toán học lũy thừa không bao giờ bị tràn số thực (Overflow-safe).',
      en: 'Achieve a rock-solid 60 FPS across both PC and mobile hardware tiers, eliminate frame hitching during burst combat skirmishes, and design an overflow-safe exponential idle economy scaling past 10^42.',
    },
    techStack: [
      'Unity 6 LTS (6000.4.10f1)',
      'C# 9.0 / .NET Standard 2.1',
      'URP 17.4.0 (Forward Path)',
      'UI Toolkit (USS/UXML)',
      'Unity AI Navigation 2.0',
      'Cinemachine 3.1.7',
      'MaterialPropertyBlock',
      'BigNumber Suffix Formatter',
    ],
    architecture: {
      vi: [
        'Decoupled Event-Driven Game Loop: GameManager điều phối State Machine toàn cục (Playing, Paused, GameOver) qua C# Actions; tách biệt chu kỳ tìm kiếm mục tiêu với bộ đếm SEARCH_INTERVAL (0.3s - 0.4s) thay vì chạy trong Update().',
        'Centralized Spatial Registry (EnemyManager): Loại bỏ hoàn toàn Physics.OverlapSphere tốn kém; mọi quái vật tự đăng ký/hủy vào danh sách tập trung khi lấy từ Pool, truy vấn mục tiêu gần nhất qua vòng lặp phẳng O(N) với inline cleanup và 0 byte GC Alloc.',
        'Generic Object Pool with Lifecycle Guard (SimplePool<T>): Quản lý Queue<T> tự mở rộng cho Enemy, Projectile, FloatingText và VFX với cơ chế bảo vệ chống double-release.',
        'Hybrid UI Architecture: Sử dụng UI Toolkit (UXML/USS Flexbox) cho các menu phức tạp (Build, Hero Drawer, Tooltip) triệt tiêu Canvas dirtying, kết hợp TextMeshPro SDF cho HUD thế giới thực (Billboard Health Bar, Damage Popup).',
        'Debounced Delta Persistence Layer (SaveManager): Tuần tự hóa JSON lưu trữ an toàn tại persistentDataPath với cửa sổ hoãn lưu (Debounce 3.0s) bảo vệ chip nhớ flash trên thiết bị di động.',
      ],
      en: [
        'Decoupled Event-Driven Game Loop: Centralized state machine (Playing, Paused, GameOver) broadcasting via C# Actions; target-scanning throttled on distributed intervals (0.3s - 0.4s) outside Update().',
        'Centralized Spatial Registry (EnemyManager): Fully eliminates Physics.OverlapSphere overhead; living entities auto-register with a centralized collection queried via cache-friendly O(N) loops with zero GC allocations.',
        'Generic Object Pool with Lifecycle Guard (SimplePool<T>): Queue-backed generic pooling for creeps, projectiles, floating combat text, and particle effects with double-release guards.',
        'Hybrid UI Architecture: UI Toolkit (UXML/USS Flexbox) handles dynamic drawer panels eliminating canvas dirtying, while TextMeshPro SDF mobile shaders power in-world health bars and popups.',
        'Debounced Delta Persistence Layer (SaveManager): JSON serialization with a 3.0-second debounce window preventing mobile flash storage I/O wear and frame hitching.',
      ],
    },
    keyFeatures: {
      vi: [
        'Dynamic Burst Assault Patterns: Spawner biến thiên 3 hình thái (Swarm Blitz, Scout Bait & Ambush, Rolling Waves) kích thích trải nghiệm nhịp độ chiến thuật.',
        'Soft Cap Concurrency Gatekeeper: Khống chế tối đa 45 quái NavMeshAgent đồng thời trên sân, xếp hàng coroutine spawn để giữ nhịp tick ổn định tuyệt đối.',
        'Hệ thống nâng cấp đa nhánh (Exponential Cost Curve): Công thức Cost(L) = BaseCost * (1.20)^L trên 5 cây công nghệ.',
        'Khai thác mỏ tài nguyên tự động (Passive Generation): Chu kỳ tick 1.0s độc lập với FPS kết hợp công nghệ tăng sản lượng.',
        'Bộ điều tiết đồ họa 3 cấp độ (GraphicsManager): Tùy biến Realtime Soft/Hard Shadows, Bloom threshold và mật độ hạt thời tiết tương thích đa cấu hình.',
      ],
      en: [
        'Dynamic Burst Assault Patterns: Algorithmic wave composition alternating between Swarm Blitz, Scout Bait, and Rolling Waves for dynamic tension.',
        'Soft Cap Concurrency Gatekeeper: Enforces a ceiling of 45 active NavMesh creeps, buffering excess entities in coroutines to prevent CPU spikes.',
        'Exponential Upgrade Progression: Standardized Cost(L) = BaseCost * (1.20)^L across 5 technology branches.',
        'Autonomous Resource Production: Fixed 1.0s interval economy generation decoupled from framerate fluctuations.',
        'Adaptive 3-Tier Hardware Scaler: Dynamic configuration of soft/hard shadows, post-processing bloom thresholds, and particle emitters.',
      ],
    },
    challenges: {
      vi: [
        'UI Re-render Hurricane & Nuốt Click Nâng Cấp: Khi xây từ 3-10 mỏ vàng, OnResourceChanged kích hoạt PopulateUpgradeList() liên tục Destroy/Instantiate thẻ UI ngay giữa frame PointerDown, làm mất EventSystem selection context và nuốt click của người chơi (tỷ lệ trơ nút 30%-80%).',
        'Lệch pha đòn chém cận chiến & Biến dạng góc quay VFX: GameObject con trong Prefab VFX mang góc quay cứng (40, 0, 180) cộng hưởng với góc máy Isometric (50 độ) làm lưỡi chém dựng đứng lên trời; đồng thời Animator Transition bị trễ do cờ HasExitTime = true (ExitTime = 0.625).',
        'Nguy cơ nghẽn NavMesh & Tràn số thực ở Late-game Waves: Hàm tăng trưởng máu quái 1.065^W ở các wave cao vượt quá giới hạn float 32-bit gây ra Infinity/NaN; cùng lúc đó quá nhiều quái chen chúc tìm đường gây nghẽn Main Thread CPU.',
      ],
      en: [
        'UI Re-render Hurricane & Click Dropping: Rapid resource updates from multiple gold mines repeatedly invoked Destroy/Instantiate inside PopulateUpgradeList() during PointerDown frames, dropping click events by up to 80%.',
        'VFX Transform & Animator Desync: Hardcoded local rotation (40, 0, 180) in the slash VFX prefab combined with the 50-degree isometric camera tilted the arc 90 degrees skyward; Animator HasExitTime=true caused noticeable attack lags.',
        'NavMesh Congestion & Floating-Point Overflow in Late Waves: Unchecked 1.065^W monster health scaling threatened IEEE 754 float limits with Infinity/NaN; unconstrained creep flocking saturated CPU pathfinding threads.',
      ],
    },
    solutions: {
      vi: [
        'Chuyển đổi sang In-place Data Binding / Reactive State Pattern: Khởi tạo danh sách thẻ UI một lần duy nhất, chỉ cập nhật chuỗi text và trạng thái interactable khi tài nguyên đổi; đưa các panel phức tạp sang UI Toolkit Virtualized ListView giảm thời gian render từ 4.5ms xuống dưới 0.1ms.',
        'Phép chiếu hình học & Hiệu chỉnh Animator: Dùng Vector3.ProjectOnPlane(dir, Vector3.up).normalized triệt tiêu độ dốc trục Y, chỉnh phẳng transform Prefab; tắt HasExitTime trong Animator Controller với TransitionDuration = 0.05s để xuất chiêu tức thì đồng bộ từng frame.',
        'Piecewise Clamped HP Curve & Concurrency Gatekeeper: Khóa hệ số lũy thừa ở Wave 80, chuyển sang bước nhảy tuyến tính an toàn với trần tuyệt đối 10^15; giới hạn tối đa 45 NavMeshAgent trên sân, giữ vững 60 FPS ổn định.',
        'MaterialPropertyBlock Hit Flash: Toàn bộ hiệu ứng chớp màu sát thương sử dụng chung 1 MaterialPropertyBlock tĩnh, bảo toàn 100% GPU SRP Batching và loại bỏ rò rỉ VRAM do renderer.material.',
      ],
      en: [
        'In-place Reactive Data Binding: Initialized UI elements once, updating only label text and interactable flags upon resource delta events; migrated complex views to UI Toolkit Virtualized ListView, cutting layout frame time from 4.5ms to <0.1ms.',
        'Geometric Plane Projection & Instant State Transitions: Applied Vector3.ProjectOnPlane to flatten attack vectors to ground level; eliminated animator delays by disabling HasExitTime with a tight 0.05s transition duration.',
        'Piecewise Clamped HP Curve & Concurrency Gatekeeper: Capped exponential growth at Wave 80 with linear progression up to a 10^15 hard ceiling; restricted active NavMesh agents to 45, securing rock-solid 60 FPS.',
        'MaterialPropertyBlock Hit Reactions: Routed all hit-flash shader properties through a static MaterialPropertyBlock, completely avoiding renderer.material clone leaks and preserving SRP Batcher efficiency.',
      ],
    },
    personalContribution: {
      vi: [
        'Đảm nhận vai trò Principal Game Engineer & Technical Director, thiết kế toàn bộ kiến trúc C# Decoupled Event-Driven và hệ thống State Machine.',
        'Lập trình Generic Object Pool, Centralized Spatial Registry và tối ưu hóa 0 byte GC Alloc trong combat loop.',
        'Xây dựng hệ thống UI kép (Hybrid UI Toolkit + UGUI SDF TextMeshPro) và thiết kế pipeline URP Dual-profile.',
        'Cân bằng công thức toán học Idle (Exponential Cost & Piecewise HP Curve) và công cụ định dạng BigNumberFormatter 15 hậu tố.',
      ],
      en: [
        'Served as Principal Game Engineer & Technical Director, architecting the decoupled event-driven C# systems and game state machines.',
        'Engineered the generic object pool, centralized spatial query registry, and achieved 0 B GC allocation in combat frames.',
        'Implemented the hybrid UI architecture (UI Toolkit UXML/USS + UGUI SDF TextMeshPro) and URP dual-profile graphics pipeline.',
        'Formulated balanced idle progression mathematics (Exponential Cost & Piecewise Clamped HP) and the 15-suffix BigNumberFormatter.',
      ],
    },
    testingResults: {
      vi: 'Khóa cứng 60 FPS ổn định trong mọi đợt quái dồn dập, GC Alloc đạt 0 byte/frame trong combat loop, loại bỏ 100% hiện tượng rò rỉ Material VRAM và giải quyết triệt để lỗi nuốt click UI.',
      en: 'Locked 60 FPS across intensive wave assaults, 0 B GC allocation per frame in active combat, zero VRAM material leaks, and 100% elimination of UI click-dropping.',
    },
    repoUrl: 'https://github.com/hoangmonpt-cell/FortressIdle',
  },
};
