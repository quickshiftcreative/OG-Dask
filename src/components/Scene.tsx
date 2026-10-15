import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const AnimatedCartoonCharacter = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  // गेमिंग हेडफोन की लाइट्स के लिए Reference
  const leftEarGlow = useRef<THREE.MeshStandardMaterial>(null);
  const rightEarGlow = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. माउस/उंगली को ट्रैक करना
    if (groupRef.current) {
      const targetX = (state.pointer.x * Math.PI) / 4;
      const targetY = (state.pointer.y * Math.PI) / 4;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.1;
    }

    // 2. गेमिंग हेडफोन्स में RGB लाइट को मूव (एनिमेट) करना
    // यह कोड हर सेकंड लाइट का रंग बदलेगा (Rainbow Effect)
    const hue = (time * 0.5) % 1; 
    const rgbColor = new THREE.Color().setHSL(hue, 1, 0.5);
    
    if (leftEarGlow.current) {
      leftEarGlow.current.emissive = rgbColor;
      leftEarGlow.current.color = rgbColor;
    }
    if (rightEarGlow.current) {
      rightEarGlow.current.emissive = rgbColor;
      rightEarGlow.current.color = rgbColor;
    }
  });

  const skinColor = "#ffcdb2"; // सॉफ्ट स्किन टोन
  const shirtColor = "#ff0054"; // लाल टी-शर्ट 
  const pantColor = "#ffd166"; // पीली पैंट

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1}>
      <group ref={groupRef} position={[0, -0.5, 0]}>
        
        {/* गोल-मटोल सिर (Smooth Round Head) */}
        <mesh position={[0, 2.2, 0]}>
          <sphereGeometry args={[1, 64, 64]} />
          <meshStandardMaterial color={skinColor} roughness={0.4} />
        </mesh>

        {/* बड़ी कार्टून आँखें */}
        <group position={[0, 2.3, 0.85]}>
          {/* बायीं आँख */}
          <group position={[-0.35, 0, 0]}>
            <mesh>
              <sphereGeometry args={[0.22, 32, 32]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[0.05, 0, 0.18]}>
              <sphereGeometry args={[0.08, 32, 32]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>
          {/* दायीं आँख */}
          <group position={[0.35, 0, 0]}>
            <mesh>
              <sphereGeometry args={[0.22, 32, 32]} />
              <meshStandardMaterial color="#ffffff" />
            </mesh>
            <mesh position={[-0.05, 0, 0.18]}>
              <sphereGeometry args={[0.08, 32, 32]} />
              <meshStandardMaterial color="#000000" />
            </mesh>
          </group>
        </group>

        {/* क्यूट स्माइल (मुस्कान) */}
        <mesh position={[0, 1.9, 0.95]} rotation={[0.2, 0, 0]}>
          <torusGeometry args={[0.15, 0.03, 16, 32, Math.PI]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* RGB गेमिंग हेडफोन्स */}
        <group position={[0, 2.2, 0]}>
          {/* हेडबैंड */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <torusGeometry args={[1.02, 0.1, 32, 64, Math.PI]} />
            <meshStandardMaterial color="#111111" roughness={0.8} />
          </mesh>
          
          {/* लेफ्ट ईयरकप और ग्लोइंग RGB लाइट */}
          <group position={[-1.02, 0, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.35, 0.35, 0.2, 32]} />
              <meshStandardMaterial color="#222222" />
            </mesh>
            {/* यह रिंग लगातार रंग बदलेगी */}
            <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.12, 0, 0]}>
              <torusGeometry args={[0.2, 0.05, 16, 64]} />
              <meshStandardMaterial ref={leftEarGlow} emissiveIntensity={2} />
            </mesh>
          </group>

          {/* राइट ईयरकप और ग्लोइंग RGB लाइट */}
          <group position={[1.02, 0, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.35, 0.35, 0.2, 32]} />
              <meshStandardMaterial color="#222222" />
            </mesh>
            {/* यह रिंग लगातार रंग बदलेगी */}
            <mesh rotation={[0, 0, Math.PI / 2]} position={[0.12, 0, 0]}>
              <torusGeometry args={[0.2, 0.05, 16, 64]} />
              <meshStandardMaterial ref={rightEarGlow} emissiveIntensity={2} />
            </mesh>
          </group>
        </group>

        {/* छोटा गोल शरीर (Chubby Body) */}
        <mesh position={[0, 0.8, 0]}>
          <capsuleGeometry args={[0.6, 0.6, 32, 32]} />
          <meshStandardMaterial color={shirtColor} roughness={0.7} />
        </mesh>

        {/* गोल हाथ (Hands) */}
        <mesh position={[-0.85, 1, 0]} rotation={[0, 0, -Math.PI / 5]}>
          <capsuleGeometry args={[0.22, 0.6, 32, 32]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>
        <mesh position={[0.85, 1, 0]} rotation={[0, 0, Math.PI / 5]}>
          <capsuleGeometry args={[0.22, 0.6, 32, 32]} />
          <meshStandardMaterial color={skinColor} roughness={0.6} />
        </mesh>

        {/* छोटे पैर (Legs) */}
        <mesh position={[-0.3, 0.1, 0]}>
          <capsuleGeometry args={[0.25, 0.4, 32, 32]} />
          <meshStandardMaterial color={pantColor} roughness={0.7} />
        </mesh>
        <mesh position={[0.3, 0.1, 0]}>
          <capsuleGeometry args={[0.25, 0.4, 32, 32]} />
          <meshStandardMaterial color={pantColor} roughness={0.7} />
        </mesh>
        
      </group>
    </Float>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6.5] }}>
      {/* लाइट को थोड़ा ब्राइट किया है ताकि कार्टून अच्छा दिखे */}
      <ambientLight intensity={1.8} />
      <directionalLight position={[5, 10, 5]} intensity={2.5} />
      
      <AnimatedCartoonCharacter />

      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
};

export default Scene;
