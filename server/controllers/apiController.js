const request = require("request");
const apiKey = process.env.NINJAS_API_KEY;
require("dotenv").config();

const getExercisesByMuscle = (req, res) => {
  const muscle = req.query.muscle;

  request.get(
    {
      url: `https://api.api-ninjas.com/v1/exercises?muscle=${muscle}`,
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
        const exercises = JSON.parse(body);
        return res.status(200).json(exercises);
      }
    }
  );
};

const getRecipesByQuery = (req, res) => {
  const query = req.query.query;

  request.get(
    {
      url: `https://api.api-ninjas.com/v1/recipe?query=${query}`,
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
        const recipes = JSON.parse(body);
        return res.status(200).json(recipes);
      }
    }
  );
};

module.exports = {
  getExercisesByMuscle,
  getRecipesByQuery,
};
