import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

const GlassBot = () => {
  const groupRef = useRef<THREE.Group>(null);

  // यह फंक्शन बॉट को उंगली/माउस की तरफ देखने में मदद करेगा
  useFrame((state) => {
    if (groupRef.current) {
      const targetX = (state.pointer.x * Math.PI) / 4;
      const targetY = (state.pointer.y * Math.PI) / 4;
      
      // स्मूथ रोटेशन (Smooth rotation)
      groupRef.current.rotation.y += (targetX - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x += (-targetY - groupRef.current.rotation.x) * 0.1;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={0.2} floatIntensity={1.5}>
      <group ref={groupRef}>
        
        {/* Head (शीशे वाला सिर) */}
        <mesh>
          <sphereGeometry args={[1.5, 32, 32]} />
          <meshStandardMaterial 
            color="#ffffff" 
            transparent={true} 
            opacity={0.4} 
            roughness={0.1} 
            metalness={0.8} 
          />
        </mesh>
        
        {/* Eyes (चमकती आँखें) */}
        <group position={[0, 0.2, 1.3]}>
          <mesh position={[-0.5, 0, 0]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshBasicMaterial color="#00f0ff" /> {/* नीली आँख */}
          </mesh>
          <mesh position={[0.5, 0, 0]}>
            <sphereGeometry args={[0.25, 16, 16]} />
            <meshBasicMaterial color="#ff0054" /> {/* गुलाबी आँख */}
          </mesh>
        </group>

        {/* Ears (हेडफोन्स) */}
        <mesh position={[-1.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
          <meshStandardMaterial color="#222222" roughness={0.7} />
        </mesh>
        <mesh position={[1.6, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
          <meshStandardMaterial color="#222222" roughness={0.7} />
        </mesh>

        {/* Floating Ring (नीचे घूमती हुई नियॉन रिंग) */}
        <mesh position={[0, -2.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.5, 0.05, 16, 100]} />
          <meshBasicMaterial color="#9d4edd" />
        </mesh>

      </group>
    </Float>
  );
};

export default GlassBot;
