import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const StylizedCartoonCharacter = () => {
  const groupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const leftEarGlow = useRef<THREE.MeshStandardMaterial>(null);
  const rightEarGlow = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. Mouse/Touch head tracking
    if (groupRef.current) {
      const targetX = (state.pointer.x * Math.PI) / 5;
      const targetY = (state.pointer.y * Math.PI) / 5;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.1;
    }

    // 2. Realistic eye blinking animation
    const blinkCycle = time % 3.5;
    const isBlinking = blinkCycle > 3.3;
    const eyeScaleY = isBlinking ? 0.1 : 1;
    
    if (leftEyeRef.current && rightEyeRef.current) {
      leftEyeRef.current.scale.y += (eyeScaleY - leftEyeRef.current.scale.y) * 0.3;
      rightEyeRef.current.scale.y += (eyeScaleY - rightEyeRef.current.scale.y) * 0.3;
    }

    // 3. RGB Gaming Headphones Light Animation (Moving neon colors)
    const hue = (time * 0.4) % 1;
    const rgbColor = new THREE.Color().setHSL(hue, 1, 0.5);
    
    if (leftEarGlow.current && rightEarGlow.current) {
      leftEarGlow.current.emissive = rgbColor;
      leftEarGlow.current.color = rgbColor;
    }
  });

  const skinTone = "#ffdeb4";
  const hairColor = "#1a1a1a";
  const hoodieColor = "#0f172a";

  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.8}>
      <group ref={groupRef} position={[0, -0.6, 0]}>
        
        {/* Head (Proper rounded face) */}
        <mesh position={[0, 2.2, 0]}>
          <sphereGeometry args={[1.1, 64, 64]} />
          <meshStandardMaterial color={skinTone} roughness={0.5} />
        </mesh>

        {/* Simple Stylish Hair (Cap ki jagah proper hair) */}
        <group position={[0, 3.1, -0.1]}>
          <mesh position={[0, -0.1, 0]}>
            <sphereGeometry args={[1.02, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.5]} />
            <meshStandardMaterial color={hairColor} roughness={0.7} />
          </mesh>
          {/* Front Bangs / Hair spikes */}
          <mesh position={[0, 0.2, 0.85]} rotation={[0.3, 0, 0]}>
            <coneGeometry args={[0.3, 0.5, 16]} />
            <meshStandardMaterial color={hairColor} roughness={0.7} />
          </mesh>
          <mesh position={[-0.4, 0.15, 0.7]} rotation={[0.2, 0, -0.3]}>
            <coneGeometry args={[0.25, 0.4, 16]} />
            <meshStandardMaterial color={hairColor} roughness={0.7} />
          </mesh>
          <mesh position={[0.4, 0.15, 0.7]} rotation={[0.2, 0, 0.3]}>
            <coneGeometry args={[0.25, 0.4, 16]} />
            <meshStandardMaterial color={hairColor} roughness={0.7} />
          </mesh>
        </group>

        {/* Cute Nose */}
        <mesh position={[0, 2.1, 1.12]} rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[0.08, 0.15, 16]} />
          <meshStandardMaterial color="#f0c098" roughness={0.6} />
        </mesh>

        {/* Eyes with Blinking Effect */}
        <group position={[0, 2.3, 0.95]}>
          {/* Left Eye */}
          <group ref={leftEyeRef} position={[-0.4, 0, 0]}>
            <mesh>
              <sphereGeometry args={[0.22, 32, 32]} />
              <meshStandardMaterial color="#ffffff" roughness={0.1} />
            </mesh>
            <mesh position={[0.04, 0, 0.12]}>
              <sphereGeometry args={[0.11, 32, 32]} />
              <meshStandardMaterial color="#0f172a" roughness={0.1} />
            </mesh>
            <mesh position={[0.08, 0.05, 0.18]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>

          {/* Right Eye */}
          <group ref={rightEyeRef} position={[0.4, 0, 0]}>
            <mesh>
              <sphereGeometry args={[0.22, 32, 32]} />
              <meshStandardMaterial color="#ffffff" roughness={0.1} />
            </mesh>
            <mesh position={[-0.04, 0, 0.12]}>
              <sphereGeometry args={[0.11, 32, 32]} />
              <meshStandardMaterial color="#0f172a" roughness={0.1} />
            </mesh>
            <mesh position={[0, 0.05, 0.18]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
        </group>

        {/* Gentle Smile */}
        <mesh position={[0, 1.85, 1.02]} rotation={[0.1, 0, 0]}>
          <torusGeometry args={[0.12, 0.025, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#b85c5c" roughness={0.5} />
        </mesh>

        {/* Professional Gaming Headphones with RGB Light Rings */}
        <group position={[0, 2.2, 0]}>
          {/* Headband */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.08, 0.09, 32, 64, Math.PI]} />
            <meshStandardMaterial color="#1e293b" roughness={0.4} metalness={0.8} />
          </mesh>

          {/* Left Earcup & RGB LED */}
          <group position={[-1.12, 0, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.38, 0.38, 0.25, 32]} />
              <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.5} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.14, 0, 0]}>
              <torusGeometry args={[0.24, 0.045, 16, 64]} />
              <meshStandardMaterial ref={leftEarGlow} emissiveIntensity={3} />
            </mesh>
          </group>

          {/* Right Earcup & RGB LED */}
          <group position={[1.12, 0, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.38, 0.38, 0.25, 32]} />
              <meshStandardMaterial color="#0f172a" roughness={0.3} metalness={0.5} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]} position={[0.14, 0, 0]}>
              <torusGeometry args={[0.24, 0.045, 16, 64]} />
              <meshStandardMaterial ref={rightEarGlow} emissiveIntensity={3} />
            </mesh>
          </group>
        </group>

        {/* Modern Hoodie / Jacket Body */}
        <mesh position={[0, 0.7, 0]}>
          <capsuleGeometry args={[0.65, 0.7, 32, 32]} />
          <meshStandardMaterial color={hoodieColor} roughness={0.7} />
        </mesh>

        {/* Arms */}
        <mesh position={[-0.8, 0.9, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <capsuleGeometry args={[0.2, 0.6, 16, 16]} />
          <meshStandardMaterial color={skinTone} roughness={0.5} />
        </mesh>
        <mesh position={[0.8, 0.9, 0]} rotation={[0, 0, Math.PI / 6]}>
          <capsuleGeometry args={[0.2, 0.6, 16, 16]} />
          <meshStandardMaterial color={skinTone} roughness={0.5} />
        </mesh>

      </group>
    </Float>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 5]} intensity={2.5} />
      <pointLight position={[0, 3, 3]} intensity={1.5} color="#00f0ff" />
      
      <StylizedCartoonCharacter />

      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
};

export default Scene;
