"use strick";

const timeWrapper = document.getElementById("time-wrapper");
const timeWrapperArray = document.getElementById("time-wrapper");
const mainBtn = document.getElementById("timer-btn");
const addAlarm = document.getElementById("add-alarm");
const timerContainer = document.getElementById("timer-container");

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

let endTime;

function getTimes() {
  const hours = parseInt(document.querySelector(".hour").textContent),
    minuts = parseInt(document.querySelector(".minus").textContent),
    seconds = parseInt(document.querySelector(".seconds").textContent);

  return hours * 60 * 60 * 1000 + minuts * 60 * 1000 + seconds * 1000;
}

// format the tiem to count in other

function formatGetTime() {
  const currentTime = new Date().getTime();

  const timeDifferent = Math.max(Math.round((endTime - currentTime) / 1000));

  console.log(timeDifferent);
  const formatHour = Math.floor(timeDifferent / 3600);
  const formatminutes = Math.floor((timeDifferent % 3600) / 60);
  const formatSeconds = Math.floor(timeDifferent % 60);

  return {
    formatHour,
    formatminutes,
    formatSeconds,
    timeDifferent,
  };
}



// function to store the hour minus and seconds for countDown

function createTime(counterWrapper) {
  const counterDownTime = document.createElement("div");
  counterWrapper.appendChild(counterDownTime);
  counterDownTime.className = "counter-container";


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
    counterDownTime.appendChild(timeSpan);
  }
}

function createButton(counterWrapper) {
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
    button.innerHTML = icon;
    buttonContainer.appendChild(button);
  }
}

function startCountDown() {
  const counterWrapper = document.createElement("div");
  counterWrapper.className = "counterWrapper";

  createTime(counterWrapper);
  createButton(counterWrapper);


  function updateTime() {
    const { formatHour, formatminutes, formatSeconds, timeDifferent } =
      formatGetTime();
    const timespans = counterDownTime.querySelectorAll("span");
    for (const [index, span] of timespans.entries()) {
      switch (index + 1) {
        case 1:
          span.textContent = formatHour.toString().padStart(2, "0");
          break;
        case 3:
          span.textContent = formatminutes.toString().padStart(2, "0");
          break;
        case 5:
          span.textContent = formatSeconds.toString().padStart(2, "0");
          break;
        default:
          break;
      }
    }
    if (timeDifferent < 1) {
      clearInterval(timeInterval);
    }
  }


  timerContainer.appendChild(counterWrapper);
  updateTime()
}

function initFutureTime() {
  return (endTime = new Date().getTime() + getTimes());
}

let timeInterval;

function startTime() {
  createTime();
  initFutureTime();
  createButton();
  updateTime();

  timeInterval = setInterval(updateTime, 1000);
}

addAlarm.addEventListener("click", () => {
  startCountDown()

  timeWrapper.classList.add("hide");
});

mainBtn.addEventListener("click", () => {
  timeWrapper.classList.remove("hide");
});
