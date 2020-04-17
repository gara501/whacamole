import {states, images, classDom, events} from './constants.js';
import {
  clearGrid, 
  clearIntervals, 
  updateTimeLabel, 
  updatePointsLabel,
  randomMole } from './utils.js';

const Game = () => {
  const container = document.querySelector('.grid');
  const items = container.querySelectorAll('div');
  const levelButtons = document.querySelectorAll('.level');
  const startButton = document.querySelector('#start');

  let timerLabel = document.querySelector('.time');
  let pointsLabel = document.querySelector('.points');
  let recordLabel = document.querySelector('.record');
  let currentRecord = localStorage.getItem('molepoints') || 0;
  let gameState = states.INIT;
  let points = 0;
  let speed = 1000;
  let totalTime = 10;
  let currentTime = null;
  let moleInterval = null;
  let gameInterval = null;
  
  function preload() {
    recordLabel.textContent = currentRecord;
    pointsLabel.textContent = 0;
    timerLabel.textContent = totalTime;
    currentTime = totalTime;
    points = 0;
    clearIntervals(moleInterval, gameInterval);
  }
  
  function init() {
    preload();

    // Start Game Event
    startButton.addEventListener(events.CLICK, () => {  
      startGame();
    });
    
    // level selection event
    levelButtons.forEach((item) => {
      item.addEventListener(events.CLICK, (e) => {
        if (gameState !== states.RUNNING) {
          speed = e.currentTarget.id;
        }
      })
    })

    initMole();
  }

  function initMole() {
    items.forEach((item, index) => {
      item.id = index;
      item.addEventListener(events.CLICK, (e) => {
        const mole = item.querySelector('img');
        const isMole = mole ? true : false;

        if (isMole && mole.classList.contains(classDom.ALIVE)) {
          if (states.RUNNING && currentTime > 0) {
            points++;
            mole.classList.remove(classDom.ALIVE);
            updatePointsLabel(points);
          }
        }

      })
    })
  }

  function timer() {
    gameInterval = setInterval(() => {
      currentTime -= 1;
      console.log(currentTime)
      if (currentTime <= 0) {
        gameOver();
      } else {     
        updateTimeLabel(currentTime);
      }
    }, 1000)
  }

  function gameOver() {
    gameState = states.GAMEOVER;
    updateTimeLabel(currentTime);

    if (points > currentRecord) {
      localStorage.setItem('molepoints', JSON.stringify(points));
      recordLabel.textContent = points;
    }
    
    clearGrid(items);
    clearIntervals(moleInterval, gameInterval);
  }

  function startGame() {
    
    if (gameState != states.RUNNING) {
      preload();
      gameState = states.RUNNING;
      timer();

      moleInterval = setInterval(()=> {
        clearGrid(items);
        randomMole();
      }, speed);
    }
  }

  return {
    init
  }
}

export default Game;
