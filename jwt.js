'use strict'

const jwt = require('jsonwebtoken')

function sign(payload, secret, callback){
    jwt.sign(payload, secret, callback)
}

function verify(token, secret, callback){
    jwt.verify(token, secret, callback)
}

module.exports = {
    sign, 
    verify
}

/*
var auth = require('jwt.js')
auth.sign({username : 'appolodoro'}, 'laclavemagica', console.log)
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFwcG9sb2Rvcm8iLCJpYXQiOjE1MTMzNDU3OTF9.j4L4fVZM2NmTtfKXpLvg-VAehhCo7F7b701oOtj6voU
*/