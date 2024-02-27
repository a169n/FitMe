import React from "react";
import "./Footer.css";
import { useTranslation } from "react-i18next";
import logoWhite from "../../assets/logoWhite.svg";
import facebook from "../../assets/facebook.svg";
import instagram from "../../assets/instagram.svg";
import xTwitter from "../../assets/twitter.svg";

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-logo">
          <img src={logoWhite} alt="FitMe Logo" />
          <p>FitMe</p>
        </div>
        <div className="footer-mid">
          <div className="footer-links">
            <a href="#">{t("aboutUs")}</a>
            <a href="#">{t("delivery")}</a>
            <a href="#">{t("helpAndSupport")}</a>
            <a href="#">{t("termsAndConditions")}</a>
          </div>
          <div className="footer-social">
            <a href="#">
              <img src={facebook} alt="Facebook Icon" />
            </a>
            <a href="#">
              <img src={instagram} alt="Instagram Icon" />
            </a>
            <a href="#">
              <img src={xTwitter} alt="Twitter Icon" />
            </a>
          </div>
        </div>
        <div className="footer-contact">
          <p>
            {t("contact")}{" "}
            <span className="contact-number">+7 706 426 79 71</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
