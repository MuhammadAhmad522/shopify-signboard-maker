import React, { useRef, useMemo, Suspense } from 'react';
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
    frontlightEnabled,
    showBase,
    baseWidth,
    baseHeight,
    baseDepth,
    baseColor,
    faceDesign,
    hasCollarPatti,
    frontLitBacking
  } = useStore();

  const meshRef = useRef<THREE.Group>(null);

  const zOffset = mountingStyle === 'bolt' ? 0.3 : 0;
  // If base is shown, we need to push everything forward a bit so the base is at z=0 or slightly behind
  const baseOffset = showBase ? baseDepth : 0;
  
  const faceMatProps = useMemo(() => MATERIALS[faceMaterial] || MATERIALS.acrylic, [faceMaterial]);
  const sideMatProps = useMemo(() => MATERIALS[sideMaterial] || MATERIALS.metal, [sideMaterial]);

  // Ensure minimum depth to prevent rendering errors
  const safePattiWidth = Math.max(0.01, pattiWidth);

  const textureMaps = useMemo(() => {
    if (faceDesign === 'none') return { bumpMap: null, alphaMap: null };
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return { bumpMap: null, alphaMap: null };
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 512, 512);
    ctx.fillStyle = '#000000';
    
    const spacing = 64;
    if (faceDesign === 'dots' || faceDesign === 'holes') {
      for (let i = 0; i < 512; i += spacing) {
        for (let j = 0; j < 512; j += spacing) {
          ctx.beginPath();
          ctx.arc(i + spacing/2, j + spacing/2, 12, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    } else if (faceDesign === 'stars') {
      const drawStar = (cx: number, cy: number, spokes: number, outerR: number, innerR: number) => {
        let rot = Math.PI / 2 * 3;
        let x = cx;
        let y = cy;
        let step = Math.PI / spokes;
        ctx.beginPath();
        ctx.moveTo(cx, cy - outerR);
        for (let i = 0; i < spokes; i++) {
            x = cx + Math.cos(rot) * outerR;
            y = cy + Math.sin(rot) * outerR;
            ctx.lineTo(x, y);
            rot += step;
            x = cx + Math.cos(rot) * innerR;
            y = cy + Math.sin(rot) * innerR;
            ctx.lineTo(x, y);
            rot += step;
        }
        ctx.lineTo(cx, cy - outerR);
        ctx.closePath();
        ctx.fill();
      }
      for (let i = 0; i < 512; i += spacing) {
        for (let j = 0; j < 512; j += spacing) {
          drawStar(i + spacing/2, j + spacing/2, 5, 16, 6);
        }
      }
    }
    
    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.RepeatWrapping;
    const repeat = Math.max(1, fontSize * 1.5);
    tex.repeat.set(repeat, repeat);
    
    if (faceDesign === 'holes') {
      return { bumpMap: null, alphaMap: tex };
    } else {
      return { bumpMap: tex, alphaMap: null };
    }
  }, [faceDesign, fontSize]);

  return (
    <group ref={meshRef} position={[0, 0, zOffset + baseOffset]}>
      {/* Alucobond Base */}
      {showBase && (
        <mesh position={[0, 0, -zOffset - baseDepth/2]}>
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
              transparent={faceMatProps.transparent || faceDesign === 'holes'}
              opacity={faceMatProps.opacity}
              alphaTest={faceDesign === 'holes' ? 0.5 : 0}
              alphaMap={textureMaps.alphaMap ?? undefined}
              bumpMap={textureMaps.bumpMap ?? undefined}
              bumpScale={0.02}
            />
            <meshStandardMaterial 
              attach="material-1" 
              color={sideColor} 
              roughness={sideMatProps.roughness}
              metalness={sideMatProps.metalness}
            />
          </Text3D>
        </Center>

        {/* Collar Patti Overlay */}
        {hasCollarPatti && (
          <group position={[0, 0, safePattiWidth]}>
            <Center>
              <Text3D
                font={fontFamily}
                size={fontSize}
                height={0.02}
                curveSegments={24}
                bevelEnabled={true}
                bevelThickness={0.02}
                bevelSize={0.04}
                bevelSegments={8}
              >
                {text || ' '}
                <meshBasicMaterial attach="material-0" transparent opacity={0} depthWrite={false} colorWrite={false} />
                <meshStandardMaterial attach="material-1" color={sideColor} roughness={sideMatProps.roughness} metalness={sideMatProps.metalness} />
              </Text3D>
            </Center>
          </group>
        )}

        {/* Foam Board Backing for Front Lit */}
        {frontlightEnabled && frontLitBacking === 'foam_board' && (
          <group position={[0, 0, -0.05]}>
            <Center>
              <Text3D
                font={fontFamily}
                size={fontSize}
                height={0.05}
                curveSegments={24}
                bevelEnabled={true}
                bevelThickness={0.02}
                bevelSize={0.08}
                bevelSegments={4}
              >
                {text || ' '}
                <meshStandardMaterial color="#f8f9fa" roughness={0.9} metalness={0} />
              </Text3D>
            </Center>
          </group>
        )}

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
          <mesh position={[-text.length * fontSize * 0.25, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.05, 0.05, zOffset, 16]} />
            <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.05, 0.05, zOffset, 16]} />
            <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.2} />
          </mesh>
          <mesh position={[text.length * fontSize * 0.25, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
            <cylinderGeometry args={[0.05, 0.05, zOffset, 16]} />
            <meshStandardMaterial color="#888888" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      )}
    </group>
  );
};
