'use strict'

const mysql = require('mysql')

const conn = mysql.createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASS,
	database: process.env.DBNAME
})

module.exports = conn