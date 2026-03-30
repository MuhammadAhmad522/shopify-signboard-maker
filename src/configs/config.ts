export interface MaterialProps {
  color: string;
  metalness: number;
  roughness: number;
  transparent?: boolean;
  opacity?: number;
}

export const MATERIALS: Record<string, MaterialProps> = {
  metal: {
    color: '#888888',
    metalness: 1,
    roughness: 0.2,
  },
  stainless_steel: {
    color: '#e0e5e9',
    metalness: 1,
    roughness: 0.1,
  },
  metal_steel: {
    color: '#46494c',
    metalness: 0.9,
    roughness: 0.3,
  },
  aluminium: {
    color: '#d6d6d6',
    metalness: 0.8,
    roughness: 0.4,
  },
  acrylic: {
    color: '#ffffff',
    metalness: 0,
    roughness: 0.1,
    transparent: true,
    opacity: 0.9,
  },
  wood: {
    color: '#5d4037',
    metalness: 0,
    roughness: 0.8,
  },
  wooden: {
    color: '#8b5a2b',
    metalness: 0.1,
    roughness: 0.9,
  }
};

export const CONFIG = {
  maxSheetWidth: 243.84, // 8ft in cm
  maxSheetHeight: 121.92, // 4ft in cm
  defaultExtrusion: 5,
  minExtrusion: 1,
  maxExtrusion: 20,
};
