import "./Footer.css";
import logoWhite from "../../assets/logoWhite.svg";
import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instagram.svg";
import xTwitter from "../../assets/twitter.svg"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logoWhite} />
          <p>FitMe</p>
        </div>
        <div className="footer-mid">
          <div className="footer-links">
            <a href="#">About Us</a>
            <a href="#">Delivery</a>
            <a href="#">Help & Support</a>
            <a href="#">T&C</a>
          </div>
          <div className="footer-social">
            <a href="#"><img src={facebook} alt="facebook-icon" /></a>
            <a href="#"><img src={instagram} alt="instagram-icon" /></a>
            <a href="#"><img src={xTwitter} alt="x-icon" /></a>
          </div>
        </div>
        <div className="footer-contact">
          <p>Contact <span className="contact-number">+7 706 426 79 71</span></p>
        </div>
      </div>
    </footer>
  );
}
