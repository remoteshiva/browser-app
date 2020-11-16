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

app.get('/visitor_add', (req, res) => {
  res.render('visitor_add',  {
    layout: false,
    title : 'oy mh god',
    day: 'Tuesday',
    date: 'Tuesday, December 28 1:00 PM',
    visitorUrl: 'http://app.removeshiva.org/v/445erhgdhj',
    videoLink: 'zoom.us/123456',
    nameOfDeceased: 'Brian Fantana',
    visitor: {
      name: 'Ron Burgundy'
    }
  });
});

app.listen(port, () => console.log(`App listening to port ${port}`));
