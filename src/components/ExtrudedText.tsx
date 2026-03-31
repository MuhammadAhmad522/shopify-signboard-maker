import React, { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { Text3D, Center } from '@react-three/drei';
import { useStore } from '../store/useStore';
import { MATERIALS } from '../configs/config';
import { UNITS } from '../constants/constants';

export const ExtrudedText: React.FC = () => {
  const text = useStore(state => state.text);
  const fontSize = useStore(state => state.fontSize);
  const fontFamily = useStore(state => state.fontFamily);
  const pattiWidth = useStore(state => state.pattiWidth);
  const faceColor = useStore(state => state.faceColor);
  const sideColor = useStore(state => state.sideColor);
  const faceMaterial = useStore(state => state.faceMaterial);
  const sideMaterial = useStore(state => state.sideMaterial);
  const mountingStyle = useStore(state => state.mountingStyle);
  const glowColor = useStore(state => state.glowColor);
  const glowIntensity = useStore(state => state.glowIntensity);
  const backlightEnabled = useStore(state => state.backlightEnabled);
  const frontlightEnabled = useStore(state => state.frontlightEnabled);
  const showBase = useStore(state => state.showBase);
  const baseWidth = useStore(state => state.baseWidth);
  const baseHeight = useStore(state => state.baseHeight);
  const baseDepth = useStore(state => state.baseDepth);
  const baseColor = useStore(state => state.baseColor);

  const meshRef = useRef<THREE.Group>(null);

  const zOffset = mountingStyle === 'bolt' ? 0.3 : 0;
  // If base is shown, we need to push everything forward a bit so the base is at z=0 or slightly behind
  const baseOffset = showBase ? baseDepth : 0;
  
  const faceMatProps = useMemo(() => MATERIALS[faceMaterial] || MATERIALS.acrylic, [faceMaterial]);
  const sideMatProps = useMemo(() => MATERIALS[sideMaterial] || MATERIALS.metal, [sideMaterial]);

  // Convert pattiWidth (mm) to the 3D scene units (feet)
  const safePattiWidth = Math.max(0.01, pattiWidth * UNITS.MM_TO_FT);

  return (
    <group ref={meshRef} position={[0, 0, zOffset + baseOffset]}>
      {/* Alucobond Base */}
      {showBase && (
        <mesh position={[0, 0, -baseDepth/2]}>
          <boxGeometry args={[baseWidth, baseHeight, baseDepth]} />
          <meshStandardMaterial 
            color={baseColor} 
            metalness={0.6} 
            roughness={0.3} 
          />
        </mesh>
      )}

      <Suspense fallback={null}>
        <Center>
          <Text3D
            font={fontFamily}
            size={fontSize}
            height={safePattiWidth}
            curveSegments={24}
            bevelEnabled={true}
            bevelThickness={0.02}
            bevelSize={0.02}
            bevelOffset={0}
            bevelSegments={8}
            castShadow
            receiveShadow
          >
            {text || ' '}
            <meshStandardMaterial 
              attach="material-0" 
              color={faceColor} 
              emissive={frontlightEnabled ? faceColor : '#000000'}
              emissiveIntensity={frontlightEnabled ? 1 : 0}
              roughness={faceMatProps.roughness}
              metalness={faceMatProps.metalness}
              transparent={faceMatProps.transparent}
              opacity={faceMatProps.opacity}
            />
            <meshStandardMaterial 
              attach="material-1" 
              color={sideColor} 
              roughness={sideMatProps.roughness}
              metalness={sideMatProps.metalness}
            />
          </Text3D>
        </Center>

        {/* Backlight Glow effect - positioned relative to the back of the text */}
        {backlightEnabled && (
          <group position={[0, 0, -safePattiWidth / 2 - 0.01]}>
            <Center top>
              <Text3D font={fontFamily} size={fontSize} height={0.005}>
                  {text || ' '}
                  <meshBasicMaterial color={glowColor} transparent opacity={0.3} toneMapped={false} />
              </Text3D>
            </Center>
            <pointLight 
              position={[0, 0, -0.1]} 
              color={glowColor} 
              intensity={glowIntensity * 2} 
              distance={fontSize * 2} 
              decay={2} 
            />
          </group>
        )}
      </Suspense>

      {/* Spacers for Bolt Mount */}
      {mountingStyle === 'bolt' && (
        <group position={[0, 0, -zOffset / 2]}>
          <mesh rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.05, 0.05, zOffset, 16]} />
            <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      )}
    </group>
  );
};
