'use strict';

// This app requires a server to handle import statements
// and CORS issues
import * as utils from './utils.js';


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Element Selection                                    */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
const displayTime = utils.select('h1');
const hourInput = utils.select('.hour-input');
const minuteInput = utils.select('.minute-input');

function getCurrentTime() {
  const now = new Date();
  const currentHour = formattedTime(now.getHours()); 
  const currentMinute = formattedTime(now.getMinutes())
  return `${currentHour}:${currentMinute}`;
}

setInterval(() => {
  displayTime.innerHTML = getCurrentTime();
}, 1000);

function formattedTime(time) {
  return String(time).padStart(2, '0'); // Adds 0 to one digit num
}

let userHourInput = formattedTime(hourInput.value);
let userMinuteInput = formattedTime(minuteInput.value);






