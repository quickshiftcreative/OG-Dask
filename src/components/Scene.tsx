import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';

const Scene = () => {
  return (
    // मैंने यहाँ से background वाला स्टाइल हटा दिया है, अब यह बॉक्स के अंदर रहेगा
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[2, 5, 2]} intensity={1} />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh>
          <boxGeometry args={[2.5, 2.5, 2.5]} />
          <meshStandardMaterial color="#00f0ff" wireframe={true} />
        </mesh>
      </Float>

      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        autoRotate={true} /* यह अब अपने आप भी घूमेगा */
        autoRotateSpeed={2}
      />
    </Canvas>
  );
};

export default Scene;
