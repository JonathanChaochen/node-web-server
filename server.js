const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

let app = express();



hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');


// logger
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}： ${req.method} ${req.url}`

  console.log(log)

  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unbale to append to server.log')
    }
  })
  next()
})
/* maintenance */
// app.use((req,res,next) => {
//   res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('screamIt', (text) => text.toUpperCase())

app.get('/', (req, res) => {
  // res.send('<h1>Hello, Express!</h1>')
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to my website.'
  });
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});

app.get('/bad', (req, res) => {
  res.send({
    error: 'unable to fulfill this requestrequest'
  });
});

app.listen(8000, () => {
  console.log('server is up');
});
