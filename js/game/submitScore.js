export function submitScore(difficulty, name, score) {
  localStorage.playerName = name;

  const scores = localStorage.scores
    ? JSON.parse(localStorage.scores)
    : [];

  if (scores.length === 0) {
    scores.push({ name, difficulty, score });
    localStorage.scores = JSON.stringify(scores);
    return "Added new score";
  }

  const filteredScores = scores.filter(
    (score) => score.difficulty === difficulty
  );

  // check if there's already an user with the same name
  if (filteredScores.some((score) => score.name === name)) {
    const userScore = filteredScores.find((score) => score.name === name);
    if (userScore.score < score) {
      userScore.score = score;

      scores[scores.indexOf(userScore)] = userScore;

      localStorage.scores = JSON.stringify(scores);

      return "Score updated";
    }
    return "There's already a higher score for this user";
  }

  console.log(difficulty, name, score);

  scores.push({ name, difficulty, score });
  localStorage.scores = JSON.stringify(scores);
  return "Added new score";
}
