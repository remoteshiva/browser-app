const functions = require('firebase-functions');
const admin = require('firebase-admin');

const domain = 'mg.remoteshiva.org';
const mailgun = require('mailgun-js')({
  apiKey: functions.config().mailgun.key,
  domain
});


admin.initializeApp(functions.config().firebase);

exports.sendVisitorEmail = functions.firestore.document(`visitor_messages/{mailId}`).onCreate(async (snapshot, context) => {
  const visitorMessage = snapshot.data();
  const data = {
      from: 'noreply@remoteshiva.org',
      to: visitorMessage.email,
      template: visitorMessage.template,
      subject: 'visitor message',
      text: visitorMessage.text,
      html: visitorMessage.html,
  };
  mailgun.messages().send(data, (error, body) => {
          console.log(body);
  });
});


// ❯ firebase functions:config:set mailgun.key="THE API KEY"
