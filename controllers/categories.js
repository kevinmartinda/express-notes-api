'use strict'

const response = require('./response')
const conn = require('../connection')

exports.index = (req, res) => {
	res.json({
		status: 200,
		message: 'please specify the data you want to retreat..'
	})
}

exports.findAll = (req, res) => {
	conn.query('SELECT * FROM categories', (err, rows, field) => {
		if (err) {
			throw err
		} else {
			response.ok(rows, res)
		}
	})
}

exports.find = (req, res) => {
	const id = req.params.id
	conn.query('SELECT * FROM categories WHERE id = ?', [id], (err, rows, field) => {
		if(err) {
			throw err
		} else {
			response.ok(rows, res)
		}
	})
}

exports.create = (req, res) => {
	const name = req.body.name

	conn.query('INSERT INTO categories VALUES (null, ?)', 
		[name], (err, rows, fields) => {
			if (err) {
				throw err
			} else {
				response.ok("Category added!", res)
			}
		})

}

exports.update = (req, res) => {
	const id = req.params.id
	const name =  req.body.name 

	conn.query('UPDATE categories SET name = ? WHERE id = ?', 
		[title, note, idCategory, id], (err, rows, fields) => {
			if (err) {
				throw err
			} else {
				response.ok("CAtegory updated!", res)
			}
		})

}

exports.delete = (req, res) => {
	const id = req.params.id
	conn.query('DELETE FROM categories WHERE id = ?', [id], (err, rows, field) => {
		if(err) {
			throw err
		} else {
			response.ok("Category deleted!", res)
		}
	})
}