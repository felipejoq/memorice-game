import {images} from "./images.js";
import {game, buttons, btnResetGame, btnMute, linkContact} from "./htmlElements.js";
import {
    areSureResetGame, hiddenButtons,
    isMatch, isWin, launchContactModal, launchWinAlert,
    populateGameZone,
    resetGameZone,
    shuffleImages,
    soundControl, soundHintPairCard, soundOpenCard
} from "./helpers.js";

let arrButtonClicked = [];
let arrHitsButtons = [];
let saveButton = null;
let arrHintHistory = [];

populateGameZone(game, shuffleImages(images), shuffleImages(images));

const disAndCoverButton = (buttons) => {
    for (const button of buttons) {
        button.addEventListener("click", () => {
            openButton(button);
        });
    }
}

disAndCoverButton(buttons);

btnResetGame.addEventListener('click', () => {
    game.classList.remove("animate__animated", "animate__flipInY");
    areSureResetGame().then(result => {
        if (result.isConfirmed) {
            resetGameZone(game, arrButtonClicked, arrHitsButtons, saveButton, arrHintHistory);
            populateGameZone(game, shuffleImages(images), shuffleImages(images));
            disAndCoverButton(buttons);
            game.classList.add("animate__animated", "animate__flipInY");
        }
    })
});

const openButton = (button) => {

    if (arrButtonClicked.length >= 2) {
        hiddenButtons(arrButtonClicked);
        arrButtonClicked = [];
    }

    arrButtonClicked.push(button);

    if (isMatch(arrButtonClicked)) {

        soundHintPairCard.play().then(() => {

            arrHitsButtons.push(saveButton, button);

            for (const button of arrHitsButtons) {
                button.innerHTML = "";
                button.disabled = true;
            }

            arrHintHistory.push(button);

            arrButtonClicked = [];

            if (isWin(arrHintHistory)) {
                launchWinAlert();
            }
        });

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

btnMute.addEventListener('click', soundControl);

linkContact.addEventListener('click', () => {
    launchContactModal();
})