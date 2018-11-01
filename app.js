const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const logger = require('morgan')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const session = require('express-session')
const passport = require('passport')
const mongoStore = require('connect-mongo')(session)
const flash = require('connect-flash')

//base routes
const indexRouter = require('./routes/index')
const dashboardRouter = require('./routes/dashboard')
const resetpasswordRouter = require('./routes/changePassword')
const profileRouter = require('./routes/profile')
const addUserRouter = require('./routes/addUser')
const viewAllUsersRouter = require('./routes/viewAllUsers')
const addTextRouter = require('./routes/addText')
const addImagesRouter = require('./routes/addImages')
const addVideosRouter = require('./routes/addVideos')
const createAdsRouter = require('./routes/createAds')
const viewAllAdsRouter = require('./routes/viewAllAds')
const editAd = require('./routes/editAd')
// user route or lcd where user,s ads shown
const userLcd = require('./routes/userLcd')
const userSlider = require('./routes/userSlider')





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
mongoose.connect('mongodb://maxifjaved:maxifjaved@127.0.0.1:27017/carsOnline?authSource=admin')
// mongoose.connect('mongodb://127.0.0.1:27017/carsOnline')
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
app.use(bodyParser({limit: '15mb'}));
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
app.use(flash())
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res)
  next()
})
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/changePassword', resetpasswordRouter)
app.use('/profile', profileRouter)
app.use('/dashboard', dashboardRouter)
app.use('/addUser', addUserRouter)
app.use('/viewAllUsers', viewAllUsersRouter)
app.use('/addText', addTextRouter)
app.use('/addImages', addImagesRouter)
app.use('/addVideos', addVideosRouter)
app.use('/createAds', createAdsRouter)
app.use('/viewAllAds', viewAllAdsRouter)
app.use('/editAd', editAd)
app.use('/userLcd', userLcd)
app.use('/userSlider', userSlider)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
});

module.exports = app
