const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const initializePassport = require('./passport-config')
initializePassport(
    passport, 
    name => users.find(user => user.name === name),
    id => users.find(user => user.id === id)
    )

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({extended: false}))
app.use(flash());
app.use(session({
    secret: 'asdasdasfdgs',
    resave: true,
    saveUninitialized: true,
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req,res,next){
    res.locals.currentUser = req.user;
    next();
})

const users = [
    {
        id: '1636399491966',
        name: 'a',
        password: '$2b$10$aIMfcc94WiG0gEdK9KqtVuxujZa6CKqYIEcyhZv7cmx2dOngxqG9q',
        history: [
            123,
            555,
            42,
            1337,
            228,
            322
        ]
      }
]

app.get('/', isNotAuth, (req, res) => {
    res.render('index.ejs')
})

app.get('/login', isNotAuth, (req, res) => {
    res.render('login.ejs')
})

app.get('/registration', isNotAuth, (req, res) => {
    res.render('registration.ejs')
})

// app.get('/dashboard', isAuth, (req, res) => {
//     res.render('dashboard.ejs')
// })

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
        res.redirect('/login')
    } catch {
        res.redirect('/registration')
    }
})

app.post('/logout', isAuth, (req, res) => {
    req.logout();
    res.redirect('/login');
})

// app.post('/login', passport.authenticate('local', {successRedirect: '/dashboard', failureRedirect:'/', failureFlash: true}))
app.post('/login', isNotAuth, passport.authenticate('local', {
    successRedirect: '/calculator',
    failureRedirect: '/registration',
    failureFlash: true
}))

app.post('/calculator', isAuth, (req, res) => {
    req.user.history = req.body.history.split(',').map(Number);
    res.redirect('/calculator')
})


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



app.listen(8080)