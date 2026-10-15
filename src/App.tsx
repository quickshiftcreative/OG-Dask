import Navbar from './components/Navbar';

function App() {
  return (
    <div style={{ 
      backgroundColor: '#0a0a0a', 
      color: '#ffffff', 
      minHeight: '100vh', 
      fontFamily: 'sans-serif' 
    }}>
      {/* Yahan humne Navbar component add kar diya hai */}
      <Navbar />

      {/* Main Content Area */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        padding: '0 20px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '4rem', marginBottom: '20px' }}>
          Welcome to <span style={{ color: '#00f0ff' }}>OG Desk</span>
        </h1>
        <p style={{ color: '#888', fontSize: '1.2rem', maxWidth: '600px' }}>
          Premium 360° Brand Growth & Digital Agency. We scale your brand with absolute precision.
        </p>
      </div>
    </div>
  );
}

export default App;
