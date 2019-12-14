#pragma once

#include "ofMain.h"

class ofxCenteredTrueTypeFont : public ofTrueTypeFont{
    
public:
    
    ofVec2f getOffset( string s ){
        ofRectangle r = getStringBoundingBox(s, 0, 0);
        return ofVec2f( floor(-r.x - r.width * 0.5f), floor(-r.y - r.height * 0.5f) );
    }
    
    void drawStringCentered(string s, float x, float y, bool asVector = false){
        ofVec2f offset = getOffset(s);
        if (!asVector)
            drawString(s, x + offset.x, y + offset.y);
        else
            drawStringAsShapes(s, x + offset.x, y + offset.y);
    }
    
    void drawStringCentered(string s, ofVec2f pos, bool asVector = false){
        drawStringCentered(s, pos.x, pos.y, asVector);
    }
    
    void drawCenteredBoundingBox(string s, float x, float y, float padding = 0){
        ofRectangle r = getStringBoundingBox(s, 0, 0);
        r.x -= padding;
        r.y -= padding;
        r.width += 2.0f * padding;
        r.height += 2.0f * padding;
        ofSetRectMode(OF_RECTMODE_CENTER);
        ofDrawRectangle( x, y, r.width, r.height);
        ofSetRectMode(OF_RECTMODE_CORNER);
    }
    void drawCenteredBoundingBox(string s, ofVec2f pos, float padding = 0){
        drawCenteredBoundingBox(s, pos.x, pos.y, padding);
    }
    
    void drawStringCenteredVertically(string s, float x, float y){
        ofVec2f offset = getOffset(s);
        drawString(s, x, y + offset.y );
    }
    void drawStringCenteredVertically(string s, ofVec2f pos){
        drawStringCenteredVertically(s, pos.x, pos.y);
    }
    
    void drawStringCenteredHorizontally(string s, float x, float y){
        ofVec2f offset = getOffset(s);
        drawString(s, x + offset.x, y);
    }
    void drawStringCenteredHorizontally(string s, ofVec2f pos){
        drawStringCenteredHorizontally(s, pos.x, pos.y);
    }
};
