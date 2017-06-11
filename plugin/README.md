# Nativescript Google Tag Manager #

## Add Plugin ##
```
tns plugin add nativescript-google-tagmanager 
```

## Initalize the tracker in app.js ##
### PLAIN JS ###
``` js
var application = require("application");
var tagManager = require("nativescript-google-tagmanager");
application.mainModule = "main-page";
application.cssFile = "./app.css";

if (application.ios) {
    //iOS
    var __extends = this.__extends || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        __.prototype = b.prototype;
        d.prototype = new __();
    };
    
    var appDelegate = (function (_super) {
        __extends(appDelegate, _super);
        function appDelegate() {
            _super.apply(this, arguments);
        }
        
        appDelegate.prototype.applicationDidFinishLaunchingWithOptions = function (application, launchOptions) {
            initTagManager(); //Module Code to initalize
        };
        
        appDelegate.ObjCProtocols = [UIApplicationDelegate];
        return appDelegate;
    })(UIResponder);
    application.ios.delegate = appDelegate;
}else{
    //ANDROID
    application.on(application.launchEvent, function (args) {
        initTagManager(); //Module Code to initalize
    });

}

application.start();

function initTagManager(){
    tagManager.initalize({
        containerId: "GTM-XXXXXX", //YOUR Id from GTM
        logLevel: 'verbose'//Optional, default none.
        //available values: 'verbose', 'debug', 'info', 'warning', 'error'
    });
}

```

#### Typescript ###
```js
var application = require("application");
import * as googleTagManager from "nativescript-google-tagmanager";
application.mainModule = "main-page";
application.cssFile = "./app.css";

if (application.ios) {
    //iOS
    class MyDelegate extends UIResponder implements UIApplicationDelegate {
        public static ObjCProtocols = [UIApplicationDelegate];

        applicationDidFinishLaunchingWithOptions(application: UIApplication, launchOptions: NSDictionary): boolean {
            initTagManager(); //Module Code to initalize
            return true;
        }

    }

    application.ios.delegate = MyDelegate;

}else{
    //ANDROID
    application.on(application.launchEvent, function (args) {
        initTagManager(); //Module Code to initalize
    });

}

application.start();

function initTagManager(){
    googleTagManager.initalize({
        containerId: "GTM-XXXXXX", //YOUR Id from GTM
        logLevel: 'verbose'//Optional, default none.
        //available values: 'verbose', 'debug', 'info', 'warning', 'error'
    });
}

```

## Methods ##

### Log Anything ###
``` js
// category and action are not optional, label and value are
googleTagManager.log({
  "event": "eventTrack",
  "eventCategory": "Button",
  "eventAction": "Press",
  "eventLabel": "Sign Up",
  "screenName": "Login"
});

googleTagManager.log({
  "event": "screenVisible",
  "screenName": "Login"
});
```
