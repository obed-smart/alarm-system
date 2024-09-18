const timeWrapper = document.getElementById("time-wrapper");
const mainBtn = document.getElementById("timer-btn");
const addAlarm = document.getElementById("add-alarm");
const timerContainer = document.getElementById("timer-container");

timeWrapper.classList.add("hide");

// add increament and decreament on the time span
const setTime = (() => {
  // format the time to stay within time range(hour, minus, second)
  function formatTime(timespan, value) {
    if (timespan.classList.contains("hour")) {
      value = value >= 24 ? 0 : value < 0 ? 23 : value;
      timespan.textContent = value;
    }

    if (
      timespan.classList.contains("minus") ||
      timespan.classList.contains("seconds")
    ) {
      value = value >= 60 ? 0 : value === -1 ? 59 : value;

      // timespan.textContent = ((value % 60) + 60) % 60;
      timespan.textContent = value;
    }
  }

  return {
    // increment
    increment: (timespan) => {
      let settime = parseInt(timespan.textContent);
      settime++;
      formatTime(timespan, settime);
    },
    // decrement
    decrement: (timespan) => {
      let settime = parseInt(timespan.textContent);
      settime--;
      formatTime(timespan, settime);
    },
  };
})();

function checkClick(event) {
  const button = event.target;
  if (!button) return;

  const timeContainer = button.closest(".container"),
    timeSpan = timeContainer.querySelector(".time");

  if (button.name === "chevron-up-outline") {
    setTime.increment(timeSpan);
  } else if (button.name === "chevron-down-outline") {
    setTime.decrement(timeSpan);
  }
}

function addClick() {
  const buttons = document.querySelectorAll(".icon-btn");

  for (let button of buttons) {
    button.addEventListener("click", checkClick);
  }
}

addClick();

// get the selected time and convert them to miniseconds
function getTimes() {
  const hours = parseInt(document.querySelector(".hour").textContent),
    minuts = parseInt(document.querySelector(".minus").textContent),
    seconds = parseInt(document.querySelector(".seconds").textContent);

  return hours * 60 * 60 * 1000 + minuts * 60 * 1000 + seconds * 1000;
}

/*
 * @function
 * @returns{endTime}
 * format te selected time and convert the future time to seconds
 * format the hour to end at 0 and return to minutes
 * format the minutes to end at 0 and return to second
 */
function formatGetTime(endTime) {
  const currentTime = new Date().getTime();

  const timeDifferent = Math.max(Math.round((endTime - currentTime) / 1000), 0); // calculate the time different from the current time
  console.log(timeDifferent);
  const formatHour = Math.floor(timeDifferent / 3600); // format hour
  const formatminutes = Math.floor((timeDifferent % 3600) / 60); // format minutes
  const formatSeconds = Math.floor(timeDifferent % 60); // format seconds

  return {
    formatHour,
    formatminutes,
    formatSeconds,
    timeDifferent,
  };
}

// create the span for hour , minutes , seconds and the collons

function createTime() {
  const countDownTime = document.createElement("div");
  countDownTime.className = "counter-container";

  const classNameSpan = [
    "hourspan",
    "colun-1",
    "minutspan",
    "colun-2",
    "secondsspan",
  ];

  for (let className of classNameSpan) {
    const timeSpan = document.createElement("span");
    timeSpan.className = className;

    if (className.startsWith("col")) {
      timeSpan.textContent = ":";
    }
    countDownTime.appendChild(timeSpan);
  }

  return countDownTime;
}

let ispause = false,
  remainingTime,
  endTime,
  timeInterval;

// create all the action buttons
// playButon/pauseButton
// resetButton
// deleteButton

function createButton(counterWrapper, updateTime) {
  const buttonContainer = document.createElement("div");
  counterWrapper.appendChild(buttonContainer);
  buttonContainer.className = "counter-button";

  const buttons = [
    '<ion-icon name="trash-outline"></ion-icon>',
    '<ion-icon name="pause-outline"></ion-icon>',
    '<ion-icon name="refresh-outline"></ion-icon>',
  ];

  for (let icon of buttons) {
    const button = document.createElement("button");
    button.innerHTML = icon;

    button.addEventListener("click", (event) => {
      const clickButton = event.currentTarget;
      let clickicon = clickButton.querySelector("ion-icon");
      const currentTime = new Date().getTime()

      if (clickicon.name === "trash-outline") {
        clearInterval(timeInterval)
        ispause = true;
        counterWrapper.remove();
      } else if (clickicon.name == "pause-outline") {
        clearInterval(timeInterval);
        ispause = true;
       remainingTime = Math.max(0, Math.round(endTime - currentTime));
        clickicon.name = "play-outline";
        updateTime()
        return;
      } else if (clickicon.name == "play-outline") {
        ispause = false;
        endTime = currentTime + remainingTime;
        timeInterval = setInterval(updateTime, 1000);
        clickicon.name = "pause-outline";
        updateTime()
        return;
      } else if (clickicon.name === "refresh-outline") {
        ispause = false;
        endTime = initEndtime();
        timeInterval = setInterval(updateTime, 1000);
        return
      }
    });
    buttonContainer.appendChild(button);
  }
}

function initEndtime() {
  const initialTime = getTimes();

  return new Date().getTime() + initialTime; // return endtime value
}

function startCountDown() {
  const counterWrapper = document.createElement("div");
  counterWrapper.className = "counterWrapper";

  const countDownTime = createTime(); // call the createTime function and append it to counterwrapper
  // call the createButton function and append it to counterwrapper

  counterWrapper.appendChild(countDownTime);

  endTime = initEndtime(); // set the endTime to initEndtime function at the top
  console.log(`end ${endTime}`); // initialize setInterval

  /*
  * update the display on each counterWraper

  * this function retrieves the current time value from the
     formatGetTime() function and display it dynamically to all counterwrapper
  */
  function updateTime() {
    // call the formatGetTime function and its return value
    if (!ispause) {
      const { formatHour, formatminutes, formatSeconds, timeDifferent } =
        formatGetTime(endTime);
      // select all direct span of each countDownTime and set time on each one dynamically

      const timespans = countDownTime.querySelectorAll(
        ".counter-container > span"
      );
      for (const [index, span] of timespans.entries()) {
        switch (index + 1) {
          case 1:
            span.textContent = formatHour.toString().padStart(2, "0"); // set hour
            break;
          case 3:
            span.textContent = formatminutes.toString().padStart(2, "0"); // set minutes
            break;
          case 5:
            span.textContent = formatSeconds.toString().padStart(2, "0"); // set seconds
            break;
          default:
            break;
        }
      }

      if (timeDifferent < 1) {
        clearInterval(timeInterval); // stop the time
        ispause = true;
      }
    }
    return;
    // Check if timeDifferent is less than 1 to stop the countdown
  }

  timeInterval = setInterval(() => {
    updateTime();
  }, 1000); // set countDown interval to 1 seconds

  createButton(counterWrapper, updateTime);
  timerContainer.appendChild(counterWrapper); // Append the counterwrapper to the timecontainer (HTML)

  updateTime();
}

// create a new timer dynamically on each click
addAlarm.addEventListener("click", () => {
  startCountDown(); // call the startcountDown function to update the time
  timeWrapper.classList.add("hide"); // hide  the select time Element
});

mainBtn.addEventListener("click", () => {
  timeWrapper.classList.remove("hide"); // show the select time Element
});
