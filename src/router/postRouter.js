/** @format */

const { Router } = require('express');
const {  db } = require('../db.js');
const postRouter = Router();
const {posts} = require('../../data/posts.json')
require('dotenv').config();

postRouter.get('/', async (req, res) => {
	const posts = await db.posts.find({}).toArray()
	if (posts) {
		res.json(posts)
		
	}else{
		res.send('Error')
	}
});

postRouter.get('/post', async (req, res) => {
	
	const id = req.query.id

	const post = await postCollection.find({_id: id})

	res.json(post)
})

postRouter.post('/add-new', async (req, res) => {
	const data = req.body
	try {
		await db.posts.insertMany(data).then(() => {
	res.send('Done')
	})
	} catch (error) {
		console.log(error)
		res.send('Error')
	}
	
})


module.exports = postRouter;
