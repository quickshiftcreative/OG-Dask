import Navbar from './components/Navbar';
import Scene from './components/Scene';

function App() {
  return (
    <div>
      <Navbar />
      <div className="hero-section">
        
        {/* 3D कैरेक्टर अब सबसे ऊपर आएगा */}
        <div className="hero-3d-wrapper">
          <Scene />
        </div>

        {/* टेक्स्ट अब उसके नीचे आएगा */}
        <div className="hero-text">
          <h1 className="hero-title">
            Welcome to <span style={{ color: '#00f0ff' }}>OG Desk</span>
          </h1>
          <p className="hero-subtitle">
            Premium 360° Brand Growth & Digital Agency. We scale your brand with absolute precision.
          </p>
        </div>

      </div>
    </div>
  );
}

export default App;
