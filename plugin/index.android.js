var application = require("application");
var availableLoggingTypes = {
  "verbose": '',
  "debug": '',
  "info": '',
  "error": '',
  "none": ''
};

var tagLayer = null;
var tagManager = null;

exports.initalize = function (config) {
    if(config.containerId){
        var context = application.android.context;
        tagManager = com.google.android.gms.tagmanager.TagManager.getInstance(context);
        if (config.logLevel && !!availableLoggingTypes[config.logLevel]) {
           tagManager.setVerboseLoggingEnabled(true);
        }
        
        var pending = tagManager.loadContainerPreferNonDefault(
         config.containerId,
         android.R.raw[config.containerId]);

        var containerHolder = pending.await(0, java.util.concurrent.TimeUnit.SECONDS);
        if (containerHolder.status != com.google.android.gms.common.api.Status.RESULT_SUCCESS) {
              // deal with failure
              console.error('Error while creating container');
        } else {
            console.log("Tag Manager Initialized with config: " + JSON.stringify(config) + " at " + new Date());
        }
 
        tagLayer = com.google.android.gms.tagmanager.TagManager.getInstance(context).getDataLayer();

        
    } else {
        throw "Sup boss, how do you plan on tracking with no containerId?  Please add it to the config";
    }
}

exports.log = function(logJson){
    if (tagLayer) {
      var map = new java.util.HashMap();

      Object.keys(logJson).forEach(key => {
          map.put(key, logJson[key]);
      });
      console.log("Tag Manager Event: Log : " + map + " at " + new Date());
      tagLayer.push(map);
    }
    else {
      console.error('Looks like you tried to log before initialization!');
    }
}