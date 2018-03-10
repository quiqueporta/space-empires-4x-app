const express = require('express')
const serveStatic = require('serve-static')
const path = require('path')

// create the express app
const app = express()

// create middleware to handle the serving the app
app.use("/dist", serveStatic ( path.join (__dirname, '/dist') ) )

//Return the index for any other GET request
app.get('/*', function (req, res) {
    res.sendFile('index.html', {root: path.join(__dirname, '')});
});

// Create default port to serve the app on
const port = process.env.PORT || 5000
app.listen(port)

// Log a feedback that this is actually running
console.log('Server started on port ' + port)
