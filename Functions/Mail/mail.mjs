import { logs } from "../../Utils/logs.js"
import config from "../../config.json" assert { type: "json"}
import { SMTPClient } from 'emailjs';
// Create a Email Client
const client = new SMTPClient({
	user: config.smtp_user,
	password: config.smtp_password,
	host: config.smtp_adress,
	ssl: config.ssl_smtp,
});

function sendMailWebsites(sender, status, websites){
    if (status = 500){
        const text = "Hey \n You're websites :" + websites + " is up ! Be cool \n Powered by StatusBot - Made by MAG"
    }
    else{
        const text = "Hey \n You're websites :" + websites + " is down ! Be stress \n Powered by StatusBot - Made by MAG"
    }
    client.send(
        {
            text: '',
            from: config.smtp_user,
            to: sender,
            subject: 'StatusBot - Mail',
        },
        (err, message) => {
            logs(err || message);
        }
    );
}
function sendMailDebug(sender, message){
   const text = message
    client.send(
        {
            text: text,
            from: config.smtp_user,
            to: sender,
            subject: 'StatusBot - Mail',
        },
        (err, message) => {
            logs(err || message);
        }
    );
}


export {sendMailWebsites};