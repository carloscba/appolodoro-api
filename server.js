'use strict'

const http = require('http')
const express = require('express')
const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const bodyParser = require('body-parser');
const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')


//EndPoints
const api = require('./api/endpoint')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://appolodoro-a6b3a.firebaseio.com'
});
var db = admin.firestore()

app.use('/api/users', api.endPoint('users', {
	name: 'required',
    email: 'required|email'
}, db))

app.use((err, req, res, next) => {
    res.status(500).send({ 
        id : '',
        status : '',
        code : '',
        title : '',
        detail : '',
        error : err.message
    })
})

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})
