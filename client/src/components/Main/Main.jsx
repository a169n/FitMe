import React from "react";
import "./Main.css";
import banana from "../../assets/banana.svg";
import apple from "../../assets/apple.svg";
import main_pic1 from "../../assets/main-pic.jpeg";
import main_pic2 from "../../assets/main-pic2.jpeg";
import main_pic3 from "../../assets/main-pic3.jpeg";
import main_pictures from "../../assets/main-images.png";
import union from "../../assets/union.svg";
import { useTranslation } from "react-i18next";

export default function Main() {
  const { t } = useTranslation();

  return (
    <main className="main global-padding">
      <img id="union" src={union} alt="union-icon" />
      <div className="main-container">
        <div className="main-header">
          <div>
            <h2>
              {t("mainHeader1")} <span>{t("quality")}</span> <br />
              {t("mainHeader2")}
              <div className="banana-layer">
                <img src={banana} alt="banana-icon" />
              </div>
              <span>{t("healthy")}</span>
              <br />
              <div className="apple-layer">
                <img src={apple} alt="apple-icon" />
              </div>
              <span>& {t("dailyLife")}</span>
            </h2>
          </div>
          <div>
            <p className="main-p">{t("mainParagraph")}</p>
          </div>
          <div className="main-input-container">
            <input
              className="main-input"
              type="text"
              placeholder={t("mainPlaceholder")}
            />
            <button className="get-started-button">{t("getStarted")}</button>
          </div>
        </div>

        <div className="main-slider">
          <img id="main_pic1" src={main_pic1} alt="main-pic" />
        </div>
      </div>
    </main>
  );
}
