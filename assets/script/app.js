'use strict';

// This app requires a server to handle import statements
// and CORS issues
import * as utils from './utils.js';


/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Selection                                            */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
const displayTime = utils.select('h1');
const hourInput = utils.select('.hour-input');
const minuteInput = utils.select('.minute-input');
const setAlarmButton = utils.select('.set-alarm-button');
const alarmDisplay = utils.select('.alarm-display');
const errorMessage = utils.select('.error-message')
const alarmSound = new Audio('./assets/media/alarm-sound.mp3');
alarmSound.loop = true;
alarmSound.playing = false;

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/* Display Current Time                                  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function formattedTime(time) {
  return String(time).padStart(2, '0'); // Adds 0 to one digit num
}

function getCurrentTime() {
  const now = new Date();
  const currentHour = formattedTime(now.getHours()); 
  const currentMinute = formattedTime(now.getMinutes())
  return `${currentHour}:${currentMinute}`;
}

setInterval(() => {
  displayTime.innerHTML = getCurrentTime();
}, 1000);

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Alarm Validation                                     */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function enforceNumericInput(event) {
  event.target.value = event.target.value.replace(/[^0-9]/g, '');
}
utils.listen('input', hourInput, enforceNumericInput);
utils.listen('input', minuteInput, enforceNumericInput);

function validateAlarmInput() {
  const hourInputValue = parseInt(hourInput.value);
  const minuteInputValue = parseInt(minuteInput.value);

  if (!(hourInputValue >= 0 && hourInputValue <= 23)) {
    errorMessage.innerHTML = 'Oops! Hours should be a number between 0 and 23.';
    return false;
  } else if (!(minuteInputValue >=0 && minuteInputValue <= 59)) {
    errorMessage.innerHTML = 'Oops! Minutes should be a number between 0 and 59.';
    return false;
  }

  return true;
}

/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
/*  Alarm Functionality                                  */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - */
function playAlarm() {
  alarmSound.play();
  alarmSound.playing = true;
}

let alarmTime = '';

function getUserTime() {
  if (validateAlarmInput()) {
    errorMessage.innerHTML = '';

    const userHourInput = formattedTime(parseInt(hourInput.value));
    const userMinuteInput = formattedTime(parseInt(minuteInput.value));
    alarmTime = `${userHourInput}:${userMinuteInput}`;
    alarmDisplay.innerHTML = alarmTime;
  }
}

utils.listen('click', setAlarmButton, getUserTime);
utils.listen('keypress', document, function(event) {
  if (event.key === 'Enter') {
    getUserTime();
  }
});

setInterval(() => {
  const currentTime = getCurrentTime();
  if (currentTime === alarmTime) {
    playAlarm();
  } else if (alarmSound.playing) {
    stopAlarm();
  }
}, 1000);

function stopAlarm() {
  alarmSound.pause();
  alarmSound.currentTime = 0;
  alarmSound.playing = false;
}