import React, { useState, useEffect } from 'react';
import logo from './logo.png';
import AboutPage from './AboutPage';
import './App.css'; 

const Sidebar = ({ activeMenuItem, onMenuItemClick }) => {
  const menuItems = ['Dashboard', 'Products', 'Purchases', 'About', 'Contact', 'LogOut'];
  const [isOpen, setIsOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 768); 
    };

    handleResize(); 
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMenuItemClick = (item) => {
    console.log('Clicked menu item:', item);
    onMenuItemClick(item.toLowerCase());
    setIsOpen(false);
  };

  const renderPage = () => {
    switch (activeMenuItem) {
      case 'about':
        return <AboutPage />;
      default:
        return null;
    }
  };

  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="logo-container">
        <img src={logo} alt="Dashboard Logo" className="logo" />
      </div>
      {isMobileView && (
        <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
          <i className={`fas fa-bars`} />
        </div>
      )}
      <ul className={`menu ${isOpen ? 'open' : ''}`}>
        {menuItems.map((item) => (
          <li key={item} className={activeMenuItem === item.toLowerCase() ? 'active' : ''} onClick={() => handleMenuItemClick(item)}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
