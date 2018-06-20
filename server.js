const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const apiKey = '33a22c60bdeb8f0dca71f6b420bfab62';

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {weather: null, error: null});
});

app.post('/', (req, res) => {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;

    request(url, (err, response, body) => {
        if (err) {
            res.render('index', {weather: null, error: 'Error, please try again'});
            const autocomplete = new google.maps.places.Autocomplete(document.getElementByClassName('ghost-input'))
        } else {
            let weather = JSON.parse(body);
            //console.log(weather);
            if (weather.main == undefined) {
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                let weatherText = `It's ${Math.round(weather.main.temp)} degrees with a forecast of  ${(weather.weather[0].main).toLowerCase()} in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    });
});

app.listen(3000, () => {
    console.log("Listening on port 3000");
});