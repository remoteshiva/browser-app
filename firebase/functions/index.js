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
exports.sendVisitorEmail = functions.firestore.document(`visitor_messages/{mailId}`).onCreate(async (snapshot, context) => {
  const visitorMessage = snapshot.data();
  const visitDay = "Tuesday";
  const visitDate = visitorMessage.visitor.time;
  const videoLink = "zoom.us/123456";
  const nameOfDeceased = "John Doe";
  const data = {
      from: 'RemoteShiva <info@remoteshiva.org>',
      to: visitorMessage.visitor.email,
      template: visitorMessage.templateName,
      subject: 'Your shiva visit is confirmed',
      'h:X-Mailgun-Variables': `{"title": "Your shiva visit is confirmed", "day": "${visitDay}", "date": "${visitDate}", "visitorUrl": "http://app.removeshiva.org/v/${visitId}", "videoLink": "${videoLink}", "nameOfDeceased": "${nameOfDeceased}", "visitor": "${visitorMessage.visitor}"}`
  };
  mailgun.messages().send(data, (error, body) => {
          console.log(body);
  });
});


// ❯ firebase functions:config:set mailgun.key="THE API KEY"
