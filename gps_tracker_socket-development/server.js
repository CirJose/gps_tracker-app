const axios = require('axios');
require('dotenv').config();

const backend_api = `${process.env.BACKEND}:${process.env.APP_PORT}${process.env.ENDPOINT}`

var LocationIo = require('./index');

var locationIo = new LocationIo();

locationIo.on("tracker-connected", function (trackerId) {
	console.log('new connection ' + trackerId);
});

locationIo.on("tracker-disconnected", function (id) {
	console.log('connection closed ' + id);
});

locationIo.on("message", function (trackerId, message) {
	console.log('message from ' + trackerId);
	// console.log(message);

	const payload = {
		id: trackerId,//'598774',
		timestamp: new Date(message.location.timestamp).getTime()/1000,//'1655358913',
		lat: message.location.latitude,//'-0.166682',
		lon: message.location.longitude,//'-78.478604',
		speed: message.location.speed,//'0.0',
		bearing: message.location.direction || '0.0',
		altitude: '0',//'2912.099853515625',
		accuracy: '-1',//'11.479999542236328',
		batt: message.location.batt || '-1'//'51.0'
	};

	console.log(payload);
	axios.post(backend_api, payload)
		.then(res => {
			console.log(`statusCode: ${res.status}`)
		}).catch(error => {
			console.error(error);
		});
});



locationIo.createServer(3002);

