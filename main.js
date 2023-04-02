/*
@https://t.me/mag_stat_bot
Developped by MAG -->
https://magcloud.eu
Discord : mag#9322
Mail : contact@magcloud.eu
*/
const TelegramBot = require('node-telegram-bot-api');
const https = require('https');
const emoji = require('node-emoji');
const dotenv = require('dotenv');
dotenv.config();
// Module ^^
const token = process.env.token_telegram;
const bot = new TelegramBot(token, {polling: true});
const ownerID = process.env.owner_id // Owner account
// Bot Utilities


function kumaStat(){
  console.log("PUSH KUMA");
  fetch(process.env.url_uptime);
}
  
function httpPingCustom(msg, link) { // Status Fonction with custom URL
    const urlRegex = new RegExp(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i); // REGEX for exemple.com
    if (urlRegex.test(link)){
    httplink = 'https://' + link; // to add https://
    idChannel = msg.chat.id
    fetch(httplink) 
    .then(response => {
      if (!response.ok) {
        bot.sendMessage(idChannel, emoji.get('x') + " : "+ link + " is off with error " + response.status);
      }
      else {console.log('Custom Link = ' + link +" = "+ response.status);
      bot.sendMessage(idChannel, emoji.get('heavy_check_mark') + " : " + link + " is on");}
    })
    }
    else{
      bot.sendMessage(idChannel, "Please enter a correct url with format : exemple.com");
      console.log("FAILURE : URL has not the good format " + link + ' - ' + idChannel)
    };
    
  };

function httpPingMag(msg) { // Status MAG Sites
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
};

bot.onText(/\/bs/, (msg) => { // /bs -> Bot Status | 
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Bot is on");
    console.log("Command /bs was used - ", msg.chat.id);
  });


setInterval(function() { // All 1h 
    httpPingMag();
    console.log("DEBUG : Repeat pass")
  }, 60 * 60 * 1000); 
  

  bot.onText(/\/force/, (msg) => { // DEBUG COMMAND ONLY MAG CAN EXECT
    if (msg.chat.id == ownerID ){
        httpPingMag(msg)}
    else {
        bot.sendMessage(msg.chat.id, "You are not allowed to do that ! Please contact the owner to you give permission")
    }
    
  });

  bot.onText(/\/custom ([^\s$.?#].[^\s]*$)/, (msg, match) => { 
  const url = match[1];
  const chatID = msg.chat.id;
  bot.sendMessage(chatID, "Please wait");
  console.log(url + " /custom was used by " + chatID)
  httpPingCustom(msg, url);

});

bot.onText(/\/start/, (msg) => { // /bs -> Bot Status | 
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Hey ! Welcome ! \nThis a bot developped by MAG, thanks to him\nThis bot is to show you if a webpage is down or no with his HTTP Error if the website is not available\n \nI'm not professional, so my bot can't be perfect ! Please send me feedback by mail - contact@magcloud.eu\nDev with NodeJS`);
  console.log("/start was used - ", msg.chat.id);
});

setInterval(function() {
kumaStat();
}, 60000);


bot.onText(/\/uptimef/, (msg) => { // DEBUG COMMAND ONLY MAG CAN EXECT
  if (msg.chat.id == ownerID ){
    kumaStat();  }
  else {
      bot.sendMessage(msg.chat.id, "You are not allowed to do that ! Please contact the owner to you give permission")
  }
});

