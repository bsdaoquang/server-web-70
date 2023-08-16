/** @format */

const { Router } = require('express');
const users = require('../../data/users.js');
const checkAPIKey = require('../middlewares/post.js');
const jwt = require('jsonwebtoken');
const userSerivce = require('../services/userSevice.js');
require('dotenv').config();

const authRouter = Router();

authRouter.post('/login', (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(404).json({
			message: 'Thiếu thông tin đăng nhập',
		});
	}

	const user = users.find((element) => element.username === username);

	if (!user) {
		return res.status(404).json({
			message: 'User not found!',
		});
	} else {
		if (user.password === password) {
			const token = jwt.sign(
				{ username: user.username, email: user.email },
				process.env.SCRETE_KEY
				// { expiresIn: '60s' }
			);

			return res.status(200).json({
				token,
			});
		}
	}
});
authRouter.post('/register', (req, res) => {
	const { username, password } = req.body;

	if (!username || !password) {
		return res.status(404).json({
			message: 'Thiếu thông tin đăng nhập',
		});
	}

	const data = {
		username,
		password,
		roles: 'member',
		email: 'fshahgfs',
		createdAt: Date.now(),
		lastLoginAt: Date.now(),
	};

	users.push(data);

	const token = jwt.sign(
		{ username, email: 'dfashfjks' },
		process.env.SCRETE_KEY
		// { expiresIn: '60s' }
	);

	res.status(200).json({
		token,
	});
});

authRouter.get('/users-detail', checkAPIKey, (req, res) => {
	const id = req.query.id;
	if (id) {
		const user = users.find((element) => element.id === parseInt(id));
		
		if (!user) {
			res.send('user not found');
			return;
		} else {
			res.json(user);
		}
	} else {
		res.send('Missing user id');
		return;
	}
});

module.exports = authRouter;
