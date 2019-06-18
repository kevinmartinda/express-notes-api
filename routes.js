'use strict'

module.exports = app => {
	const notesController = require('./controllers/notes')
	const categoriesController = require('./controllers/categories')

	//GET
	app.get('/', notesController.index)
	app.get('/notes', notesController.findAll)
	app.get('/notes/:id', notesController.find)
	app.get('/categories', categoriesController.findAll)
	app.get('/categories/:id', categoriesController.find)

	//POST
	app.post('/notes', notesController.create)
	app.post('/categories', categoriesController.create)

	//PATCH
	app.patch('/notes/:id', notesController.update)
	app.patch('/categories/:id', categoriesController.update)

	//DELETE
	app.delete('/notes/:id', notesController.delete)
	app.delete('/categories/:id', categoriesController.delete)
}