const accountSid = 'AC4c626d658770cf555e22058294ce3e74';
const authToken = 'a572f575d60f9e7d87c08fbedaff850e';
const client = require('twilio')(accountSid, authToken);

function sendSMS(task_assignment,recipient){
client.messages
  .create({
     body: task_assignment,
     from: '+12517583789',
     to: recipient
   })
  .then(message => console.log(message.sid));

}

module.exports = sendSMS;