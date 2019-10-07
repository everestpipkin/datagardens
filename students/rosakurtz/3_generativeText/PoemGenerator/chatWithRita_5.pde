import org.qscript.*;
import org.qscript.editor.*;
import org.qscript.errors.*;
import org.qscript.events.*;
import org.qscript.eventsonfire.*;
import org.qscript.operator.*;

import rita.*;
String present = "poppy";
String past="";
String file="info.txt";
  
PrintWriter info;
int m=3;
int w=400;
int h=500;
int numFrames = 9;  // The number of frames in the animation
int currentFrame = 0;
boolean printed=false;
int fill=50;

void setup(){
  frameRate(24);
  surface.setResizable(true); 
  surface.setSize(w,h);
}
 void draw(){
   
  String prp=RiTa.randomWord("prp$");
  String line1="";
  String line2="";
  String line3="";
  String line4="";
  String line5="";
  String line6="";
  String line7="";
  String line8="";
  String line9="";
  
  line1=prp+" ";
  line1=line1+" "+RiTa.randomWord("jj",2)+" ";
  line1=line1+" "+RiTa.randomWord("nn",1);
  line2=RiTa.randomWord("vbd")+" "+RiTa.randomWord("rb"); //RiTa.randomWord("jjs") RiTa.randomWord("rbs")
  line3=prp+" "+RiTa.randomWord("jjs")+" "+RiTa.randomWord("nn");
  line4=RiTa.randomWord("vbd")+" "+RiTa.randomWord("rb",1);
  line5=RiTa.randomWord("in")+" "+RiTa.randomWord("jj")+" "+RiTa.randomWord("nn");
  line6=prp+" "+RiTa.randomWord("jj")+" "+RiTa.randomWord("nn");
  line7=RiTa.randomWord("nns")+" "+RiTa.randomWord("rbr")+" "+RiTa.randomWord("vbn");
  line8=RiTa.randomWord("nns")+" "+RiTa.randomWord("vbn");
  line9=RiTa.randomWord("vbd")+" "+RiTa.randomWord("to")+" "+RiTa.randomWord("cd")+" "+RiTa.randomWord("jj")+" "+RiTa.randomWord("nn",1);
if(printed==false){
  fill(fill);
  int  b=100;
  int h=50;
  text(line1, 10, 10+h*0, b, h);
  text(line2, 10, 10+h*1, b, h);
  text(line3, 10, 10+h*2, b, h);
  text(line4, 10, 10+h*3, b, h);
  text(line5, 10, 10+h*4, b, h);
  text(line6, 10, 10+h*5, b, h);
  text(line8, 10, 10+h*6, b, h);
  text(line9, 10, 10+h*7, b, h);
  text(line9, 10, 10+h*7, 0, h);

  printed=true;
  
  image(m(10),0,0,10,10);
}


}


PImage m(int n){
 

PImage img=createImage(n,n,RGB);
loadPixels();  

for (int i = 0; i < pixels.length; i++) {
  
  float rand = random(255);
  // Create a grayscale color based on random number
  color c = color(rand);
  // Set pixel at that location to random color
  pixels[i] = c;
}

 updatePixels();
 return img;
}
