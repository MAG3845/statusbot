const fs = require("fs")
const config = require('../config.json')

function Start (){
    console.log(`
                    TELEGRAM STATUS BOT
    
    Dev by MAG - Free on Github
    Bugs may be present ! Before opening an issue
    Check your config.js please!

    Thanks to using my bot !
    
    `)
    fs.writeFileSync(config.logs_file,"The bot start !")
}
module.exports = { Start }