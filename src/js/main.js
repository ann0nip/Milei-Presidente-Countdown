// Document variables.
const d = document.querySelector('.days');
const h = document.querySelector('.hours');
const m = document.querySelector('.minutes');
const s = document.querySelector('.seconds');
const info = document.querySelector('.info');
const infoCont = document.querySelector('.information-container');
const title = document.querySelector('.title');
const countdownContainer = document.querySelector('.countdown-container');

// Variables.
let countdown;
let isNewGovernment = false;

// Events.
window.addEventListener('click', (e) => {
    shootFirework(e.clientX, e.clientY);
});
document.addEventListener('visibilitychange', handleVisibilityChange);

// Functions.

// Returns the corresponding day of the wekk given a number from 0 to 6.
function getDayString(day) {
    if (day > 6 || day < 0) return;

    const weekDays = {
        0: 'Sunday',
        1: 'Monday',
        2: 'Tuesday',
        3: 'Wednesday',
        4: 'Thursday',
        5: 'Friday',
        6: 'Saturday',
    };

    return weekDays[day];
}

// Returns the corresponding month to a 0 indexed number.
function getMonthString(month) {
    if (month > 11 || month < 0) return;

    const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December',
    };

    return months[month];
}

// Animates the seconds counter (Called when 10 seconds or less are remaining in the countdown).
function animateSeconds() {
    s.style = `transform: scale(1.3)`;

    setTimeout(() => {
        s.style = `transform: scale(1)`;
    }, 400);
}

// FUnction called every second to calculate the time remaining till the end timestamp.
function calculateTimeRemaining(startTime, endTime) {
    const timeRemaining = (endTime - startTime) / 1000;

    if (Math.floor(timeRemaining) <= 10) {
        animateSeconds();
    }

    if (Math.floor(timeRemaining) <= 0) {
        setNewGovernmentText();
        fireworksBurst(20);
        isNewGovernment = true;
        setTimeout(startLoop, 1000); // Happy New Year.
        clearInterval(countdown);
    }

    d.textContent = Math.floor(timeRemaining / 86400);
    h.textContent = Math.floor((timeRemaining / 3600) % 24);
    m.textContent = Math.floor((timeRemaining / 60) % 60);
    s.textContent = Math.floor(timeRemaining % 60);
}

function handleVisibilityChange() {
    if (document.visibilityState == 'visible' && isNewGovernment) {
        startLoop();
    } else {
        endLoop();
    }
}

function setNewGovernmentText() {
    infoCont.style.background = 'none';

    info.innerHTML = '';
    countdownContainer.innerHTML =
        '<div class="new-year"><p>Chau kukas nunca vuelvan!</p></div>';
    countdownContainer.style.background = 'none';
    setInterval(() => {
        document.querySelector('.new-year').style = 'transform: scale(0.5);';
    }, 500);
    setInterval(() => {
        document.querySelector('.new-year').style = 'transform: scale(1);';
    }, 1000);
}

// Main.
(function () {
    const currentTime = new Date();
    const newGovernment = new Date(currentTime.getFullYear(), 11, 10);

    const timeZone = Intl.DateTimeFormat()
        .resolvedOptions()
        .timeZone.split('/')[1]
        .replace('_', ' ');
    info.textContent = `Time until ${getDayString(
        newGovernment.getDay()
    )}, ${getMonthString(
        newGovernment.getMonth()
    )} ${newGovernment.getDate()}, ${newGovernment.getFullYear()} (${timeZone} Time)`;

    if (currentTime.getMonth() == 0 && currentTime.getDate() == 1) {
        isNewGovernment = true;
        setInterval(() => {
            setNewGovernmentText();
        }, 0);
        startLoop();
        return;
    }

    calculateTimeRemaining(currentTime, newGovernment);
    countdown = setInterval(() => {
        const start = new Date().getTime();
        calculateTimeRemaining(start, newGovernment);
    }, 1000);
})();
