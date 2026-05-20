const letter = document.querySelector(".letter");
const progress = document.getElementById("readingProgress");
const increaseText = document.getElementById("increaseText");
const decreaseText = document.getElementById("decreaseText");
const scrollBottom = document.getElementById("scrollBottom");

let textScale = 1;

window.addEventListener("scroll", () => {
const scrollTop = window.scrollY;
const docHeight =
    document.documentElement.scrollHeight - window.innerHeight;

const percent =
    docHeight > 0
    ? (scrollTop / docHeight) * 100
    : 0;

progress.style.width = percent + "%";
});

increaseText.addEventListener("click", () => {
textScale = Math.min(textScale + 0.08, 1.25);
letter.style.setProperty("--text-scale", textScale);
});

decreaseText.addEventListener("click", () => {
textScale = Math.max(textScale - 0.08, 0.9);
letter.style.setProperty("--text-scale", textScale);
});

scrollBottom.addEventListener("click", () => {
window.scrollTo({
    top: document.body.scrollHeight,
    behavior: "smooth"
});
});
