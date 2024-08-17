
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
        path:"one.mp3",
        img:"one.jpeg"
    },
    {
       name:"second song",
       path:"two.mp3",
       img:'two.jpeg'
    },
    {
        name:"third song",
        path:"three.mp3",
        img:"three.jpeg"
        
    },
    {
       name:"fourth song",
       path:"four.mp3",
       img:"four.jpg"
    },
    {
       name:"fifth song",
       path:"five.mp3",
       img:"four.jpg"
    },
    {
        name:"sixth song",
        path:"six.mp3",
        img:"six.jpg"
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