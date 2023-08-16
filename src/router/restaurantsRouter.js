/** @format */

const { Router } = require('express');
const { db } = require('../db.js');
const restaurantRouter = Router();
const { ObjectId } = require('mongodb')

dbRestaurant = db.restaurants

restaurantRouter.get('/', async (req, res) =>
{
	const { page, pageSize } = req.query
	try {
		const results = await db.restaurants.find({}).limit(parseInt(pageSize)).toArray()

		res.status(200).json({
			message: '',
			data: results, totalItems: results.length
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: error
		})
	}
});

restaurantRouter.get('/detail', async (req, res) =>
{

	const id = req.query.id
	console.log(id)
	try {
		const results = await db.restaurants.find({ _id: new ObjectId(id) }).toArray()
		if (results.length > 0) {
			res.status(200).json({
				message: '',
				data: results[0]
			})
		} else {
			res.status(202).json({
				message: 'Restaurant not found!',
				data: []
			})
		}

	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: error
		})
	}
});

restaurantRouter.put('/', async (req, res) =>
{

	const id = req.query.id
	const data = req.body
	// console.log(data, data.name, id)
	try {
		await db.restaurants.updateOne({ _id: new ObjectId(id) }, {
			$set: {
				name: data.name,
				'age': data.age
			},
			$push: {
				grades: { $each: data.grades }
			}
		}).then(() =>
		{

			res.send('Done')
		})
	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: error
		})
	}
});

restaurantRouter.post('/add-new', async (req, res) =>
{

	const data = req.body

	try {
		await db.restaurants.insertOne(data).then((result) =>
		{
			
			res.status(200).json({
				message: 'Add new restaurant successfully!'
			})
		})
	} catch (error) {
		res.status(400).json({
			message: 'Can not add new restaurant'
		})
	}

})
restaurantRouter.post('/add-many', async (req, res) =>
{

	const data = req.body

	try {
		await db.restaurants.insertMany(data).then((result) =>
		{
			console.log(result)
			res.status(200).json({
				message: 'Add new restaurant successfully!'
			})
		})
	} catch (error) {
		res.status(400).json({
			message: 'Can not add new restaurant'
		})
	}

})

restaurantRouter.delete('/', async (req, res) =>
{

	const id = req.query.id

	try {

		if (id) {
			await db.restaurants.deleteOne({ _id: new ObjectId(id) }).then(() =>
			{
				res.send('Done')
			})
		} else {
			const objectIds = []

			const ids = req.body.ids

			ids.forEach(id => objectIds.push(new ObjectId(id)))

			await db.restaurants.deleteMany({
				_id: {
					$in:
						objectIds
				}
			}).then(() =>
			{
				res.send('Done')
			})
		}


	} catch (error) {
		console.log(error)
		res.status(500).json({
			message: error
		})
	}
});

module.exports = restaurantRouter;
