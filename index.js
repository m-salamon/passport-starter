const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const keys = require('./config/keys')
const cookieSession = require('cookie-session')
require('./models/users')
require('./services/passport')

mongoose.Promise = Promise
mongoose.connect(keys.mongoURI)

const app = express()

app.use(cookieSession({
   maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
   keys: [keys.cookieKey]  
}))
app.use(passport.initialize())
app.use(passport.session())

require('./routes/authRoutes')(app)

const PORT = process.env.PORT || 5000


app.listen(PORT, () => {
     console.log('Listening on port ' + PORT)
     console.log('go to localhost:5000/auth/google')
})


