const express = require('express');
const cors = require('cors');
const http = require('http');
const bodyParser = require('body-parser');
const { queue } = require('./jobs/jobScheduler');

require('dotenv').config();

const app = express();
const gps_app = express();
const port = process.env.APP_PORT;
const gps_port = process.env.GPS_PORT;


app.use(cors());
app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
gps_app.use(express.json({limit: "1mb"}));

// Rutas Usuarios
// const userRouter = require('./routes/users');
// app.use('/user', userRouter);

const loginRouter = require('./routes/loginRoute');
app.use('/auth', loginRouter);

const userRouter = require('./routes/userRoute');
app.use('/user', userRouter);

const rolRouter = require('./routes/rolRoute');
app.use('/rol', rolRouter);

const ownerRouter = require('./routes/ownerRoute');
app.use('/owner', ownerRouter);

const userOwnerRouter = require('./routes/userOwnerRoute');
app.use('/user_owner', userOwnerRouter);

const geofenceRouter = require('./routes/geofenceRoute');
app.use('/geofence', geofenceRouter);

const smsRoute = require('./routes/smsRoute');
app.use('/sms', smsRoute);

const gpsRoute = require('./routes/gpsRoute');
app.use('/gps', gpsRoute);

const ibeaconGpsOwnerRoute = require('./routes/ibeaconGpsOwnerRoute');
app.use('/device_owner', ibeaconGpsOwnerRoute);

// Ruta para captura de datos en GPS
const gprsRoute = require('./routes/gprsRoute');
gps_app.use('/', gprsRoute);

const gpsDeviceTrackRoute = require('./routes/gpsDeviceTrackRoute');
app.use('/gps_track', gpsDeviceTrackRoute);

const gpsDeviceTrackHistoricRoute = require('./routes/gpsDeviceTrackHistoricRoute');
app.use('/gps_track_report', gpsDeviceTrackHistoricRoute);

const alertRouter = require('./routes/alertRoute');
app.use('/alert', alertRouter);

// Servidores
const server = http.createServer(app);
const gps_server = http.createServer(gps_app);

server.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

gps_server.listen(gps_port, () => {
  console.log(`Server is running on port: ${gps_port}`);
});

queue.on('completed', (_job, result) => {
  console.log(`Job completed with result ${result}`);
});

queue.on('failed', (_job, err) => {
  console.log(`Job failed with error ${err.message}`);
});