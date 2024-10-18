export  function handleButtonClicks(timerState, updateTime) {
    const buttons = timerState.buttonContainer.querySelectorAll(".actionBtn");
    for (const button of buttons) {
      button.addEventListener("click", (event) => {
        const clickButton = event.currentTarget;
        let clickicon = clickButton.querySelector("ion-icon");
        const currentTime = new Date().getTime();
  
        if (clickicon.name === "trash-outline") {
          clearInterval(timerState.timeInterval);
          timerState.ispause = true;
          timerState.counterWrapper.remove();
        } else if (clickicon.name == "pause-outline") {
          clearInterval(timerState.timeInterval);
          timerState.ispause = true;
          timerState.remainingTime = Math.max(0, Math.round(timerState.endTime - currentTime));
          clickicon.name = "play-outline";
          updateTime();
          return;
        } else if (clickicon.name == "play-outline") {
          clearInterval(timerState.timeIntervalIn)
          timerState.ispause = false;
          timerState.endTime = currentTime + timerState.remainingTime;
          timerState.timeInterval = setInterval(updateTime, 1000);
          clickicon.name = "pause-outline";
          updateTime();
          return;
        } else if (clickicon.name === "refresh-outline") {
          clearInterval(timerState.timeInterval)
          timerState.ispause = false;
          timerState.currentTime = new Date().getTime()
          timerState.endTime = timerState.currentTime + timerState.initialTime
          updateTime()
          timerState.timeInterval = setInterval(updateTime, 1000);
        }
      });
    }
  }