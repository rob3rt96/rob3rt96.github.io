/*
    For this project I used the "HTML Audio/Video DOM Reference" info from https://www.w3schools.com/tags/ref_av_dom.asp
*/


const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');

const currentTimeElem = document.getElementById('current-time');
const durationElem = document.getElementById('duration');

const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.getElementsByClassName('volume-range')[0];
const volumeBar = document.getElementsByClassName('volume-bar')[0];

const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');

const prevButton = document.getElementById('prev');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');

// Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },

    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },

    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design'
    },

    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    }
];

// Check if music is Playing
let isPlaying = false;


// Play
const playSong = () => {
    isPlaying = true;
    playButton.classList.replace('fa-play', 'fa-pause');
    playButton.setAttribute('title', 'Pause');
    music.play();
};


// Pause
const pauseSong = () => {
    isPlaying = false;
    playButton.classList.replace('fa-pause', 'fa-play');
    playButton.setAttribute('title', 'Play');
    music.pause();
};


// Play or Pause - event listener
playButton.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));


// Update DOM
const loadSong = song => {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `resources/music/${song.name}.mp3`;
    image.src = `resources/img/${song.name}.jpg`;
};


// Current song
let songIndex = 0;


// Previous song
function prevSong() {
    songIndex -= 1;
    if (songIndex < 0) {
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

// Next song
function nextSong() {
    songIndex += 1;
    if (songIndex > (songs.length - 1)) {
        songIndex = 0;
    }

    loadSong(songs[songIndex]);
    playSong();
}


// On Load - Select the first song
loadSong(songs[songIndex]);


// Update Progress Bar and Time
function updateProgressBar(e) {
    if (isPlaying) {
        const { duration, currentTime } = e.srcElement;
        
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate display for duration
        const durationMinutes = Math.floor(duration / 60);

        let durationSeconds = Math.floor(duration % 60);
        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;
        }

        // Update duration displaying time and
        // Delay switching duration Element to avoid NaN
        if (durationSeconds || durationMinutes) {
            durationElem.textContent = `${durationMinutes}:${durationSeconds}`;
        }

         // Calculate display for duration
        const currentMinutes = Math.floor(currentTime / 60);

        let currentSeconds = Math.floor(currentTime % 60);
        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;
        }

        currentTimeElem.textContent = `${currentMinutes}:${currentSeconds}`;
    }
}

// Set Progress Bar by Click
const setProgressBar = e => {
    console.log(e);
    // Getting the width in pixels of the progress bar
    const width = e.target.clientWidth;

    // Getting the position of the click, on the progress bar
    const clickOnX = e.offsetX;

    const { duration } = music;

    music.currentTime = (clickOnX / width) * duration;  // currentTime attribute - Sets or returns the current playback position in the audio/video (in seconds)
};

// Volume controls
let lastVolume = 1;
let lastVolumeIcon = 'fa-volume-up';
let isMute = false;

// Set Volume Bar by Click
const changeVolume = e => {
    // Getting the width in pixels of the progress bar
    const width = e.target.clientWidth;

    // Getting the position of the click, on the progress bar
    const clickOnX = e.offsetX;

    let volume = clickOnX / width;

    // Rounding volume up or down
    if (volume < 0.1) {
        volume = 0;
    }

    if (volume > 0.9) {
        volume = 1;
    }

    volumeBar.style.width = `${volume * 100}%`;
    music.volume = volume;

    // Change icon based on volume
    volumeIcon.className = '';
    if (volume > 0.6) {
        volumeIcon.classList.add('fas', 'fa-volume-up');
        lastVolumeIcon = volumeIcon.classList[volumeIcon.classList.length - 1];
    } else if (volume < 0.6 && volume > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down');
        lastVolumeIcon = volumeIcon.classList[volumeIcon.classList.length - 1];
    } else if (volume === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-off');
        lastVolumeIcon = volumeIcon.classList[volumeIcon.classList.length - 1];
    }

    lastVolume = volume;
};

// Mute or Unmute
const muteUnmute = () => {
    volumeIcon.className = '';

    if (!isMute) {
        lastVolume = music.volume;
        music.volume = 0;
        volumeBar.style.width = 0;
        volumeIcon.classList.add('fas', 'fa-volume-mute');
        volumeIcon.setAttribute('title', 'Unmute');
        isMute = true;
    } else { 
        music.volume = lastVolume;
        volumeBar.style.width = `${lastVolume * 100}%`;
        volumeIcon.classList.add('fas', lastVolumeIcon);
        volumeIcon.setAttribute('title', 'Mute');
        isMute = false;
    }
};


// Event listeners
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);    // timeupdate - Fires when the current playback position has changed. It changes four times a second.
progressContainer.addEventListener('click', setProgressBar);
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', muteUnmute);