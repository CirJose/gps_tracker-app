const models = require('../models');
const entity = require('../models').ibeaconGpsOwnerRel;

const ibeaconGpsOwnerController = {
    create: (req, res) => {
        return entity
            .findOrCreate({
                where: { 
                    name: req.body.name,
                    id_owner: req.body.id_owner,
                    id_ibeacon_device: req.body.id_ibeacon_device
                },
                defaults: req.body
            })
            .then(data => {
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
    },
    update: (req, res) => {
        const { id, ...dataUpdate } = req.body;
        return entity
            .update(dataUpdate, {
                where: {
                    id: id
                }
            })
            .then(data => {
                // ibeaconGpsOwnerController.find(req, res);
                const httpCode = (data[0] == 0 ? 404 : 200);
                res.status(httpCode).json({
                    result: data[0],
                    code: httpCode,
                    message: (data[0] == 0 ? `No existe el registro` : `Se actualizó ${data[0]} registro`),
                });
            })
            .catch(err => {
                res.status(400).json({
                    result: null,
                    code: 400,
                    message: err.message || "Ocurrió un error al persistir"
                });
            });
    },
    delete: (req, res) => {
        return entity
            .destroy({
                where: {
                    id: req.body.id
                }
            })
            .then(data => {
                const httpCode = (data == 0 ? 404 : 200);
                res.status(httpCode).json({
                    result: data,
                    code: httpCode,
                    message: `Se eliminó ${data} registro`,
                });
            })
            .catch(err => {
                res.status(400).json({
                    result: null,
                    code: 400,
                    message: err.message || "Ocurrió un error al persistir"
                });
            });
    },
    list: (_, res) => {
        return entity
            .findAll({
                attributes: ['id', 'name', 'id_gps_device', 'id_owner', 'id_ibeacon_device'],
                include: [
                    {
                        model: models.owner,
                        as: 'id_ownerOwner',
                        attributes: ['name'],
                    },
                    {
                        model: models.gpsDevice,
                        as: 'id_gps_deviceGpsDevice',
                        attributes: ['name'],
                    },
                    {
                        model: models.ibeaconDevice,
                        as: 'id_ibeacon_deviceIbeaconDevice',
                        attributes: ['name'],
                    }]
            })
            .then(data => {
                res.status(200).json({
                    result: data,
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
    },
    find: (req, res) => {
        return entity
            .findOne({
                where: {
                    id: req.body.id
                }
            })
            .then(data => {
                res.status(200).json({
                    result: data,
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
    },

}

module.exports = ibeaconGpsOwnerController;