import * as THREE from 'three';

export type CameraStationId = 
  | 'overview' 
  | 'workstation' 
  | 'projects' 
  | 'skills' 
  | 'achievements' 
  | 'contact';

export type CameraMode = 'guided' | 'explore';

export interface CameraPreset {
  id: CameraStationId;
  position: THREE.Vector3;
  target: THREE.Vector3;
  fov?: number;
  label: {
    vi: string;
    en: string;
  };
  description: {
    vi: string;
    en: string;
  };
}

export const CAMERA_PRESETS: Record<CameraStationId, CameraPreset> = {
  overview: {
    id: 'overview',
    position: new THREE.Vector3(6.5, 5.5, 6.5),
    target: new THREE.Vector3(0, 1.3, -0.5),
    fov: 42,
    label: {
      vi: 'Toàn cảnh Studio',
      en: 'Studio Overview',
    },
    description: {
      vi: 'Góc nhìn bao quát toàn bộ không gian làm việc 3D của Game Developer',
      en: 'Wide perspective of the stylized game development room',
    },
  },
  workstation: {
    id: 'workstation',
    position: new THREE.Vector3(0, 2.0, 1.8),
    target: new THREE.Vector3(0, 1.35, -1.5),
    fov: 40,
    label: {
      vi: 'Bàn làm việc chính',
      en: 'Main Workstation',
    },
    description: {
      vi: 'Không gian code & phát triển gameplay với hệ thống màn hình đa nhiệm',
      en: 'Primary game development setup with multi-monitor workstation',
    },
  },
  projects: {
    id: 'projects',
    position: new THREE.Vector3(2.8, 2.0, 1.2),
    target: new THREE.Vector3(2.8, 1.2, -0.8),
    fov: 40,
    label: {
      vi: 'Khu vực Dự án',
      en: 'Project Station',
    },
    description: {
      vi: 'Kho lưu trữ kho mã nguồn đồng bộ trực tiếp từ GitHub & GitLab',
      en: 'Interactive archive synced in realtime from GitHub & GitLab',
    },
  },
  skills: {
    id: 'skills',
    position: new THREE.Vector3(-2.2, 2.2, 0.4),
    target: new THREE.Vector3(-3.3, 1.6, -1.8),
    fov: 40,
    label: {
      vi: 'Tủ Vũ khí Kỹ thuật',
      en: 'Skills Arsenal',
    },
    description: {
      vi: 'Công nghệ, Game Engines, ngôn ngữ lập trình và công cụ AI',
      en: 'Engineered skill modules: Unity, C#, Architecture, AI Workflows',
    },
  },
  achievements: {
    id: 'achievements',
    position: new THREE.Vector3(-2.6, 2.2, 1.5),
    target: new THREE.Vector3(-4.35, 1.8, 1.5),
    fov: 40,
    label: {
      vi: 'Khu Thành tích & Thước đo',
      en: 'Achievements Wall',
    },
    description: {
      vi: 'Cột mốc kinh nghiệm, tiêu chuẩn kiểm thử và thành tựu phát triển',
      en: 'Verified engineering milestones, testing standards, and achievements',
    },
  },
  contact: {
    id: 'contact',
    position: new THREE.Vector3(1.8, 2.2, 3.6),
    target: new THREE.Vector3(2.4, 1.2, 2.0),
    fov: 40,
    label: {
      vi: 'Trạm Truyền tín hiệu',
      en: 'Comms Station',
    },
    description: {
      vi: 'Kênh kết nối trực tiếp, mạng lưới xã hội và tải hồ sơ CV',
      en: 'Direct transmission frequencies, career profiles, and verified CV',
    },
  },
};
