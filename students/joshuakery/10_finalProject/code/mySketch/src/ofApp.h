#pragma once

#include "ofMain.h"
#include "GuiApp.h"
#include "ofxCv.h"
#include "ofxCenteredTrueTypeFont.h"

#define MAX_PTS 1000
#define MAX_STROKES 3

class ofApp : public ofBaseApp{

	public:
		void setup();
		void update();
		void draw();
    
        void takeScreenshot();

		void keyPressed(int key);
		void keyReleased(int key);
		void mouseMoved(int x, int y );
		void mouseDragged(int x, int y, int button);
		void mousePressed(int x, int y, int button);
		void mouseReleased(int x, int y, int button);
		void mouseEntered(int x, int y);
		void mouseExited(int x, int y);
		void windowResized(int w, int h);
		void dragEvent(ofDragInfo dragInfo);
		void gotMessage(ofMessage msg);
    
        shared_ptr<GuiApp> gui;
    
    ofVideoGrabber cam;
    
    struct coloredStroke {
        ofMesh mystrokes;
        ofColor mycolor;
        bool isStatic;
    };
    std::vector<coloredStroke> coloredStrokes;
    
    float camScale;
	
    bool hideNewDrawing;
    
    ofImage screenshot;
    
    ofTrueTypeFont myfont;
    ofxCenteredTrueTypeFont myfont2;
    ofxCenteredTrueTypeFont myfont2bold;
    ofxCenteredTrueTypeFont myfont2bold2;
};
