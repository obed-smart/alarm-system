"use strick";

const timeWrapper = document.getElementById("time-wrapper"),
  mainBtn = document.getElementById("timer-btn"),
  addAlarm = document.getElementById("add-alarm"),
  timerContainer = document.getElementById("timer-container");

timeWrapper.classList.add("hide");

// format the time to stay within time range(hour, minus, second)

function formatTime(timespan, value) {
  if (timespan.classList.contains("hour")) {
    value = value >= 24 ? 0 : value === -1 ? 23 : value;
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

const setTime = (() => {
  return {
    Add: (timespan) => {
      let settime = parseInt(timespan.textContent);
      settime++;
      formatTime(timespan, settime);
    },
    Minus: (timespan) => {
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
    setTime.Add(timeSpan);
  } else if (button.name === "chevron-down-outline") {
    setTime.Minus(timeSpan);
  }
}

function addClick() {
  const buttons = document.querySelectorAll(".icon-btn");

  for (let button of buttons) {
    button.addEventListener("click", checkClick);
  }
}

addClick();

// Get the time from the input;

let timeInterval;

function getTimes() {
  const hours = parseInt(document.querySelector(".hour").textContent),
    minuts = parseInt(document.querySelector(".minus").textContent),
    seconds = parseInt(document.querySelector(".seconds").textContent);

  const setTimeSeconds =
    hours * 60 * 60 * 1000 + minuts * 60 * 1000 + seconds * 1000;

  return { setTimeSeconds };
}

// format the tiem to count in other

function formatGetTime() {
  const { setTimeSeconds } = getTimes();
  const currentTime = new Date().getTime();
  const futureTime = setTimeSeconds + currentTime;
  const timeDifferent = (futureTime - currentTime) / 1000;

  console.log(timeDifferent);

  const formatHour = Math.floor(timeDifferent / (60 * 60));
  const formatminutes = Math.floor((timeDifferent % (60 * 60)) / 60);
  const formatSeconds = Math.floor(timeDifferent % 60);

  return {
    formatHour,
    formatminutes,
    formatSeconds,
  };
}

// create time container and append time from getTime

function setCountDownTime() {
  const counterWrapper = document.createElement("div");
  counterWrapper.className = "counterWrapper";

  function updateTime(timeIndex, timeSpan) {
    const { formatHour, formatminutes, formatSeconds } = formatGetTime();

    switch (timeIndex) {
      case 1:
        timeSpan.textContent = formatHour.toString().padStart(2, "0");
        break;
      case 2:
        timeSpan.textContent = ":";
        break;
      case 3:
        timeSpan.textContent = formatminutes.toString().padStart(2, "0");
        break;
      case 4:
        timeSpan.textContent = ":";
        break;
      case 5:
        timeSpan.textContent = formatSeconds.toString().padStart(2, "0");
        break;
      default:
        break;
    }
  }
  // function to store the hour minus and seconds for countDown

  function countDown() {
    const counterDownTime = document.createElement("div");
    counterWrapper.appendChild(counterDownTime);
    counterDownTime.className = "counter-container";

    const classNameSpan = [
      "spanhour",
      "colun-1",
      "minutspan",
      "colun-2",
      "secondsspan",
    ];

    for (let [index, className] of classNameSpan.entries()) {
      const timeSpan = document.createElement("span");
      timeSpan.className = className;
      const timeIndex = index + 1;
      counterDownTime.appendChild(timeSpan);
      updateTime(timeIndex, timeSpan)
    }
  }

  function counterButton() {
    const buttonContainer = document.createElement("div");
    counterWrapper.appendChild(buttonContainer);

    buttonContainer.className = "counter-button";
    const buttons = [
      '<ion-icon name="trash-outline"></ion-icon>',
      // '<ion-icon name="pause-outline"></ion-icon>',
      '<ion-icon name="play-outline"></ion-icon>',
      '<ion-icon name="refresh-outline"></ion-icon>',
    ];

    for (let icon of buttons) {
      const button = document.createElement("button");
      buttonContainer.appendChild(button);

      button.innerHTML = icon;
    }
  }

  timerContainer.appendChild(counterWrapper);

  countDown();
  counterButton();
}

// add alarm to the body

addAlarm.addEventListener("click", () => {
  if (
    getTimes().formatHour !== 0 ||
    getTimes().formatminutes !== 0 ||
    getTimes().formatSeconds !== 0
  ) {
    setCountDownTime();
    timeWrapper.classList.add("hide");
  } else {
    alert("time not set");
  }
});

mainBtn.addEventListener("click", () => {
  timeWrapper.classList.remove("hide");
});
