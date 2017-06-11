var application = require("application");
var availableLoggingTypes = {
  "verbose": kTAGLoggerLogLevelVerbose,
  "debug": kTAGLoggerLogLevelDebug,
  "info": kTAGLoggerLogLevelInfo,
  "error": kTAGLoggerLogLevelError,
  "none": kTAGLoggerLogLevelNone
};

var tagLayer = null;

exports.initalize = function (config) {
    if(config.containerId){
        tagLayer = TAGManager.instance().dataLayer
        if (config.logLevel && !!availableLoggingTypes[logLevel]) {
          config.logLevel = availableLoggingTypes[logLevel];
        } else {
          config.logLevel = availableLoggingTypes.none
        }

        let GTM = TAGManager.instance()
        GTM.logger.setLogLevel(config.logLevel)
        
        TAGContainerOpener.openContainer({
          withId: config.containerId,
          tagManager: GTM,
          openType: kTAGOpenTypePreferFresh,
          timeout: nil,
          notifier: self
        });
    } else {
        throw "Sup boss, how do you plan on tracking with no containerId?  Please add it to the config";
    }
}

exports.log = function(logJson){
    if (tagLayer) {
      if (config.logLevel !== availableLoggingTypes.none) {
        console[config.logLevel]("Tag Manager Event: Log : " + JSON.stringify(logJson) + " at " + new Date());
        
      }
      tagLayer.push(logJson);
    }
    else {
      console.error('Looks like you tried to log before initialization!');
    }
}