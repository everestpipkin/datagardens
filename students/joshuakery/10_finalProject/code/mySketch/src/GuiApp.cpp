//
//  guiApp.cpp
//  mySketch
//
//  Created by Joshua Kery on 11/27/19.
//

#include "GuiApp.h"
#include "ofApp.h"

using namespace ofxCv;
using namespace cv;

//--------------------------------------------------------------
void GuiApp::setup(){
        ofSetVerticalSync(true);
        ofSetFrameRate(60);
        
        cam.setVerbose(false);
    ofLog() << "DEVICES ON THIS COMP";
        cam.listDevices();
        cam.setDeviceID(2);
        cam.setup(400, 240);
        
        chosen_clr = 0;
        hideNewDrawing = true;
        camScale = (float)ofGetHeight()/(float)cam.getHeight();
        printf("camScale = %f\n", camScale);
        
        //Kyle McDonald:
        mesh.setMode(OF_PRIMITIVE_TRIANGLES);
        stepSize = 4;
        ySteps = cam.getHeight() / stepSize;
        xSteps = cam.getWidth() / stepSize;
        for(int y = 0; y < ySteps; y++) {
            for(int x = 0; x < xSteps; x++) {
                mesh.addVertex(ofVec3f(x * stepSize, y * stepSize));
                mesh.addTexCoord(ofVec2f(x * stepSize, y * stepSize));
            }
        }
        for(int y = 0; y + 1 < ySteps; y++) {
            for(int x = 0; x + 1 < xSteps; x++) {
                int nw = y * xSteps + x;
                int ne = nw + 1;
                int sw = nw + xSteps;
                int se = sw + 1;
                mesh.addIndex(nw);
                mesh.addIndex(ne);
                mesh.addIndex(se);
                mesh.addIndex(nw);
                mesh.addIndex(se);
                mesh.addIndex(sw);
            }
        }

    takeScreenshot = false;
    message = "";

}

//--------------------------------------------------------------
void GuiApp::update(){
    cam.update();
     
    
     if(cam.isFrameNew()) {
         flow.setWindowSize(8);
         flow.calcOpticalFlow(cam);
         
         std::vector<int> toDelete;
         for(int s = 0; s < coloredStrokes.size(); s++){
             
             std::vector<glm::vec3> vertices = coloredStrokes[s].mystrokes.getVertices();
             if (vertices.size() > 1) {
                 for (int i = 0; i < vertices.size(); i++) {
                     ofVec2f vertex = vertices[i];
                     
                     //if vertex is in camera range, manipulate it
                     if (vertex.x > 0 && vertex.x < (cam.getWidth()*camScale) &&
                         vertex.y > 0 && vertex.y < (cam.getHeight()*camScale) )
                     {

                         ofVec2f offset = getOffset(vertex);
//                         if (abs(offset.x) > 1) {
//                             ofLog() << "greater than";
//                         }
                         if (abs(offset.x) < 1 && abs(offset.y) < 1 && !coloredStrokes[s].isStatic) {
                             ofVec3f total = vertex + offset;
                             coloredStrokes[s].mystrokes.setVertex(i,total);
                         }
                     
                     }

                     //else, mark its whole stroke for deletion
                     else {
                         toDelete.push_back(s);
                         break;
                     }
                 }
             }
             
             //delete all strokes marked for deletion
             for(int d = 0; d < toDelete.size(); d++) {
                 int index = toDelete[d];
                 coloredStrokes.erase(coloredStrokes.begin() + index);
             }
             toDelete.clear();
         
             
         }
           
     }
}

ofVec2f GuiApp::getOffset(ofVec2f vertex) {
    //get nearest flow region
    float flowX = glm::clamp( ((vertex.x/(float)camScale) / stepSize * stepSize), (float)stepSize/2, (float)cam.getWidth() - stepSize);
    float flowY = glm::clamp( ((vertex.y/(float)camScale) / stepSize * stepSize), (float)stepSize/2, (float)cam.getHeight() - stepSize);
    
    ofVec2f position(flowX,flowY);
    ofRectangle area(position - ofVec2f(stepSize, stepSize) / 2, stepSize, stepSize);
    ofVec2f offset = flow.getAverageFlowInRegion(area);
    return offset*camScale;
}

