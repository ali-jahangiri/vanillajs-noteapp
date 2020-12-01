const addTo = document.querySelector(".add");
const mainContainer = document.querySelector("#mainContainer");
let arrayStore = [];
const setToLocal = () => {
  localStorage.setItem("value", JSON.stringify(arrayStore));
};
const getToLocal = () => {
  arrayStore = JSON.parse(localStorage.getItem("value"));
};
getToLocal();
const firstColFocus = (() => {
  let firstCol = document.querySelector(".name");
  firstCol.focus();
  firstCol.addEventListener("keypress", (e) => {
    if (e.key === "Enter") document.querySelector(".able").focus();
  });
})();
const btnState = () => {
  const name = document.querySelectorAll(".name");
  name[name.length - 1].nextElementSibling.style.display = "none";
  name[name.length - 2].nextElementSibling.style.display = "block ";
};
const focusEl = () => {
  const inpFo = document.querySelectorAll(".name");
  let lastIn = inpFo[inpFo.length - 1];
  lastIn.focus();
  lastIn.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      const textCo = document.querySelectorAll(".able");
      let lastText = textCo[textCo.length - 1];
      lastText.focus();
    }
  });
};
const deleteItem = () => {
  const allBtn = document.querySelectorAll(".fa-times");
  allBtn.forEach((el) => {
    el.addEventListener("click", (e) => {
      e.target.parentElement.parentElement.classList.add("scew");
      setTimeout(() => {
        e.target.parentElement.parentElement.remove();
        let sss = arrayStore.find((element) => {
          return (
            element.lastText ===
            e.target.parentElement.parentElement.children[1].textContent
          );
        });
        let index = arrayStore.indexOf(sss);
        if (sss) {
          arrayStore.splice(index, index + 1);
          setToLocal();
        }
      }, 2000);
    });
  });
};
deleteItem();
const deleteFade = () => {
  const fade = document.querySelectorAll(".show-fade");
  let lastFade = fade[fade.length - 1];
  setTimeout(() => {
    lastFade.classList.remove("show-fade");
  }, 1000);
};
const nextCheck = () => {
  const name = document.querySelectorAll(".name");
  let lastName = name[name.length - 1];
  const able = document.querySelectorAll(".able");
  let lastAble;
  if (able.length === 1) lastAble = able[0];
  else if (able.length > 1) lastAble = able[able.length - 1];
  if (lastName.textContent.length !== 0 && lastAble.textContent.length !== 0)
    return true;
  else return false;
};
const removeLastChangeble = () => {
  const name = document.querySelectorAll(".name");
  let lastName = name[name.length - 1];
  console.log(lastName);
  const able = document.querySelectorAll(".able");
  let lastAble;
  if (able.length === 1) lastAble = able[0];
  else if (able.length > 1) lastAble = able[able.length - 1];
  lastName.setAttribute("contenteditable", "false");
  lastAble.setAttribute("contenteditable", "false");
};
const editBtn = () => {
  const allCol = document.querySelectorAll(".col-md-3");
  allCol.forEach((e) => {
    e.addEventListener("click", (e) => {
      if (e.target.classList.contains("fa-edit")) {
        e.target.classList.replace("fa-edit", "fa-check");
        e.target.parentElement.parentElement.children[0].firstElementChild.setAttribute(
          "contenteditable",
          "true"
        );
        e.target.parentElement.parentElement.children[1].setAttribute(
          "contenteditable",
          "true"
        );
        e.target.parentElement.parentElement.firstElementChild.firstElementChild.focus();
      } else if (e.target.classList.contains("fa-check")) {
        e.target.classList.replace("fa-check", "fa-edit");
        e.target.parentElement.parentElement.children[0].firstElementChild.setAttribute(
          "contenteditable",
          "false"
        );
        e.target.parentElement.parentElement.children[1].setAttribute(
          "contenteditable",
          "false"
        );
      }
    });
  });
};
editBtn();
addTo.addEventListener("click", () => {
  if (nextCheck()) {
    removeLastChangeble();
    const html = `
        <div class="col-md-3 mr-3 ml-xl-5 ml-sm-0 ml-md-0 mb-xl-3 mb-4 mb-md-3 show-fade">
    <div class="controler">
    <div
    contenteditable="true"
    data-placeholder="Enter Name"
    class="name"
  ></div>
      <i class="fas fa-edit"></i>
      <i class="fas fa-times" aria-hidden="true"></i>
    </div>
    <div
     class="able"
      contenteditable="true"
      data-placeholder="Enter Task"
    ></div>
    </div>`;
    mainContainer.innerHTML += html;
    local();
    setToLocal();
    getToLocal();
    deleteFade();
    focusEl();
    editBtn();
    btnState();
    deleteItem();
  }
});

function local() {
  const name = document.querySelectorAll(".name");
  let lastName = name[name.length - 2].textContent;
  const text = document.querySelectorAll(".able");
  let lastText = text[text.length - 2].textContent;
  let obj = {
    lastName,
    lastText,
  };
  arrayStore.push(obj);
}

function renderBefor() {
  arrayStore.forEach((el) => {
    const html = `
    <div class="col-md-3 mr-3 ml-xl-5 ml-sm-0 ml-md-0 mb-xl-3 mb-4 mb-md-3 show-fade">
    <div class="controler">
    <div
    contenteditable="true"
    data-placeholder="Enter Name"
    class="name"><div>${el.lastName}</div></div>
      <i class="fas fa-edit"></i>
      <i class="fas fa-times" aria-hidden="true"></i>
    </div>
    <div
     class="able"
      contenteditable="true"
      data-placeholder="Enter Task"><div>${el.lastText}</div></div>
  </div>`;
    mainContainer.innerHTML += html;
    deleteItem();
    deleteFade();
  });
}
renderBefor();
