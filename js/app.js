import { images } from "./images.js";
import { game, buttons } from "./htmlElements.js";
import { shuffleImages, populateGameZone, disAndCoverButton } from "./helpers.js";

let firstDeck = shuffleImages(images);
let secondDeck = shuffleImages(images);

populateGameZone(game, firstDeck, secondDeck);

disAndCoverButton(buttons);

