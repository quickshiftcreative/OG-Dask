import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import type { Mesh } from 'three';

const RotatingObject = () => {
  // TypeScript ko batane ke liye ki yeh ek Mesh (3D object) hai
  const meshRef = useRef<Mesh>(null);

  // Yeh function har frame (60fps) par object ko rotate karega
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshStandardMaterial color="#00f0ff" wireframe={true} />
    </mesh>
  );
};

const Scene = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        <RotatingObject />
      </Canvas>
    </div>
  );
};

export default Scene;
