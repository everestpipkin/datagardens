#include "ofApp.h"
#include "ofxCenteredTrueTypeFont.h"

using namespace ofxCv;
using namespace cv;

//--------------------------------------------------------------
void ofApp::setup(){
    ofSetVerticalSync(true);
    ofSetFrameRate(60);

    hideNewDrawing = true;
    
    cam.setDeviceID(2);
    cam.setup(400, 240);
    camScale = (float)ofGetHeight()/(float)cam.getHeight();
    ofLog() << "camScale " << camScale;

    myfont2.load("Roboto-Light.ttf", 18);
    myfont2bold.load("Roboto-Bold.ttf", 36);
    myfont2bold2.load("Roboto-Bold.ttf", 18);
}

//--------------------------------------------------------------
void ofApp::update(){
    cam.update();
    
    if (gui->takeScreenshot) {
        takeScreenshot();
        gui->takeScreenshot = false;
    }
}

//--------------------------------------------------------------
void ofApp::draw(){
    ofSetColor(255,255,255);
    cam.draw(0,0, cam.getWidth()*camScale, cam.getHeight()*camScale);

    float scale = camScale/gui->camScale;
    ofSetLineWidth(5);
    for(int s = 0; s < gui->coloredStrokes.size(); s++){
        if (s == gui->coloredStrokes.size()-1 && gui->hideNewDrawing) {
            continue;
        }
        ofSetColor(gui->coloredStrokes[s].mycolor);
        std::vector<glm::vec3> vertices = gui->coloredStrokes[s].mystrokes.getVertices();
        if (vertices.size() > 1) {
            ofBeginShape();
            for (int i = 0; i < vertices.size() - 1; i++) {
                ofDrawLine(vertices[i].x*scale,vertices[i].y*scale,vertices[i+1].x*scale,vertices[i+1].y*scale);
                ofVertex(vertices[i].x*scale,vertices[i].y*scale);
            }
            ofEndShape();
        }
    }
    
    int x = ofGetWidth()*0.7;
    int w = ofGetWidth()*0.3;
    int h = ofGetHeight();
    ofSetColor(0);
    ofDrawRectangle(x,0,w,h);
    int centerX = ofGetWidth()*0.85;
    ofSetColor(255);
    myfont2bold.drawStringCentered("CFA VISION LAB", centerX, 75);
    myfont2.drawStringCentered("This lab seeks to contribute to a",centerX,150);
    ofSetColor(255,0,0);
    myfont2.drawStringCentered("better understanding of the human-",centerX,185);
    myfont2.drawStringCentered("computer relationship.",centerX,220);
    ofSetColor(255);
    myfont2.drawStringCentered("To that end, we demonstrate here",centerX,280);
    myfont2.drawStringCentered("an example of machine vision masking.",centerX,315);
    myfont2.drawStringCentered("Our technology is able to track",centerX,350);
    myfont2.drawStringCentered("viewers in front of a camera, and in",centerX,385);
    myfont2.drawStringCentered("real time provide feedback as to",centerX,420);
    myfont2.drawStringCentered("their position on-screen.",centerX,455);
    ofSetColor(ofColor(255, 187, 0));
    myfont2bold2.drawStringCentered("NO VIDEO IS BEING",centerX,555);
    myfont2bold2.drawStringCentered("RECORDED IN THIS",centerX,590);
    myfont2bold2.drawStringCentered("DEMONSTRATION",centerX,625);
}

//--------------------------------------------------------------
void ofApp::takeScreenshot(){
    printf("taking screenshot");
    ofDirectory dir("app_screenshots");
    dir.listDir();
    
    screenshot.grabScreen(0, 0 , ofGetWidth(), ofGetHeight());
    string name = "app_screenshots/screenshot";
    name += std::to_string(dir.size());
    name += ".png";
    screenshot.save(name);
}

//--------------------------------------------------------------
void ofApp::keyPressed(int key){
    if (key == 'f'){
        camScale = (float)ofGetHeight()/(float)cam.getHeight();
        ofLog() << camScale;
        ofToggleFullscreen();
    }
}

//--------------------------------------------------------------
void ofApp::keyReleased(int key){
    if (key == 1) {
        hideNewDrawing = false;
    }
}

//--------------------------------------------------------------
void ofApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void ofApp::mouseDragged(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mousePressed(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseReleased(int x, int y, int button){

}

//--------------------------------------------------------------
void ofApp::mouseEntered(int x, int y){

}

//--------------------------------------------------------------
void ofApp::mouseExited(int x, int y){

}

//--------------------------------------------------------------
void ofApp::windowResized(int w, int h){

}

//--------------------------------------------------------------
void ofApp::gotMessage(ofMessage msg){

}

//--------------------------------------------------------------
void ofApp::dragEvent(ofDragInfo dragInfo){ 

}
