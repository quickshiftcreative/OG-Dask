import Navbar from './components/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <div className="hero-section">
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
