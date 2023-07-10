const config = require("../../config.json")
const fs = require('fs')
const emoji = require('node-emoji');
const { logs } = require('../../Utils/logs.js')
const website = config.websites
const websites_split = website.split(",")


function httpPingAuto(bot) { // Auto Ping your websites
    var choiceTable = 0
    const tableLenght = websites_split.length
    do{ // Loop to verify all websites
      const websites_ping = websites_split[choiceTable] // For the message bot otherwise the message bot dosen't work proprely 
        fetch(websites_split[choiceTable])
        .then(response => {
          var link = websites_ping
          if (!response.ok) {
            bot.sendMessage(ownerID, emoji.get('x') + " : "+ link + " is off with error " + response.status);
            logs("PingCustom LOG - URL = ERROR OFF " + link + " ", ownerID);
          }
          else {
            logs("PingCustom LOG - URL = 200 PASS " + link + " ", ownerID);
            bot.sendMessage(ownerID, emoji.get('heavy_check_mark') + " : " + link + " is on");}
    })
        .catch(error => {
          bot.sendMessage(ownerID, 'Check your url please ! Or the website not working at all maybe a bad configuration on DNS');
          logs("PingCustom ERROR - THE NDD IS NOT WORK ", ownerID)
    })
    choiceTable++
  }while(tableLenght !== choiceTable)
  }

function httpPingCustom(msg, link, bot) { // Status Fonction with custom URL
    logs(link, 0)
    const urlRegex = new RegExp(/^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i); // REGEX for exemple.com
    if (urlRegex.test(link)){
    httplink = 'https://' + link; // to add https://
    logs(httplink)
    idChannel = msg.chat.id
    fetch(httplink) 
    .then(response => {
      if (!response.ok) {
        bot.sendMessage(idChannel, emoji.get('x') + " : "+ link + " is off with error " + response.status);
        logs("PingCustom LOG - URL = ERROR OFF " + link + " ", idChannel);
      }
      else {
      logs("PingCustom LOG - URL = 200 PASS " + link + " ", idChannel);
      bot.sendMessage(idChannel, emoji.get('heavy_check_mark') + " : " + link + " is on");}
    })
    .catch(error => {
      console.log(error)
        bot.sendMessage(idChannel, 'Check your url please ! Or the website not working at all maybe a bad configuration on DNS');
      logs("PingCustom ERROR - THE NDD IS NOT WORK ", idChannel)
    })
    }
    else{
      bot.sendMessage(idChannel, "Please enter a correct url with format : exemple.com");
      logs("PingCustom ERROR - URL IS NOT WITH THE GOOD FORMAT ", idChannel)
    };
    
  };

module.exports = {
    httpPingAuto,
    httpPingCustom
};