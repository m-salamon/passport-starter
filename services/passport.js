const express = require('express')
const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth20').Strategy
const keys = require('../config/keys')

const mongoose = require('mongoose')
const User = mongoose.model('User')

passport.serializeUser((user, done) => {
     done(null, user.id)
})
passport.deserializeUser((id, done) => {
    User.findById(id).then(user => {
         done(null, user)
    })
})


passport.use(new GoogleStrategy({
     clientID: keys.googleAuthClientId,
     clientSecret: keys.googleAuthSecret,
     callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
     User.findOne({ googleid: profile.id }).then(user => {
          if (user)
               done(null, user)
          else
               new User({
                    googleid: profile.id
               }).save().then(user => {
                    console.log(user)
                    done(null, user)
               })
     })


     console.log(accessToken)
     console.log(refreshToken)
     console.log(profile)
}))



