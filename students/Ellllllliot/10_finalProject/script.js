
//STORAGE SPACE FOR ALL OF CLEATS & TEXT



var cleatImages = [	"images/editedCleats/Cleat1.png",
					"images/editedCleats/Cleat2.png",
					"images/editedCleats/Cleat3.png",
					"images/editedCleats/Cleat5.png",
					"images/editedCleats/Cleat6.png",
					"images/editedCleats/Cleat7.png",
					"images/editedCleats/Cleat9.png",
					"images/editedCleats/Cleat10.png",
					"images/editedCleats/Cleat11.png",
					"images/editedCleats/Cleat13.png",
					"images/editedCleats/Cleat14.png",
					"images/editedCleats/Cleat15.png"
					];

var flowerImages = ["images/editedFlowers/acacia.png",
					"images/editedFlowers/amaryillis.png",
					"images/editedFlowers/aster.png",
					"images/editedFlowers/BellsOfIreland.png",
					"images/editedFlowers/Calla.png",
					"images/editedFlowers/carnation.png",
					"images/editedFlowers/daffodil.png",
					"images/editedFlowers/delphinium.png",
					"images/editedFlowers/denbrobium.png",
					"images/editedFlowers/freesia.png",
					"images/editedFlowers/gerbera.png",
					"images/editedFlowers/gladiolus.png",
					"images/editedFlowers/heather.png",
					"images/editedFlowers/hypericum.png",
					"images/editedFlowers/iris.png",
					"images/editedFlowers/liasanthus.png",
					"images/editedFlowers/liatrus.png",
					"images/editedFlowers/lilac.png",
					"images/editedFlowers/lily.png",
					"images/editedFlowers/rose.png",
					"images/editedFlowers/snapdragon.png",
					"images/editedFlowers/solidago.png",
					"images/editedFlowers/statice.png",
					"images/editedFlowers/stock.png",
					"images/editedFlowers/sunflower.png",
					"images/editedFlowers/tulip.png",
					"images/editedFlowers/waxflower.png"
					];


//ON CLICK FUNCTIONS

document.getElementById("cleatsImage").addEventListener("click", cleatsOnClick);
document.getElementById("imgHalfOne").addEventListener("click", halfOneOnClick);
document.getElementById("imgQuadrantTR").addEventListener("click", quadrantTROnClick);
document.getElementById("imgQuadrantBR").addEventListener("click", quadrantBROnClick);



//RANDOM PLACEMENT OF FLOWERS

function getHalfOneCoords () {
	var width = Math.floor(Math.random() * 40);     // returns a random integer from 0 to 9
	var height = Math.floor(Math.random() * 200);     // returns a random integer within box
	document.getElementById("imgHalfOne").style.top = height + '%';
	document.getElementById("imgHalfOne").style.left = width + '%';
};


function getQuadrantTRCoords () {
	var width = Math.floor(Math.random() * 40);     // returns a random integer from 0 to 9
	var height = Math.floor(Math.random() * 100);     // returns a random integer within box
	document.getElementById("imgQuadrantTR").style.top = height + '%';
	document.getElementById("imgQuadrantTR").style.left = width + '%';
};


function getQuadrantBRCoords () {
	var width = Math.floor(Math.random() * 40);     // returns a random integer from 0 to 9
	var height = Math.floor(Math.random() * 100);     // returns a random integer within box
	document.getElementById("imgQuadrantBR").style.top = height + '%';
	document.getElementById("imgQuadrantBR").style.left = width + '%';
};



//RANDOM IMAGE GRABBING FUNCTIONS

function getCleatImg () {
	document.getElementById("cleatsImage").src = cleatImages[Math.floor(Math.random()*cleatImages.length)];
};

function getHalfOneImg () {
	document.getElementById("imgHalfOne").src = flowerImages[Math.floor(Math.random()*flowerImages.length)];
};

function getQuadrantTRImg () {
	document.getElementById("imgQuadrantTR").src = flowerImages[Math.floor(Math.random()*flowerImages.length)];
};

function getQuadrantBRImg () {
	document.getElementById("imgQuadrantBR").src = flowerImages[Math.floor(Math.random()*flowerImages.length)];
};


// TEXT CHANGING STUFF

function changeCleatTitleText () {
	document.getElementById("textH1").innerHTML = cleatNames[Math.floor(Math.random()*cleatNames.length)];
};

function changeScrollText () {
	document.getElementById("scroll").innerHTML = descriptions[Math.floor(Math.random()*descriptions.length)];
};





//AUDIO PLAYER BACKGROUND NOISE & DIRT
// https://stackoverflow.com/questions/50490304/how-to-make-audio-autoplay-on-chrome

var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    if(!isChrome){
      $('#audio').remove()
    }
  else{
     $('#playAudio').remove() //just to make sure that it will not have 2x audio in the background 
  }


// DIRT PUSH AUDIO

function playDirt() {
  document.getElementById("dirt").play();
}




//ON CLICK FUNCTIONS


function cleatsOnClick () {
	getCleatImg();
	getHalfOneImg();
	getQuadrantTRImg();
	getQuadrantBRImg();
	changeCleatTitleText();
	changeScrollText();
};

function halfOneOnClick () {
	getHalfOneImg();
	getHalfOneCoords();
	changeScrollText();
	playDirt();
};

function quadrantTROnClick () {
	getQuadrantTRImg();
	getQuadrantTRCoords();
	playDirt();
};

function quadrantBROnClick () {
	getQuadrantBRImg();
	getQuadrantBRCoords();
	playDirt();
};













getHalfOneCoords();
getQuadrantTRCoords();
getQuadrantBRCoords();

getCleatImg();
getHalfOneImg();
getQuadrantTRImg();
getQuadrantBRImg();