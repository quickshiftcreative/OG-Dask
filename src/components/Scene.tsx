import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const SolidCartoonBot = () => {
  const groupRef = useRef<THREE.Group>(null);

  // आँखों को माउस/उंगली की तरफ घुमाने का लॉजिक
  useFrame((state) => {
    if (groupRef.current) {
      const targetX = (state.pointer.x * Math.PI) / 4;
      const targetY = (state.pointer.y * Math.PI) / 4;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.1;
    }
  });

  // सॉलिड मैटीरियल (ग्लास हटा दिया गया है)
  const skinColor = "#ffb4a2"; // कार्टून स्किन टोन
  const suitColor = "#2b2d42"; // डार्क सूट

  return (
    <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1.5}>
      <group ref={groupRef} position={[0, -0.5, 0]}>
        
        {/* सिर (Head) - सॉलिड और रियलिस्टिक कार्टून शेप */}
        <mesh position={[0, 1.8, 0]}>
          <boxGeometry args={[1.2, 1.2, 1.2]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>

        {/* आँखें (Eyes) */}
        <group position={[0, 1.9, 0.61]}>
          <mesh position={[-0.25, 0, 0]}>
            <circleGeometry args={[0.15, 32]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[-0.25, 0, 0.01]}>
            <circleGeometry args={[0.07, 32]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
          <mesh position={[0.25, 0, 0]}>
            <circleGeometry args={[0.15, 32]} />
            <meshBasicMaterial color="#ffffff" />
          </mesh>
          <mesh position={[0.25, 0, 0.01]}>
            <circleGeometry args={[0.07, 32]} />
            <meshBasicMaterial color="#000000" />
          </mesh>
        </group>

        {/* शरीर (Body) - सॉलिड सूट */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.7, 0.6, 1.4, 32]} />
          <meshStandardMaterial color={suitColor} roughness={0.8} />
        </mesh>

        {/* चेस्ट लोगो / नियॉन लाइट */}
        <mesh position={[0, 0.6, 0.65]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.1, 32]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={0.5} />
        </mesh>

        {/* बायां हाथ (Left Arm) */}
        <mesh position={[-0.9, 0.5, 0]} rotation={[0, 0, -Math.PI / 8]}>
          <capsuleGeometry args={[0.2, 0.8, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>

        {/* दायां हाथ (Right Arm) */}
        <mesh position={[0.9, 0.5, 0]} rotation={[0, 0, Math.PI / 8]}>
          <capsuleGeometry args={[0.2, 0.8, 16, 16]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>
        
      </group>
    </Float>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 5, 5]} intensity={2} />
      
      {/* नया सॉलिड कैरेक्टर */}
      <SolidCartoonBot />

      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
};

export default Scene;
