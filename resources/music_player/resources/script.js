const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');

const music = document.querySelector('audio');
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


// Previous or Next - event listeners
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);