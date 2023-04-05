const dotenv = require('dotenv');
const https = require('https');
// Import Module

// Function - Ping 
module.exports = {
    httpPingCustom : function (msg, link) { // Status Fonction with custom URL
    const urlRegex = new RegExp(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i);
    if (urlRegex.test(link)) {
      const httplink = 'https://' + link;
      return fetch(httplink)
        .then(response => {
          if (!response.ok) {
            return Promise.resolve(0); // Reject the promise with "Off" value
          } else {
            return Promise.resolve(1); // Resolve the promise with "On" value
          }
        })
        .catch(error => {
          return Promise.reject(error); // Reject the promise with error value
        });
    } else {
      return Promise.reject(2); // Reject the promise with "Incorrect URL format" value
    }
  },

  httpPingMag: function (msg) { // Status MAG Sites
    fetch('https://magcloud.eu')  // magcloud.eu
    .then(response => {
      if (!response.ok) {
        bot.sendMessage(ownerID, emoji.get('x') + " : magcloud.eu is off with error " + response.status);
      }
      else {console.log('MAGCLOUD.EU = ', response.status);
      bot.sendMessage(ownerID, emoji.get('heavy_check_mark') + " : magcloud.eu is on");}
    })
    fetch('https://hub.magcloud.eu')
    .then(response => {
      if (!response.ok) {
        bot.sendMessage(ownerID, emoji.get('x') + " : hub.magcloud.eu is off with error " + response.status);
      }
      else {console.log('HUB.MAGCLOUD.EU = ', response.status);
      bot.sendMessage(ownerID, emoji.get('heavy_check_mark') + " : hub.magcloud.eu is on");}
    })
    fetch('https://link.magcloud.eu')  // magcloud.eu
    .then(response => {
      if (!response.ok) {
        bot.sendMessage(ownerID, emoji.get('x') + " : link.magcloud.eu is off with error " + response.status);
      }
      else {console.log('LINK.MAGCLOUD.EU = ', response.status);
      bot.sendMessage(ownerID, emoji.get('heavy_check_mark') + " : link.magcloud.eu is on");}
    })
},
};