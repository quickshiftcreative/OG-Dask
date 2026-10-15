import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import GlassBot from './GlassBot'; // हमने अपना नया बॉट इम्पोर्ट किया

const Scene = () => {
  return (
    <Canvas camera={{ position: [0, 0, 6] }}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={2} color="#00f0ff" />
      <directionalLight position={[-5, -5, 5]} intensity={2} color="#ff0054" />
      
      {/* हमारा नया 3D कैरेक्टर */}
      <GlassBot />

      {/* कंट्रोल्स (ताकि आप पेज को स्क्रॉल कर सकें पर बॉट माउस को ट्रैक करे) */}
      <OrbitControls 
        enableZoom={false}
        enablePan={false}
        enableRotate={false} /* हमने इसे बंद कर दिया है क्योंकि बॉट अब खुद माउस/उंगली को ट्रैक करेगा */
      />
    </Canvas>
  );
};

export default Scene;
