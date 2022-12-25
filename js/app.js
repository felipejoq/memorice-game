import {images} from "./images.js";
import {game, buttons, btnResetGame} from "./htmlElements.js";
import {shuffleImages, populateGameZone, disAndCoverButton, areSureResetGame, resetGameZone} from "./helpers.js";

populateGameZone(game, shuffleImages(images), shuffleImages(images));

disAndCoverButton(buttons);

btnResetGame.addEventListener('click', () => {
    game.classList.remove("animate__animated", "animate__flipInY");
    areSureResetGame().then(result => {
        if (result.isConfirmed) {
            resetGameZone(game);
            populateGameZone(game, shuffleImages(images), shuffleImages(images));
            disAndCoverButton(buttons);
            game.classList.add("animate__animated", "animate__flipInY");
        }
    })
});