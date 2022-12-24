import {images} from "./images.js";
import {game, buttons, btnResetGame} from "./htmlElements.js";
import {shuffleImages, populateGameZone, disAndCoverButton, areSureResetGame, resetGameZone} from "./helpers.js";

let firstDeck = shuffleImages(images);
let secondDeck = shuffleImages(images);

populateGameZone(game, firstDeck, secondDeck);

disAndCoverButton(buttons);

btnResetGame.addEventListener('click', () => {
    game.classList.remove("animate__animated", "animate__flipInY");
    areSureResetGame().then(result => {
        if (result.isConfirmed) {
            resetGameZone(game);
            populateGameZone(game, firstDeck, secondDeck);
            disAndCoverButton(buttons);
            game.classList.add("animate__animated", "animate__flipInY");
        }
    })
});