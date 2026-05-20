const cards = [...document.querySelectorAll(".photo-card")];
const lightbox = document.getElementById("photoLightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxCount = document.querySelector(".lightbox-count");
const lightboxCaption = document.getElementById("lightboxCaption");

const closeBtn = document.querySelector(".lightbox-close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");

const chips = document.querySelectorAll(".gallery-chip");
const shuffleBtn = document.getElementById("shuffleBtn");
const collage = document.querySelector(".collage");

let currentIndex = 0;
let visibleCards = [...cards];
let startX = 0;

const captions = [
  "One of my favorite views.",
  "You make everything prettier.",
  "A tiny memory I want to keep.",
  "This one makes me smile.",
  "Pretty girl, pretty moment.",
  "A photo I’ll never get tired of.",
  "Soft, sweet, and beautiful.",
  "This feels like you.",
  "Another reason to smile.",
  "My favorite person.",
  "A moment worth keeping.",
  "You look so lovely here.",
  "This photo feels warm.",
  "A little piece of happiness.",
  "My favorite smile.",
  "You are so beautiful.",
  "A memory I love.",
  "This one is special.",
  "Always my favorite person.",
  "A soft little memory.",
  "You make my heart happy.",
  "This picture is so you.",
  "A sweet moment forever.",
  "My only girl."
];

cards.forEach((card, index) => {
  const img = card.querySelector("img");
  const favBtn = card.querySelector(".favorite-btn");

  img.dataset.caption = captions[index] || "A memory I love.";

  card.addEventListener("click", () => {
    visibleCards = cards.filter(card => !card.classList.contains("hide"));
    currentIndex = visibleCards.indexOf(card);

    if (currentIndex >= 0) {
      openLightbox();
    }
  });

  card.addEventListener("touchstart", () => {
    card.classList.add("touched");
    setTimeout(() => card.classList.remove("touched"), 350);
  });

  card.addEventListener("dblclick", () => {
    favBtn.classList.add("active");
    card.classList.add("liked");

    setTimeout(() => {
      card.classList.remove("liked");
    }, 650);
  });

  favBtn.addEventListener("click", e => {
    e.stopPropagation();

    favBtn.classList.toggle("active");
    card.classList.add("liked");

    setTimeout(() => {
      card.classList.remove("liked");
    }, 650);

    const activeFilter = document.querySelector(".gallery-chip.active")?.dataset.filter;

    if (activeFilter === "fav") {
      applyFilter("fav");
    }
  });
});

function openLightbox() {
  const card = visibleCards[currentIndex];

  if (!card) return;

  const img = card.querySelector("img");

  lightboxImg.src = img.src;
  lightboxCount.textContent = `${currentIndex + 1} / ${visibleCards.length}`;
  lightboxCaption.textContent = img.dataset.caption;

  lightbox.classList.add("active");
  document.body.classList.add("no-scroll");
}

function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.classList.remove("no-scroll");
}

function showNext() {
  if (!visibleCards.length) return;
  currentIndex = (currentIndex + 1) % visibleCards.length;
  openLightbox();
}

function showPrev() {
  if (!visibleCards.length) return;
  currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
  openLightbox();
}

function applyFilter(filter) {

  cards.forEach(card => {

    if (filter === "all") {

      card.classList.remove("hide");

    } else {

      card.classList.toggle(
        "hide",
        !card.dataset.category.includes(filter)
      );

    }

  });

  visibleCards = cards.filter(
    card => !card.classList.contains("hide")
  );
}

closeBtn.addEventListener("click", closeLightbox);
nextBtn.addEventListener("click", showNext);
prevBtn.addEventListener("click", showPrev);

lightbox.addEventListener("click", e => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

lightbox.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 45) {
    diff > 0 ? showNext() : showPrev();
  }
});

chips.forEach(chip => {
  chip.addEventListener("click", () => {
    chips.forEach(c => c.classList.remove("active"));
    chip.classList.add("active");

    applyFilter(chip.dataset.filter);
  });
});

shuffleBtn.addEventListener("click", () => {
  const visible = cards.filter(card => !card.classList.contains("hide"));
  const hidden = cards.filter(card => card.classList.contains("hide"));
  const shuffled = [...visible].sort(() => Math.random() - 0.5);

  [...shuffled, ...hidden].forEach(card => {
    collage.appendChild(card);
  });

  visibleCards = shuffled;
});

document.addEventListener("keydown", e => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") showNext();
  if (e.key === "ArrowLeft") showPrev();
});