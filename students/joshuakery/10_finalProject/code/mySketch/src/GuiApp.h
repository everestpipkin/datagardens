//
//  guiApp.h
//  mySketch
//
//  Created by Joshua Kery on 11/27/19.
//

#pragma once

#include "ofMain.h"
#include "ofxCv.h"

#define CAM_DEVICE_ID 1

class GuiApp : public ofBaseApp{

public:
    void setup();
    void update();
    ofVec2f getOffset(ofVec2f vertex);
    void draw();

    void keyPressed(int key);
    void keyReleased(int key);
    void mouseMoved(int x, int y );
    void mouseDragged(int x, int y, int button);
    void mousePressed(int x, int y, int button);
    void mouseReleased(int x, int y, int button);
    
    array<ofColor,20> clr_choices {
           ofColor(255,0,0),
           ofColor(0,255,0),
           ofColor(0, 42, 255),
           ofColor(255, 187, 0),
           ofColor(255, 0, 187),
           ofColor(0, 255, 213),
           ofColor(157, 0, 255),
           ofColor(251, 255, 0),
           ofColor(162, 255, 0),
           ofColor(252, 107, 3),
           ofColor(189, 194, 149),
           ofColor(67, 107, 47),
           ofColor(115, 255, 150),
           ofColor(10, 222, 255),
           ofColor(83, 139, 189),
           ofColor(180, 179, 255),
           ofColor(106, 66, 207),
           ofColor(251, 179, 255),
           ofColor(255, 179, 197),
           ofColor(255, 0, 60)
       };
   int chosen_clr;
   
   struct coloredStroke {
       ofMesh mystrokes;
       ofColor mycolor;
       bool isStatic;
   };
   std::vector<coloredStroke> coloredStrokes;
    std::vector<coloredStroke> erased;
   
   ofVideoGrabber cam;
   //Kyle McDonald:
   ofxCv::FlowFarneback flow;
   ofMesh mesh;
   int stepSize, xSteps, ySteps;
   
   float camScale;
   
   bool hideNewDrawing;
    
    bool takeScreenshot;
    string message;
    ofImage screenshot;
    
};
