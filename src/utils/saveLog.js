/** @format */

const logs = require('../../data/logs.js');

const saveLog = (option) => {
	return (req, res, next) => {
		const apiKey = req.headers.apikey;
		const api = option.api;

		const log = {
			apiKey,
			api,
			time: Date.now(),
		};

		logs.push(log);

		next();
	};
};

module.exports = saveLog;
