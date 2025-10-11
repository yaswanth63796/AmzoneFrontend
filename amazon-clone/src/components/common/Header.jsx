import { useState, useEffect } from 'react';
import { Menu, X, Search, ShoppingCart, User } from 'lucide-react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '#' },
    { name: 'Products', href: '#' },
    { name: 'About', href: '#' },
    { name: 'Contact', href: '#' },
  ];

  const themeClass = isScrolled ? 'scrolled' : 'transparent';

  return (
    <header className={`header ${themeClass}`}>
      <nav className="nav-container">
        <div className="nav">
          {/* Logo */}
          <div className="logo">
            <h1 className={`logo-text ${themeClass}`}>
              Brand
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div className="desktop-nav">
            <div className="nav-items">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className={`nav-link ${themeClass}`}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Right side icons */}
          <div className="icons-container">
            <button className={`icon-button ${themeClass}`}>
              <Search className={`icon ${themeClass}`} />
            </button>
            <button className={`icon-button ${themeClass}`}>
              <ShoppingCart className={`icon ${themeClass}`} />
            </button>
            <button className={`icon-button ${themeClass}`}>
              <User className={`icon ${themeClass}`} />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="mobile-icons">
            <button className={`icon-button ${themeClass}`}>
              <Search className={`icon ${themeClass}`} />
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`mobile-menu-button ${themeClass}`}
            >
              {isMenuOpen ? <X className="mobile-menu-icon" /> : <Menu className="mobile-menu-icon" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <div className={`mobile-nav-content ${themeClass}`}>
              <div className="mobile-nav-items">
                {navigation.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="mobile-nav-icons">
                  <button className="mobile-nav-icon-button">
                    <ShoppingCart className="mobile-nav-icon" />
                  </button>
                  <button className="mobile-nav-icon-button">
                    <User className="mobile-nav-icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;