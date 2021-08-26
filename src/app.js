const express = require('express');
const path = require('path');
const hbs = require('hbs');

const app = express();

const { takeGeoCode } = require('./utils/geocode');
const { forecast } = require('./utils/forecast');
const port = process.env.PORT || 300;
//Define path for Expres config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials/');

//Setup handelbars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

const mess = {
  user: {
    name: 'Yaroslav',
    age: 34,
  },
  message: 'my first mess',
};

app.get('', (req, res) => {
  res.render('index', {
    name: mess.user.name,
    title: 'hello expres for a dynamic file',
    list: ['apple', 'tomato'],
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    name: mess.user.name,
    title: 'about me',
    mess,
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help page',
    name: mess.user.name,
  });
});

app.get('/help/*', (req, res) => {
  res.render('error', {
    title: '404',
    name: mess.user.name,
    errorMessage: 'Help article not found',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.addres) {
    return res.send({
      error: 'You must add in addres',
    });
  }
  const addres = req.query.addres;
  takeGeoCode(addres, ([lat, long, places] = [], err) => {
    if (err) {
      return res.send({
        error: err,
      });
    }
    forecast([lat, long, places], (unit) => {
      res.send({
        weather: unit,
      });
    });
  });
});

app.get('*', (req, res) => {
  res.render('error', {
    title: '404',
    name: mess.user.name,
    errorMessage: 'Page not found',
  });
});

app.listen(port, () => {
  console.log(`listen port ${port});
});
