'use strict';

// Selenting elements
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const totalScore0Element = document.querySelector('#score--0');
const totalScore1Element = document.getElementById('score--1');
const diceImg = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
let player0CurrentScore = document.querySelector('#current--0');
let player1CurrentScore = document.getElementById('current--1');

//MODAL BUTTON
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnName = document.querySelector('.btn--name');
const btnCloseModal = document.querySelector('.close-modal');
const btnChange = document.querySelector('.change--name');
let name0 = document.getElementById('name--0');
let name1 = document.getElementById('name--1');

const closeModal = () => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const changeNames = () => {
  name0.textContent = document.querySelector('.new--name0').value;
  name1.textContent = document.querySelector('.new--name1').value;
  closeModal();
};

//Starting values

let scores, currentScore, activePlayer, playing;

const init = () => {
  totalScore0Element.textContent = 0;
  totalScore1Element.textContent = 0;
  diceImg.classList.add('hidden');
  player0CurrentScore.textContent = 0;
  player1CurrentScore.textContent = 0;

  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--active');
  document.querySelector(`.player--0`).classList.add('player--active');

  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
};
init();

const switchPlayer = () => {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};
//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.generting a random dice roll
    // 2.display dice
    // 3check for rolled 1; true, swith to nect player
    let currentDiceRoll = Math.trunc(Math.random() * 6) + 1;
    diceImg.classList.remove('hidden');
    console.log(currentDiceRoll);
    diceImg.src = `dice-${currentDiceRoll}.png`;
    if (currentDiceRoll !== 1) {
      currentScore += currentDiceRoll;
      //DYNMICALLY set the score to the active player
      // INSTEAD OF player0CurrentScore.textContent = currentScore;
      document.querySelector(
        `#current--${activePlayer}`
      ).textContent = currentScore;
      console.log(
        document.querySelector(`#current--${activePlayer}`).textContent
      );
      //CHANGE LATER
    } else {
      //4. switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to the active pla yers score
    //2. check is player's score is >=100
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 20) {
      playing = false;
      diceImg.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  init();
  name0.textContent = 'Player 1';
  name1.textContent = 'Player 2';
});

btnName.addEventListener('click', function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
});

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

btnChange.addEventListener('click', changeNames);

document.addEventListener('keydown', function (event) {
  console.log(event);
  if (event.key === 'Enter') {
    changeNames();
  }
});
