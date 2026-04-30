import React from "react";

const Footer = () => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-brand">
          <h2>
            Kaffman's&nbsp;<span>Car Store</span>
          </h2>
          <p>
            Your premium destination for luxury and performance vehicles. Find
            your dream drive today.
          </p>
        </div>

        <div className="footer-links">
          <div className="link-group">
            <h4>Quick Links</h4>
            <ul>
              <li>
                <a href="#inventory">Inventory</a>
              </li>
              <li>
                <a href="#add-car">Sell a Car</a>
              </li>
              <li>
                <a href="#about">Our Story</a>
              </li>
            </ul>
          </div>

          <div className="link-group">
            <h4>Contact Us</h4>
            <address>
              1285 Avenue of the Americas
              <br />
              New York, NY 10019
              <br />
              United States
            </address>
            <p className="phone">+1 (212) 555-0198</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} AutoVault. All rights reserved.</p>
        <div className="social-icons">
          <span className="icon">𝕏</span>
          <span className="icon">📸</span>
          <span className="icon">📺</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
