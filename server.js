'use strict'

const http = require('http')
const express = require('express')
const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)
const bodyParser = require('body-parser');
const users = require('./api/users')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/users', users)

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
