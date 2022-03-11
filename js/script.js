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
