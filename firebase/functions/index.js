const functions = require('firebase-functions');
const admin = require('firebase-admin');

const domain = 'mg.remoteshiva.org';
const mailgun = require('mailgun-js')({
  apiKey: functions.config().mailgun.key,
  domain
});


admin.initializeApp(functions.config().firebase);

/// This email is sent when a new document is added to the visit_messages Firestore collection. See addVisitorMessage()
/// The actual body of the email is specified by the template, which is stored on mailgun.
//  For reference, you can edit and debug templates using the standalone NodeJS application Amit built in the /mailgun directory
exports.sendVisitorEmail = functions.firestore.document(`add_visitor_messages/{mailId}`).onCreate(async (snapshot, context) => {
  const visitorMessage = snapshot.data();
  const data = {
      from: 'RemoteShiva <info@remoteshiva.org>',
      to: visitorMessage.visitorEmail,
      template: visitorMessage.templateName,
      subject: 'Your shiva visit is confirmed',
      'h:X-Mailgun-Variables': `{"title": "Your shiva visit is confirmed", "day": "${visitorMessage.visitDay}", "date": "${visitorMessage.visitDate}", "visitorUrl": "${visitorMessage.visitorUrl}", "videoLink": "${visitorMessage.videoLink}", "nameOfDeceased": "${visitorMessage.nameOfDeceased}", "visitorName": "${visitorMessage.visitorName}"}`
  };
  mailgun.messages().send(data, (error, body) => {
          console.log(body);
  });
});


// ❯ firebase functions:config:set mailgun.key="THE API KEY"
