// function to remove the timer

function removeTimer(timerState) {}

// function to pause the timer
function pauseTimer(icon, timerState, updateTime) {}

// function to play the timer
function playTimer(icon, timerState, updateTime) {}

// function to reset the timer
function resetTimer(timerState, updateTime) {}

export function handleButtonClicks(event, timerState, updateTime) {
  const currentTime = new Date().getTime();

  const icon = event.target.closest("ion-icon");

  const currentName = icon.getAttribute("name");

  switch (currentName) {
    case "trash-outline":
      clearInterval(timerState.timeInterval);
      timerState.ispause = true;
      timerState.counterWrapper.remove();
      break;

    case "pause-outline":
      clearInterval(timerState.timeInterval);
      timerState.ispause = true;
      timerState.remainingTime = Math.max(
        0,
        Math.round(timerState.endTime - currentTime)
      );
      icon.name = "play-outline";
      updateTime();
      break;

    case "play-outline":
      clearInterval(timerState.timeIntervalIn);
      timerState.ispause = false;
      timerState.endTime = currentTime + timerState.remainingTime;
      timerState.timeInterval = setInterval(updateTime, 1000);
      icon.name = "pause-outline";
      updateTime();
      break;

    case "refresh-outline":
      clearInterval(timerState.timeInterval);
      timerState.ispause = false;
      timerState.currentTime = new Date().getTime();
      timerState.endTime = timerState.currentTime + timerState.initialTime;
      updateTime();
      timerState.timeInterval = setInterval(updateTime, 1000);
      break;
      
    default:
      console.log("error");
      break;
  }
}
