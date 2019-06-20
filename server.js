require('dotenv').config()
const express = require('express'),
	  app = express(),
	  port = process.env.PORT || 3000,
	  routes = require('./routes'),
	  bodyParser = require('body-parser'),
	  cors = require('cors'),
	  moment = require('moment')

//log middleware
app.use((req, res, next) => {
	console.log(`${req.method} ${req.url} : accessed on ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)
	next()
})

// cors middleware
// const whitelist = ['http://localhost', 'http://localhost:4200']
// app.use(
// 	cors({origin: (origin, callback) => {
// 		console.log(origin)
// 		if(whitelist.indexOf(origin) !== -1 || origin === undefined){
// 			callback(null, true)
// 		} else {
// 			callback(new Error('Not allowed by server..'))
// 		}
// 	}
// 	})
// )

//body-parser middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

routes(app)

app.listen(port, () => {
	console.log(`Server listening on port ${port}`)
})
