function updateTime() {
    const { formatHour, formatminutes, formatSeconds, timeDifferent} = formatGetTime();
    const timespans = counterDownTime.querySelectorAll("span");
    
    timespans[0].textContent = formatHour.toString().padStart(2, "0");
    timespans[2].textContent = formatminutes.toString().padStart(2, "0");
    timespans[4].textContent = formatSeconds.toString().padStart(2, "0");
    
    if (timeDifferent < 1) {
      clearInterval(timeInterval)
    }
  }

  function getTimes() {
    const hours = parseInt(document.querySelector(".hour").textContent),
      minuts = parseInt(document.querySelector(".minus").textContent),
      seconds = parseInt(document.querySelector(".seconds").textContent);
    
  
    return (hours * 60 * 60 * 1000) + (minuts * 60 * 1000) + (seconds * 1000)
  }
  
  // format the tiem to count in other
  
  function formatGetTime() {
    const currentTime = new Date().getTime();
   
    const timeDifferent = Math.floor((futureTime - currentTime) / 1000);
  
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