var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const mongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')

var indexRouter = require('./routes/index')
var signupRouter = require('./routes/signup')
var dashboardRouter = require('./routes/dashboard')
var profileRouter = require('./routes/profile')
var forgotpasswordRouter = require('./routes/forgotpassword')
var resetpasswordRouter = require('./routes/resetpassword')

var app = express()

// Add headers
app.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  // res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});


//mongo connection
mongoose.connect('mongodb://127.0.0.1:27017/winnipitty')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  console.log('Successfully connected to MongoDB server!')
})
require('./config/passport')(passport)

// view engine setup
app.engine('html', require('ejs').renderFile)
app.set('view engine', 'html')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(session({
  secret: 'codeXekReT',
  resave: false,
  saveUninitialized: false,
  store: new mongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 86400000 }
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())
// app.use(expressValidator())
app.use(flash())
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res)
  next()
})
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/signup', signupRouter)
app.use('/dashboard', dashboardRouter)
app.use('/profile', profileRouter)
app.use('/forgotpassword', forgotpasswordRouter)
app.use('/resetpassword', resetpasswordRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
});

module.exports = app
