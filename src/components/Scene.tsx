import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import * as THREE from 'three';

const CuteRealisticCartoon = () => {
  const groupRef = useRef<THREE.Group>(null);
  const eyesGroupRef = useRef<THREE.Group>(null);
  
  // गेमिंग हेडफोन की लाइट्स के लिए Reference
  const leftEarGlow = useRef<THREE.MeshStandardMaterial>(null);
  const rightEarGlow = useRef<THREE.MeshStandardMaterial>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // 1. माउस/उंगली को ट्रैक करना (सिर घुमाना)
    if (groupRef.current) {
      const targetX = (state.pointer.x * Math.PI) / 4;
      const targetY = (state.pointer.y * Math.PI) / 4;
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.1;
    }

    // 2. आँखें ब्लिंक (पलकें झपकाना) करने का लॉजिक
    if (eyesGroupRef.current) {
      // हर 4 सेकंड के साइकिल में पलक झपकेगी
      const blinkCycle = time % 4;
      const isBlinking = blinkCycle > 3.8; // साइकिल के आखिरी 0.2 सेकंड में आँखें बंद होंगी
      const targetScaleY = isBlinking ? 0.05 : 1; // 0.05 मतलब आँख बंद, 1 मतलब खुली
      
      // स्मूथ ब्लिंकिंग इफ़ेक्ट
      eyesGroupRef.current.scale.y += (targetScaleY - eyesGroupRef.current.scale.y) * 0.3;
    }

    // 3. RGB गेमिंग हेडफोन्स की लाइट एनीमेशन
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

  // कलर्स और मैटीरियल (Vinyl Toy / Pixar जैसा लुक)
  const skinColor = "#ffd6c2"; 
  const clothColor = "#2b2d42"; 
  const materialProps = { roughness: 0.3, metalness: 0.1 }; // हल्का सा शाइनी लुक

  return (
    <Float speed={2} rotationIntensity={0.15} floatIntensity={0.8}>
      <group ref={groupRef} position={[0, -0.8, 0]}>
        
        {/* बड़ा, क्यूट सिर (Big Cute Head) */}
        <mesh position={[0, 2.4, 0]} scale={[1.1, 1, 1.05]}>
          <sphereGeometry args={[1.2, 64, 64]} />
          <meshStandardMaterial color={skinColor} {...materialProps} />
        </mesh>

        {/* गालों का ब्लश (Cute Cheeks Blush) */}
        <mesh position={[-0.6, 2.1, 1.05]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="#ff9999" transparent opacity={0.4} roughness={1} />
        </mesh>
        <mesh position={[0.6, 2.1, 1.05]}>
          <sphereGeometry args={[0.2, 32, 32]} />
          <meshStandardMaterial color="#ff9999" transparent opacity={0.4} roughness={1} />
        </mesh>

        {/* --- आँखें (Eyes Group - जो ब्लिंक करेगी) --- */}
        <group ref={eyesGroupRef} position={[0, 2.5, 1.1]}>
          
          {/* बायीं आँख (Left Eye) */}
          <group position={[-0.45, 0, 0]}>
            {/* आँखों का सफेद हिस्सा */}
            <mesh>
              <sphereGeometry args={[0.28, 32, 32]} />
              <meshStandardMaterial color="#ffffff" roughness={0.1} />
            </mesh>
            {/* काली पुतली (Pupil) */}
            <mesh position={[0.05, 0, 0.22]}>
              <sphereGeometry args={[0.15, 32, 32]} />
              <meshStandardMaterial color="#111111" roughness={0.1} />
            </mesh>
            {/* आँखों की चमक (Catchlight - जो इसे असली दिखाती है) */}
            <mesh position={[0.12, 0.08, 0.32]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>

          {/* दायीं आँख (Right Eye) */}
          <group position={[0.45, 0, 0]}>
            <mesh>
              <sphereGeometry args={[0.28, 32, 32]} />
              <meshStandardMaterial color="#ffffff" roughness={0.1} />
            </mesh>
            <mesh position={[-0.05, 0, 0.22]}>
              <sphereGeometry args={[0.15, 32, 32]} />
              <meshStandardMaterial color="#111111" roughness={0.1} />
            </mesh>
            <mesh position={[0.02, 0.08, 0.32]}>
              <sphereGeometry args={[0.04, 16, 16]} />
              <meshBasicMaterial color="#ffffff" />
            </mesh>
          </group>
          
        </group>

        {/* छोटी सी क्यूट मुस्कान (Tiny Mouth) */}
        <mesh position={[0, 2.05, 1.15]} rotation={[0.1, 0, 0]}>
          <torusGeometry args={[0.08, 0.03, 16, 32, Math.PI]} />
          <meshStandardMaterial color="#4a2020" />
        </mesh>

        {/* --- RGB गेमिंग हेडफोन्स --- */}
        <group position={[0, 2.4, 0]} scale={[1.15, 1.15, 1.15]}>
          {/* हेडबैंड */}
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <torusGeometry args={[1.05, 0.08, 32, 64, Math.PI]} />
            <meshStandardMaterial color="#111111" roughness={0.8} />
          </mesh>
          
          {/* लेफ्ट ईयरकप */}
          <group position={[-1.08, 0, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.35, 0.35, 0.25, 32]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]} position={[-0.15, 0, 0]}>
              <torusGeometry args={[0.22, 0.04, 16, 64]} />
              <meshStandardMaterial ref={leftEarGlow} emissiveIntensity={2.5} />
            </mesh>
          </group>

          {/* राइट ईयरकप */}
          <group position={[1.08, 0, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.35, 0.35, 0.25, 32]} />
              <meshStandardMaterial color="#1a1a1a" roughness={0.5} />
            </mesh>
            <mesh rotation={[0, 0, Math.PI / 2]} position={[0.15, 0, 0]}>
              <torusGeometry args={[0.22, 0.04, 16, 64]} />
              <meshStandardMaterial ref={rightEarGlow} emissiveIntensity={2.5} />
            </mesh>
          </group>
        </group>

        {/* छोटा शरीर (Cute Tiny Body) */}
        <mesh position={[0, 1.0, 0]}>
          <capsuleGeometry args={[0.5, 0.7, 32, 32]} />
          <meshStandardMaterial color={clothColor} {...materialProps} />
        </mesh>

        {/* हाथ (Hands) */}
        <mesh position={[-0.7, 1.1, 0]} rotation={[0, 0, -Math.PI / 6]}>
          <capsuleGeometry args={[0.18, 0.5, 32, 32]} />
          <meshStandardMaterial color={skinColor} {...materialProps} />
        </mesh>
        <mesh position={[0.7, 1.1, 0]} rotation={[0, 0, Math.PI / 6]}>
          <capsuleGeometry args={[0.18, 0.5, 32, 32]} />
          <meshStandardMaterial color={skinColor} {...materialProps} />
        </mesh>
        
      </group>
    </Float>
  );
};

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 7] }}>
      <ambientLight intensity={1.5} />
      <directionalLight position={[5, 10, 8]} intensity={2.5} />
      {/* एक सॉफ्ट लाइट चेहरे को और क्यूट बनाने के लिए */}
      <pointLight position={[0, 3, 4]} intensity={1.5} color="#ffd6c2" />
      
      <CuteRealisticCartoon />

      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </Canvas>
  );
};

export default Scene;
