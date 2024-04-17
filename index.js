const wordDisplay = document.querySelector(".word-display");
const hangmanImg = document.querySelector(".hangman-box img");
const raidynasDiv = document.querySelector(".raidynas");
const neteisingiSpejimai = document.querySelector(".neteisingiSpejimai b");
const gameModal = document.querySelector(".modal");
const playAgainBtn = document.querySelector(".playAgain");

const wordlist = [
  { word: "laime", Hint: "Pilnatvės jausmas arba..." },
  { word: "meile", Hint: "Šiltas jausmas tarp dviejų žmonių" },
  { word: "kioskas", Hint: "90-tais jame galėjau nusipirkti visko" },
  { word: "arklys", Hint: "Aria kaip ..." },
  { word: "makaka", Hint: "Bezdžionių rūšis" },
  { word: "aliaska", Hint: "Kanados šiauriausia dalis" },
  { word: "kava", Hint: "Ji rytais atmerkia akis" },
  { word: "abrikosas", Hint: "Vaisius" },
];
let currentWord, teisingosRaides, likoSpejimu;
const maxSpejimuSkaic = 7;

const resetGame = () => {
  teisingosRaides = [];
  likoSpejimu = 0;
  hangmanImg.src = `images/hangman-${likoSpejimu}.svg`;
  neteisingiSpejimai.innerText = `${likoSpejimu} / ${maxSpejimuSkaic}`;
  raidynasDiv
    .querySelectorAll("button")
    .forEach((btn) => (btn.disabled = false));
  wordDisplay.innerHTML = currentWord
    .split("")
    .map(() => `<li class="raide"></li>`)
    .join("");
  gameModal.classList.remove("show");
};

const randomWord = () => {
  const { word, Hint } = wordlist[Math.floor(Math.random() * wordlist.length)];
  console.log(word);
  currentWord = word;
  document.querySelector(".hint b").innerText = Hint;
  resetGame();
};

const gameOver = (isVictory) => {
  setTimeout(() => {
    const modalText = isVictory
      ? `woop woop! Atsakymas Teisingas!`
      : `Game Over!`;
    gameModal.querySelector("h4").innerText = `${
      isVictory ? `Sveikiname!` : `NEsveikiname!`
    }`;
    gameModal.querySelector(
      "p"
    ).innerHTML = `${modalText}  <b>${currentWord}</b>`;
    gameModal.classList.add("show");
  }, 300);
};

const startGame = (button, clickedLetter) => {
  if (currentWord.includes(clickedLetter)) {
    [...currentWord].forEach((letter, index) => {
      if (letter === clickedLetter) {
        teisingosRaides.push(letter);
        wordDisplay.querySelectorAll("li")[index].innerText = letter;
        wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
      }
    });
  } else {
    likoSpejimu++;
    hangmanImg.src = `images/hangman-${likoSpejimu}.svg`;
  }
  button.disabled = true;
  neteisingiSpejimai.innerText = `${likoSpejimu} / ${maxSpejimuSkaic}`;
  console.log(neteisingiSpejimai, maxSpejimuSkaic);
  if (likoSpejimu == maxSpejimuSkaic) return gameOver(false);
  if (teisingosRaides.length === currentWord.length) return gameOver(true);
};

for (let i = 97; i < 122; i++) {
  const button = document.createElement("button");
  button.innerText = String.fromCharCode(i);
  raidynasDiv.appendChild(button);
  button.addEventListener("click", (e) =>
    startGame(e.target, String.fromCharCode(i))
  );
}
randomWord();
playAgainBtn.addEventListener("click", randomWord);
