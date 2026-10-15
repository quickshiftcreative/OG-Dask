import Navbar from './components/Navbar';
import Scene from './components/Scene';

function App() {
  return (
    <div>
      <Navbar />
      <div className="hero-section">
        
        {/* पहले टेक्स्ट आएगा */}
        <div className="hero-text">
          <h1 className="hero-title">
            Welcome to <span style={{ color: '#00f0ff' }}>OG Desk</span>
          </h1>
          <p className="hero-subtitle">
            Premium 360° Brand Growth & Digital Agency. We scale your brand with absolute precision.
          </p>
        </div>

        {/* उसके नीचे 3D ऑब्जेक्ट आएगा */}
        <div className="hero-3d-wrapper">
          <Scene />
        </div>

      </div>
    </div>
  );
}

export default App;
