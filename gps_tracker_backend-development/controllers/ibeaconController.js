const Sequelize = require('sequelize');
const { ibeaconDevice, ibeaconGateway, ibeaconDeviceTrack, gpsDeviceTrack } = require('../models');
const eventEmitter = require('../_util/eventEmitter');
const { create, all } = require('mathjs');
const sseService = require('../service/sseService');
const { eventSerializer } = require('../_util/util');
const { queue } = require('../jobs/jobScheduler');

const config = {};
const math = create(all, config);

const ibeaconController = {
    event: async (req, res) => {
                try {
            // Validación 1: Buscar el mac de la puerta de enlace (gateway) en la tabla ibeacon_gateway
            const gatewayMac = req.body.find(data => data.type === 'gateway')?.mac;
            if (gatewayMac) {
                const foundGateway = await ibeaconGateway.findOne({ where: { mac: gatewayMac } });
                if (!foundGateway) {
                    console.log('No se encontró el mac de la puerta de enlace en la tabla ibeacon_gateway.');
                    return res.status(400).json({
                        result: null,
                        code: 400,
                        message: "No se encontró el mac de la puerta de enlace en la tabla ibeacon_gateway."
                    });
                }
            }

            // Validación 2: Filtrar el JSON para evitar datos duplicados por mac y procesar solo el registro más reciente para cada objeto
            const uniqueBeacons = {}; // objeto para almacenar los beacons únicos por mac
            req.body.forEach(beacon => {
                if (beacon.type === 'Gateway' || beacon.type === 'iBeacon') {
                    if (!uniqueBeacons[beacon.mac] || uniqueBeacons[beacon.mac].updatedAt < beacon.updatedAt) {
                        uniqueBeacons[beacon.mac] = beacon;
                    }
                }
            });  
            //console.log('ULTIMA INFORMACION DE CADA IBEACON SIN DUPLICADOS******************************************************uniqueBeacons',uniqueBeacons)          
            const latestBeacons = Object.values(uniqueBeacons); // obtiene la última información de cada dispositivo iBeacon sin duplicados
            //console.log('ULTIMA INFORMACION DE CADA IBEACON SIN DUPLICADOS******************************************************latestBeacons',latestBeacons)

            queue.add(latestBeacons);

            res.status(200).json({
                result: positions,
                code: 200,
                message: "Ok",
            });
        } catch (error) {
            res.status(400).json({
                result: null,
                code: 400,
                message: error.message || "Ocurrió un error al procesar los datos de iBeacon"
            });
        }
    },

    eventPublisher: (req, res) => {
        let positions = [];
    
        //console.log('iniciando eventPublisher')
        //console.log(req)
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('X-Accel-Buffering', 'no');
        res.flushHeaders();
    
        eventEmitter.on('positionUpdated', (updatedPosition) => {
            //qconsole.log('****************************************************************updatedPosition:', updatedPosition);
            // Actualizar la posición en el arreglo de posiciones
            const index = positions.findIndex(position => position.id_ibeacon_device === updatedPosition.id_ibeacon_device);
            if (index !== -1) {
                positions[index] = updatedPosition;
            } else {
                positions.push(updatedPosition);
            }
    
            // Enviar el evento con la posición actualizada
            res.write(eventSerializer('latestPosition', updatedPosition));
           // console.log('evento emitido')
        });
        
        // Limpiar el controlador de eventos al cerrar la conexión
        req.on('close', () => {
           // console.log("Conexión cerrada--------------------------------------------------");
        });
    
        res.write(eventSerializer("message", null));
    },
}

module.exports = ibeaconController;