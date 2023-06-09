const fs = require('fs');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const path = require('path');
const models = require('../models');
const entity = require('../models').users;

const userController = {
    create: (req, res) => {
        const { id, ...dataInsert } = req.body;
        dataInsert['pass'] = CryptoJS.AES.encrypt(dataInsert['pass'], process.env.CRYP_KEY).toString();
        return entity
            .findOrCreate({
                where: {
                    email: dataInsert.email
                },
                defaults: dataInsert
            })
            .then(data => {
                const httpCode = data[1] ? 200 : 400;
                delete data[0].dataValues.pass;
                res.status(httpCode).json({
                    result: data[0],
                    code: httpCode,
                    message: data[1] ? "Ok" : "Ya existe el usuario",
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
        dataUpdate['pass'] = CryptoJS.AES.encrypt(dataUpdate['pass'], process.env.CRYP_KEY).toString();
        return entity
            .update(dataUpdate, {
                where: {
                    email: dataUpdate['email']
                },
                // returning: true,
            })
            .then(data => {
                // roleController.find(req, res);
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
                    email: req.body.email
                }
            })
            .then(data => {
                const httpCode = (data == 0 ? 404 : 200);
                res.status(httpCode).json({
                    result: data,
                    code: httpCode,
                    message: (data == 0 ? `No existe el registro` : `Se eliminó ${data} registro`),
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
                attributes: ['id', 'idRole', 'email', 'name'],
                include: {
                    model: models.role ,
                    as: 'idRoleRole',
                    attributes: ['name'],
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
    find: (req, res) => {
        return entity
            .findOne({
                where: {
                    email: req.body.email
                },
                attributes: ['email', 'name'],
            })
            .then(data => {
                const httpCode = (data == null ? 404 : 200);
                res.status(httpCode).json({
                    result: data,
                    code: httpCode,
                    message: (data == null ? 'No se encontró' : 'Ok'),
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

module.exports = userController;