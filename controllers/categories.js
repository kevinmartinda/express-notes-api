'use strict'

const response = require('./response')
const model = require('../models')

exports.index = (req, res) => {
	res.json({
		status: 200,
		message: 'please specify the data you want to retreat..'
	})
}

exports.findAll = (req, res) => {
	model.Category.findAll().then(rows => {
		response.ok(rows, res)
	})
}

exports.find = (req, res) => {
	const id = req.params.id
	model.Category.findByPk(id)
	  .then(row => {
		response.ok(row, res)
	  }).catch(err => {
		console.log(err)
	  })
}

exports.create = (req, res) => {
	const { name, url } = req.body

	model.Category.create({
		name,
		url
	}).then(result => {
		response.ok(result, res)
	}).catch(err => {
		console.log(err)
	})

}

exports.update = (req, res) => {
	const id = req.params.id
	const { name } =  req.body 

	model.Category.update({name}, {where: {id}})
	.then(result => {
		response.ok(result, res)
	})
	.catch(err => {
		console.log(err)
	})

}

exports.delete = (req, res) => {
	const id = req.params.id
	
	model.Category.destroy({
		where: {id}
	})
	.then(() => {
		response.ok(id, res)
	})
	.catch(err => {
		console.log(err)
	})
}