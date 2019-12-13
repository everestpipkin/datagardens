
console.log(games.length)
var selection = Math.floor(Math.random() * games.length);
var gameTitle = games[selection].title;
var gameLink = games[selection].link;
var gameAuthor = games[selection].author;
var gameAssociated = games[selection].associated;






console.log(gameTitle)

var lastVideoID = [];
var lastVideoID2 = [];

var tag = document.createElement('script');
var rand = Math.floor(Math.random * 2)
var tryit = 0;
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);



var player ;
var player2 ;

  function onYouTubeIframeAPIReady() {

    player = new YT.Player('player', {
      height: '500px',
      width: '500px',
      rel: '1',
      fs: '1',
      enablejsapi: '1',
      iv_load_policy: '3',
      autoplay: '1',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
        'onError': onPlayerReady
      }
    });
    player2 = new YT.Player('player2', {
      height: '500px',
	  width: '500px',

      rel: '1',
      fs: '1',
      enablejsapi: '1',
      iv_load_policy: '3',
      autoplay: '1',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
        'onError': onPlayerReady
      }
    });
  }

function refreshPage(){
	window.location.reload()
}

  function onPlayerReady(event) {
    newVideo();
    
  }


 function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.ENDED) {
      refreshPage();
  }
    if (event.data == YT.PlayerState.PLAYING) {
      videoInfo();
  }
}

function newVideo(){

var search = searcher(gameAssociated + " original game lets play");
var search2 = searcher(gameTitle + " " +  "fangame");

if (!gameAssociated.includes("streamer") && !gameAssociated.includes("series") && !gameAssociated.includes("Microsoft") && !gameAssociated.includes("meme") ){
	var search = searcher(gameAssociated + " original game playthrough");

}
else{
	
	var search = searcher(gameAssociated);

}

if (rand == 0){
 search2 = searcher(gameTitle  + " " + "" + "fangame gamejolt");
}
else if (rand == 1){
 search2 = searcher(gameTitle  + " " + " " + "fangame playthrough");

}
else{
	  search2 = searcher(gameTitle  + " " + "" + " fan game online");


}
console.log("What was found" + search)
console.log("What was found" + search2)

var e = player.loadPlaylist({listType:'search',
        list: search,
        index: Math.floor(Math.random()*5),
        startSeconds:'0'})
var f = player2.loadPlaylist({listType:'search',
        list: search2,
        index: 0,
        startSeconds:'0'})
console.log(f)
var fieldTitle = document.getElementById('videoInfo'); 

fieldTitle.innerHTML = "loading...";
var fieldTitle = document.getElementById('videoInfo2'); 

fieldTitle.innerHTML = "loading...";
tryit += 1;
if (tryit > 4){
	refreshPage();
}
console.log(tryit);


}

function lastVideo(){

lastVideoID.splice(-1, 1);
lastVideoID2.splice(-1, 1);

console.log(lastVideoID[lastVideoID.length-1])
console.log(lastVideoID2[lastVideoID2.length-1])

player.loadVideoById({videoId:lastVideoID[lastVideoID.length-1]});
player2.loadVideoById({videoId2:lastVideoID2[lastVideoID2.length-1]});

var fieldTitle = document.getElementById('videoInfo'); 
var fieldTitle2 = document.getElementById('videoInfo2'); 

fieldTitle.innerHTML = "loading previous video... ";
fieldTitle2.innerHTML = "loading previous video...";

}

function videoInfo(){

var videoData = player.getVideoData();
var videoData2 = player2.getVideoData();

if (lastVideoID[lastVideoID.length-1] != videoData.video_id){
lastVideoID.push(videoData.video_id);
}
if (lastVideoID2[lastVideoID.length-1] != videoData2.video_id){
lastVideoID.push(videoData.video_id);
}
var authorName = videoData.author;
var authorName2 = videoData2.author;

var title = videoData.title;
var title2 = videoData2.title;

var infoComp = title + ", by " + authorName;
var infoComp2 = title2 + ", by " + authorName2;
var gameby = "<b>" +gameAssociated+" inspired</b> "+gameTitle + " by " + gameAuthor 
var gameinspi = "<b>" + gameTitle +" by " + gameAuthor  + " is based on</b> "+gameAssociated
console.log(infoComp);
console.log(infoComp2);

//console.log(player.l.playlist.length)

var fieldTitle = document.getElementById('videoInfo'); 
var fieldTitle2 = document.getElementById('videoInfo2'); 
var fieldInfo = document.getElementById('videoDesc'); 
var fieldTitle2 = document.getElementById('videoInfo2'); 
var fieldInfo2 = document.getElementById('videoDesc2'); 

fieldTitle.innerHTML = infoComp;
fieldTitle2.innerHTML = infoComp2;
fieldInfo2.innerHTML = gameinspi;
fieldInfo.innerHTML = gameby;
if (infoComp != ", by " && infoComp2 == ", by " ){
	refreshPage();
}

}

function searcher(mywords){
var firstpart = arrayPicker(["DSC", "MOV", "IMG", "100", "MVI"])
var separator = mywords
var numberBase = Math.floor(Math.random()*9999);
var numbers = padToFour(numberBase)

var query = separator;
var search = query;
if (search != null){
	return search;
}
else{
	refreshPage()
}
}



function padToFour(number) {
  if (number<=9999) { number = ("000"+number).slice(-4); }
  return number;
}

function arrayPicker(array){
return array[Math.floor(Math.random()*array.length)];
}




//grid code courtesy of https://dev.to/kaelscion/dynamically-filling-in-a-css-grid-with-javascript-5geb
const createGrid = () => {
	const markup = `
`
	console.log("WWP");
	document.body.innerHTML += markup
}