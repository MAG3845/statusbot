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
const ping = require('./ping.js');
const botutils = require('./botutils.js');
dotenv.config();
// Module ^^
const token = process.env.token_telegram;
const bot = new TelegramBot(token, {polling: true});
const ownerID = process.env.owner_id // Owner account
// Bot Utilities

// Automation Start

setInterval(function() {
  botutils.kumaStat();
  }, 60000);
  
  setInterval(function() { // All 1h 
    httpPingMag();
    console.log("DEBUG : Repeat pass")
  }, 60 * 60 * 1000);

// Automation Stop








// Commands


bot.onText(/\/bs/, (msg) => { // /bs -> Bot Status | 
    const chatId = msg.chat.id;
    bot.sendMessage(chatId, "Bot is on");
    console.log("Command /bs was used - ", msg.chat.id);
  });


  bot.onText(/\/force/, (msg) => { // DEBUG COMMAND ONLY MAG CAN EXECT
    if (msg.chat.id == ownerID ){
        httpPingMag(msg)}
    else {
        bot.sendMessage(msg.chat.id, "You are not allowed to do that ! Please contact the owner to you give permission")
    }
    
  });

  bot.onText(/\/custom ([^\s$.?#].[^\s]*$)/, async (msg, match) => { 
  const url = match[1];
  const chatID = msg.chat.id;
  bot.sendMessage(chatID, "Please wait");
  console.log(url + " /custom was used by " + chatID)

  try{
    const codeReturnPing = await ping.httpPingCustom(msg, url)
    if (codeReturnPing == 0){
      bot.sendMessage(chatID, )

    }
  } 
  catch (error) {
    console.log(error); // Output: 0 or 2 or the error message if there is any
  }
};

bot.onText(/\/start/, (msg) => { // /bs -> Bot Status | 
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Hey ! Welcome ! \nThis a bot developped by MAG, thanks to him\nThis bot is to show you if a webpage is down or no with his HTTP Error if the website is not available\n \nI'm not professional, so my bot can't be perfect ! Please send me feedback by mail - contact@magcloud.eu\nDev with NodeJS`);
  console.log("/start was used - ", msg.chat.id);
});


