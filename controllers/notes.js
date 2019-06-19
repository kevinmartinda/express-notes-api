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
	var {search, sort, page} = req.query

	let sql = "SELECT * FROM v_notes"
	const param = []

	if(search){
		search = `%${search}%`
		sql += " WHERE title like ?"
		param.push(search)
	}

	if(sort){
		switch(sort){
			case 'ASC':
				sql += " ORDER BY id ASC"
			break
			case 'DESC':
				sql += " ORDER BY id DESC"
			break
			default: 
				sql += ""
		}
	}

	if(page){
		let numPage = parseInt(page)
		let start = 0
		let limit = 10
		if(numPage > 1){
			start = (numPage * limit) - limit
		}
		sql += " LIMIT ?, ?"
		param.push(start, limit)
		console.log(start, limit)
	}

	console.log(sql)
	conn.query(sql, param, (err, rows, field) => {
		console.log(sql)
		console.log(param)
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



