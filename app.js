require('dotenv').config()
const path = require('path')
const express = require('express')
const session = require('express-session')
const FileStore = require('session-file-store')(session)
const morgan = require('morgan')
const hbs = require('hbs')
// const { isUserLogin, isUserNotLogin } = require('./src/middleware/')

const app = express()
const PORT = process.env.PORT || 3000

const indexRouter = require('./src/routes/index.routes.js');
const logoutRouter = require('./src/routes/logout.routes.js');
const signInRouter = require('./src/routes/signin.routes.js');
const signUpRouter = require('./src/routes/signup.routes.js');

const sessionConfig = {
  store: new FileStore(),
  key: 'sid',
  secret: process.env.SECRET_KEY || 'secret',
  resave: false,
  saveUninitialized: false,
  httpOnly: true,
  cookie: { expires: 24 * 60 * 60e3 },
}

app.set('view engine', 'hbs')
app.set('views', path.join(process.env.PWD, 'src', 'views'))
hbs.registerPartials(path.join(process.env.PWD, 'src', 'views', 'partials'))

app.use(session(sessionConfig))
app.use(express.static(path.join(process.env.PWD, 'src', 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan('dev'))

app.use((req, res, next) => {
  if (req.session) {
    res.locals.user = req.session.user
  }
  next()
})


app.use('/', indexRouter);
app.use('/logout', logoutRouter);
app.use('/signin', signInRouter);
app.use('/signup', signUpRouter);

app.get('*', (req, res) => {
  res.render('404')
})

app.listen(PORT, () => {
  console.log(`"A ship in port ${PORT} is safe, but that's not what ships are built for." John A. Shedd`)
})

