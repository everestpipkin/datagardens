/*
var root = document.getElementById('text');

var container = document.createElement('div');
root.appendChild(container);

var box = document.createElement('div');

var boo = words[1].word;
*/


var myString = "";
var posList = "c1c2c3c4e1e2e3e4ce";
var corners = [0,1,2,3];
var edges = [4,5,6,7];
var center = [8];
var i = 0;
var selections = ["cornerFirst", "edgeFirst", "centerFirst"];
var selection = Math.floor(Math.random() * selections.length);
var tone = Math.floor(Math.random() * 2);


//**************functions********************

function SelectFrom(myList){

	if (myList.length == 0){
		console.log("OO" + myList);
		return false;
	}
	else{
		var rand = Math.floor(Math.random() * myList.length);
		//console.log(myList[rand]*2);
		myString += posList.substr(myList[rand]*2, 2);
		myList.splice(rand,1);
		return true;

	}
	

}

function CheckPrev(prevMove){

	if (prevMove == "e1"){
		myString += posList.substr(posList.indexOf("e4"), 2);
		myList.splice("e4",1);
	}
	else if (prevMove == "e2"){
		myString += posList.substr(posList.indexOf("e3"), 2);
		myList.splice("e3",1);
	}
	else if (prevMove == "e3"){
		myString += posList.substr(posList.indexOf("e2"), 2);
		myList.splice("e2",1);
	}
	else if (prevMove == "e4"){
		myString += posList.substr(posList.indexOf("e1"), 2);
		myList.splice("e1",1);
	}
}

function makeGrid(xVal, yVal){
	if (tone == 0){
		arrayNest[xVal][yVal] = words[randword].word;
		var selectRelatedword = Math.floor(Math.random() * words[randword].after.length);
		var chosenAfterword = words[randword].after[selectRelatedword];
		for ( z = 0; z < words.length; z++){
			if (words[z].word == chosenAfterword){
				randword = z;
			}
		}
	}
	else{
		arrayNest[xVal][yVal] = words[randword].word;
		var selectRelatedword = Math.floor(Math.random() * words[randword].after2.length);
		var chosenAfterword = words[randword].after2[selectRelatedword];
		for ( z = 0; z < words.length; z++){
			if (words[z].word == chosenAfterword){
				randword = z;
			}
		}
	}
}


//******************Generate perfect game start ****************

console.log(selection);

if (selection == 0){
	while (i <= 9){

		if (i == 0){
			if (!SelectFrom(corners)){

				SelectFrom(edges);
			}

		}
		if (i == 1 || i ==3){
			if (!SelectFrom(center)){
				SelectFrom(corners);
			}
		}
		if (i ==4){

			var prevMove = posList.substr(posList.length-2);
			CheckPrev(prevMove);
		}
		if (i == 2  || i > 4){
			var randCoin = Math.floor(Math.random() * 2);
			if (randCoin == 0){
				if (!SelectFrom(corners)){

				SelectFrom(edges);
				}

			}
			else{
				if (!SelectFrom(edges)){

				SelectFrom(corners);
				}

			}
		}
		i+=1;
		console.log(corners);
	}
}
else if (selection == 1){
	while (i <= 9){
		if (i == 0){
			if (!SelectFrom(edges)){

				SelectFrom(corners);
			}

		}
		if (i == 1 ){

			if (!SelectFrom(center)){
				SelectFrom(corners);
			}
		}
		if (i ==2){
				if (!SelectFrom(edges)){

				SelectFrom(corners);
				}
			//var prevMove = myList.substr(myList.length-2);
			//CheckPrev(prevMove);
		}
		if (i == 3){
			var prevMove = posList.substr(posList.length-2);
			CheckPrev(prevMove);
		}
		if ( i >= 4){
			var randCoin = Math.floor(Math.random() * 2);
			if (randCoin == 0){
				if (!SelectFrom(corners)){

				SelectFrom(edges);
				}

			}
			else{
				if (!SelectFrom(edges)){

				SelectFrom(corners);
				}

			}
		}
		i+=1;
		console.log(corners);
	}

}
else if (selection == 2){
	while (i <= 9){
		if (i == 0){

				if (!SelectFrom(center)){

					SelectFrom(corners);
				}

		}
		if (i == 1){
			SelectFrom(corners);
				
		}
		if (i == 2){
			SelectFrom(edges);
				
		}			
		if (i == 3){
			var prevMove = posList.substr(posList.length-2);
			CheckPrev(prevMove);
		}
		if ( i >= 4){
			var randCoin = Math.floor(Math.random() * 2);
			if (randCoin == 0){
				if (!SelectFrom(corners)){
				SelectFrom(edges);
				}
			}
			else{
				if (!SelectFrom(edges)){

					SelectFrom(corners);
				}

			}
		}
		i+=1;
		console.log(corners);
	}
}



