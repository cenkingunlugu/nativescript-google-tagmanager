var application = require("application");
var googleTagManager = require("nativescript-google-tagmanager");
application.cssFile = "./app.css";

if (application.ios) {
    //IOS
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

application.start("main-page");

function initTagManager(){
    googleTagManager.initalize({
        containerId: "GTM-MBD24T",
        logLevel: 'verbose'
    });
}