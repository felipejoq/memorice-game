import {score, time} from "./elements.html";
import {MODAL} from "./popups";
let points = 0;
let gameZone = document.getElementById("game-zone");
let timeOut = document.getElementById("time-out");

export const timer = () => {
    time.innerHTML = "⌛️ 0";
    timeOut.style.visibility = "hidden";
    let count = 0;
    let limit = 60;
    let intervalID = setInterval(() => {
        time.innerHTML = "";
        time.innerHTML = `⌛️ ${count += 1}`;
        if (count >= limit) {
            console.log('Valor de count: ', count)
            gameZone.classList.add("disabled");
            timeOut.style.visibility = "visible";
            MODAL.generic('Time Out!', 'Your time is over. :(', "error", 'Try again?')
                .then(result => {
                    if(result.isConfirmed) {
                        console.log("User confirm try again");
                    }
                });
            return clearInterval(intervalID);
        }
    }, 1000);
}
export const addScore = (point) => {
    points += point;
    if(points === 8) {
        MODAL.generic('You Win!', 'Wow, your mind is very powerful!', "success", 'Great!', 'Accept')
    }
    score.innerHTML = `🎯 ${ points }`
}
export const sounds = () => {
}
export const resets = () => {
}