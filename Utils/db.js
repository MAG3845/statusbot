// Module
const config = require("../config.json")
const sql = require("mysql") 
const { logs } = require("./logs.js")
const { modifidyJSONdbConf } = require("./json.js")
const mail = require("../Functions/Mail/mail.mjs")
// Variable
let db_config = config.db_config
/* DB Init

There is a lot of function it's for :

- Create connection with the MySQL
- Create the DB
- Set values in DB 
- And verify it at starting of bot

*/


const db = sql.createConnection({ host:config.db_adresse, user:config.db_user, password:config.db_password, port:3306})
function connectDB(){
    db.connect((err) => {
        if (err) throw err;
        logs('Connected to MySQL server')})
}

function createDB(){
    var createdb = "CREATE DATABASE " + config.db_name
    db.query(createdb, (err, result) => {
        if (err) throw err;
        logs('Database created');
      });
    var chooseDB = "USE " + config.db_name + ";"
    db.query(chooseDB, (err, result) =>{ if (err) throw err;})  
    db.query("CREATE TABLE `config` (`automp` INT DEFAULT '0',`automail` INT DEFAULT '0');", (err, result) => {
        if (err) throw err;
        logs("Config Table created")
    })
    db.query("CREATE TABLE `websites` (`websites` TEXT,`mail` TEXT, `id_telegram` INT);", (err, result) => {
        if (err) throw err;
        logs("Websites Table created")
    })
}
function setDB(){
    var setAuto = "INSERT INTO `config` (automp, automail) VALUES (" +config.automp+", "+config.automail+")"
    
    db.query(setAuto, (err, result) => {if (err){ throw err} logs("Config is set")})
}
  

function checkDB(){
    if (db_config == 1) {
        logs("Your DB is already config, skip auto configuration")
    }
    else{
        logs("Your DB is not configured, please wait...")
        connectDB()
        createDB()
        modifidyJSONdbConf()
        setDB()
    }
}
// END of DB Init

function setWebsites(id, website, mail){
    var setWebsites = "INSERT INTO `config` (automp, automail) VALUES (" +config.automp+", "+config.automail+")"
}


module.exports = {checkDB};