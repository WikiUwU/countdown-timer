let countdown;
const displayTimer = document.querySelector("#display-timer");
const displayTimerEnd = document.querySelector("#display-timer-end");
const buttons = document.querySelectorAll(".timer-button");
const customTime = document.querySelector("#custom-time");

function timer(seconds) {
    // clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);

        // check if it should stop, so it doesn't go into negative values
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }

        // Display time
        displayTimeLeft(secondsLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;

    let displayTime = `${minutes.toString().padStart(2, "0")}:${remainderSeconds.toString().padStart(2, "0")}`
    displayTimer.textContent = displayTime;
    document.title = displayTime; 
    console.log({minutes, remainderSeconds});
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minutes = end.getMinutes();

    displayTimerEnd.textContent = `Timer Will End At ${hour}:${minutes.toString().padStart(2, "0")}`
}

buttons.forEach(button => button.addEventListener("click", () => {
    const seconds = parseInt(button.value);
    timer(seconds);
}));

document.customForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const mins = parseInt(customTime.value);
    timer(mins * 60);

    customTime.value = "";
});

