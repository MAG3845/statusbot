const fs = require("fs")
const config = require('../config.json')


function logs(log, id){
    if (id == undefined){
      id = "DEBUG CODE"
    }
    const filepath = config.logs_file
    var date = new Date();
    var current_date = "["+date.getFullYear()+"-"+(date.getMonth()+1)+"-"+ date.getDate() +" -: " + date.getHours()+":"+date.getMinutes()+"] ";
    console.log(current_date + log + " " + id)
    fs.writeFile(filepath,current_date + log + "" + id + "\n", { flag: 'a+' }, err => {});
  }


module.exports = { logs };