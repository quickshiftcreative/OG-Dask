const Navbar = () => {
  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      padding: '20px 40px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      background: 'rgba(10, 10, 10, 0.7)',
      backdropFilter: 'blur(10px)',
      zIndex: 100,
      borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
      boxSizing: 'border-box'
    }}>
      {/* Logo */}
      <div style={{ fontSize: '1.8rem', fontWeight: 'bold', color: '#ffffff', letterSpacing: '1px' }}>
        OG <span style={{ color: '#00f0ff' }}>Desk.</span>
      </div>

      {/* Menu Links */}
      <div style={{ display: 'flex', gap: '30px', fontWeight: '500' }}>
        <a href="#home" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '1rem' }}>Home</a>
        <a href="#services" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '1rem' }}>Services</a>
        <a href="#about" style={{ color: '#ffffff', textDecoration: 'none', fontSize: '1rem' }}>About</a>
        <a href="#contact" style={{ color: '#00f0ff', textDecoration: 'none', fontSize: '1rem' }}>Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
