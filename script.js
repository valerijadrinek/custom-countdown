
// Input container const
const inputContainer = document.getElementById('input-container');
const countdownForm = document.getElementById('countdownForm');
const dateElement = document.getElementById('date-picker');

// Countdown container const
const countdownElement = document.getElementById('countdown');
const countdownElementTitle = document.getElementById('countdown-title');
const countdownBtn = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('span');

// Complete container const
const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

// Populating DOM countdown container
let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;

// Calculating countdown const for Math function
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;


// Set Date input min with Today's Date
const today = new Date().toISOString().split('T')[0];
dateElement.setAttribute('min', today);

// Populate Contdown and Complete UI
function updateDOM() {
  countdownActive = setInterval( () => {
    const now = new Date().getTime();
    const distance = countdownValue - now;
    console.log('distance ', distance);
    const days = Math.floor(distance / day);
    const hours = Math.floor((distance % days) / hour);
    const minutes = Math.floor((distance % hour) / minute);
    const seconds = Math.floor((distance % minute) / second);
    console.log(days, hours, minutes, seconds);

    // Hide Input
    inputContainer.hidden = true;

    // If countdown ended, show Complete container
    if(distance < 0) {
       countdownElement.hidden = true;
       clearInterval(countdownActive);
       completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate} !` ;
       completeEl.hidden = false;
    } else {
        // Show countdown in progress
        // Populate Countdown
    countdownElementTitle.textContent = `${countdownTitle}`;
    timeElements[0].textContent = `${days}`;
    timeElements[1].textContent = `${hours}`;
    timeElements[2].textContent = `${minutes}`;
    timeElements[3].textContent = `${seconds}`;
    // Hide Complete Container
    completeEl.hidden = true;
     // Show Countdown
     countdownElement.hidden = false;
    }  
  }, second);
}


// Take Values from Form Inputs
function updateCountdown(event) {
   event.preventDefault();
   countdownTitle = event.srcElement[0].value;
   countdownDate = event.srcElement[1].value;
   console.log(countdownDate, countdownTitle);
//    Check for valid date
if (countdownDate === '') {
    alert('Please select a date for the countdown.');
} else {
    //    Get number version of current Date, update DOM
   countdownValue = new Date(countdownDate).getTime();
   console.log('countdown value: ', countdownValue);
   updateDOM();
}
}



// Reset all values
function reset() {
    // Hide Countdowns, Show Inputs
    countdownElement.hidden = true;
    inputContainer.hidden = false;
    completeEl.hidden = true;
    // Stop the countdown
    clearInterval(countdownActive);
    // Reset Values
    countdownTitle = '';
    countdownDate = '';
   
}


// Event Listeners
countdownForm.addEventListener('submit', updateCountdown);
countdownBtn.addEventListener('click', reset);
completeBtn.addEventListener('click', reset);