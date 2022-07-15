import cards from "./cards.js";

let dataBase = {
  audio: null,
  arr: [],
  removedDiv: null,
  divList: null,
  wrongOne: 0,
  attemptAmount: 100,
};

function generateRandomArray() {
  dataBase.arr = [];
  while (dataBase.arr.length < 8) {
    let r = Math.floor(Math.random() * 8);
    if (dataBase.arr.indexOf(r) === -1) dataBase.arr.push(r);
  }
}
// Main tag From HTML
let main = document.querySelector(".main");

// creates Main Page and adds mainPageListener
function createMainPage(cardsData) {
  for (let i = 1; i < cardsData.length; i++) {
    let newDiv = document.createElement("div");
    newDiv.addEventListener("click", mainPageListener);
    let newImg = document.createElement("img");
    newImg.setAttribute("src", `../src/assets/img/${cardsData[i][0].word}.jpg`);
    let newP = document.createElement("p");
    newP.classList.add("p-name");
    newP.textContent = cardsData[0][i - 1];
    newDiv.append(newImg);
    newDiv.append(newP);
    main.append(newDiv);
  }
}

createMainPage(cards);

// Main page listener added when creating
function mainPageListener(e) {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  let forIndex = e.target.parentElement.children[1].textContent;
  let index = cards[0].indexOf(forIndex);
  createCategoryPage(cards[index + 1]);
}

// creates category pages added in mainPageListener

function createCategoryPage(cardsData) {
  let playButton = document.querySelector(".button-train");
  playButton.classList.remove("display-none");
  for (let i = 0; i < cardsData.length; i++) {
    let newDiv = document.createElement("div");
    newDiv.classList.add("div-remove-el");
    let newImg = document.createElement("img");
    newImg.setAttribute("src", `../src/assets/img/${cardsData[i].word}.jpg`);
    let newP = document.createElement("p");
    newP.classList.add("p-name");
    newP.textContent = cardsData[i].word;
    let audio = document.createElement("audio");
    audio.setAttribute("src", `../src/assets/${cardsData[i].audioSrc}`);
    audio.classList.add("audio");
    let rotate = document.createElement("img");
    rotate.setAttribute("src", "../src/assets/img/rotate.svg");
    rotate.classList.add("rotate-position");
    rotate.addEventListener("click", rotateAndTranslate);
    newDiv.append(newImg);
    newDiv.append(newP);
    newDiv.append(audio);
    newDiv.append(rotate);
    if (buttonTrain.textContent === "Play") {
      newDiv.addEventListener("click", chooseCard);
    }
    main.append(newDiv);
  }
}
// function four sound

function chooseCard(e) {
  e.target.parentElement.children[2].play();
  // dataBase.audio = e.target.parentElement.children[2];
}

// Burger Rotation

let menuBurger = document.querySelector(".burger-menu");
menuBurger.addEventListener("click", rotateMenu);

function rotateMenu() {
  menuBurger.classList.toggle("burger-menu-rotate");
  document.querySelector(".menu-bar").classList.toggle("display-none");
}

// menu bar event listener
function menuBarEventListener(e) {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  document.querySelector(".menu-bar").classList.toggle("display-none");
  let findIndex = e.target.textContent;
  let index = cards[0].indexOf(findIndex);
  createCategoryPage(cards[index + 1]);
}

// add event listeners for menu bar
let menuBarUl = document.querySelector(".menu-bar-ul");

for (let i = 0; i < menuBarUl.children.length; i++) {
  menuBarUl.children[i].addEventListener("click", menuBarEventListener);
}

menuBarUl.children[menuBarUl.children.length - 1].removeEventListener("click", menuBarEventListener);

menuBarUl.children[menuBarUl.children.length - 1].addEventListener('click', statisticsEventListener);

function statisticsEventListener() {
  while (main.firstChild) {
    main.removeChild(main.firstChild);
  }
  document.querySelector(".menu-bar").classList.toggle("display-none");
}

// Train Play button

let buttonTrain = document.querySelector(".button-train");

buttonTrain.addEventListener("click", buttonTrainListener);

function buttonTrainListener() {
  buttonTrain.classList.toggle("button-train-rotate");
  replayButton.parentElement.classList.toggle("display-none");
  startButton.classList.toggle("display-none");
  let divs = document.querySelectorAll(".div-remove-el");
  if (buttonTrain.textContent === "Play") {
    buttonTrain.textContent = "Train";
    for (let i = 0; i < divs.length; i++) {
      divs[i].removeEventListener("click", chooseCard);
      generateRandomArray();
    }
  } else {
    buttonTrain.textContent = "Play";
    for (let i = 0; i < divs.length; i++) {
      divs[i].addEventListener("click", chooseCard);
    }
  }
  dataBase.audio = null;
}

// play again event listener

let replayButton = document.querySelector(".Replay-button");

replayButton.addEventListener("click", replaySound);

function replaySound() {
  dataBase.audio.play();
}

// code for start button and game logic
let startButton = document.querySelector(".start-button");

startButton.addEventListener("click", startGame);

function removeName(pTags) {
  for (let i = 0; i < pTags.length; i++) {
    pTags[i].classList.add("visible-hidden");
  }
}

