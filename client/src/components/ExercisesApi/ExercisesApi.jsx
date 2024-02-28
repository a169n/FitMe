import { useState } from "react";
import { useGetExercisesByMuscleQuery } from "../../redux/services/exercisesApi";
import "./ExercisesApi.css";

function ExercisesApi() {
  const [muscle, setMuscle] = useState("");
  const { data, error, isLoading } = useGetExercisesByMuscleQuery(muscle);

  const handleChange = (e) => {
    setMuscle(e.target.value);
  };

  const sortByDifficulty = (exercises) => {
    return exercises.slice().sort((a, b) => {
      const difficultyOrder = {
        beginner: 1,
        intermediate: 2,
        advanced: 3,
      };
      return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
    });
  };

  const getTopThreeExercises = (exercises) => {
    const sortedExercises = sortByDifficulty(exercises);
    return sortedExercises.slice(0, 3);
  };
  return (
    <div className="api-page global-padding">
      <h1>Exercises API</h1>
      <form>
        <label htmlFor="muscle">Enter muscle:</label>
        <input
          type="text"
          id="muscle"
          value={muscle}
          onChange={handleChange}
          placeholder="e.g., biceps, triceps"
        />
      </form>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && (
        <div>
          <h2>Top 3 Exercises for {muscle}:</h2>
          <ul>
            {getTopThreeExercises(data).map((exercise, index) => (
              <li key={index} className="exercise-item">
                <h3>{exercise.name}</h3>
                <p>
                  <strong>Type:</strong> {exercise.type}
                </p>
                <p>
                  <strong>Equipment:</strong> {exercise.equipment}
                </p>
                <p>
                  <strong>Difficulty:</strong> {exercise.difficulty}
                </p>
                <p>
                  <strong>Instructions:</strong> {exercise.instructions}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default ExercisesApi;
