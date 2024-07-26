// Variables
const albumCovers = document.querySelectorAll('#music-tracks img'),
theAudio = document.querySelector('#music'),
playButton = document.querySelector('#playButton'),
pauseButton = document.querySelector('#pauseButton'),
rewindButton = document.querySelector('#rewindButton'),
volSlider = document.querySelector('#volumeControl');

// Functions
function loadAudio() {
    console.log(this.dataset.trackref);
    let currentSrc = `audio/${this.dataset.trackref}.mp3`;
    theAudio.src = currentSrc;
    theAudio.load();
    playAudio();
}

function playAudio() {
    theAudio.play();
}

function pauseAudio() {
    theAudio.pause();
}

function restartAudio() {
    theAudio.currentTime = 0;
    playAudio();
}

function setVolume() {
    console.log(this.value);

    theAudio.volume = (this.value / 100);
}

// Event Listeners
albumCovers.forEach(cover => cover.addEventListener(
    'click',
    loadAudio
));

playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);
rewindButton.addEventListener('click', restartAudio);
volSlider.addEventListener('change', setVolume);

