const functions = require('firebase-functions');
const admin = require('firebase-admin');
const axios = require('axios');

const domain = 'mg.remoteshiva.org';
const mailgun = require('mailgun-js')({
  apiKey: functions.config().mailgun.key,
  domain
});

admin.initializeApp(functions.config().firebase);

/// === Emails ===
/// These emails are sent when a new document is added to a particular Firestore collection
/// Example: ex. the collection visit_messages, and see addVisitorMessage()
/// The actual body of the email is specified by the template, which is stored on mailgun.
//  For reference, you can edit and debug templates using the standalone NodeJS application Amit built in the /mailgun directory

exports.sendVisitorAddedEmail = functions.firestore.document(`messages_add_visitor/{mailId}`).onCreate(async (snapshot, context) => {
  const message = snapshot.data();
  const data = {
      from: 'RemoteShiva <info@remoteshiva.org>',
      to: message.visitorEmail,
      template: message.templateName,
      subject: message.subject,
      'h:X-Mailgun-Variables': `{"title": "${message.subject}", "visitDay": "${message.visitDay}", "visitDate": "${message.visitDate}", "visitorUrl": "${message.visitorUrl}", "videoLink": "${message.videoLink}", "nameOfDeceased": "${message.nameOfDeceased}", "visitorName": "${message.visitorName}"}`
  };
  mailgun.messages().send(data, (error, body) => {
    if (!error) {
      notifySlack(`Visitor Added: ${message.visitorName} (${message.visitorEmail}) for shiva ${message.visitorUrl}`);
    }
  });
});

exports.sendNewUserEmail = functions.firestore.document(`messages_new_user/{mailId}`).onCreate(async (snapshot, context) => {
  const message = snapshot.data();
  const data = {
    from: 'RemoteShiva <info@remoteshiva.org>',
    to: message.organizerEmail,
    template: message.templateName,
    subject: message.subject,
    'h:X-Mailgun-Variables': `{"title": "${message.subject}", "dashboardUrl": "${message.dashboardUrl}", "organizerName": "${message.organizerName}"}`
  };
  mailgun.messages().send(data, (error, body) => {
    if (!error) {
      notifySlack(`New User: ${message.organizerName} (${message.organizerEmail})`);
    }
  });
});

exports.sendTimeslotDeletedVisitorEmail = functions.firestore.document(`messages_timeslot_deleted_visitor/{mailId}`).onCreate(async (snapshot, context) => {
  const message = snapshot.data();
  const data = {
    from: 'RemoteShiva <info@remoteshiva.org>',
    to: message.visitorEmail,
    template: message.templateName,
    subject: message.subject,
    'h:X-Mailgun-Variables': `{"title": "${message.subject}", "visitorUrl": "${message.visitorUrl}", "nameOfDeceased": "${message.nameOfDeceased}", "visitorName": "${message.visitorName}"}`
  };
  mailgun.messages().send(data, (error, body) => {
    // console.log(body);
  });
});

exports.sendVisitUpcomingEmail = functions.firestore.document(`messages_visit_upcoming/{mailId}`).onCreate(async (snapshot, context) => {
  const message = snapshot.data();
  const data = {
    from: 'RemoteShiva <info@remoteshiva.org>',
    to: message.visitorEmail,
    template: message.templateName,
    subject: message.subject,
    'h:X-Mailgun-Variables': `{"title": "${message.subject}", "visitDate": "${message.visitDate}", "visitorUrl": "${message.visitorUrl}", "videoLink": "${message.videoLink}", "nameOfDeceased": "${message.nameOfDeceased}", "visitorName": "${message.visitorName}"}`
  };
  mailgun.messages().send(data, (error, body) => {
    console.log(body);
  });
});

const notifySlack = (text) => {
  console.log(`notifySlack called with text ${text}`);
  axios
    .post(functions.config().slack.key, {
      text,
    })
    .then(function (response) {
      console.log(`notifySlack response ${response}`);
    })
    .catch(function (error) {
      console.log(`notifySlack error ${error}`);
    });
};

// ❯ firebase functions:config:set mailgun.key="THE API KEY"
