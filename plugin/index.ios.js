var application = require("application");
var availableLoggingTypes = {
  "verbose": "kTAGLoggerLogLevelVerbose",
  "debug": "kTAGLoggerLogLevelDebug",
  "info": "kTAGLoggerLogLevelInfo",
  "error": "kTAGLoggerLogLevelError",
  "none": "kTAGLoggerLogLevelNone"
};

var tagLayer = null;

exports.initalize = function (config) {
    if(config.containerId){
        tagLayer = TAGManager.instance().dataLayer
        if (config.logLevel && !!availableLoggingTypes[config.logLevel]) {
          config.logLevel = availableLoggingTypes[config.logLevel];
        } else {
          config.logLevel = availableLoggingTypes.none
        }

        let GTM = TAGManager.instance()
        GTM.logger.logLevel = config.logLevel
        console.log(Object.keys(TAGContainerOpener));
        TAGContainerOpener.openContainerWithIdTagManagerOpenTypeTimeout(config.containerId,  GTM, kTAGOpenTypePreferFresh, undefined);
    } else {
        throw "Sup boss, how do you plan on tracking with no containerId?  Please add it to the config";
    }
}

exports.log = function(logJson){
    if (tagLayer) {
      console.log("Tag Manager Event: Log : " + JSON.stringify(logJson) + " at " + new Date());
      tagLayer.push(logJson);
    }
    else {
      console.error('Looks like you tried to log before initialization!');
    }
}