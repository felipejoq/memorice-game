import {cards} from "./img/cards";
import {covers, images} from "./elements.html";
import {addScore} from "./actions";

let memory = [];

export const shuffle = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export const setSrcImg = () => {
    let count = 0;
    let deck = shuffle(cards);
    for (const image of images) {
        if (count < 8) image.src = deck[count].url;
        count < 7 ? count += 1 : count = 0;
        count === 0 ? deck = shuffle(cards) : null;
    }
}

export const setActionOnClick = () => {
    for (const cover of covers) {
        cover.onclick = showAndHidden;
    }
}

const showAndHidden = (element) => {
    if (element.target.classList.contains('hidden')) {
        show(element.target);
        return;
    }
    hidden(element.target);
    memory.push(element)
    checkMatch()
}

const show = (element) => {
    element.classList.remove('hidden');
    element.classList.add("visible");
}

const hidden = (element) => {
    element.classList.remove('visible');
    element.classList.add("hidden");
}

const checkMatch = () => {
    if (memory.length === 2) {
        isMatch() ? addScore(1) : addScore(0)
    }
}

const isMatch = () => {
    let match = memory[0].target.parentElement.getElementsByClassName('image-secret')[0].src === memory[1].target.parentElement.getElementsByClassName('image-secret')[0].src;
    let checkArr = [...memory];
    if(match){
        console.log('ES UNA PAREJAAA! :)');
        memory[0].target.parentElement.getElementsByClassName('image-secret')[0].classList.add('animate__animated')
        memory[0].target.parentElement.getElementsByClassName('image-secret')[0].classList.add('animate__flip')
        memory[1].target.parentElement.getElementsByClassName('image-secret')[0].classList.add('animate__animated')
        memory[1].target.parentElement.getElementsByClassName('image-secret')[0].classList.add('animate__flip')
        memory[0].target.style.display = "none";
        memory[1].target.style.display = "none";
    } else {
        setTimeout(() => {
            console.log('NO ES UNA PAREJA... :(')
            checkArr[0].target.classList.replace('hidden', 'visible')
            checkArr[1].target.classList.replace('hidden', 'visible')
        }, 1000)
    }
    memory = [];
    return match
}
