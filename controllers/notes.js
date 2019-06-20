'use strict'

const response = require('./response')
const conn = require('../connection')
const library = require('../lib')

exports.index = (req, res) => {
	res.json({
		status: 200,
		message: 'please specify the data you want to retreat..'
	})
}

exports.findAll = (req, res) => {
	var {limit, page} = req.query
	const {sql, param} = library.searching(req, 'v_notes')

	var total = 0
	
	if(!limit)
		limit = 10
	if(!page)
		page = 1
	
	
	library.countTotal(req, (err, content) => {
		if (err) {
			console.log(err);
			throw err
		} else {
			total = content;
		}
	});

	conn.query(sql, param, (err, rows, field) => {
		page = parseInt(page)
		
		const totalPage = Math.ceil(total / limit)

		if (err) {
			throw err
		} else {
			res.json({
				status: 200,
				data: rows,
				total,
				page,
				totalPage,
				limit
			})
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



