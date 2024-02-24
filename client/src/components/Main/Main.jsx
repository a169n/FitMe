import "./Main.css";
import banana from "../../assets/banana.svg";
import apple from "../../assets/apple.svg";
import main_pic1 from "../../assets/main-pic.jpeg";
import main_pic2 from "../../assets/main-pic2.jpeg";
import main_pic3 from "../../assets/main-pic3.jpeg";
import main_pictures from "../../assets/main-images.png";
import union from "../../assets/union.svg";

export default function Main() {
  return (
    <main className="main global-padding">
      <img id="union" src={union} />
      <div className="main-container">
        <div className="main-header">
          <div>
            <h2>
              Premium <span>quality</span> <br />
              Food for your
              <div className="banana-layer">
                <img src={banana} alt="banana-icon" />
              </div>
              <span>healthy</span>
              <br />
              <div className="apple-layer">
                <img src={apple} alt="" />
              </div>
              <span>& Daily life</span>
            </h2>
          </div>
          <div>
            <p className="main-p">
              Our mission is to provide you with access to the freshest,
              highest-quality foods to support your health and vitality. Whether
              you're looking for nutrient-rich ingredients or delicious meals to
              fuel your daily life, we've got you covered!
            </p>
          </div>
          <div className="main-input-container">
            <input
              className="main-input"
              type="text"
              placeholder="Enter item or restaurant you are looking for"
            />
            <button className="get-started-button">Get Started</button>
          </div>
        </div>

        <div className="main-slider">
          <img id="main_pic1" src={main_pic1} />
        </div>
      </div>
    </main>
  );
}
