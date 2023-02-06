import {score, time} from "./elements.html";
let points = 0;

export const timer = () => {
    time.innerHTML = "⌛️ 0";
    let count = 0;
    let intervalID = setInterval(() => {
        time.innerHTML = "";
        time.innerHTML = `⌛️ ${count += 1}`;
        if (count >= 60) {
            alert('¡Time out!')
            return clearInterval(intervalID)
        }
    }, 1000);
}
export const addScore = (point) => {
    points += point;
    score.innerHTML = `🎯 ${ points }`
}
export const sounds = () => {
}
export const resets = () => {
}