//? Script used to inject fake data into the leaderBoard

const scores = [
  {
    name: "Pior Jogador do Mundo",
    difficulty: "easy",
    score: 100,
  },
  {
    name: "Segundo Pior Jogador do Mundo",
    difficulty: "easy",
    score: 200,
  },
  {
    name: "Terceiro Pior Jogador do Mundo",
    difficulty: "easy",
    score: 300,
  },
  {
    name: "Noobzinho da noite",
    difficulty: "normal",
    score: 1700,
  },
  {
    name: "Noobzinho da manhã",
    difficulty: "normal",
    score: 1500,
  },
  {
    name: "Jogador Mediano",
    difficulty: "normal",
    score: 15110,
  },
  {
    name: "Aquele que não é tão ruim",
    difficulty: "normal",
    score: 22668,
  },
  {
    name: "Jogador Bom",
    difficulty: "normal",
    score: 11223,
  },
  {
    name: "O mestre do Tkinter",
    difficulty: "impossible",
    score: 21550,
  },
  {
    name: "Jogador de Elite",
    difficulty: "normal",
    score: 18553,
  },
  {
    name: "Um dos melhores",
    difficulty: "normal",
    score: 19562,
  },
  {
    name: "Jogador da reciclagem",
    difficulty: "easy",
    score: 25000,
  },
  {
    name: "AMOR E PAZ",
    difficulty: "easy",
    score: 17025,
  },
  {
    name: "Olá, Mundo!",
    difficulty: "easy",
    score: 4420,
  },
  {
    name: "Jogador da Lua",
    difficulty: "normal",
    score: 9555,
  },
  {
    name: "Jogador do Sol",
    difficulty: "normal",
    score: 9615,
  },
  {
    name: "Jogador da Terra",
    difficulty: "normal",
    score: 9502,
  },
  {
    name: "Jogador do Universo",
    difficulty: "normal",
    score: 10000,
  },

  {
    name: "Benfiquista",
    difficulty: "easy",
    score: 4000,
  },
  {
    name: "Portista",
    difficulty: "easy",
    score: 5000,
  },
  {
    name: "Sportinguista",
    difficulty: "easy",
    score: 2000,
  },
  {
    name: "Não sou batoteiro :)",
    difficulty: "impossible",
    score: 9999999999999,
  },
];

if (!localStorage.scores) localStorage.scores = JSON.stringify(scores);
