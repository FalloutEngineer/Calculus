//express
const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');
const fs = require('fs');
const mathjs = require('mathjs');

//realtime
const http = require('http').Server(app)
const io = require('socket.io')(http);
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const userSession = session({
    secret: 'asdasdasfdgs',
    resave: true,
    saveUninitialized: true,
})

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);

io.use(wrap(userSession));
io.use(wrap(passport.initialize()));
io.use(wrap(passport.session()));



const initializePassport = require('./passport-config');
initializePassport(
    passport, 
    name => users.find(user => user.name === name),
    id => users.find(user => user.id === id)
);

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}))
app.use(flash());
app.use(userSession)
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})

//realtime
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

let users = [];

initialize();

io.on('connection', (socket) => {
    socket.on('calculate-string', (data) => {
        io.emit('calculate-string', {
            message: mathjs.evaluate(data.message).toString()
        })
    });
    socket.on('save-history', data => {
        socket.request.user.history = data.history
    });
    socket.on('radio-change', data => {
        socket.request.user.radio = data.radio;
    })

    //dashboard todo
    socket.on('create-calculator', data => {
        console.log(data.id + ' created');
    })
    socket.on('delete-calculator', data => {
        console.log(data.id + ' deleted');
    })
    //todo end
})


app.get('/', isNotAuth, (req, res) => {
    res.render('index.ejs')
})

app.get('/login', isNotAuth, (req, res) => {
    res.render('login.ejs')
})

app.get('/registration', isNotAuth, (req, res) => {
    res.render('registration.ejs')
})

app.get('/calculator', isAuth, (req, res) => {
    res.render('calculator.ejs')
})

app.post('/registration', async (req, res) => {
    try{
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.username,
            password: hashedPassword
        })
        console.log(users);
        refreshDB();
        res.redirect('/login')
    } catch {
        res.redirect('/registration')
    }
})

app.post('/logout', isAuth, (req, res) => {
    req.logout();
    res.redirect('/login');
})

app.post('/login', isNotAuth, passport.authenticate('local', {
    successRedirect: '/calculator',
    failureRedirect: '/registration',
    failureFlash: true
}))


// app.get('/dashboard', isAuth, (req, res) => {
//     res.render('dashboard.ejs')
// })


function isAuth(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/login');
    }
}

function isNotAuth(req, res, next){
    if(req.isAuthenticated()){
        return res.redirect('/calculator');
    }
    next();
}



http.listen(8080)









function loadDB(){
    if(fs.existsSync('database.json')){
        users = JSON.parse(fs.readFileSync('database.json'));
    }
}

function refreshDB(){
    fs.writeFileSync('database.json', JSON.stringify(users))
}

function initialize() {
    loadDB();
}