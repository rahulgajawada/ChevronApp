const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

function sendSMS(task_assignment,recipient){
client.messages
  .create({
     body: task_assignment,
     from: '+15017122661',
     to: recipient
   })
  .then(message => console.log(message.sid));

}


module.exports = sendSMS;