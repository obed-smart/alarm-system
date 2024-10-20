const currentTime = new Date().getTime();

// function to delete the timer from the Dom

function deleteTimer(timerState) {
  clearInterval(timerState.timeInterval);
  timerState.ispause = true;
  timerState.counterWrapper.remove();
}

//function to stop the timer if it is playing

function pauseTimer(icon, timerState, updateTime) {
  clearInterval(timerState.timeInterval);
  timerState.ispause = true;
  timerState.remainingTime = Math.max(
    0,
    Math.round(timerState.endTime - currentTime)
  );
  icon.name = "play-outline";

  updateTime();
}

//function to start  the timer if it is paused

function playTimer(icon, timerState, updateTime) {
  clearInterval(timerState.timeIntervalIn);
  timerState.ispause = false;
  timerState.endTime = currentTime + timerState.remainingTime;
  timerState.timeInterval = setInterval(updateTime, 1000);
  icon.name = "pause-outline";

  updateTime();
}

//function to reset the timer to its initial state at the beginning

function resetTimer(timerState, updateTime) {
  clearInterval(timerState.timeInterval);
  timerState.ispause = false;
  timerState.currentTime = new Date().getTime();
  timerState.endTime = timerState.currentTime + timerState.initialTime;
  updateTime();
  timerState.timeInterval = setInterval(updateTime, 1000);
  changePlayPauseBtn();
  updateTime();
}

// function to get the button state when clicked

function getPlayPauseBtnState() {
  const playPauseBtn = document.getElementById("pause-outline"),
    currentButtonState = playPauseBtn.name;

  return { playPauseBtn, currentButtonState };
}

//function to change the button state from play to pause icon 
function changePlayPauseBtn() {
  const { playPauseBtn, currentButtonState } = getPlayPauseBtnState();

  if (currentButtonState === "play-outline") {
    playPauseBtn.setAttribute("name", "pause-outline");
  }
}

//function to change the button state from pause to play icon 

 export function changePausePlayBtn() {
  const { playPauseBtn, currentButtonState } = getPlayPauseBtnState();

  if (currentButtonState === "pause-outline") {
    playPauseBtn.setAttribute("name", "play-outline");
  }
}

export function handleButtonClicks(event, timerState, updateTime) {
  const icon = event.target.closest("ion-icon"),
    currentName = icon.getAttribute("name");

  switch (currentName) {
    case "trash-outline":
      deleteTimer(timerState);
      break;

    case "pause-outline":
      pauseTimer(icon, timerState, updateTime);
      break;

    case "play-outline":
      playTimer(icon, timerState, updateTime);
      break;

    case "refresh-outline":
      resetTimer(timerState, updateTime);
      break;

    default:
      console.log("error");
      break;
  }
}
