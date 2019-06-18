require('dotenv').config()
const express = require('express'),
	  app = express(),
	  port = process.env.PORT || 3000,
	  routes = require('./routes'),
	  bodyParser = require('body-parser'),
	  middleware = require('./middleware'),
	  cors = require('./cors')

//cors middleware	  
app.use(cors)

//log middleware
app.use(middleware)

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes(app)

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})
