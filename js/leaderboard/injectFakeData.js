//? Script used to inject fake data into the leaderBoard

const scores = [
  {
    name: "Pior Jogador do Mundo",
    score: 100,
  },
  {
    name: "Segundo Pior Jogador do Mundo",
    score: 200,
  },
  {
    name: "Terceiro Pior Jogador do Mundo",
    score: 300,
  },
  {
    name: "Noobzinho da noite",
    score: 1700,
  },
  {
    name: "Noobzinho da manhã",
    score: 1500,
  },
  {
    name: "Jogador Mediano",
    score: 15110,
  },
  {
    name: "Aquele que não é tão ruim",
    score: 22668,
  },
  {
    name: "Jogador Bom",
    score: 11223,
  },
  {
    name: "O mestre do Tkinter",
    score: 21550,
  },
  {
    name: "Jogador de Elite",
    score: 18553,
  },
  {
    name: "Um dos melhores",
    score: 19562,
  },
  {
    name: "Jogador da reciclagem",
    score: 25000,
  },
  {
    name: "AMOR E PAZ",
    score: 17025,
  },
  {
    name: "Olá, Mundo!",
    score: 4420,
  },
  {
    name: "Jogador da Lua",
    score: 9555,
  },
  {
    name: "Jogador do Sol",
    score: 9615,
  },
  {
    name: "Jogador da Terra",
    score: 9502,
  },
  {
    name: "Jogador do Universo",
    score: 10000,
  },

  {
    name: "Benfiquista",
    score: 4000,
  },
  {
    name: "Portista",
    score: 5000,
  },
  {
    name: "Sportinguista",
    score: 2000,
  },
  {
    name: "Não sou batoteiro :)",
    score: 9999999999999,
  },
];

if (!localStorage.scores) localStorage.scores = JSON.stringify(scores);
