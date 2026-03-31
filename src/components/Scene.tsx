import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, SoftShadows } from '@react-three/drei';
import { useStore } from '../store/useStore';
import { ExtrudedText } from './ExtrudedText';
import { CSSFallback } from './CSSFallback';

export const Scene: React.FC = () => {
  const { backgroundImage, renderMode, setRenderMode } = useStore();
  const [webglFailed, setWebglFailed] = useState(false);

  useEffect(() => {
    const originalError = console.error;
    console.error = (...args) => {
      const errorMsg = args.map(a => String(a)).join(' ');
      if (errorMsg.includes('WebGL context could not be created') || 
          errorMsg.includes('Error creating WebGL context')) {
        setWebglFailed(true);
      }
      originalError(...args);
    };

    const handleWebGLError = () => setWebglFailed(true);
    window.addEventListener('webglcontextcreationerror', handleWebGLError, true);
    
    return () => {
      console.error = originalError;
      window.removeEventListener('webglcontextcreationerror', handleWebGLError, true);
    };
  }, []);

  if (webglFailed || renderMode === 'css') {
    return (
      <div key="css-fallback-container" style={{ width: '100%', height: '100%', position: 'relative' }}>
        <CSSFallback />
        {renderMode === 'css' && !webglFailed && (
          <button 
            onClick={() => setRenderMode('webgl')}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              padding: '8px 16px',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white',
              borderRadius: '8px',
              cursor: 'pointer',
              zIndex: 100
            }}
          >
            Switch to 3D
          </button>
        )}
      </div>
    );
  }

  if (renderMode === 'ask') {
    return (
      <div key="mode-selection-container" style={{ 
        width: '100%', 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: '#09090b',
        color: 'white',
        flexDirection: 'column',
        gap: '24px',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold' }}>Choose Your Experience</h2>
        <p style={{ color: '#a1a1aa', maxWidth: '400px' }}>
          WebGL provides a high-fidelity 3D experience, while CSS offers a lightweight preview.
        </p>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button 
            onClick={() => setRenderMode('webgl')}
            style={{
              padding: '12px 24px',
              background: '#ffffff',
              color: '#000000',
              border: 'none',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            3D WebGL (Recommended)
          </button>
          <button 
            onClick={() => setRenderMode('css')}
            style={{
              padding: '12px 24px',
              background: 'transparent',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '8px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
          >
            Standard CSS
          </button>
        </div>
      </div>
    );
  }

  return (
    <div key="webgl-canvas-container" style={{ 
      width: '100%', 
      height: '100%', 
      background: backgroundImage ? `url(${backgroundImage}) center/cover no-repeat` : '#111',
      position: 'relative',
      zIndex: 1
    }}>
      <button 
        onClick={() => setRenderMode('css')}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          padding: '8px 16px',
          background: 'rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.2)',
          color: 'white',
          borderRadius: '8px',
          cursor: 'pointer',
          zIndex: 100
        }}
      >
        Switch to CSS
      </button>

      <Canvas 
        shadows
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{ 
          powerPreference: 'default',
          antialias: true,
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
};
