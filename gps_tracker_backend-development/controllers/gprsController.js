const gpsController = require('./gpsController');
const entity = require('../models').gpsDeviceTrack;
const sseService = require('../service/sseService');
const { eventSerializer } = require('../_util/util');
const Sequelize = require('sequelize');

const gprsController = {
    event: (req, res) => {
        console.log(req.query);
        console.log(req.body);
        const data = (req.query.id === undefined ? req.body: req.query);
        const { id, ...peticion } = data;
        gpsController.findByImei({
            body: {
                imei: id
            }
        }).then(dataGPS => {
            if (dataGPS != null) {
                const fechaRegistroGPS = new Date(peticion.timestamp * 1000);
                peticion.timestamp = fechaRegistroGPS;
                return entity
                    .create({
                        ...peticion,
                        idGpsDevice: dataGPS.id
                    })
                    .then(data => {
                        // Registro de nuevo evento en la pila
                        sseService.publish(data);
                        res.status(200).json({
                            result: data[0],
                            code: 200,
                            message: "Ok",
                        });
                    })
                    .catch(err => {
                        res.status(400).json({
                            result: null,
                            code: 400,
                            message: err.message || "Ocurrió un error al persistir"
                        });
                    });
            } else {
                res.status(404).json({
                    result: null,
                    code: 404,
                    message: "Dispositivo no registrado"
                });
            }

        })
            .catch(err => {
                res.status(400).json({
                    result: null,
                    code: 400,
                    message: err.message || "Ocurrió un error al persistir"
                });
            });
    },
    find: (req, res) => {
        setTimeout(() => {
            entity
                .findOne({
                    attributes: [
                        // [Sequelize.fn('max', Sequelize.col('timestamp')), 'max'],
                        'timestamp', 'idGpsDevice', 'lat', 'lon', 'speed'
                    ],
                    where: {
                        idGpsDevice: req.params.id
                    },
                    having: {
                        timestamp: Sequelize.fn('max', Sequelize.col('timestamp'))
                    },
                    group: ['idGpsDevice', 'lat', 'lon', 'speed','timestamp'],
                    order:[
                        ['timestamp','DESC']
                    ]
                })
                .then(data => {
                    sseService.publish(data);
                })
                .catch(err => {
                    console.error(err);
                });
        }, 3000);

    },
    eventPublisher: (req, res) => {

        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Connection', 'keep-alive');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('X-Accel-Buffering', 'no');
        res.flushHeaders();

        if (req.params.id != '0') {
            // Envio de punto actual en el mapa
            gprsController.find(req, res);

            const stream$ = sseService.getTrack(req.params.id)
                // .pipe(
                //     // mergeAll()
                // )
                .subscribe((evento => {
                    res.write(eventSerializer(evento.name, evento.data));
                }));
            req.on('close', () => {
                stream$.unsubscribe();
            });
            res.write(eventSerializer("message", null));
        } else {
            res.write(eventSerializer("message", null));
        }
    },


}

module.exports = gprsController;