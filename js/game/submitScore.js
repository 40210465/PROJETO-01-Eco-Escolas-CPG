export function submitScore(difficulty, name, score) {
  localStorage.playerName = name;

  const scores = localStorage.scores
    ? JSON.parse(localStorage.scores).filter(
        (score) => score.difficulty === difficulty
      )
    : [];

  if (scores.length === 0) {
    localStorage.scores = JSON.stringify([{ name, difficulty, score }]);
    return "Added new score";
  }

  // check if there's already an user with the same name
  if (scores.some((score) => score.name === name)) {
    const userScore = scores.find((score) => score.name === name);
    if (userScore.score < score) {
      userScore.score = score;
      localStorage.scores = JSON.stringify(scores);
      return "Score updated";
    }
    return "There's already a higher score for this user";
  }

  scores.push({ name, difficulty, score });
  localStorage.scores = JSON.stringify(scores);
  return "Added new score";
}
