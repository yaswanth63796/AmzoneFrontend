import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__backToTop">
        <a href="#top">Back to top</a>
      </div>
      
      <div className="footer__links">
        <div className="footer__column">
          <h3>Get to Know Us</h3>
          <a href="#">Careers</a>
          <a href="#">Blog</a>
          <a href="#">About Amazon</a>
          <a href="#">Investor Relations</a>
        </div>
        
        <div className="footer__column">
          <h3>Make Money with Us</h3>
          <a href="#">Sell products on Amazon</a>
          <a href="#">Sell on Amazon Business</a>
          <a href="#">Sell apps on Amazon</a>
        </div>
        
        <div className="footer__column">
          <h3>Amazon Payment Products</h3>
          <a href="#">Amazon Business Card</a>
          <a href="#">Shop with Points</a>
          <a href="#">Reload Your Balance</a>
        </div>
        
        <div className="footer__column">
          <h3>Let Us Help You</h3>
          <a href="#">Amazon and COVID-19</a>
          <a href="#">Your Account</a>
          <a href="#">Your Orders</a>
          <a href="#">Shipping Rates & Policies</a>
        </div>
      </div>
      
      <div className="footer__bottom">
        <div className="footer__logo">
          <span>amazon</span>
        </div>
        <div className="footer__copyright">
          <span>&copy; 1996-2024, Amazon.com, Inc. or its affiliates</span>
        </div>
      </div>
    </footer>
  )
}

export default Footer