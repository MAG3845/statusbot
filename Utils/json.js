// Module
const config = require("../config.json")
const {logs} = require("./logs.js")
const fs = require('fs')

function modifidyJSONdbConf(confmodif){
// Read the existing config.json file
fs.readFile('config.json', 'utf8', (err, data) => {
  if (err) {
    logs("Unable to read config, check this error " + err);
    return;
  }

  try {
    const config_parse = JSON.parse(data);

    // Modify the desired variable
    config_parse.db_config = "1";

    // Write the modified content back to the file
    fs.writeFile('config.json', JSON.stringify(config_parse, null, 2), 'utf8', (writeErr) => {
      if (writeErr) {
        console.error('Error writing to config.json:', writeErr);
        logs('Error writing to config.json: ' + writeErr)
        return;
      }
      logs('db_conf has been updated in config.json');
    });
  } catch (parseErr) {
    console.error('Error parsing config.json:', parseErr);
    logs('Error parsing config.json: ' + parseErr)
  }
});
}

module.exports = {modifidyJSONdbConf}