const fs = require("fs")
const config = require('../config.json')
const { checkDB } = require("../Utils/db.js")
function Start (){
    console.log(`
                    TELEGRAM STATUS BOT
    
    Dev by MAG - Free on Github
    Bugs may be present ! Before opening an issue
    Check your config.js please!

    Thanks to using my bot !
    
    `)
    fs.writeFileSync(config.logs_file,"The bot start !")
    checkDB()
}
module.exports = { Start }