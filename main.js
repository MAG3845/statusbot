/*
@https://t.me/mag_stat_bot
Developped by MAG -->
https://magcloud.eu
Discord : mag#8514
Mail : contact@magcloud.eu
*/
const TelegramBot = require('node-telegram-bot-api');
const https = require('https');
const emoji = require('node-emoji');
// My Modules for the Bot
const ping = require("./Functions/Ping/ping.js")
const { kumaStat } = require("./Utils/apiKuma.js")
const { logs } = require('./Utils/logs.js')
const { Start } = require("./Load/Start.js")
const db = require("./Utils/db.js")
// Variable / Config
const config = require('./config.json');
const token = config.token;
const apiKuma = config.apiKuma
const bot = new TelegramBot(token, {polling: true});
Start()


// Start Uptime

setInterval(function() {
  kumaStat(apiKuma);
  }, 60000);
  
// Owner Auto Ping
setInterval(function() { // All 1h 
  ping.httpPingAuto(bot);
  utils.logs("AutoPing" , 0)
}, 60 * 60 * 1000); 
// End Owner auto ping


// Commands

bot.onText(/\/bs/, (msg) => { // /bs -> Bot Status | 
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Bot is on");
    logs("/bs was used by " , msg.chat.id)
  });

bot.onText(/\/custom ([^\s$.?#].[^\s]*$)/, (msg, match) => { 
    const url = match[1];
    const chatID = msg.chat.id;
    bot.sendMessage(chatID, "Please wait");
    logs("/custom was used by " , msg.chat.id)
    ping.httpPingCustom(msg, url, bot);

});

bot.onText(/\/start/, (msg) => { // /bs -> Bot Status | 
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Hey ! Welcome ! \nThis a bot developped by MAG, thanks to him\nThis bot is to show you if a webpage is down or no with his HTTP Error if the website is not available\n \nI'm not professional, so my bot can't be perfect ! Please send me feedback by mail - contact@magcloud.eu\nDev with NodeJS`);
  logs("/start was used by " , msg.chat.id)
});


bot.onText(/\/support/, (msg) =>{
  logs("/support was used by " , msg.chat.id)
  bot.sendMessage(msg.chat.id, " Oh ! You need support ?" + emoji.get("question")+ "\nSee this :\n\nGo on "+emoji.get("earth_americas") +" : https://magcloud.eu/index.php/contacts/ ( it's in french only ) \nEmail "+ emoji.get("mailbox") +" : contact@magcloud.eu \nDiscord : MAG#8514 \n\nPlease check before on Github if your issues was not already discover ! Thanks !!")
});

bot.onText(/\/github/, (msg) =>{
  logs("/github was used by " , msg.chat.id)
  bot.sendMessage(msg.chat.id, "If you want to see the repo on Github 👩‍💻\n\nGo on : https://github.com/MAG3845/statusbot\n\nDon't forgot if you want to fork my project please mention my Name and My Repo it's will be very nice ;)\nIf you found a bug please make a issue on Github or Contact me ( /support ) ❤")
})

module.exports = {bot}