import { create } from 'zustand';

export type MountingStyle = 'flush' | 'bolt';
export type MaterialType = 'acrylic' | 'stainless_steel' | 'metal_steel' | 'metal' | 'aluminium' | 'wood' | 'wooden';
export type FaceDesign = 'none' | 'stars' | 'dots' | 'holes';
export type FrontLitBacking = 'none' | 'foam_board';

interface ConfiguratorState {
  // Text Config
  text: string;
  fontSize: number;
  fontFamily: string;
  textAlign: 'left' | 'center' | 'right';
  
  // Dimensions & Geometry
  pattiWidth: number; // Extrusion depth
  sheetThickness: number; // Face thickness
  
  // Materials
  faceMaterial: MaterialType;
  faceColor: string;
  sideMaterial: MaterialType;
  sideColor: string;
  faceDesign: FaceDesign;
  hasCollarPatti: boolean;
  
  // Mounting
  mountingStyle: MountingStyle;
  
  // Lighting
  glowColor: string;
  glowIntensity: number;
  backlightEnabled: boolean;
  frontlightEnabled: boolean;
  frontLitBacking: FrontLitBacking;
  
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
  setTextAlign: (align: 'left' | 'center' | 'right') => void;
  setPattiWidth: (width: number) => void;
  setSheetThickness: (thickness: number) => void;
  setFaceMaterial: (material: MaterialType) => void;
  setFaceColor: (color: string) => void;
  setSideMaterial: (material: MaterialType) => void;
  setSideColor: (color: string) => void;
  setFaceDesign: (design: FaceDesign) => void;
  setHasCollarPatti: (hasPatti: boolean) => void;
  setMountingStyle: (style: MountingStyle) => void;
  setGlowColor: (color: string) => void;
  setGlowIntensity: (intensity: number) => void;
  setLighting: (front: boolean, back: boolean) => void;
  setFrontLitBacking: (backing: FrontLitBacking) => void;
  setShowBase: (show: boolean) => void;
  setBaseDimensions: (w: number, h: number, d: number) => void;
  setBaseColor: (color: string) => void;
  setBackgroundImage: (image: string | null) => void;
}

export const useStore = create<ConfiguratorState>((set) => ({
  text: 'SIGNAGE',
  fontSize: 2,
  fontFamily: '/fonts/Inter_Bold.json',
  textAlign: 'center',
  
  pattiWidth: 50,
  sheetThickness: 0.1,
  
  faceMaterial: 'acrylic',
  faceColor: '#ffffff',
  sideMaterial: 'metal',
  sideColor: '#333333',
  faceDesign: 'none',
  hasCollarPatti: false,
  
  mountingStyle: 'flush',
  
  glowColor: '#10b981',
  glowIntensity: 1.5,
  backlightEnabled: true,
  frontlightEnabled: true,
  frontLitBacking: 'none',

  showBase: false,
  baseWidth: 8,
  baseHeight: 3,
  baseDepth: 3,
  baseColor: '#171717',
  
  backgroundImage: null,
  
  setText: (text) => set({ text }),
  setFontSize: (fontSize) => set({ fontSize }),
  setFontFamily: (fontFamily) => set({ fontFamily }),
  setTextAlign: (textAlign) => set({ textAlign }),
  setPattiWidth: (pattiWidth) => set({ pattiWidth }),
  setSheetThickness: (sheetThickness) => set({ sheetThickness }),
  setFaceMaterial: (faceMaterial) => set({ faceMaterial }),
  setFaceColor: (faceColor) => set({ faceColor }),
  setSideMaterial: (sideMaterial) => set({ sideMaterial }),
  setSideColor: (sideColor) => set({ sideColor }),
  setFaceDesign: (faceDesign) => set({ faceDesign }),
  setHasCollarPatti: (hasCollarPatti) => set({ hasCollarPatti }),
  setMountingStyle: (mountingStyle) => set({ mountingStyle }),
  setGlowColor: (glowColor) => set({ glowColor }),
  setGlowIntensity: (glowIntensity) => set({ glowIntensity }),
  setLighting: (frontlightEnabled, backlightEnabled) => set({ frontlightEnabled, backlightEnabled }),
  setFrontLitBacking: (frontLitBacking) => set({ frontLitBacking }),
  setShowBase: (showBase) => set({ showBase }),
  setBaseDimensions: (baseWidth, baseHeight, baseDepth) => set({ baseWidth, baseHeight, baseDepth }),
  setBaseColor: (baseColor) => set({ baseColor }),
  setBackgroundImage: (backgroundImage) => set({ backgroundImage }),
}));
