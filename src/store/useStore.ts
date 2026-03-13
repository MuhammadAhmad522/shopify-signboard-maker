import { create } from 'zustand';

export type MountingStyle = 'flush' | 'bolt';
export type MaterialType = 'metal' | 'acrylic' | 'wood';

interface ConfiguratorState {
  // Text Config
  text: string;
  fontSize: number;
  fontFamily: string;
  
  // Dimensions & Geometry
  pattiWidth: number; // Extrusion depth
  sheetThickness: number; // Face thickness
  
  // Materials
  faceMaterial: MaterialType;
  faceColor: string;
  sideMaterial: MaterialType;
  sideColor: string;
  
  // Mounting
  mountingStyle: MountingStyle;
  
  // Lighting
  glowColor: string;
  glowIntensity: number;
  backlightEnabled: boolean;
  frontlightEnabled: boolean;
  
  // Alucobond Base
  showBase: boolean;
  baseWidth: number;
  baseHeight: number;
  baseDepth: number;
  baseColor: string;
  
  // Environment
  backgroundImage: string | null;
  
  // Actions
  setText: (text: string) => void;
  setFontSize: (size: number) => void;
  setFontFamily: (font: string) => void;
  setPattiWidth: (width: number) => void;
  setSheetThickness: (thickness: number) => void;
  setFaceMaterial: (material: MaterialType) => void;
  setFaceColor: (color: string) => void;
  setSideMaterial: (material: MaterialType) => void;
  setSideColor: (color: string) => void;
  setMountingStyle: (style: MountingStyle) => void;
  setGlowColor: (color: string) => void;
  setGlowIntensity: (intensity: number) => void;
  setLighting: (front: boolean, back: boolean) => void;
  setShowBase: (show: boolean) => void;
  setBaseDimensions: (w: number, h: number, d: number) => void;
  setBaseColor: (color: string) => void;
  setBackgroundImage: (image: string | null) => void;
}

export const useStore = create<ConfiguratorState>((set) => ({
  text: 'SIGNAGE',
  fontSize: 2,
  fontFamily: '/fonts/Inter_Bold.json',
  
  pattiWidth: 0.5,
  sheetThickness: 0.1,
  
  faceMaterial: 'acrylic',
  faceColor: '#ffffff',
  sideMaterial: 'metal',
  sideColor: '#333333',
  
  mountingStyle: 'flush',
  
  glowColor: '#00ffff',
  glowIntensity: 1.5,
  backlightEnabled: true,
  frontlightEnabled: true,

  showBase: false,
  baseWidth: 6,
  baseHeight: 2,
  baseDepth: 0.1,
  baseColor: '#222222',
  
  backgroundImage: null,
  
  setText: (text) => set({ text }),
  setFontSize: (fontSize) => set({ fontSize }),
  setFontFamily: (fontFamily) => set({ fontFamily }),
  setPattiWidth: (pattiWidth) => set({ pattiWidth }),
  setSheetThickness: (sheetThickness) => set({ sheetThickness }),
  setFaceMaterial: (faceMaterial) => set({ faceMaterial }),
  setFaceColor: (faceColor) => set({ faceColor }),
  setSideMaterial: (sideMaterial) => set({ sideMaterial }),
  setSideColor: (sideColor) => set({ sideColor }),
  setMountingStyle: (mountingStyle) => set({ mountingStyle }),
  setGlowColor: (glowColor) => set({ glowColor }),
  setGlowIntensity: (glowIntensity) => set({ glowIntensity }),
  setLighting: (frontlightEnabled, backlightEnabled) => set({ frontlightEnabled, backlightEnabled }),
  setShowBase: (showBase) => set({ showBase }),
  setBaseDimensions: (baseWidth, baseHeight, baseDepth) => set({ baseWidth, baseHeight, baseDepth }),
  setBaseColor: (baseColor) => set({ baseColor }),
  setBackgroundImage: (backgroundImage) => set({ backgroundImage }),
}));
