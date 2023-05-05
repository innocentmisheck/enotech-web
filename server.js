const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const logger = require('./public/js/logger');
const transcation = require('./public/js/Transcations');
const posts = require('./public/js/Posts')

const app = express();

// Init middleware
// app.use(logger);

// Handlebars Middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// pages routes
app.set("views", path.join(__dirname, 'views'))
app.engine('handlebars', exphbs({
    defaultLayout: 'main',
    layoutsDir: __dirname + '/views/layouts/',
    partialsDir: __dirname + '/views/partials/'
}));

// Homepage Route
app.get('/', (req, res) =>
    res.render('home', {
        title: 'Home',
    })
);

// Homepage Route
app.get('/login', (req, res) =>
    res.render('partials/login', {
        title: 'Login',

    })
);

// Project Route 
app.get('/project_support', (req, res) =>
    res.render('project_support', {
        title: 'Project Support',
        title1: 'Project Description',
        transcation
    })
);

// Explore Route
app.get('/explore', (req, res) =>
    res.render('explore', {
        title: 'Explore',
        title1: 'OUR TOP STORIES',
        posts

    })
);


// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// transcations API Routes
app.use('/api/transcations', require('./routes/api/transcations'));

const PORT = process.env.PORT || 5050;


app.listen(PORT, () => console.log(`>>> Establishing connection at eNOtech port ${PORT}`));