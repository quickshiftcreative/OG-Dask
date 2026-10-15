import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';

const Scene = () => {
  return (
    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        
        {/* Float इसे हवा में तैरने वाला प्रीमियम लुक देगा */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh>
            <boxGeometry args={[2.5, 2.5, 2.5]} />
            <meshStandardMaterial color="#00f0ff" wireframe={true} />
          </mesh>
        </Float>

        {/* OrbitControls हमें इसे उंगली या माउस से कंट्रोल करने की पावर देगा */}
        <OrbitControls 
          enableZoom={false} // ज़ूम बंद रखा है ताकि पेज स्क्रॉल करने में दिक्कत न हो
          enablePan={false} 
          autoRotate={false} // ऑटो-रोटेशन बंद कर दिया
        />
      </Canvas>
    </div>
  );
};

export default Scene;
