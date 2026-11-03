export type ThemeMode = 'dark' | 'light';
export const ThemeMode = { dark: 'dark', light: 'light' } as const;

export interface RoomThemeConfig {
  name: ThemeMode;
  // 3D Room Colors
  wallColor: string;
  slatsColor: string;
  floorColor: string;
  floorGridPrimary: string;
  floorGridSecondary: string;
  rugColor: string;
  rugBorderColor: string;
  baseboardColor: string;
  beamColor: string;
  windowFrameColor: string;
  windowBackdropColor: string;
  // 3D Lighting & Atmosphere
  ambientColor: string;
  ambientIntensity: number;
  hemisphereSkyColor: string;
  hemisphereGroundColor: string;
  hemisphereIntensity: number;
  keyLightColor: string;
  keyLightIntensity: number;
  fillLightColor: string;
  fillLightIntensity: number;
  workstationLightColor: string;
  workstationLightIntensity: number;
  accentPointColor: string;
  fogColor: string;
  canvasBgColor: string;
  toneMappingExposure: number;
  // UI Colors for Overlays & HUD
  uiBgPanel: string;
  uiBorder: string;
  uiBorderBright: string;
  uiAccent: string;
  uiTextMain: string;
  uiTextMuted: string;
}

export const ROOM_THEMES: Record<ThemeMode, RoomThemeConfig> = {
  dark: {
    name: 'dark',
    // 3D Room Colors - Keep current dark slate as requested by user
    wallColor: '#1a2230',
    slatsColor: '#3d2b1f',
    floorColor: '#1c1713',
    floorGridPrimary: '#453326',
    floorGridSecondary: '#291e17',
    rugColor: '#131e2d',
    rugBorderColor: '#00f0ff',
    baseboardColor: '#261b14',
    beamColor: '#241a13',
    windowFrameColor: '#334155',
    windowBackdropColor: '#030712',
    // 3D Lighting - Vibrant, illuminated from top-down, high clarity
    ambientColor: '#cbd5e1',
    ambientIntensity: 1.45,
    hemisphereSkyColor: '#93c5fd',
    hemisphereGroundColor: '#334155',
    hemisphereIntensity: 1.25,
    keyLightColor: '#ffedd5',
    keyLightIntensity: 2.2,
    fillLightColor: '#7dd3fc',
    fillLightIntensity: 1.2,
    workstationLightColor: '#00f0ff',
    workstationLightIntensity: 2.2,
    accentPointColor: '#00ff88',
    fogColor: '#0b0f17',
    canvasBgColor: '#070a0f',
    toneMappingExposure: 1.38,
    // UI HUD
    uiBgPanel: 'rgba(10, 13, 20, 0.92)',
    uiBorder: 'rgba(0, 240, 255, 0.3)',
    uiBorderBright: '#00f0ff',
    uiAccent: '#00f0ff',
    uiTextMain: '#f8fafc',
    uiTextMuted: '#94a3b8',
  },
  light: {
    name: 'light',
    // 3D Room Colors - Elegant, soft architectural warm grey & natural oak (hết chói lóa, màu sắc êm dịu có tương phản cao)
    wallColor: '#cbd5e1', // Soft architectural light slate grey (thay cho màu trắng lóa mắt)
    slatsColor: '#9a7b56', // Warm natural oak wood slats
    floorColor: '#c5b8a5', // Natural warm blonde-oak parquet
    floorGridPrimary: '#8a7966', // Clear wood plank grid lines with natural contrast
    floorGridSecondary: '#a3927f',
    rugColor: '#475569', // Slate denim blue-grey rug under workstation (tạo điểm nhấn tương phản nổi bật)
    rugBorderColor: '#0284c7',
    baseboardColor: '#786b5c',
    beamColor: '#695c4e',
    windowFrameColor: '#475569',
    windowBackdropColor: '#7dd3fc', // Soft morning blue sky
    // 3D Lighting - Balanced, soft natural daylight with realistic shadows (không bị cháy sáng hay lóa)
    ambientColor: '#f1f5f9',
    ambientIntensity: 0.65, // Giảm mạnh từ 1.65 để tạo độ sâu khối 3D rõ nét
    hemisphereSkyColor: '#bae6fd',
    hemisphereGroundColor: '#cbd5e1',
    hemisphereIntensity: 0.55,
    keyLightColor: '#fffbeb',
    keyLightIntensity: 1.15, // Ánh sáng mặt trời dịu mắt
    fillLightColor: '#93c5fd',
    fillLightIntensity: 0.55,
    workstationLightColor: '#0284c7',
    workstationLightIntensity: 0.95,
    accentPointColor: '#059669',
    fogColor: '#cbd5e1',
    canvasBgColor: '#cbd5e1', // Nền dịu mắt, làm nổi bật khối diorama 3D
    toneMappingExposure: 0.95, // Giảm exposure để giữ chi tiết highlight
    // UI HUD
    uiBgPanel: 'rgba(255, 255, 255, 0.95)',
    uiBorder: 'rgba(2, 132, 199, 0.35)',
    uiBorderBright: '#0284c7',
    uiAccent: '#0284c7',
    uiTextMain: '#0f172a',
    uiTextMuted: '#475569',
  },
};

