const axios = require('axios');

function Client(url, options) {
	if (typeof url === "object")
		options = url;

	if (typeof options !== "object")
		options = {};

	const AX = axios.create({
		headers: options.headers || {},
	});
		

	this.Request = function(query, variables) {
		return new Promise(function(resolve, reject) {
			AX.post(url, {
				query, variables
			}).then(function(response) {
				const data = response.data.data;
				const errors = response.data.errors;

				if (errors)
					reject({data, errors});
				else
					resolve(data);

			}).catch(function(e) {
				reject(e);
			});
		});
	}
}

module.exports = Client;
