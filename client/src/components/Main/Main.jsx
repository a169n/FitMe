import React from "react";
import "./Main.css";
import banana from "../../assets/banana.svg";
import apple from "../../assets/apple.svg";
import main_pic1 from "../../assets/main-pic.jpeg";
import union from "../../assets/union.svg";
import { useGetHealthQuotesQuery } from "../../redux/services/healthQuotesApi";

export default function Main() {
  const { data: healthQuotes, error, isLoading } = useGetHealthQuotesQuery();

  const healthQuote =
    healthQuotes && healthQuotes.length > 0 ? healthQuotes[0] : null;

  return (
    <main className="main global-padding">
      <img id="union" src={union} alt="union-icon" />
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
                <img src={apple} alt="apple-icon" />
              </div>
              <span>& Daily life</span>
            </h2>
          </div>
          <div>
            {isLoading && <p>Loading...</p>}
            {error && <p>Error fetching quote: {error.message}</p>}
            {healthQuote && (
              <>
                <p className="main-quote">{healthQuote.quote}</p>
                <p className="quote-author">{healthQuote.author}</p>
              </>
            )}
          </div>
        </div>

        <div className="main-slider">
          <img id="main_pic1" src={main_pic1} alt="main-pic" />
        </div>
      </div>
    </main>
  );
}
