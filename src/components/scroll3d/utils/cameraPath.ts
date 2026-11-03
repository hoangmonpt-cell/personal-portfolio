import * as THREE from 'three';

export interface SectionMarker {
  index: number;
  id: string;
  progress: number;
  name: {
    vi: string;
    en: string;
  };
  subtitle: {
    vi: string;
    en: string;
  };
}

export const SCROLL_SECTIONS: SectionMarker[] = [
  {
    index: 0,
    id: 'hero',
    progress: 0.0,
    name: { vi: '01 // KHỞI ĐẦU', en: '01 // ARRIVAL' },
    subtitle: { vi: 'Game Developer Arrives', en: 'The Developer Arrives' },
  },
  {
    index: 1,
    id: 'projects',
    progress: 0.166,
    name: { vi: '02 // THẾ GIỚI GAME', en: '02 // GAME WORLDS' },
    subtitle: { vi: 'Dự án & Thế giới Thực chiến', en: 'The Game Worlds & Projects' },
  },
  {
    index: 2,
    id: 'gamedev',
    progress: 0.333,
    name: { vi: '03 // CƠ CHẾ GAMEPLAY', en: '03 // GAMEPLAY SYSTEMS' },
    subtitle: { vi: 'Hệ thống Chiến đấu & Vòng lặp Runtime', en: 'Combat Mechanics & Runtime Loops' },
  },
  {
    index: 3,
    id: 'software',
    progress: 0.500,
    name: { vi: '04 // KIẾN TRÚC PHẦN MỀM', en: '04 // ARCHITECTURE' },
    subtitle: { vi: 'Cấu trúc Hệ thống & Design Patterns', en: 'System Design & Code Foundations' },
  },
  {
    index: 4,
    id: 'ai',
    progress: 0.666,
    name: { vi: '05 // WORKFLOW AI', en: '05 // AI WORKSPACE' },
    subtitle: { vi: 'Gia tốc Phát triển với AI Tools', en: 'AI Prototyping & Intelligent Tools' },
  },
  {
    index: 5,
    id: 'about',
    progress: 0.833,
    name: { vi: '06 // HỒ SƠ DEV', en: '06 // ABOUT DEV' },
    subtitle: { vi: 'Triết lý & Hành trình Chuyên môn', en: 'Developer Philosophy & Mindset' },
  },
  {
    index: 6,
    id: 'contact',
    progress: 1.0,
    name: { vi: '07 // TRẠNG THÁI LIÊN HỆ', en: '07 // TRANSMISSION' },
    subtitle: { vi: 'Kết nối Studio & Tải CV', en: 'Studio Uplink & CV Download' },
  },
];

// Defined 3D waypoints for camera position across the continuous world (Z: 0 to -300)
const cameraPositions = [
  // 0. Hero (Z: 0)
  new THREE.Vector3(0, 2.5, 9),
  // Transition 0 -> 1
  new THREE.Vector3(1.5, 3.2, -18),
  // 1. Projects (Z: -45)
  new THREE.Vector3(5.5, 3.8, -35),
  // Transition 1 -> 2
  new THREE.Vector3(2.0, 4.2, -68),
  // 2. Game Dev (Z: -95)
  new THREE.Vector3(-3.5, 3.5, -85),
  // Transition 2 -> 3
  new THREE.Vector3(-0.5, 4.0, -118),
  // 3. Software Architecture (Z: -145)
  new THREE.Vector3(4.5, 4.2, -135),
  // Transition 3 -> 4
  new THREE.Vector3(1.5, 3.8, -168),
  // 4. AI Workflow (Z: -195)
  new THREE.Vector3(-3.0, 3.8, -185),
  // Transition 4 -> 5
  new THREE.Vector3(-1.0, 3.4, -218),
  // 5. About (Z: -245)
  new THREE.Vector3(2.5, 3.0, -235),
  // Transition 5 -> 6
  new THREE.Vector3(1.0, 3.2, -268),
  // 6. Contact (Z: -295)
  new THREE.Vector3(0, 3.2, -282),
];

// Defined 3D waypoints for camera lookAt focal targets
const cameraTargets = [
  // 0. Hero
  new THREE.Vector3(0, 1.2, 0),
  // Transition 0 -> 1
  new THREE.Vector3(2.0, 1.4, -30),
  // 1. Projects
  new THREE.Vector3(2.5, 1.8, -48),
  // Transition 1 -> 2
  new THREE.Vector3(-1.0, 1.5, -80),
  // 2. Game Dev
  new THREE.Vector3(-4.0, 1.6, -98),
  // Transition 2 -> 3
  new THREE.Vector3(1.5, 1.6, -130),
  // 3. Software Architecture
  new THREE.Vector3(3.5, 1.8, -148),
  // Transition 3 -> 4
  new THREE.Vector3(-1.0, 1.6, -180),
  // 4. AI Workflow
  new THREE.Vector3(0, 2.0, -198),
  // Transition 4 -> 5
  new THREE.Vector3(0.5, 1.5, -230),
  // 5. About
  new THREE.Vector3(-1.5, 1.5, -248),
  // Transition 5 -> 6
  new THREE.Vector3(0, 1.6, -280),
  // 6. Contact
  new THREE.Vector3(0, 1.8, -298),
];

// Catmull-Rom splines guarantee C1 continuity (no harsh angles or camera snaps)
export const cameraPathSpline = new THREE.CatmullRomCurve3(cameraPositions, false, 'catmullrom', 0.35);
export const cameraTargetSpline = new THREE.CatmullRomCurve3(cameraTargets, false, 'catmullrom', 0.35);

/**
 * Computes exact camera position and lookAt vector at normalized progress t in [0, 1]
 */
export function getCameraTransformAt(t: number, outPosition: THREE.Vector3, outTarget: THREE.Vector3): void {
  const clampedT = THREE.MathUtils.clamp(t, 0, 1);
  cameraPathSpline.getPointAt(clampedT, outPosition);
  cameraTargetSpline.getPointAt(clampedT, outTarget);
}

