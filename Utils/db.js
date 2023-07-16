const config = require("../config.json")
const sql = require("mysql") 


const db = sql.createConnection({ host:config.db_adresse, user:config.db_user, password:config.db_user, database:config.db_name})
db.query("SELECT config FROM 'config'", function (err, result){
    console.log(result)
})
