const Navbar = () => {
  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        OG <span>Desk.</span>
      </div>

      {/* Menu Links */}
      <div className="nav-links">
        <a href="#home">Home</a>
        <a href="#services">Services</a>
        <a href="#about">About</a>
        <a href="#contact" style={{ color: '#00f0ff' }}>Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
