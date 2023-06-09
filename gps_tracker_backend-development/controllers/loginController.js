const fs = require('fs');
const CryptoJS = require("crypto-js");
const jwt = require('jsonwebtoken');
const path = require('path');
const { generateToken } = require('../_util/util');
const e = require('express');

const idAdmin = process.env.ID_ADMIN;

const models = require('../models');
const entity = require('../models').users;

const loginController = {
    accessToken: (req, res) => {
        const { id, ...dataLogin } = req.body;
        return entity
            .findOne({
                where: {
                    email: dataLogin['email']
                },
                attributes: ['id', 'email', 'name', 'idRole', 'pass'],
            })
            .then(data => {
                if (data == null) {
                    res.status(404).json({
                        result: null,
                        code: 404,
                        message: 'Usuario y/o contraseña no válido',
                    });

                } else {
                    const payload = { ...data.dataValues };
                    const bytes = CryptoJS.AES.decrypt(data.dataValues.pass, process.env.CRYP_KEY);
                    const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

                    if (decryptedData == dataLogin.pass) {
                        delete payload.pass;
                        const respuesta = generateToken(payload);

                        res.status(200).json({
                            result: respuesta,
                            code: 200,
                            message: 'Ok',
                        });
                    } else {
                        res.status(404).json({
                            result: null,
                            code: 404,
                            message: 'Usuario y/o contraseña no válido',
                        });
                    }


                }

            })
            .catch(err => {
                res.status(400).json({
                    result: null,
                    code: 400,
                    message: err.message || "Usuario y/o contraseña no válido"
                });
            });
    },
    refreshToken: (req, res) => {
        const { id, ...dataLogin } = req.body;
        const token = dataLogin.refresh_token;
        const publicKey = fs.readFileSync(path.resolve(path.join(__dirname, '../', process.env.APP_PUBLICKEY_FILE)));

        jwt.verify(token, publicKey, { algorithm: 'RS256' }, (errv, payloadjwt) => {
            if (errv) {
                return res.status(401).send(errv);
            }

            return entity
                .findOne({
                    where: {
                        id: payloadjwt.id
                    },
                    attributes: ['id', 'email', 'name', 'idRole'],
                })
                .then(data => {
                    const httpCode = (data == null ? 404 : 200);
                    const payload = { ...data.dataValues };
                    const respuesta = generateToken(payload);

                    res.status(httpCode).json({
                        result: respuesta,
                        code: httpCode,
                        message: 'Ok',
                    });
                })
                .catch(err => {
                    res.status(400).json({
                        result: null,
                        code: 400,
                        message: err.message || "Ocurrió un error al persistir"
                    });
                });

        })
    },
    consultaIntrospect: (req, res) => {
        return models.users
            .findOne({
                where: {
                    id: req.auth.idUser
                },
                attributes: ['id','idRole'],
                include: [{
                    model: models.role,
                    as: 'idRoleRole',
                    attributes: ['name'],
                },
                {
                    model: models.userOwnerRel,
                    as: 'userOwnerRels',
                    attributes: ['id'],
                    include:[{
                        model: models.owner,
                        as: 'id_ownerOwner',
                        attributes: ['id','name'],
                    }]
                }]
            })
            .then(data => {
                if (data == null) {
                    res.status(404).json({
                        result: {},
                        code: 404,
                        message: "No se encontro el usuario"
                    });
                } else {
                    const idRole = data.dataValues.idRole != null ? data.dataValues.idRole : 0;
                    const isAdmin = idRole == idAdmin;
                    const httpCode = (data == null ? 404 : 200);
                    res.status(httpCode).json({
                        result: { ...data.dataValues, isAdmin },
                        code: httpCode,
                        message: (data == null ? 'No se encontró' : 'Ok'),
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
}

module.exports = loginController;