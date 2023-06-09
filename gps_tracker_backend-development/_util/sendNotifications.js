const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioFromPhone = `+${process.env.TWILIO_FROM_PHONE}`;
const client = require('twilio')(accountSid, authToken);

const notificarSMS= function (to, body) {
    return client.messages
        .create({
            body: body,
            from: twilioFromPhone,
            to: to
        })
        // .then(message => res=message.sid)
        // .done();
};

const notificarWhatsapp= function (req,res) {

    client.messages
        .create({
            body: req.body,
            from: `whatsapp:${req.from}`,
            to: `whatsapp:${req.to}`
        })
        .then(message => res=message.sid)
        .done();

};

module.exports = {
    notificarSMS,
    notificarWhatsapp
}