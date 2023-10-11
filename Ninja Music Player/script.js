// Write your javascript here
const tracks = [
    {
        name: "Let me down slowly",
        artist: "Alec Benjamin",
        cover: "images/Baarishein.jpeg",
        source: "audio/Alec Benjamin - Let Me Down Slowly [Official Music Video].mp3",
    },
    {
        name: "Let me love you",
        artist: "DJ Snake/Justin Beiber",
        cover: "images/img3.jpeg",
        source: "audio/DJ Snake - Let Me Love You ft. Justin Bieber.mp3",
    },
    {
        name: "Perfect",
        artist: "Ed Sheeran",
        cover: "images/Ishq wala love.jpeg",
        source: "audio/Ed Sheeran - Perfect.mp3",
    },
];

let currentTrackIndex = 0;
let isPlaying = false;

const audio = new Audio();
const playButton = document.querySelector(".play");
const skipBackButton = document.querySelector(".skip-back");
const skipForwardButton = document.querySelector(".skip-forward");
const progressBarContainer = document.querySelector('.progress');
const progressBar = document.querySelector('.progress-bar');
const progressHead = document.querySelector('.progress-head');
const currentTimeElement = document.querySelector('.current-time');
const durationElement = document.querySelector('.duration');
const imgElement = document.querySelector('.img');
const titleElement = document.querySelector(".audio-title");
const singerElement = document.querySelector(".audio-singer");

function playTrack() {
    const currentTrack = tracks[currentTrackIndex];
    audio.src = currentTrack.source;
    imgElement.src = currentTrack.cover;
    titleElement.innerText = currentTrack.name;
    singerElement.innerText = currentTrack.artist;
    audio.play();
    isPlaying = true;
    playButton.innerHTML = '<i class="fas fa-pause"></i>';
    imgElement.classList.add("anime");
}

function pauseTrack() {
    audio.pause();
    isPlaying = false;
    playButton.innerHTML = '<i class="fas fa-play"></i>';
    imgElement.classList.remove("anime");
}

function playNextTrack() {
    currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
    playTrack();
}

function playPreviousTrack() {
    currentTrackIndex = (currentTrackIndex - 1 + tracks.length) % tracks.length;
    playTrack();
}

playButton.addEventListener("click", () => {
    if (isPlaying) {
        pauseTrack();
    } else {
        playTrack();
    }
});

skipForwardButton.addEventListener('click', () => {
    playNextTrack();
});

skipBackButton.addEventListener('click', () => {
    playPreviousTrack();
});

progressBarContainer.addEventListener('click', (e) => {
    const maxduration = audio.duration;
    const position = (e.clientX - progressBarContainer.getBoundingClientRect().left) / progressBarContainer.clientWidth;
    const seekTime = maxduration * position;
    audio.currentTime = seekTime;
});

audio.addEventListener('timeupdate', () => {
    if (!isNaN(audio.duration)) {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        const progressBarWidth = (currentTime / duration) * 100;
        progressBar.style.width = `${progressBarWidth}%`;
        progressHead.style.left = `${progressBarWidth}%`;
        currentTimeElement.innerText = formatTime(currentTime);
        durationElement.innerText = formatTime(duration);
    }
});

function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

audio.addEventListener('ended', () => {
    playNextTrack();
});
