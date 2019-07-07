'use strict'

const response = require('./response')
const model = require('../models')
const Sequelize = require('sequelize')

exports.index = (req, res) => {
	res.json({
		status: 200,
		message: 'please specify the data you want to retreat..'
	})
}

exports.findAll = async (req, res) => {
	var {limit, page, sort, search} = req.query
	const param = {include: [{model: model.Category, as: 'Category', attributes: ['id','name']}]}

	let start = 0

	limit ? limit = parseInt(limit) : limit = 10
	page ? page = parseInt(page) : page = 1
	sort ? sort.toUpperCase() : sort = 'DESC'
		
	if (search){
		search = `%${search}%`
		param.where = {
			title: {[Sequelize.Op.like]: search}}
	}

	if(page > 1){
		start = (page * limit) - limit
	} 

	param.limit = parseInt(limit)
	param.offset = parseInt(start)
	param.order = [['updatedAt', sort]]
	param.direction = 'DESC'

	console.log(param)
	let total = 0

	console.log(total)
	model.Note.findAndCountAll(param).then(rows => {
		res.json({
			status: 200,
			values: rows.rows,
			total: rows.count,
			page,
			totalPage: Math.ceil(rows.count / limit),
			limit

		})
	}).catch(err => {
		console.log(err)
	})
	
}

exports.find = (req, res) => {
	const id = req.params.id
	model.Note.findByPk(id, {include: 'Category'})
	  .then(row => {
		response.ok(row, res)
	  }).catch(err => {
		console.log(err)
	  })
}

exports.findNotesByCategory = (req, res) => {
	const id = req.params.categoryId
	var {limit, page, sort, search} = req.query
	const param = {include: [{model: model.Category, as: 'Category', attributes: ['id','name']}]}

	let start = 0

	limit ? limit = parseInt(limit) : limit = 10
	page ? page = parseInt(page) : page = 1
	sort ? sort.toUpperCase() : sort = 'DESC'
		
	if (search){
		search = `%${search}%`
		param.where = {
			title: {[Sequelize.Op.like]: search}}
	}

	if(page > 1){
		start = (page * limit) - limit
	}
	 

	param.limit = parseInt(limit)
	param.offset = parseInt(start)
	param.order = [['updatedAt', sort]]
	param.direction = 'DESC'
	param.where = {
		categoryId: id
	}

	console.log(param)
	let total = 0

	console.log(total)
	model.Note.findAndCountAll(param).then(rows => {
		res.json({
			status: 200,
			values: rows.rows,
			total: rows.count,
			page,
			totalPage: Math.ceil(rows.count / limit),
			limit

		})
	}).catch(err => {
		console.log(err)
	})
}

exports.create = (req, res) => {
	const { title, note, categoryId } = req.body

	model.Note.create({
		title,
		note,
		categoryId,
		createdAt: 'now()',
		updatedAt: 'now()'
	}).then((result) => (
		result.id
	)).then((id) => {
		model.Note.findByPk(id, {include: 'Category'})
		.then(row => {
			response.ok(row, res)
		}).catch(err => {
			console.log(err)
		})
	}).catch(err => {
		console.log(err)
	})

}

exports.update = (req, res) => {
	const id = req.params.id
	const { title, note, categoryId } =  req.body 

	model.Note.update({title, note, categoryId}, {where: {id}})
	.then(result => (
		model.Note.findByPk(id, {include: 'Category'})
		.then(row => {
			console.log(row)
			response.ok(row, res)
		}).catch(err => {
			console.log(err)
		})
	)).catch(err => {
		console.log(err)
	})

}

exports.delete = (req, res) => {
	const id = req.params.id
	
	model.Note.destroy({
		where: {id}
	})
	.then((result) => {
		response.ok(id, res)
	})
	.catch(err => {
		console.log(err)
	})
}



