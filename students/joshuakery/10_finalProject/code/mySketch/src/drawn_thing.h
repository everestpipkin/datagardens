//
//  drawn_thing.h
//  mySketch
//
//  Created by Joshua Kery on 11/15/19.
//

#ifndef drawn_thing_h
#define drawn_thing_h

#include "ofMain.h"

class drawn_thing {

    public: // place public functions or variables declarations here

    // methods, equivalent to specific functions of your class objects
    void setup();    // setup method, use this to setup your object's initial state
    void update();  // update method, used to refresh your objects properties
    void draw();    // draw method, this where you'll do the object's drawing

    // variables
    ofPoint pts[1000];
    int nPts;
    ofColor clr;  // color using ofColor type
    
    drawn_thing(ofColor c) {
        nPts=0;
        clr=c;
    }

//    drawn_thing() {
////        clr = c;
//        nPts = 0;
//    };  // constructor
    
};


#endif /* drawn_thing_h */
