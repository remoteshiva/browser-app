const express = require('express');
const app = express();
const port = 3000;

//Loads the handlebars module
const handlebars = require('express-handlebars');

//Sets handlebars configurations
app.engine('handlebars', handlebars({
  extname: '.hbs',
}));

//Sets our app to use the handlebars engine
app.set('view engine', 'handlebars');


app.use(express.static('public'))

app.get('/add_visitor', (req, res) => {
  res.render('add_visitor',  {
    layout: false,
    title : 'oy mh god',
    visitorEmail: 'john.doe@gmail.com',
    visitorName: 'Ron Burgundy',
    visitDay: 'Tuesday',
    visitDate: 'December 28th, 2021 at 1:00 PM',
    visitorUrl: 'https://app.removeshiva.org/v/445erhgdhj',
    videoLink: 'zoom.us/123456',
    nameOfDeceased: 'Brian Fantana'
  });
});

app.get('/new_user', (req, res) => {
  res.render('new_user',  {
    layout: false,
    organizerEmail: 'john.doe@gmail.com',
    title : 'Welcome to RemoteShiva',
    organizerName: 'Jake Tapper',
    dashboardUrl: 'https://app.removeshiva.org/'
  });
});

app.get('/timeslot_deleted_visitor', (req, res) => {
  res.render('timeslot_deleted_visitor',  {
    layout: false,
    visitorEmail: 'john.doe@gmail.com',
    title : 'Shiva time change - can you reschedule?',
    visitorName: 'Ron Burgundy',
    nameOfDeceased: 'Brian Fantana',
    visitorUrl: 'https://app.removeshiva.org/'
  });
});

app.get('/visit_upcoming', (req, res) => {
  res.render('visit_upcoming',  {
    layout: false,
    title : 'You have a shiva visit tomorrow',
    visitorEmail: 'john.doe@gmail.com',
    visitorName: 'Ron Burgundy',
    visitDate: 'December 28th, 2021 at 1:00 PM',
    visitorUrl: 'https://app.removeshiva.org/v/445erhgdhj',
    videoLink: 'zoom.us/123456',
    nameOfDeceased: 'Brian Fantana'
  });
});

app.listen(port, () => console.log(`App listening to port ${port}`));
