import Navbar from './components/Navbar';
import Scene from './components/Scene'; // 3D Scene import kiya

function App() {
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      
      {/* 3D Background - Sabse peeche rahega */}
      <Scene />

      {/* Navigation Bar */}
      <Navbar />

      {/* Main Content - Isko zIndex 1 diya taaki 3D ke upar dikhe */}
      <div className="hero-section" style={{ position: 'relative', zIndex: 1 }}>
        <h1 className="hero-title">
          Welcome to <span style={{ color: '#00f0ff' }}>OG Desk</span>
        </h1>
        <p className="hero-subtitle">
          Premium 360° Brand Growth & Digital Agency. We scale your brand with absolute precision.
        </p>
      </div>
      
    </div>
  );
}

export default App;
