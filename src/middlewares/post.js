/** @format */

function checkAPIKey(req, res, next) {
	const apiKey = req.headers.apikey;

	if (!apiKey) {
		res.send({
			data: [],
			message: 'API Key missing!',
		});
		return;
	}

	next();
}

module.exports = checkAPIKey;
