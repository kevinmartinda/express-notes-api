exports.searching = (req, table) => {
    var {search, sort, page, limit} = req.query
    
	let sql = `SELECT * FROM ${table}`
	const param = []

	//set default limit to given value if limit is undefined
	if (!limit)
		limit = 10

	//set default sort to given value if limit is undefined
	if (!sort)
		sort = 'desc'
	
	//check if there is 'search' query
    if(search){
		search = `%${search}%`
			
		sql += " WHERE title like ?"
		param.push(search)
	}

	//Check if there is 'sort' query string
	if(sort){
		sort = sort.toUpperCase()
		switch(sort){
			case 'ASC':
				sql += " ORDER BY time ASC"
			break
			case 'DESC':
				sql += " ORDER BY time DESC"
			break
			default: 
				sql += ""
		}
	}

	//set limit to the sql if there's no pagination
	if (limit && !page) {
		sql += " LIMIT ?"
		param.push(parseInt(limit))
	}

	//Check if there is 'page' query string
	if(page){
		page = parseInt(page)
		let start = 0

		limit = parseInt(limit)

		if(page > 1){
			start = (page * limit) - limit
		}
		sql += " LIMIT ?, ?"
		param.push(start, limit)
	}

    return {sql, param}
}

exports.countTotal = (callback) => {
	const conn = require('./connection')

	let sql = `SELECT COUNT(*) as count FROM v_notes` 

	conn.query(sql, (err, rows, field) => {
		let res = parseInt(rows[0].count)
		const result = res
		callback(null, result)
	})
}