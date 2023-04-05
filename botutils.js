const dotenv = require('dotenv');
// Import Module
dotenv.config();
module.exports = {
kumaStat: function(){
    console.log("PUSH KUMA");
    fetch(process.env.url_uptime);
  },
};
// If you use Uptime-Kuma Replace in .env "url_uptime" by url of Kume give you when you create a Push ( remove parameters after the ? )