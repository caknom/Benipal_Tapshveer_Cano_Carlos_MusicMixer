// Variables
const theAudioEl = document.querySelector('#audioEl'),
    playButton = document.querySelector('#playButton'),
    pauseButton = document.querySelector('#pauseButton'),
    rewindButton = document.querySelector('#rewindButton'),
    volSlider = document.querySelector('#volumeControl');

const albumDisks = document.querySelectorAll('#music-tracks img'),
    dropZones = document.querySelectorAll(".drop-zone"),
    trackRefs = document.querySelectorAll('.track-ref');

let draggedPiece;
let audioElements = {};

// Functions
function createAudioElement(trackRef) {
    let audio = new Audio(`audio/${trackRef}.mp3`);
    return audio;
}

function loadAudio() {
    Object.values(audioElements).forEach(audio => {
        audio.currentTime = 0;
        audio.play();
    });
}

function playAudio() {
    Object.values(audioElements).forEach(audio => audio.play());
}

function pauseAudio() {
    Object.values(audioElements).forEach(audio => audio.pause());
}

function restartAudio() {
    Object.values(audioElements).forEach(audio => {
        audio.currentTime = 0;
        audio.play();
    });
}

function setVolume() {
    let volume = this.value / 100;
    Object.values(audioElements).forEach(audio => audio.volume = volume);
}

function handleStartDrag() {
    draggedPiece = this;
    console.log(`started dragging ${this.dataset.trackref}`);
}

function handleDragOver(e) {
    e.preventDefault();
    console.log("Dragged Over");
}

function handleDrop() {
    if (this.children.length >= 1) {
        console.log('A disk is already here');
        return;
    }
    this.appendChild(draggedPiece);

    if (!audioElements[draggedPiece.dataset.trackref]) {
        audioElements[draggedPiece.dataset.trackref] = createAudioElement(draggedPiece.dataset.trackref)
    }
    console.log(audioElements);

    loadAudio();
}

function handleTrackRefDrop() {
    if (this.children.length >= 1) {
        return;
    }
    
    this.appendChild(draggedPiece);

    audioElements[draggedPiece.dataset.trackref].pause();
    delete audioElements[draggedPiece.dataset.trackref];
    
    console.log(audioElements);    

    loadAudio();
}

// Event Listeners
playButton.addEventListener('click', playAudio);
pauseButton.addEventListener('click', pauseAudio);
rewindButton.addEventListener('click', restartAudio);
volSlider.addEventListener('change', setVolume);

albumDisks.forEach(disk => disk.addEventListener('dragstart', handleStartDrag));
dropZones.forEach(zone => {
    zone.addEventListener('dragover', handleDragOver);
    zone.addEventListener("drop", handleDrop);
});
trackRefs.forEach(ref => {
    ref.addEventListener('dragover', handleDragOver);
    ref.addEventListener("drop", handleTrackRefDrop);
});