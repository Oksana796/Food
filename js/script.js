//Tabs
const tabParent = document.querySelector(".tabheader__items");
const tabs = document.querySelectorAll(".tabheader__item");
const tabsContent = document.querySelectorAll(".tabcontent");

function hideTabsContent() {
  tabsContent.forEach((tab) => {
    //tab.style.display = "none";
    tab.classList.add("hide");
    tab.classList.remove("show", "fade");
  });

  tabs.forEach((tab) => {
    tab.classList.remove("tabheader__item_active");
  });
}

function showTabsContent(i = 3) {
  //tabsContent[i].style.display = "block";
  tabsContent[i].classList.add("show", "fade");
  tabsContent[i].classList.remove("hide");
  tabs[i].classList.add("tabheader__item_active");
}

hideTabsContent();
showTabsContent();

tabParent.addEventListener("click", (event) => {
  if (event.target.classList.contains("tabheader__item")) {
    tabs.forEach((tab, i) => {
      if (event.target == tab) {
        hideTabsContent();
        showTabsContent(i);
      }
    });
  }
});

//Timer
const deadline = "2022-03-30";

//endtime - is deadline in milliseconds;
function timeRemaining(endtime) {
  //Date.parse() - converts to ms;
  let t = Date.parse(endtime) - Date.parse(new Date());
  //now ms convert in day, hours, min, sec
  let days = Math.floor(t / (1000 * 60 * 60 * 24));
  let hours = Math.floor((t / (100 * 60 * 60)) % 24);
  let min = Math.floor((t / (1000 * 60)) % 60);
  let sec = Math.floor((t / 1000) % 60);

  return {
    total: t,
    days: days,
    hours: hours,
    min: min,
    sec: sec,
  };
}

function zero(num) {
  if (num >= 0 && num < 10) {
    return "0" + num;
  } else {
    return num;
  }
}

function setClock(selector, endtime) {
  let timer = document.querySelector(selector);
  let days = timer.querySelector("#days");
  let hours = timer.querySelector("#hours");
  let minutes = timer.querySelector("#minutes");
  let seconds = timer.querySelector("#seconds");

  timeInterval = setInterval(updateClock, 1000);

  updateClock();

  function updateClock() {
    const t = timeRemaining(endtime);

    days.innerHTML = zero(t.days);
    hours.innerHTML = zero(t.hours);
    minutes.innerHTML = zero(t.min);
    seconds.innerHTML = zero(t.sec);

    if (t.total <= 0) {
      clearInterval(timeInterval);
    }
  }
}

setClock(".timer", deadline);
