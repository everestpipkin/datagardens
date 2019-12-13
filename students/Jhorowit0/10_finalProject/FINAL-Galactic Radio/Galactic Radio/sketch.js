var sys;
var freq = [0];
var controller;
var display;
var isInit = false;


function setup() {
	createCanvas(100,100);
	radar = loadImage('assets/radar.png');
	knob = loadImage('assets/knob.png')
	controls = loadImage('assets/controls.png');
	terminal = loadImage('assets/terminal.png');
	terminalBG = loadImage('assets/terminalbg.png');
	bg = loadImage('assets/background.png');
	imageMode(CENTER);
}

function init(){
	sys = new System();
	setInterval(time, 1500);
	setInterval(updateDisplay, 150);
	controller = new Controls();
	display = new Display();
}

function start(){
	let fs = fullscreen();
	fullscreen(!fs);
	resizeCanvas(windowWidth*1.1, windowHeight*1.1);
}

function windowResized() {
  }

function time(){
	sys.rotate();
}

function updateDisplay(){
	display.update();
}

function draw() {
	background(50);
	image(bg,width/2,height/2,width,height);
	if(isInit == true){
		sys.update();
		sys.show(freq);
		//sys.showPath(freq);
		controller.show();
		controller.update(freq,mouseX);
		display.show();
	}
}

function mousePressed(){
	if(isInit == false){
		start();
		init();
		isInit = true;
	}
	else{
		let result = controller.pressed(mouseX,mouseY,freq);
		if(result == 0 && freq.length < 8) freq = [0].concat(freq);
		else if( result == 1 && freq.length > 1) freq = freq.slice(1);
	}
}

function mouseReleased(){
	controller.release();
}


function keyPressed(){
	if(keyCode == 49){
		display.clear();
	}
	if(keyCode == 50){
		display.display('HELP...SOSSOSOS\n > ');
	}
	if(keyCode == 51){
		display.cut();
	}
}


function updateBroadcast(pos){
	sys.updateBroadcast(pos);
}

function broadcast(){
	sys.broadcast();
}

function terminalLog(message){
	display.display(message);
}
