const Queue = require('bull');
const { gpsDeviceTrack, geofence } = require('../models'); // IMPORTANTE! importar correctamente el modelo Geofence
const { updateBeaconPositions, calculatePositions } = require('../_util/Calculations');
const turf = require('@turf/turf');
const helpers = require('@turf/helpers');
const eventEmitter = require('../_util/eventEmitter');

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

const queue = new Queue('iBeacon Queue', REDIS_URL);

async function processJob(job) {
    const latestBeacons = job.data;  // Obtener la data del trabajo (los iBeacons en este caso)
    
    await updateBeaconPositions(latestBeacons);
    const positions = await calculatePositions();
    const geofences = await geofence.findAll(); // Obtiene todos los geofences

    for (const position of positions) {
        eventEmitter.emit('positionUpdated', position);
        //console.log('ibeaconController: Guardando posición en la base de datos:', position); // Agrega esta línea
    
        const gpsDeviceRecord = await gpsDeviceTrack.create({
            id_ibeacon_device: position.id_ibeacon_device,
            lat: position.lat,
            lon: position.lon,
            timestamp: new Date()
        });
    
        // Aquí agregamos el código para verificar el geofence
        
        for (const geofence of geofences) {
            const point = turf.point([position.lon, position.lat]);
            const polygon = helpers.polygon(geofence.geom.coordinates); // Convierte el dato GEOMETRY a un formato que puede usar Turf
    
            if (turf.booleanPointInPolygon(point, polygon)) {
                console.log(`El dispositivo ${position.id_ibeacon_device} está dentro del geofence ${geofence.id}`);
            } else {
                console.log(`El dispositivo ${position.id_ibeacon_device} está fuera del geofence ${geofence.id}`);
            }
        }
    } 

    return positions;
}

queue.process(async (job, done) => {
    try {
        const positions = await processJob(job);
        done(null, positions); // Llamar a done cuando el trabajo esté completo
    } catch (error) {
        done(error); // Si hay un error, pasar el error a done
    }
});

module.exports = {
    queue
};