//--------------------------------------------------------------
void GuiApp::draw(){
    ofSetColor(255,255,255);
    cam.draw(0,0, cam.getWidth()*camScale, cam.getHeight()*camScale);
    ofVec2f mouse(ofGetMouseX(),ofGetMouseY());
    ofSetLineWidth(5);
    for(int s = 0; s < coloredStrokes.size(); s++){
        ofSetColor(coloredStrokes[s].mycolor);
        std::vector<glm::vec3> vertices = coloredStrokes[s].mystrokes.getVertices();
        if (vertices.size() > 1) {
            ofBeginShape();
            for (int i = 0; i < vertices.size() - 1; i++) {
                if (coloredStrokes[s].isStatic) {
                    ofSetColor(ofColor(255));
                    ofDrawLine(vertices[i].x,vertices[i].y,vertices[i+1].x,vertices[i+1].y);
                    ofSetColor(coloredStrokes[s].mycolor);
                } else {
                    ofVec2f v = vertices[i];
                    if (v.distance(mouse) < 10) {
                        ofSetColor(ofColor(200,200,200));
                        ofDrawLine(vertices[i].x,vertices[i].y,vertices[i+1].x,vertices[i+1].y);
                        ofSetColor(coloredStrokes[s].mycolor);
                    } else {
                        ofDrawLine(vertices[i].x,vertices[i].y,vertices[i+1].x,vertices[i+1].y);
                    }
                }
                ofVertex(vertices[i].x,vertices[i].y);
            }
            ofEndShape();
        }
    }
    
    ofSetColor(clr_choices[chosen_clr]);
    ofDrawRectangle(10,10,50,50);
    ofDrawBitmapString(message, 100, 20);
}

//--------------------------------------------------------------
void GuiApp::keyPressed(int key){
    if (key == 'w') {
        //Delete topmost stroke below mouse
        for(int s = (int)(coloredStrokes.size()) - 1; s >= 0; s--) {
            std::vector<glm::vec3> vertices = coloredStrokes[s].mystrokes.getVertices();
            if (vertices.size() > 1) {
                for(auto & vertex: vertices) {
                    ofVec2f v = vertex;
                    ofVec2f mouse(ofGetMouseX(),ofGetMouseY());
                    if (v.distance(mouse) < 10) {
                        erased.push_back(coloredStrokes[s]);
                        coloredStrokes.erase(coloredStrokes.begin() + s);
                        return;
                    }
                }
            }
        }
    }
    
    else if (key == 'z' && erased.size() > 0) {
        ofLog() << "undoing";
        coloredStrokes.push_back(erased[erased.size()-1]);
        erased.clear();
//        erased.erase(erased.size()-1);
    }
    
    else if (key == 'a') {
        //Change color
        chosen_clr = (chosen_clr+1) % clr_choices.size();
    }
    
    else if (key == 's') {
        float least = 30;
        int closest = -1;
        //Lock the stroke
        for(int s = (int)(coloredStrokes.size()) - 1; s >= 0; s--) {
            std::vector<glm::vec3> vertices = coloredStrokes[s].mystrokes.getVertices();
            if (vertices.size() > 1) {
                for(auto & vertex: vertices) {
                    ofVec2f v = vertex;
                    ofVec2f mouse(ofGetMouseX(),ofGetMouseY());
                    if (v.distance(mouse) < 30) {
                        ofLog() << v.distance(mouse);
                        if (v.distance(mouse) < least) {
                            least = v.distance(mouse);
                            closest = s;
                        }
                    }
                }
            }
        }
//        ofLog() << "closest " << closest;
//        ofLog() << "size " << coloredStrokes.size();
        if (closest > -1) {
//            ofLog() << "isStatic " << coloredStrokes[0].isStatic;
            coloredStrokes[closest].isStatic = !coloredStrokes[closest].isStatic;
        }
    }
    
    else if (key == 1) {
        hideNewDrawing = false;
    }
    
    else if (key == 'f') {
        ofToggleFullscreen();
    }
    
    else if(key == 'x'){
        ofDirectory dir("gui_screenshots");
        dir.listDir();
        
        screenshot.grabScreen(0, 0 , ofGetWidth(), ofGetHeight());
        string name = "gui_screenshots/screenshot";
        name += std::to_string(dir.size());
        name += ".png";
        screenshot.save(name);
        
        takeScreenshot = true;
        
//        screenshot.grabScreen(0, 0 , ofGetWidth(), ofGetHeight());
//        string name = "gui_screenshots/screenshot";
//        name += std::to_string(dir.size());
//        name += ".png";
//        screenshot.save(name);
        
        message = name + " saved.";
    }
}

//--------------------------------------------------------------
void GuiApp::keyReleased(int key){
   if (key == 1) {
       hideNewDrawing = false;
   }
}

//--------------------------------------------------------------
void GuiApp::mouseMoved(int x, int y ){

}

//--------------------------------------------------------------
void GuiApp::mouseDragged(int x, int y, int button){
    if ((x > 0) && (x < (cam.getWidth()*camScale)) &&
           (y > 0) &&(y < (cam.getHeight()*camScale)))
       {
           coloredStrokes.back().mystrokes.addVertex({x,y,0});
       }
}

//--------------------------------------------------------------
void GuiApp::mousePressed(int x, int y, int button){
    coloredStrokes.emplace_back();
    coloredStrokes.back().mycolor = clr_choices[chosen_clr];
    coloredStrokes.back().isStatic = false;
    hideNewDrawing = true;
}

//--------------------------------------------------------------
void GuiApp::mouseReleased(int x, int y, int button){
    hideNewDrawing = false;
}
