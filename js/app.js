const qwerty = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
var missed = 0;
const title = document.querySelector(".title");
const startGame = document.querySelector(".btn__reset");
const overlayDiv = document.getElementById("overlay");
const liveHearts = document.querySelectorAll(".tries img");
const phrases = [
    "the office",
    "how i met your mother",
    "person of interest",
    "rick and morty",
    "friends"
];

startGame.addEventListener("click", () => {
    overlayDiv.style.display = "none";
});

function getRandomPhraseAsArray(arr) {
    const arrayLength = arr.length;
    const randomPosition = Math.floor(Math.random() * arrayLength);
    return arr[randomPosition].split("");
}

function addPhraseToDisplay(arr) {
    const ul = document.querySelector("#phrase ul");
    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement("li");
        li.textContent = arr[i];
        if (arr[i] !== " ") {
            li.className = "letter";
        } else {
            li.className = "space";
        }
        ul.appendChild(li);
    }
}
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);

function checkLetter(btn) {
    const letterElements = document.getElementsByClassName("letter");
    var matchLetter = null;
    for (let i = 0; i < letterElements.length; i++) {
        if (btn === letterElements[i].textContent) {
            letterElements[i].classList.add("show");
            matchLetter = letterElements[i].textContent;
        }
    }
    return matchLetter;
}

qwerty.addEventListener("click", e => {
    if (e.target.tagName === "BUTTON") {
        const target = e.target;
        target.classList.add("chosen","correct");
        target.disabled = "true";
        const text = target.textContent;
        const letterFound = checkLetter(text);

        if (letterFound === null) {
            missed += 1;
            target.classList.add("wrong");
            liveHearts[liveHearts.length - missed].setAttribute(
                "src",
                "images/lostHeart.png"
            );
        }
    }
    checkWin();
});

function checkWin() {
    const LetterClassLength = document.getElementsByClassName("letter").length;
    const showLetterClassLength = document.getElementsByClassName("show").length;
    if (missed >= 5) {
        overlayDiv.className = "lose";
        overlayDiv.style.display = "block";
        title.textContent = "You lost!";
        startGame.textContent = "Reset";
    } else if (LetterClassLength === showLetterClassLength) {
        overlayDiv.className = "win";
        overlayDiv.style.display = "block";
        title.textContent = "You Won!";
        startGame.textContent = "Reset";
    }
}

document.addEventListener("click", e => {
    if (e.target.textContent === "Reset") {
        location.reload(true);
    }
});