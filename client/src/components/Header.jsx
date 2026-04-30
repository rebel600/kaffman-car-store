import { useState } from "react";
import heroImage from "../assests/hero.png";

const Header = ({ onAddClick, onOpenAuthModal, fetchAllCars }) => {
  const token = localStorage.getItem("token");

  const logout = () => {
    localStorage.removeItem("token");
    fetchAllCars();
  };

  return (
    <header className="site-header">
      <nav className="main-nav">
        <div className="logo">
          Kuffman's <span>Drive</span>
        </div>
        <div className="nav-actions">
          {token && (
            <button type="button" className="add-btn" onClick={logout}>
              Logout
            </button>
          )}
          {!token ? (
            <button type="button" className="add-btn" onClick={onOpenAuthModal}>
              Login/Register
            </button>
          ) : (
            <button type="button" className="add-btn" onClick={onAddClick}>
              + Sell Your Car
            </button>
          )}
        </div>
      </nav>
      <div
        className="hero-banner"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay">
          <div className="hero-content">
            <h1>Kuffman's Car Store</h1>
            <p>Explore the finest collection of premium vehicles</p>
            <div className="header-line"></div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
