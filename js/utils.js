import {images, events, classDom} from './constants.js';

export function clearGrid(items) {
  items.forEach((item, index) => {
    item.innerHTML = '';
  })
}

export function clearIntervals(moleInterval, gameInterval) {
  clearInterval(moleInterval);
  clearInterval(gameInterval);
}

export function updateTimeLabel(timeValue) {
  document.querySelector('.time').textContent = timeValue;
}

export function updatePointsLabel(pointsValue) { 
  document.querySelector('.points').textContent = pointsValue;
}

export function randomMole() {
  const randomPosition = Math.floor(Math.random() * 8) + 0;
  const mole = document.createElement('img');
  mole.classList.add(classDom.ALIVE);
  mole.src = images.ALIVE;

  mole.addEventListener(events.CLICK, (e)=> {
    e.currentTarget.src = images.DEAD;
  });

  document.getElementById(randomPosition).appendChild(mole);
}