'use strict'

module.exports = (req, res, next) => {
	const today = new Date()
	const date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`
	const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`
	const dateTime = `${date} ${time}`
	
	console.log(`${req.method} ${req.url}: accessed on ${dateTime}`)

	next()
}