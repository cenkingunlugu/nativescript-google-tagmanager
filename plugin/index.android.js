var application = require("application");
var availableLoggingTypes = {
  "verbose": kTAGLoggerLogLevelVerbose,
  "debug": kTAGLoggerLogLevelDebug,
  "info": kTAGLoggerLogLevelInfo,
  "error": kTAGLoggerLogLevelError,
  "none": kTAGLoggerLogLevelNone
};

var tagLayer = null;
var tagManager = null;

exports.initalize = function (config) {
    if(config.containerId){
        var context = application.android.context;
        tagManager = com.google.android.gms.tagmanager.TagManager.getInstance(context);
        tagLayer = tagManager.getDataLayer();

        if (config.logLevel && !!availableLoggingTypes[logLevel]) {
           tagManager.setVerboseLoggingEnabled(true);
        }
        tagManager.loadContainerPreferNonDefault(config.containerId,
                R.raw.defaultcontainer_binary);
    } else {
        throw "Sup boss, how do you plan on tracking with no containerId?  Please add it to the config";
    }
}

exports.log = function(logJson){
    if (tagLayer) {
      if (config.logLevel !== availableLoggingTypes.none) {
        console.log("Tag Manager Event: Log : " + JSON.stringify(logJson) + " at " + new Date());
      }
      tagLayer.push(logJson);
    }
    else {
      console.error('Looks like you tried to log before initialization!');
    }
}