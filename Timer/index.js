document.addEventListener("DOMContentLoaded", () => {
  const timerContainer = document.getElementById("timer");
  const actionButtons = document.getElementById("actions");
  let isTimerRunning = false;
  let timeInSeconds = 1 * 60;
  let timer;

  function displayTime() {
    let seconds = timeInSeconds % 60;
    let minutes = Math.floor(timeInSeconds / 60);
    timerContainer.innerText = `${minutes}:${
      seconds < 10 ? "0" + seconds : seconds
    }`;
  }

  function startTimer() {
    if (isTimerRunning) return;
    isTimerRunning = true;
    timer = setInterval(() => {
      if (!isTimerRunning || timeInSeconds === 0) {
        clearInterval(timer);
        return;
      }
      timeInSeconds--;
      displayTime();
    }, 1000);
  }

  function pauseTimer() {
    if (timer) clearInterval(timer);
  }

  function resetTimer() {
    clearInterval(timer);
    timeInSeconds = 1 * 60;
    displayTime();
  }

  actionButtons.addEventListener("click", (e) => {
    if (e.target.id === "startBtn") {
      startTimer();
    } else if (e.target.id === "pauseBtn") {
      isTimerRunning = false;
      pauseTimer();
    } else if (e.target.id === "resetBtn") {
      isTimerRunning = false;
      resetTimer();
    }
  });

  displayTime();
});