//Generate text start*******************************

console.log(myString);
console.log(myString.search("c1"));

var arrayNest = [[0,0,0],[0,0,0], [0,0,0]];

var randword = Math.floor(Math.random() * words.length);
for ( o = 0; o < myString.length; o+= 2){
	if (myString.substr(o,2) == "c1"){

		makeGrid(0,0);
	}
	if (myString.substr(o,2) == "c2"){
		makeGrid(0,2);
	}
	if (myString.substr(o,2) == "c3"){
		makeGrid(2,0);
	}
	if (myString.substr(o,2) == "c4"){
		makeGrid(2,2);
	}
	if (myString.substr(o,2) == "ce"){
		makeGrid(1,1);
	}
	if (myString.substr(o,2) == "e1"){
		makeGrid(0,1);
	}	
	if (myString.substr(o,2) == "e2"){
		makeGrid(1,0);
	}
	if (myString.substr(o,2) == "e3"){
		makeGrid(1,2);
	}
	if (myString.substr(o,2) == "e4"){
		makeGrid(2,1);
	}
}



//grid code courtesy of https://dev.to/kaelscion/dynamically-filling-in-a-css-grid-with-javascript-5geb
const createGrid = () => {
	const markup = `
	<div class = "container" id = "container" style = "display: grid;
													border: 1px black solid;
													height : 100%;
													padding: 10px;
													background-color: #00000;

													width: 100%>"
	</div>`
	document.body.innerHTML += markup
}
const layoutGrid = (height, width) => {
	const container = document.getElementById('container')
	container.style.gridTemplateColumns = `repeat(${width}, 1fr`
	    container.style.gridTemplateRows = `repeat(${height}, 1fr)`
}
const fillGrid = (x, y, blockSize, numOfBlocks, color) => {
    const container = document.getElementById('container')
    const test = arrayNest;
            for (i =0; i < arrayNest.length; i++){
	            	for (p = 0; p < arrayNest[i].length; p++){
	                let markup = `<div id="card ${i}" 
	                                   style="grid-column: ${y * 5} / }; 
	                                          grid-row: ${x * 5} };
	                                          background-color: ${color};
	                                          font-size:20px;
	                                          padding:70px;
	                                          background-color: rgba(255, 255, 255, 0.8);
	 										  border: 4px solid rgba(0, 0, 0, 0.8);
	                                          text-align: center;

	                                          border: .1px black solid;">${arrayNest[i][p]}</div>`
	                container.innerHTML += markup
            	}
            };
}
//from w3 tutorial: https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_print
function myFunction() {
  window.print();
}
/*
var container = document.createElement('div');
root.appendChild(container);
console.log("W" + arrayNest[0].length);
for (i =0; i < arrayNest.length; i++){
	var box = document.createElement('grid-item');

	for (p = 0; p < arrayNest[i].length; p++){
		var h3 = document.createElement('p');
		console.log("LLL"+ arrayNest[i][p]);
		h3.textContent = arrayNest[i][p];
		container.appendChild(h3);

}
	container.appendChild(box);

}
*/

// go through mystring 
//decide theme
//choose random word 
//find follw up words
//add to new string seperated by ,
//make array
// out in divs
