import {btnMute, iconSound} from "./htmlElements.js";

let arrButtonClicked = [];
let arrHitsButtons = [];
let saveButton = null;
let arrHintHistory = [];
const soundOpenCard = new Audio("../sound/open_card.wav");
const soundHintPairCard = new Audio("../sound/hint_pair_card.wav");
const soundWinGame = new Audio("../sound/win_game.wav");

export const shuffleImages = (arrImages) => {
    return [...arrImages.sort(() => 0.5 - Math.random())];
}
export const populateGameZone = (htmlElement, firstDeck, secondDeck) => {
    showInDeck(htmlElement, firstDeck);
    showInDeck(htmlElement, secondDeck)
}

const showInDeck = (htmlElement, deck) => {
    let sizeDeck = deck.length;
    for (let i = 0; i < sizeDeck; ++i) {
        const button = document.createElement("button");
        button.style.backgroundImage = `url("${deck[i].url}")`;
        button.style.backgroundSize = 'cover';
        button.style.backgroundPosition = "center";
        button.classList.add("box-img", "flex", deck[i].name)
        button.name = `${deck[i].name}`;
        button.innerHTML = `<img src="../img/cover.jpg" class="cover-${button.name}"/>`;
        htmlElement.append(button);
    }
}
const hiddenButtons = (buttons) => {
    for (const button of buttons) {
        button.disabled = false;
        button.style.cursor = "pointer";
        button.classList.remove("animate__animated", "animate__flipInY");
        button.innerHTML = `<img src="../img/cover.jpg" class="cover-${button.name}"/>`;
    }
}

export const disAndCoverButton = (buttons) => {
    for (const button of buttons) {
        button.addEventListener("click", (event) => {
            openButton(button);
        });
    }
}

const openButton = (button) => {

    if (arrButtonClicked.length >= 2) {
        hiddenButtons(arrButtonClicked);
        arrButtonClicked = [];
    }

    arrButtonClicked.push(button);

    if (isMatch()) {
        arrHitsButtons.push(saveButton, button);
        soundHintPairCard.play();
        for (const button of arrHitsButtons) {
            button.innerHTML = "";
            button.disabled = true;
        }

        arrHintHistory.push(button);
        arrButtonClicked = [];

        if (isWin(arrHintHistory)) {
            launchWinAlert();
        }
        return;
    }
    button.innerHTML = "";
    button.disabled = true;
    button.style.cursor = "not-allowed";
    saveButton = button;
    button.classList.add();
    button.classList.add("animate__animated", "animate__flipInY");
    soundOpenCard.play();
}

const isMatch = () => {
    return arrButtonClicked.length >= 2 ? arrButtonClicked[0].name === arrButtonClicked[1].name : false;
}

const isWin = (arrHintHistory) => {
    return arrHintHistory.length === 8;
}

const launchWinAlert = () => {
    Swal.fire({
        title: '¡MUY BIEN!',
        text: '¡TIENES UNA MEMORIA INCREÍBLE!',
        imageUrl: '../img/win_award.svg',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: '¡GANASTE!',
        showCancelButton: true,
        confirmButtonText: '¿VOLVER A JUGAR?',
        cancelButtonText: 'Salir!',
    }).then(result => {
        if (result.isConfirmed) {
            location.reload();
        } else {
            result.dismiss === Swal.DismissReason.cancel;
        }
    });
    soundWinGame.play();
}

const isMuted = () => {
    return soundOpenCard.muted && soundWinGame.muted && soundHintPairCard.muted;
}

const sounsControl = () => {
    if (!isMuted()) {
        soundOpenCard.muted = true;
        soundWinGame.muted = true;
        soundHintPairCard.muted = true;
        btnMute.classList.add("btn-muted");
        iconSound.classList.remove("fa-volume-high");
        iconSound.classList.add("fa-volume-xmark");
    } else {
        soundOpenCard.muted = false;
        soundWinGame.muted = false;
        soundHintPairCard.muted = false;
        btnMute.classList.remove("btn-muted");
        iconSound.classList.remove("fa-volume-xmark");
        iconSound.classList.add("fa-volume-high");
    }

}

btnMute.addEventListener('click', sounsControl);

export  const resetGameZone = (gameZone) => {
    gameZone.innerHTML = "";
    arrButtonClicked = [];
    arrHitsButtons = [];
    saveButton = null;
    arrHintHistory = [];
}

export const areSureResetGame = () => {
    return Swal.fire({
        title: '¿Quieres reiniciar el Juego?',
        text: "No podrá volver al estado actual.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, reiniciar!',
        cancelButtonText: 'Cancelar',
    })
}



