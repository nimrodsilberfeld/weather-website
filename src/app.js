const express = require('express')
const path = require('path')
const hbs = require('hbs')
const app = express()
const geo = require('./utils/geocode')
const forecast = require('./utils/forecast')
//Define path for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and Views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static directroy to serve 
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: "weather",
        name: "Nimrod"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'about page',
        name: 'Nimrod'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'this is some helpful text',
        title: 'help page',
        name: 'Nimrod'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({ error: "Please provide Adress" })
    }
    try {
        geo(req.query.address)
            .then(({ longtitude, latitude }) => {
                return forecast(latitude, longtitude)
            })
            .then(({ country, currentTemp }) => {
                res.send({
                    nameOfPlace: req.query.address,
                    country: country,
                    currentTemp: currentTemp
                })
            })
            .catch((err) => {
                res.send({ messege: err })
            })
    }
    catch (error) {
        res.status(404).res.send({
            messege: error
        })
    }


})

app.get('/product', (req, res) => {
    console.log(req.query)

    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('pageNotFound', {
        title: "404",
        name: 'Nimrod',
        errorMessege: "Help Page Not Found"
    })
})

app.get('/weather/*', (req, res) => {
    res.render('pageNotFound', {
        title: "404",
        name: 'Nimrod',
        errorMessege: "weather Page Not Found"
    })
})

app.get('/about/*', (req, res) => {
    res.render('pageNotFound', {
        title: "404",
        name: 'Nimrod',
        errorMessege: "about Page Not Found"
    })
})

app.get('*', (req, res) => {
    res.render('pageNotFound', {
        title: "404",
        name: 'Nimrod',
        errorMessege: "Page Not Found"
    })
})

app.listen(3000, () => {
    console.log("server is running on port 3000")
})