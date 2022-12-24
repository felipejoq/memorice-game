let arrButtonClicked = [];
let arrHitsButtons = [];
let saveButton = null;

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
        button.classList.add("box-img", "flex", deck[i].name);
        button.name = `${deck[i].name}`;
        button.innerHTML = `<img src="../img/cover.jpg" class="${deck[i].name}-cover"/>`;
        htmlElement.append(button);
    }
}

const hiddenButtons = (buttons) => {
    for (const button of buttons) {
        button.innerHTML = `<img src="../img/cover.jpg" class="${button.name}-cover"/>`;
        button.disabled = false;
        button.style.cursor = "pointer";
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
        for (const button of arrHitsButtons) {
            button.innerHTML = "";
            button.disabled = true;
        }
        arrButtonClicked = [];
    }
    button.innerHTML = "";
    button.disabled = true;
    button.style.cursor = "not-allowed";
    saveButton = button;
}

const isMatch = () => {
    return arrButtonClicked.length >= 2 ? arrButtonClicked[0].name === arrButtonClicked[1].name : false;
}