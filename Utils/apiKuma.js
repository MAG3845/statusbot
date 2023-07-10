const { logs } =  require('./logs.js')

function kumaStat(apiKuma){
    logs("Push Kuma ", 0)
    fetch(apiKuma)
    .catch(error =>{
      logs("Please check your link in .env or ignore if you don't have an UptimeKuma ", 0)
    })
  }

module.exports = { kumaStat };