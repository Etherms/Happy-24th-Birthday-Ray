function openLetter() {
  const envelope = document.querySelector('.envelope');
  envelope.classList.add('open');

  // OPTIONAL: play music
  const music = document.getElementById('bgMusic');
  if (music) music.play();

  // delay before going to next page
  setTimeout(() => {
    console.log("Go to next page");
    // later: switch to page 2
  }, 800);
}