import React, { useRef, useMemo } from 'react';
import * as THREE from 'three';
import { Text3D, Center } from '@react-three/drei';
import { useStore } from '../store/useStore';
import { MATERIALS } from '../configs/config';

export const ExtrudedText: React.FC = () => {
  const { 
    text, 
    fontSize, 
    fontFamily, 
    pattiWidth, 
    faceColor,
    sideColor,
    faceMaterial,
    sideMaterial,
    mountingStyle,
    glowColor,
    glowIntensity,
    backlightEnabled,
    frontlightEnabled
  } = useStore();

  const meshRef = useRef<THREE.Group>(null);

  const zOffset = mountingStyle === 'bolt' ? 0.3 : 0;
  
  const faceMatProps = useMemo(() => MATERIALS[faceMaterial] || MATERIALS.acrylic, [faceMaterial]);
  const sideMatProps = useMemo(() => MATERIALS[sideMaterial] || MATERIALS.metal, [sideMaterial]);

  // Ensure minimum depth to prevent rendering errors
  const safePattiWidth = Math.max(0.01, pattiWidth);

  return (
    <group ref={meshRef} position={[0, 0, zOffset]}>
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

        {/* Backlight Glow effect */}
        {backlightEnabled && (
          <group position={[0, 0, -0.05]}>
            <Center>
              <Text3D font={fontFamily} size={fontSize} height={0.01}>
                  {text || ' '}
                  <meshBasicMaterial color={glowColor} transparent opacity={0.3} toneMapped={false} />
              </Text3D>
            </Center>
            <pointLight 
              position={[0, 0, -0.2]} 
              color={glowColor} 
              intensity={glowIntensity * 5} 
              distance={10} 
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
