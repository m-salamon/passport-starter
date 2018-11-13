const express = require('express')
const passport = require('passport')


module.exports = app => {
     app.get('/auth/google', passport.authenticate('google', {
          scope: ['profile', 'email']
     }))

     app.get('/auth/google/callback', passport.authenticate('google'))

     app.get('/api/currentuser', (req, res) => {
          res.send(req.user)
     })

     app.get('/api/logout', (req, res) => {
          req.logout()
          res.send('you have been logged out ' + req.user)
     })
}



