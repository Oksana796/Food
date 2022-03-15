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

//Modal window
const modalButtons = document.querySelectorAll("[data-modal]");

const modalWindow = document.querySelector(".modal");

function openModal() {
  modalWindow.classList.add("show");
  modalWindow.classList.remove("hide");
  //modalWindow.classList.toggle("show");  //instead of add and remove
  document.body.style.overflow = "hidden";
  clearInterval(modalTimerID);
}

modalButtons.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

function closeModal() {
  modalWindow.classList.remove("show");
  modalWindow.classList.add("hide");
  //modalWindow.classList.toggle("show");
  document.body.style.overflow = "";
}

modalWindow.addEventListener("click", (event) => {
  if (
    event.target === modalWindow ||
    event.target.getAttribute("data-close") == ""
  ) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Escape" && modalWindow.classList.contains("show")) {
    closeModal();
  }
});

const modalTimerID = setTimeout(openModal, 50000);

//open modal window at the bottom of page:
function openModalonBottom() {
  if (
    window.scrollY + document.documentElement.clientHeight >=
    document.documentElement.scrollHeight
  ) {
    openModal();
    window.removeEventListener("scroll", openModalonBottom);
  }
}

window.addEventListener("scroll", openModalonBottom);

//classes for cards:
class CardMenu {
  constructor(src, alt, title, descr, price, parent, ...classes) {
    this.src = src;
    this.alt = alt;
    this.title = title;
    this.descr = descr;
    this.price = price;
    this.parent = document.querySelector(parent);
    this.classes = classes;
    this.converter = 30;
    this.converterFromDollarToUAH();
  }
  //methods:
  converterFromDollarToUAH() {
    this.price = +this.price * this.converter;
  }
  //to HTML
  render() {
    const elem = document.createElement("div");
    if (this.classes.length === 0) {
      elem.classList.add("menu__item");
    } else {
      this.classes.forEach((className) => elem.classList.add(className));
    }

    elem.innerHTML = `
          <img src=${this.src} alt=${this.alt} />
          <h3 class="menu__item-subtitle">${this.title}</h3>
          <div class="menu__item-descr">
              ${this.descr}
          </div>
          <div class="menu__item-divider"></div>
          <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
          </div>
    `;
    //where push
    this.parent.append(elem);
  }
}

new CardMenu(
  "img/tabs/vegy.jpg",
  "vegy",
  'Меню "Фитнес"',
  'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
  9,
  ".menu .container",
  "menu__item"
).render();

new CardMenu(
  "img/tabs/elite.jpg",
  "elite",
  "Меню “Премиум”",
  " В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
  17,
  ".menu .container",
  "menu__item"
).render();

new CardMenu(
  "img/tabs/post.jpg",
  "post",
  'Меню "Постное"',
  "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
  13,
  ".menu .container",
  "menu__item"
).render();

//Forms

const forms = document.querySelectorAll("form");

const message = {
  loading: "img/spinner.svg",
  success: "Thanks! We will get in touch.",
  failure: "OOps, something wrong...",
};

//the last: connect our f with all forms:
forms.forEach((item) => {
  postData(item);
});

function postData(form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    //where append message:
    let statusMessage = document.createElement("img");
    statusMessage.src = message.loading;
    statusMessage.style.cssText = `
      display: block;
      margin: 0 auto;
    `;
    //spinner append near to:
    form.insertAdjacentElement("afterend", statusMessage);

    const request = new XMLHttpRequest();
    request.open("POST", "server.php");

    //title:
    request.setRequestHeader("Content-type", "application/json; charset=utf-8");
    const formData = new FormData(form);

    const object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });

    request.send(JSON.stringify(object));

    request.addEventListener("load", () => {
      if (request.status === 200) {
        console.log(request.response);
        showThanksModal(message.success);
        //clear, reset input value:
        form.reset();
        statusMessage.remove();
      } else {
        showThanksModal(message.failure);
      }
    });
  });
}

function showThanksModal(message) {
  const prevModalDialog = document.querySelector(".modal__dialog");
  prevModalDialog.classList.add("hide");
  openModal();

  const thanksModal = document.createElement("div");
  thanksModal.classList.add("modal__dialog");
  thanksModal.innerHTML = `
    <div class = "modal__content">
      <div class = "modal__close" data-close>&times;</div>
      <div class = "modal__title">${message}</div>
    </div>
  `;

  document.querySelector(".modal").append(thanksModal);
  setTimeout(() => {
    thanksModal.remove();
    prevModalDialog.classList.add("show");
    prevModalDialog.classList.remove("hide");
    closeModal();
  }, 4000);
}
