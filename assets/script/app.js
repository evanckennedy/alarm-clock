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
const setAlarmButton = utils.select('.set-alarm-button');
const alarmDisplay = utils.select('.alarm-display');

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Alarm                                                */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
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

function getUserTime() {
  const userHourInput = formattedTime(hourInput.value);
  const userMinuteInput = formattedTime(minuteInput.value);
  alarmDisplay.innerHTML = `${userHourInput}:${userMinuteInput}`;
}

utils.listen('click', setAlarmButton, getUserTime);

function enforceNumericInput(event) {
  event.target.value = event.target.value.replace(/[^0-9]/g, '');
}
utils.listen('input', hourInput, enforceNumericInput);
utils.listen('input', minuteInput, enforceNumericInput);






