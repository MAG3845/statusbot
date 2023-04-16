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
const fs = require('fs');
dotenv.config();
// Module ^^
const token = process.env.token_telegram;
const bot = new TelegramBot(token, {polling: true});
const ownerID = process.env.owner_id // Owner account
// Bot Utilities

// Start Uptime

setInterval(function() {
  kumaStat();
  }, 60000);
  
function kumaStat(){
  log("Push Kuma", 0)
  fetch(process.env.url_uptime);
}

// End Uptime

// System Logging on File/Console
function log(log, id){
  const filepath = process.env.file_log
  var date = new Date();
	var current_date = "["+date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate() +" -: " + date.getHours()+":"+date.getMinutes()+"] ";
  console.log(current_date + log + id)
  fs.writeFile(filepath,current_date + log + id + "\n", { flag: 'a+' }, err => {});
}



// END


// Function - Ping 
  
function httpPingCustom(msg, link) { // Status Fonction with custom URL
    const urlRegex = new RegExp(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i); // REGEX for exemple.com
    if (urlRegex.test(link)){
    httplink = 'https://' + link; // to add https://
    idChannel = msg.chat.id
    fetch(httplink) 
    .then(response => {
      if (!response.ok) {
        bot.sendMessage(idChannel, emoji.get('x') + " : "+ link + " is off with error " + response.status);
        log("PingCustom LOG - URL = ERROR OFF " + link + " ", idChannel);
      }
      else {log("PingCustom LOG - URL = 200 PASS " + link + " ", idChannel);
      bot.sendMessage(idChannel, emoji.get('heavy_check_mark') + " : " + link + " is on");}
    })
    .catch(error => {
      bot.sendMessage(idChannel, 'Check your url please !');
      log("PingCustom ERROR - THE NDD IS NOT WORK", idChannel)
    })
    }
    else{
      bot.sendMessage(idChannel, "Please enter a correct url with format : exemple.com");
      log("PingCustom ERROR - URL IS NOT WITH THE GOOD FORMAT", idChannel)
    };
    
  };

function httpPingMag(msg) { // Status MAG Sites
    fetch('https://magcloud.eu')  // magcloud.eu
    .then(response => {
      if (!response.ok) {
        bot.sendMessage(ownerID, emoji.get('x') + " : magcloud.eu is off with error " + response.status);
        log("MAGCLOUD.EU =" + response.status, 0)
      }
      else {console.log('MAGCLOUD.EU = ', response.status);
      bot.sendMessage(ownerID, emoji.get('heavy_check_mark') + " : magcloud.eu is on");}
      log("MAGCLOUD.EU =" + response.status, 0)
    })
    fetch('https://hub.magcloud.eu')
    .then(response => {
      if (!response.ok) {
        bot.sendMessage(ownerID, emoji.get('x') + " : hub.magcloud.eu is off with error " + response.status);
        log("HUB.MAGCLOUD.EU =" + response.status, 0)
      }
      else {console.log('HUB.MAGCLOUD.EU = ', response.status);
      bot.sendMessage(ownerID, emoji.get('heavy_check_mark') + " : hub.magcloud.eu is on");}
      log("HUB.MAGCLOUD.EU =" + response.status, 0)
    })
    fetch('https://link.magcloud.eu')  // magcloud.eu
    .then(response => {
      if (!response.ok) {
        bot.sendMessage(ownerID, emoji.get('x') + " : link.magcloud.eu is off with error " + response.status);
        log("LINK.MAGCLOUD.EU =" + response.status, 0)
      }
      else {log("LINK.MAGCLOUD.EU =" + response.status, 0);
      bot.sendMessage(ownerID, emoji.get('heavy_check_mark') + " : link.magcloud.eu is on");}
    })
};

// End Fonction - Ping


// Owner Auto Ping
setInterval(function() { // All 1h 
  httpPingMag();
  log("AutoPing" , 0)
}, 60 * 60 * 1000); 
// End Owner auto ping


// Commands


bot.onText(/\/bs/, (msg) => { // /bs -> Bot Status | 
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Bot is on");
    log("/bs was used by " , msg.chat.id)
  });


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
  log("/custom was used by " , msg.chat.id)
  httpPingCustom(msg, url);

});

bot.onText(/\/start/, (msg) => { // /bs -> Bot Status | 
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Hey ! Welcome ! \nThis a bot developped by MAG, thanks to him\nThis bot is to show you if a webpage is down or no with his HTTP Error if the website is not available\n \nI'm not professional, so my bot can't be perfect ! Please send me feedback by mail - contact@magcloud.eu\nDev with NodeJS`);
  log("/start was used by " , msg.chat.id)
});


bot.onText(/\/support/, (msg) =>{
  log("/support was used by " , msg.chat.id)
  bot.sendMessage(msg.chat.id, " Oh ! You need support ?" + emoji.get("question")+ "\nSee this :\n\nGo on "+emoji.get("earth_americas") +" : https://magcloud.eu/index.php/contacts/ ( it's in french only ) \nEmail "+ emoji.get("mailbox") +" : contact@magcloud.eu \nDiscord : MAG#8514 \n\nPlease check before on Github if your issues was not already discover ! Thanks !!")
});

bot.onText(/\/github/, (msg) =>{
  log("/github was used by " , msg.chat.id)
  bot.sendMessage(msg.chat.id, "If you want to see the repo on Github 👩‍💻\n\nGo on : https://github.com/MAG3845/statusbot\n\nDon't forgot if you want to fork my project please mention my Name and My Repo it's will be very nice ;)\nIf you found a bug please make a issue on Github or Contact me ( /support ) ❤")
})