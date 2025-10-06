const fs = require('fs');
const path = require('path');
const constants = require('../constants');
let _config = null;
let configBuffer = null;

exports.createConfig = (callback) => {
  configBuffer = fs.readFileSync(path.resolve(__dirname, 'data', 'config.json'), 'utf-8');
  if (!configBuffer) {
    console.log(constants.FILE404);
    process.exit(1);
  }
  else {
    _config = JSON.parse(configBuffer);
    _config = _config.useSecrets ? updateConfig(_config) : _config;
    console.log(_config.displaySecrets);

    if (_config.displaySecrets) {
      console.log("-------------k8 variables------------")
      console.log({
        apiu: process.env.API_IRCMS_BG_USER,
        apip: process.env.API_IRCMS_BG_PWD,
      })
    }
    global.gConfig = _config;
    callback(null);
  }
}

const updateConfig = (sconfig) => {
  //login Credentials
  sconfig.appMgmt.login.logObj = (sconfig.appMgmt.login.logObj) ? loginCredentials(sconfig) : "";
  return sconfig;
}