/** @format */

const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
	const token = req.headers.authorization;

	if (!token) {
		return res.status(401).json({
			message: 'Lỗi chưa đăng nhập',
		});
	} else {
		// Check token
		const accessToken = token.split('Bearer ')[1];

		try {
			const verifiToken = await jwt.verify(accessToken, process.env.SCRETE_KEY);

			if (verifiToken) {
				next();
			}
		} catch (error) {
			console.log(error);
			return res.status(401).json({
				message: error,
			});
		}
	}
};

module.exports = verifyToken;
