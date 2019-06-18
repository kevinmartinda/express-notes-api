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
	conn.query('SELECT * FROM notes', (err, rows, field) => {
		if (err) {
			throw err
		} else {
			response.ok(rows, res)
		}
	})
}

exports.find = (req, res) => {
	const id = req.params.id
	conn.query('SELECT * FROM v_notes WHERE id = ?', [id], (err, rows, field) => {
		if(err) {
			throw err
		} else {
			response.ok(rows, res)
		}
	})
}

exports.create = (req, res) => {
	const { title, note, idCategory } = req.body

	conn.query('INSERT INTO notes VALUES (null, ?, ?, ?, now())', 
		[title, note, idCategory], (err, rows, fields) => {
			if (err) {
				throw err
			} else {
				response.ok("Note created!", res)
			}
		})

}

exports.update = (req, res) => {
	const id = req.params.id
	const { title, note, idCategory } =  req.body 

	conn.query('UPDATE notes SET title = ?, note = ?, categoryId = ?, time = now() WHERE id = ?', 
		[title, note, idCategory, id], (err, rows, fields) => {
			if (err) {
				throw err
			} else {
				response.ok("Note updated!", res)
			}
		})

}

exports.delete = (req, res) => {
	const id = req.params.id
	conn.query('DELETE FROM notes WHERE id = ?', [id], (err, rows, field) => {
		if(err) {
			throw err
		} else {
			response.ok("Note deleted!", res)
		}
	})
}



