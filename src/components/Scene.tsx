import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, SoftShadows } from '@react-three/drei';
import { ExtrudedText } from './ExtrudedText';
import { useStore } from '../store/useStore';
import { CSSFallback } from './CSSFallback';

export const Scene: React.FC = () => {
  // FORCE CSS 3D FALLBACK FOR ALL
  return <CSSFallback />;

  /*
  const { backgroundImage } = useStore();
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    // 1. Intercept console.error to catch silent Three.js WebGL context failures
    const originalError = console.error;
    console.error = (...args) => {
      const errorMsg = args.map(a => String(a)).join(' ');
      if (errorMsg.includes('WebGL context could not be created') || 
          errorMsg.includes('Error creating WebGL context')) {
        setWebglFailed(true);
      }
      originalError(...args);
    };

    // 2. Also catch the native browser event
    const handleWebGLError = () => setWebglFailed(true);
    window.addEventListener('webglcontextcreationerror', handleWebGLError, true);
    
    return () => {
      console.error = originalError;
      window.removeEventListener('webglcontextcreationerror', handleWebGLError, true);
    };
  }, []);

  if (webglFailed) {
    return <CSSFallback />;
  }

  return (
    <div style={{ 
      width: '100%', 
      height: '100%', 
      background: backgroundImage ? \`url(\${backgroundImage}) center/cover no-repeat\` : '#111',
      position: 'relative',
      zIndex: 1
    }}>
      <Canvas 
        shadows
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ 
          powerPreference: 'default',
          antialias: false,
          alpha: true,
          preserveDrawingBuffer: false,
          stencil: false
        }}
      >
        <SoftShadows size={20} samples={16} focus={0.5} />
        <ambientLight intensity={0.4} />
        <directionalLight 
          castShadow 
          position={[5, 5, 5]} 
          intensity={1.5} 
          shadow-mapSize={[512, 512]} 
        />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#00e5ff" />
        
        <Suspense fallback={null}>
          <Environment preset="city" />
          <group position={[0, 0, 0]}>
            <ExtrudedText />
          </group>
          <ContactShadows position={[0, -2, 0]} opacity={0.4} scale={20} blur={2} far={10} />
        </Suspense>

        <OrbitControls 
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={2}
          maxDistance={20}
          maxPolarAngle={Math.PI / 1.5}
        />
      </Canvas>
    </div>
  );
  */
};
