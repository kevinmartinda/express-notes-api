'use strict'

module.exports = app => {
	const notesController = require('./controllers/notes')
	const categoriesController = require('./controllers/categories')

	//GET
	app.get('/', notesController.index)
	app.get('/notes', notesController.findAll)
	app.get('/note/:id', notesController.find)
	app.get('/categories', categoriesController.findAll)
	app.get('/category/:id', categoriesController.find)

	//POST
	app.post('/note', notesController.create)
	app.post('/category', categoriesController.create)

	//PATCH
	app.patch('/note/:id', notesController.update)
	app.patch('/category/:id', categoriesController.update)

	//DELETE
	app.delete('/note/:id', notesController.delete)
	app.delete('/category/:id', categoriesController.delete)
}