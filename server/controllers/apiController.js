const request = require("request");
const apiKey = process.env.NINJAS_API_KEY;
require("dotenv").config();

const getHealthQuotes = (req, res) => {
  const category = "fitness";

  request.get(
    {
      url: `https://api.api-ninjas.com/v1/quotes?category=${category}`,
      headers: {
        "X-Api-Key": apiKey,
      },
    },
    (error, response, body) => {
      if (error) {
        console.error("Request failed:", error);
        return res.status(500).json({ error: "Request failed" });
      } else if (response.statusCode !== 200) {
        console.error("Error:", response.statusCode, body);
        return res
          .status(response.statusCode)
          .json({ error: `Error: ${response.statusCode}` });
      } else {
        const quotes = JSON.parse(body);
        return res.status(200).json(quotes);
      }
    }
  );
};

module.exports = {
  getHealthQuotes,
};
