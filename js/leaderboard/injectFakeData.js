//? Script used to inject fake data into the leaderBoard

const scores = [
  {
    name: "Pior Jogador do Mundo",
    difficulty: "easy",
    score: 0,
  },
  {
    name: "Segundo Pior Jogador do Mundo",
    difficulty: "easy",
    score: 1,
  },
  {
    name: "Terceiro Pior Jogador do Mundo",
    difficulty: "easy",
    score: 2,
  },
  {
    name: "Noobzinho da noite",
    difficulty: "normal",
    score: 5,
  },
  {
    name: "Noobzinho da manhã",
    difficulty: "normal",
    score: 6,
  },
  {
    name: "Jogador Mediano",
    difficulty: "normal",
    score: 9,
  },
  {
    name: "Aquele que não é tão ruim",
    difficulty: "normal",
    score: 20,
  },
  {
    name: "Jogador Bom",
    difficulty: "normal",
    score: 50,
  },
  {
    name: "O mestre do Tkinter",
    difficulty: "impossible",
    score: 150,
  },
  {
    name: "Jogador de Elite",
    difficulty: "normal",
    score: 55,
  },
  {
    name: "Um dos melhores",
    difficulty: "normal",
    score: 67,
  },
  {
    name: "Jogador da reciclagem",
    difficulty: "easy",
    score: 49,
  },
  {
    name: "AMOR E PAZ",
    difficulty: "easy",
    score: 23,
  },
  {
    name: "Olá, Mundo!",
    difficulty: "easy",
    score: 17,
  },
  {
    name: "Jogador da Lua",
    difficulty: "normal",
    score: 35,
  },
  {
    name: "Jogador do Sol",
    difficulty: "normal",
    score: 34,
  },
  {
    name: "Jogador da Terra",
    difficulty: "normal",
    score: 33,
  },
  {
    name: "Jogador do Universo",
    difficulty: "normal",
    score: 44,
  },

  {
    name: "Benfiquista",
    difficulty: "easy",
    score: 18,
  },
  {
    name: "Portista",
    difficulty: "easy",
    score: 19,
  },
  {
    name: "Sportinguista",
    difficulty: "easy",
    score: 17,
  },
  {
    name: "Não sou batoteiro :)",
    difficulty: "impossible",
    score: 9999999999999,
  },
];

if (!localStorage.scores) localStorage.scores = JSON.stringify(scores);
