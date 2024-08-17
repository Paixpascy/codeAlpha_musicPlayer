
let previousButton=document.querySelector('#previous')
let playButton=document.querySelector('#play')
let nextButton=document.querySelector('#next')
let title=document.querySelector('#title')
let artist=document.querySelector('#artist')
let volumeBar=document.querySelector('#volume-bar')
let total=document.querySelector('#total')
let current=document.querySelector('#current')
let volume=document.querySelector('#volume')
let songImage=document.querySelector('#song-image')

let timer;
let playing_song=0;
let index_no=0;
let song=document.createElement('audio');

let songs=[
    {
        name:"first song",
        path:"music/one.mp3",
        img:"images/one.jpeg",
        artist:"SANDY"
    },
    {
       name:"second song",
       path:"music/two.mp3",
       img:'images/two.jpeg',
       artist:"SMITH"
    },
    {
        name:"third song",
        path:"music/three.mp3",
        img:"images/three.jpeg",
        artist:"AMY"
    },
    {
       name:"fourth song",
       path:"music/four.mp3",
       img:"images/four.jpg",
       artist:"WINLOS"
    },
    {
       name:"fifth song",
       path:"music/five.mp3",
       img:"images/five.jpeg",
       artist:"MILA"
    },
    {
        name:"sixth song",
        path:"music/six.mp3",
        img:"images/six.jpg",
        artist:"BOB"
    }
];

function load_song(index_no){
    clearInterval(timer);
    reset_slider();

    song.src=songs[index_no].path;
    title.innerHTML=songs[index_no].name;
    artist.innerHTML=songs[index_no].artist ||'unknown artist'
    songImage.src=songs[index_no].img;
  

    total.innerHTML=songs.length;
    current.innerHTML=index_no +1;

    timer=setInterval(updateSlider, 100)
}

function reset_slider(){
    document.querySelector('#duration-slider').value=0;
}
function songPlay(){
    if(!playing_song){
        playSong();
    }else{
        pauseSong();
    }
}

function playSong(){
    song.play();
    playing_song=true;
    playButton.innerHTML='<i class="fa-solid fa-pause"></i>';
    }

function pauseSong(){
    song.pause();
    playing_song=false;
    playButton.innerHTML='<i class="fa-solid fa-play"></i>'
}
 function nextSong(){
    if(index_no < songs.length -1){
        index_no +=1;
        load_song(index_no);
    }else{
        index_no=0;
        load_song(index_no);
        playSong();
    }
 }

 function previousSong(){
    if (index_no > 0 ){
        index_no -=1;
        load_song(index_no);
        playSong();
    }else{
        index_no=songs.length - 1;
        load_song(index_no);
        playSong();
    }
 }

 function changeVolume(){
    let volumeInput=document.querySelector('#vol')
    volumeBar.innerHTML=volumeInput.value;
    song.volume=volumeInput / 100;
 }

 function changeDuration(){
    let slider=document.querySelector('#duration-slider')
    let slider_position=song.duration * (slider.value / 100)
    song.currentTime=slider_position;
 }
 document.querySelector("#duration-slider").addEventListener('input',changeDuration);

 function updateSlider(){
    let slider=document.querySelector("#duration-slider");
    let position=0;
    if(!isNaN(song.duration)){
        position=song.currentTime *(100 /song.duration );
        slider.value=position;
    }
    if(song.ended ){
        nextSong();
    }
 }
 load_song(index_no);