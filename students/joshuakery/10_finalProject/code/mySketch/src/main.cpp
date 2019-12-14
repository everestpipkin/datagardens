#include "ofMain.h"
#include "ofApp.h"
#include "guiApp.h"
#include "ofAppGLFWWindow.h"

//========================================================================
int main( ){
//	ofSetupOpenGL(320, 240, OF_FULLSCREEN);			// <-------- setup the GL context
//	ofRunApp(new ofApp());
    
    ofGLFWWindowSettings settings;

    settings.setSize(1080, 1920);
    settings.setPosition(glm::vec2(300,0));
    settings.resizable = true;
//    settings.windowMode = OF_FULLSCREEN;
    shared_ptr<ofAppBaseWindow> mainWindow = ofCreateWindow(settings);

    settings.setSize(800, 600);
    settings.setPosition(glm::vec2(0,0));
    settings.resizable = true;
//    settings.windowMode = OF_WINDOW;
    shared_ptr<ofAppBaseWindow> guiWindow = ofCreateWindow(settings);

    shared_ptr<ofApp> mainApp(new ofApp);
    shared_ptr<GuiApp> guiApp(new GuiApp);
    mainApp->gui = guiApp;

    ofRunApp(guiWindow, guiApp);
    ofRunApp(mainWindow, mainApp);
    ofRunMainLoop();
    
}
