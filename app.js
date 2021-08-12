let countdown;
let status = "stopped";
let time = 1500;
let resumeTime;

let cycles = 0;
let session = "work"

const displayTimer = document.querySelector("#display-timer");
const displayTimerEnd = document.querySelector("#display-timer-end");
const buttons = document.querySelectorAll(".timer-button");
const startStop = document.querySelector("#start-stop")

const clickSound = document.querySelector("#clickSound");
const bellSound = document.querySelector("#bellSound");



function timer(seconds) {
    // clear any existing timers
    clearInterval(countdown);

    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        resumeTime = secondsLeft;

        // check if it should stop, so it doesn't go into negative values
        if (secondsLeft < 0 && session === "work") {
            clearInterval(countdown);

            bellSound.play();
            status = "stopped";
            startStop.textContent = "Start";
            cycles++;

            if (cycles % 4 === 0) {
                time = 900;
                session = "longBreak";
                displayTimeLeft(time);
            }else if (session === "work") {
                time = 300;
                session = "shortBreak";
                displayTimeLeft(time);
            }else {
                time = 1500;
                session = "work";
            }

            return;
        }else if (secondsLeft < 0) {
            clearInterval(countdown);

            bellSound.play();
            status = "stopped";
            startStop.textContent = "Start";

            if (cycles % 4 === 0) {
                time = 900;
                session = "longBreak";
                displayTimeLeft(time);
            }else if (session === "work") {
                time = 300;
                session = "shortBreak";
                displayTimeLeft(time);
            }else {
                time = 1500;
                session = "work";
                displayTimeLeft(time);
            }

            return;
        }else {
            // do nothing
        }

         // stop the timer, if only StartStop is clicked and the timer shall resume where it left off. 
        // Set time to secondsLeft, so the timer can start to count, where it left off, if it was stopped with startStop
        if (status === "stopped") {
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
}



startStop.addEventListener("click", () => {

    if (status === "stopped") {
        timer(time);
        status = "started";
        isTimerButton = false;
        clickSound.play();
        startStop.textContent = "Stop";
    }else if (status === "started") {
        time = resumeTime;
        status = "stopped";
        clickSound.play();
        startStop.textContent = "Start";
    }

});

buttons.forEach(button => button.addEventListener("click", () => {
    status = "stopped";
    startStop.textContent = "Start"
    session = button.getAttribute("data-session");
    time = parseInt(button.value);
    displayTimeLeft(time);
}));