function addName(pTags) {
  console.log(pTags);
  for (let i = 0; i < pTags.length; i++) {
    pTags[i].classList.remove("visible-hidden");
    console.log("this is addName");
  }
}

function startGame() {
  startButton.removeEventListener("click", startGame);
  buttonTrain.removeEventListener("click", buttonTrainListener);
  if (dataBase.arr.length === 0) {
    setTimeout(() => {
      if (dataBase.wrongOne === 0) {
        let audio = document.createElement("audio");
        audio.setAttribute("src", `../src/assets/audio/success.mp3`);
        audio.play();
        let img = document.createElement("img");
        img.setAttribute("src", `../src/assets/img/success.jpg`);
        img.classList.add("img-overlay");
        document.body.append(img);
        document.body.addEventListener("click", removeImg);
        dataBase.attemptAmount = 100;
        let pTags = document.querySelectorAll(".p-name");
        addName(pTags);
      } else {
        let audio = document.createElement("audio");
        audio.setAttribute("src", `../src/assets/audio/failure.mp3`);
        audio.play();
        let img = document.createElement("img");
        img.setAttribute("src", `../src/assets/img/failure.jpg`);
        img.classList.add("img-overlay");
        document.body.append(img);
        document.body.addEventListener("click", removeImg);
        dataBase.attemptAmount = 100;
        let pTags = document.querySelectorAll(".p-name");
        addName(pTags);
      }
      generateRandomArray();
      for (let i = 0; i < dataBase.divList.length; i++) {
        dataBase.divList[i].classList.remove("removed");
      }
    }, 500);
    return;
  }
  let pTags = document.querySelectorAll(".p-name");
  removeName(pTags);
  let rotateImages = document.querySelectorAll(".rotate-position");
  removeName(rotateImages);

  let audioNodeList = document.querySelectorAll(".audio");
  let divList = document.querySelectorAll(".div-remove-el");
  dataBase.divList = divList;
  setTimeout(() => {
    audioNodeList[dataBase.arr[0]].play();
    dataBase.audio = audioNodeList[dataBase.arr[0]];
    divList[dataBase.arr[0]].addEventListener("click", onRightCard);
    for (let i = 1; i < dataBase.arr.length; i++) {
      divList[dataBase.arr[i]].addEventListener("click", onWrongCard);
    }
    dataBase.removedDiv = dataBase.arr.splice(0, 1);
  }, 1000);
}

function onRightCard() {
  dataBase.attemptAmount = dataBase.attemptAmount + 30;
  let startImg = document.createElement("img");
  startImg.setAttribute("src", "../src/assets/img/star-win.svg");
  startImg.classList.add("small-star");
  startImg.style.right = `${dataBase.attemptAmount}px`;
  let starDiv = document.querySelector(".for-stars");
  starDiv.append(startImg);

  let goodAudio = document.createElement("audio");
  goodAudio.setAttribute("src", `../src/assets/audio/correct.mp3`);
  goodAudio.play();
  for (let j = 0; j < dataBase.divList.length; j++) {
    dataBase.divList[j].removeEventListener("click", onRightCard);
    dataBase.divList[j].removeEventListener("click", onWrongCard);
  }
  dataBase.divList[dataBase.removedDiv].classList.add("removed");
  startGame();
}

function onWrongCard() {
  dataBase.attemptAmount = dataBase.attemptAmount + 30;
  let startImg = document.createElement("img");
  startImg.setAttribute("src", "../src/assets/img/star.svg");
  startImg.classList.add("small-star");
  startImg.style.right = `${dataBase.attemptAmount}px`;
  let starDiv = document.querySelector(".for-stars");
  starDiv.append(startImg);

  dataBase.wrongOne = dataBase.wrongOne + 1;
  let badAudio = document.createElement("audio");
  badAudio.setAttribute("src", `../src/assets/audio/failure.mp3`);
  badAudio.play();
}

// remove img
function removeImg() {
  let removedImg = document.querySelector(".img-overlay");
  document.body.removeChild(removedImg);
  let starDiv = document.querySelector(".for-stars");
  console.log(starDiv.children);
  buttonTrain.addEventListener("click", buttonTrainListener);
  while (starDiv.firstChild) {
    starDiv.removeChild(starDiv.firstChild);
  }
  startButton.addEventListener("click", startGame);
  dataBase.audio = null;
}

// generate names
const names = {};

for (let i = 1; i < cards.length; i++) {
  for (let j = 0; j < cards[i].length; j++) {
    names[cards[i][j].word] = cards[i][j].translation;
  }
}

let values = Object.values(names);
let keys = Object.keys(names);

for (let i = 0; i < values.length; i++) {
  names[values[i]] = keys[i];
}

// generate names

function rotateAndTranslate(e) {
  e.target.parentElement.classList.toggle("rotate-word");
  e.target.parentElement.children[1].textContent =
    names[e.target.parentElement.children[1].textContent];
  e.target.parentElement.addEventListener("click", mouseleft);
}

function mouseleft(e) {
  e.target.classList.toggle("rotate-word");
}
