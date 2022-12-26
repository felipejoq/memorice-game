import {btnMute, iconSound} from "./htmlElements.js";

export const soundOpenCard = new Audio("./sound/open_card.wav");
export const soundHintPairCard = new Audio("./sound/hint_pair_card.wav");
export const soundWinGame = new Audio("./sound/win_game.wav");

export const shuffleImages = (arrImages) => {
    return [...arrImages.sort(() => 0.5 - Math.random())];
}

export const populateGameZone = (htmlElement, firstDeck, secondDeck) => {
    showInDeck(htmlElement, firstDeck);
    showInDeck(htmlElement, secondDeck)
}

export const showInDeck = (htmlElement, deck) => {
    let sizeDeck = deck.length;
    for (let i = 0; i < sizeDeck; ++i) {
        const button = document.createElement("button");
        const div = document.createElement("div");
        div.classList.add("container-button");
        button.style.backgroundImage = `url("${deck[i].url}")`;
        button.style.backgroundSize = 'cover';
        button.style.backgroundPosition = "center";
        button.classList.add("box-img", "flex", deck[i].name)
        button.name = `${deck[i].name}`;
        button.innerHTML = `<img alt="Cover Card" src="./img/cover.jpg" class="cover"/>`;
        div.append(button);
        htmlElement.append(div);
    }
}
export const hiddenButtons = (buttons) => {
    for (const button of buttons) {
        button.disabled = false;
        button.style.cursor = "pointer";
        button.classList.remove("animate__animated", "animate__flipInY");
        button.innerHTML = `<img alt="Cover Card" src="./img/cover.jpg" class="cover"/>`;
    }
}

export const isMatch = (arrButtonClicked) => {
    return arrButtonClicked.length >= 2 ? arrButtonClicked[0].name === arrButtonClicked[1].name : false;
}

export const isWin = (arrHintHistory) => {
    return arrHintHistory.length === 8;
}

export const launchWinAlert = () => {
    Swal.fire({
        title: '¡MUY BIEN!',
        text: '¡TIENES UNA MEMORIA INCREÍBLE!',
        imageUrl: './img/win_award.svg',
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

export const isMuted = () => {
    return soundOpenCard.muted && soundWinGame.muted && soundHintPairCard.muted;
}

export const soundControl = () => {
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
export const resetGameZone = (gameZone, arrButtonClicked, arrHitsButtons, saveButton, arrHintHistory) => {
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

export const launchContactModal = () => {

    let userEmail = "felipe";
    let at = "@";
    let domainEmail = "uncodigo.com";

    return Swal.fire({
        title: 'Contacto!',
        text: `Mi nombre es Felipe Jofré, soy Programador Web y puede contactarme al correo: ${userEmail}${at}${domainEmail}`,
        imageUrl: './img/email-icon.png',
        imageWidth: 256,
        imageHeight: 256,
        imageAlt: 'Contacto',
    })
}

