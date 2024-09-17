/*This code commented was only a test

const http = require('http');

const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    res.end('Hello World');
});

server.listen(3000, () => {
    console.log('Server on port 3000');
});*/

const express = require('express');
const morgan = require('morgan');
const app = express();


//Basic custom middleware
function logger(req, res, next){
    console.log('Request received');
    console.log(`Route received: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

//Settings
app.set('appName', 'Express curse');
app.set('port', 5000);
app.set('view engine', 'ejs');

//Middlewares
app.use(express.json());
app.use(morgan('dev'))
app.use(logger);

app.all('/user', (req, res, next) => {
    console.log('You walked upon here');
    next();
});

//Routes
/*
app.get('/', (req, res) => {
    res.send('Hello World');
});
*/

app.get('/', (req, res) => {
    const data = [{name: 'john'}, {name: 'joe'}, {name: 'cameron'}];
    res.render('index.ejs', {people: data});
});

app.get('/user', (req, res) => {
    res.json({
        username: 'Christopher',
        points: 3,
    });
});

app.post('/user/:id', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    res.send(`User ${req.params.id} has been posted`);
});

app.put('/user/:id', (req, res) => {
    console.log(req.body);
    res.send(`User ${req.params.id} has been updated`);
})

app.delete('/user/:id', (req, res) => {
    res.send(`User ${req.params.id} has been deleted`);
});

app.get('/about', (req, res) => {
    res.send('About this page');
});


app.use(express.static('public'));


app.listen(app.get('port'),() => {
    console.log(app.get('appName'));
    console.log('Server on port ', app.get('port'));
});