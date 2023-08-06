console.log("Spotify Clonne");

// Fetching All The variables and DOM items
let playButton = document.querySelector('#playBtn');
let songIndex = 1;
let audioElement;
audioElement = new Audio(`Songs/${songIndex.toString()}.mp3`);
let myProgressBar = document.querySelector('#songProgressBar');
let gif = document.getElementById('playingGif');
let songInfo = document.getElementById('currentSongName');

let previous = document.getElementById('previous');
let next = document.getElementById('next');

setInterval(() => {
    if(myProgressBar.value == 100 ){
        setTimeout(() => {
            playNext();
        }, 500);
    }
}, 1000);

const playPrevious = ()=>{
    audioElement.pause();
    if (songIndex == 1) {
        songIndex = songs.length;
        audioElement = new Audio(`Songs/${songIndex.toString()}.mp3`);
        songInfo.innerText = songs[songIndex - 1].songName
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            playButton.classList.remove('fa-play');
            playButton.classList.add('fa-pause');
            gif.style.opacity = 1;
        }
        else {
            audioElement.pause();
            playButton.classList.remove('fa-pause');
            playButton.classList.add('fa-play');
            gif.style.opacity = 0;
        }
        audioElement.addEventListener('timeupdate', () => {
            // console.log('Time Update');
            // Update Seek Bar
            let progress = parseInt(((audioElement.currentTime) / (audioElement.duration)) * 100);
            myProgressBar.value = progress;
        });
    }
    else {
        songIndex--;
        audioElement = new Audio(`Songs/${songIndex.toString()}.mp3`);
        songInfo.innerText = songs[songIndex - 1].songName

        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            playButton.classList.remove('fa-play');
            playButton.classList.add('fa-pause');
            gif.style.opacity = 1;
        }
        else {
            audioElement.pause();
            playButton.classList.remove('fa-pause');
            playButton.classList.add('fa-play');
            gif.style.opacity = 0;
        }
        audioElement.addEventListener('timeupdate', () => {
            // console.log('Time Update');
            // Update Seek Bar
            let progress = parseInt(((audioElement.currentTime) / (audioElement.duration)) * 100);
            myProgressBar.value = progress;
        });
    }
}

const playNext = ()=>{
    audioElement.pause();
    if (songIndex == 6) {
        songIndex = 1;
        audioElement = new Audio(`Songs/${songIndex.toString()}.mp3`);
        songInfo.innerText = songs[songIndex - 1].songName
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            playButton.classList.remove('fa-play');
            playButton.classList.add('fa-pause');
            gif.style.opacity = 1;
        }
        else {
            audioElement.pause();
            playButton.classList.remove('fa-pause');
            playButton.classList.add('fa-play');
            gif.style.opacity = 0;
        }
        audioElement.addEventListener('timeupdate', () => {
            // console.log('Time Update');
            // Update Seek Bar
            let progress = parseInt(((audioElement.currentTime) / (audioElement.duration)) * 100);
            myProgressBar.value = progress;
        });
    }
    else {
        songIndex++;
        audioElement = new Audio(`Songs/${songIndex.toString()}.mp3`);
        songInfo.innerText = songs[songIndex - 1].songName

        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            playButton.classList.remove('fa-play');
            playButton.classList.add('fa-pause');
            gif.style.opacity = 1;
        }
        else {
            audioElement.pause();
            playButton.classList.remove('fa-pause');
            playButton.classList.add('fa-play');
            gif.style.opacity = 0;
        }
        audioElement.addEventListener('timeupdate', () => {
            // console.log('Time Update');
            // Update Seek Bar
            let progress = parseInt(((audioElement.currentTime) / (audioElement.duration)) * 100);
            myProgressBar.value = progress;
        });
    }
    console.log(songIndex);
}

console.log(audioElement);

// All songs availables are put in this object
let songs = [
    { songName: "Let Me Love You", filePath: 'Songs/1.mp3' },
    { songName: "Metamorphosis", filePath: 'Songs/2.mp3' },
    { songName: "Peaches", filePath: 'Songs/3.mp3' },
    { songName: "Rubican Drill", filePath: 'Songs/4.mp3' },
    { songName: "We don't talk anymore", filePath: 'Songs/5.mp3' },
    { songName: "YadavBrand 2", filePath: 'Songs/6.mp3' }
]


// Handelling Play and Pause using The icons on screen
playButton.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        playButton.classList.remove('fa-play');
        playButton.classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        playButton.classList.remove('fa-pause');
        playButton.classList.add('fa-play');
        gif.style.opacity = 0;
    }
})

// Handelling Play and Pause using Keypress of Space Bar
document.addEventListener('keypress', (event) => {
    if (event.code == 'Space') {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            playButton.classList.remove('fa-play');
            playButton.classList.add('fa-pause');
            gif.style.opacity = 1;
        }
        else {
            audioElement.pause();
            playButton.classList.remove('fa-pause');
            playButton.classList.add('fa-play');
            gif.style.opacity = 0;
        }
    }
})

// Working on Pervious button
previous.addEventListener('click', playPrevious);

next.addEventListener('click', playNext);

// Updating the seek bar as per the song playback Timmings
audioElement.addEventListener('timeupdate', () => {
    // console.log('Time Update');
    // Update Seek Bar
    myProgressBar.value = parseInt((audioElement.currentTime / audioElement.duration) * 100);
});

// Using the seek bar to skip some part of the song
myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})


// Playing songs using the songlist items in the dom
// This is a completely seperate logic using the fundamental applied above
for (const song of document.getElementsByClassName('songItem')) {
    song.addEventListener('click', (event) => {
        audioElement.pause();

        // Overriding the audio element so that new song as per the clicked item can be played
        audioElement = new Audio(`Songs/${event.target.id}.mp3`);
        songIndex = parseInt(event.target.id);

        // Updating the name of the current song
        songInfo.innerText = event.target.innerText

        // Handelling automatic play and pause when the song is changed
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            playButton.classList.remove('fa-play');
            playButton.classList.add('fa-pause');
            gif.style.opacity = 1;
        }
        else {
            audioElement.pause();
            playButton.classList.remove('fa-pause');
            playButton.classList.add('fa-play');
            gif.style.opacity = 0;
        }

        // Updating the seek bar
        audioElement.addEventListener('timeupdate', () => {
            // console.log('Time Update');
            // Update Seek Bar
            let progress = parseInt(((audioElement.currentTime) / (audioElement.duration)) * 100);
            myProgressBar.value = progress;
        });
    })
}
