// Variables
const albumCovers = document.querySelectorAll('#music-tracks img'),
theAudioEl = document.querySelector('#audioEl'),
playButton = document.querySelector('#playButton'),
pauseButton = document.querySelector('#pauseButton'),
rewindButton = document.querySelector('#rewindButton'),
volSlider = document.querySelector('#volumeControl');
const dropZones = document.querySelectorAll(".drop-zone-1, .drop-zone-2, .drop-zone-3, drop-zone-4");
const dragZone = document.querySelector(".track-container");

// Functions
function loadAudio() {
    console.log(this.dataset.trackref);
    let currentSrc = `audio/${this.dataset.trackref}.mp3`;

    theAudioEl.src = currentSrc;
    theAudioEl.load();

    playAudio();
}

function playAudio() {
    theAudioEl.play();
}

function pauseAudio() {
    theAudioEl.pause();
}

function restartAudio() {
    theAudioEl.currentTime = 0;
    playAudio();
}

function setVolume() {
    console.log(this.value);

    theAudioEl.volume = (this.value / 100);
}

function handleStartDrag() {
    console.log(`started dragging ${this}`);
    draggedPiece = this;
}

function handleOver(e) {
    e.preventDefault();
    console.log("Dragged Over")
}

// Event Listeners
albumCovers.forEach(cover => cover.addEventListener('click', loadAudio));

playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);
rewindButton.addEventListener('click', restartAudio);
volSlider.addEventListener('change', setVolume);
albumCovers.forEach(track => track.addEventListener("dragstart", handleStartDrag));
dropZones.forEach(zone => zone.addEventListener("dragover", handleOver));

