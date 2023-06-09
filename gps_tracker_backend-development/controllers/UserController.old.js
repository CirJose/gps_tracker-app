const connection = require('../config/bdd_connection');
const userFacade = require('../facade/UserFacade');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");
const path = require('path');
const fs = require('fs');
const { json2map } = require('../_util/util');
const sgMail = require('@sendgrid/mail');

const UserController = {
    login: function (req, res) {
        const param = req.body;
        // LLamada al manejador de de consultas en la BD
        userFacade.login([param.email, param.username])
            .then(respuesta => {
                let datos = respuesta.rows;
                // Verificar si el tamaño de la respuesta es vacía
                if (datos.length > 0) {
                    // retornar si no está activo
                    if (datos[0].id_estado_us === 0) {
                        return res.status(200).json({
                            result: false,
                            code: 200,
                            message: "Ups! Su usuario no está activo, por favor revise su email y actívelo."
                        });
                    }

                    // Inicializar variables de encriptacion de password
                    let dataEncrypted = datos[0].password_us;
                    let bytes = CryptoJS.AES.decrypt(dataEncrypted, process.env.CRYP_KEY);
                    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

                    // verificación de password coincida
                    if (param.password === decryptedData) {
                        const payload = {
                            check: true,
                            user: {
                                "id_em": datos[0].id_em,
                                "id_us": datos[0].id_us,
                                "username_us": datos[0].username_us,
                                "id_rol": datos[0].id_rol,
                                "email_us": datos[0].email_us,
                                "telf2_us": datos[0].telf2_us,
                            }
                        };
                        // Generación de token y refresh token con llave privada
                        const privateKey = fs.readFileSync(path.resolve(path.join(__dirname, process.env.APP_KEY_FILE)));
                        const token = jwt.sign(payload, privateKey, {
                            algorithm: 'RS256',
                            expiresIn: process.env.ACCESS_TOKEN_EXPIRE
                        });
                        const refreshToken = jwt.sign(payload, privateKey, {
                            algorithm: 'RS256',
                            expiresIn: process.env.REFRESH_TOKEN_EXPIRE
                        });
                        // Respuesta exitosa por parte del servidor
                        return res.status(200).json({
                            result: true,
                            code: 200,
                            token_type: "bearer",
                            access_token: token,
                            refresh_token: refreshToken,
                            expires_in: process.env.ACCESS_TOKEN_EXPIRE,
                            _persist: { "version": -1, "rehydrated": true }
                        });
                    } else {
                        // contraseña no válida
                        return res.status(200).json({
                            result: false,
                            code: 200,
                            message: "Su contraseña es incorrecta."
                        });
                    }
                } else {
                    // retornar la respuesta con resultado vacío
                    return res.status(200).json(
                        {
                            result: false,
                            code: 200,
                            message: "Usuario no existe."
                        }
                    );
                }
            })
            .catch(err => {
                console.log("Ups! Falló la respuesta de la BDD: " + err);
                return res.status(400).json({
                    result: false,
                    code: 400,
                    message: "Ups! Falló la respuesta de la BDD: " + err
                });
            });
    },
    login_movil: function (req, res) {
        const param = req.body;
        // LLamada al manejador de de consultas en la BD
        userFacade.loginMovil([param.email, param.rol])
            .then(respuesta => {
                let datos = respuesta.rows;

                // Verificar si el tamaño de la respuesta es vacía
                if (datos.length > 0) {
                    // retornar si no está activo
                    if (datos[0].id_estado_us === 0) {
                        return res.status(200).json({
                            result: false,
                            code: 200,
                            message: "Ups! Su usuario no está activo, por favor revise su email y actívelo."
                        });
                    }

                    // Inicializar variables de encriptacion de password
                    let dataEncrypted = datos[0].password_us;
                    let bytes = CryptoJS.AES.decrypt(dataEncrypted, process.env.CRYP_KEY);
                    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

                    // verificación de password coincida
                    if (param.password === decryptedData) {
                        const payload = {
                            check: true,
                            user: {
                                "id_em": datos[0].id_em,
                                "id_us": datos[0].id_us,
                                "username_us": datos[0].username_us,
                                "id_rol": datos[0].id_rol,
                                "email_us": datos[0].email_us,
                                "telf2_us": datos[0].telf2_us,
                            }
                        };
                        // Generación de token y refresh token con llave privada
                        const privateKey = fs.readFileSync(path.resolve(path.join(__dirname, process.env.APP_KEY_FILE)));
                        const token = jwt.sign(payload, privateKey, {
                            algorithm: 'RS256',
                            expiresIn: process.env.ACCESS_TOKEN_EXPIRE
                        });
                        const refreshToken = jwt.sign(payload, privateKey, {
                            algorithm: 'RS256',
                            expiresIn: process.env.REFRESH_TOKEN_EXPIRE
                        });
                        // Respuesta exitosa por parte del servidor
                        return res.status(200).json({
                            result: true,
                            code: 200,
                            token_type: "bearer",
                            access_token: token,
                            refresh_token: refreshToken,
                            expires_in: process.env.ACCESS_TOKEN_EXPIRE,
                            user: {
                                "apellidos_us": datos[0]['apellidos_us'],
                                "nombres_us": datos[0]['nombres_us'],
                                "nombre_rol": datos[0]['nombre_rol'],
                                "lenguaje_us": datos[0]['lenguaje_us'],
                                "identificacion_us": datos[0]['identificacion_us'],
                                "email_us": datos[0]['email_us'],
                                "telf2_us": datos[0]['telf2_us'],
                                "foto_us": datos[0]['foto_us'],
                                "term_us": datos[0]['term_us'],
                            },
                            _persist: { "version": -1, "rehydrated": true }
                        });
                    } else {
                        // contraseña no válida
                        return res.status(200).json({
                            result: false,
                            code: 200,
                            message: "Su contraseña es incorrecta."
                        });
                    }
                } else {
                    // retornar la respuesta con resultado vacío
                    return res.status(200).json(
                        {
                            result: false,
                            code: 200,
                            message: "Usuario no existe."
                        }
                    );
                }
            })
            .catch(err => {
                console.log("Ups! Falló la respuesta de la BDD: " + err);
                return res.status(400).json({
                    result: false,
                    code: 400,
                    message: "Ups! Falló la respuesta de la BDD: " + err
                });
            });
    },
    refresh: function (req, res) {
        const publicKey = fs.readFileSync(path.resolve(path.join(__dirname, process.env.APP_PUBLICKEY_FILE)));
        const param = req.body;
        const token = param.refresh_token;
        jwt.verify(token, publicKey, { algorithm: 'RS256' }, (err, payloadjwt) => {
            if (err) {
                return res.status(401).send(err);
            }

            // LLamada al manejador de de consultas en la BD
            userFacade.refresh([payloadjwt.user.id_us])
                .then(respuesta => {
                    let datos = respuesta.rows;
                    // Verificar si el tamaño de la respuesta es vacía
                    if (datos.length > 0) {
                        // retornar si no está activo
                        if (datos[0].id_estado_us === 0) {
                            return res.status(200).json({
                                result: false,
                                code: 200,
                                message: "Ups! Su usuario no está activo, por favor revise su email y actívelo."
                            });
                        }

                        // verificación de password coincida

                        const payload = {
                            check: true,
                            user: {
                                "id_em": datos[0].id_em,
                                "id_us": datos[0].id_us,
                                "username_us": datos[0].username_us,
                                "id_rol": datos[0].id_rol,
                                "email_us": datos[0].email_us,
                                "telf2_us": datos[0].telf2_us,
                            }
                        };
                        // Generación de token y refresh token con llave privada
                        const privateKey = fs.readFileSync(path.resolve(path.join(__dirname, process.env.APP_KEY_FILE)));
                        const token = jwt.sign(payload, privateKey, {
                            algorithm: 'RS256',
                            expiresIn: process.env.ACCESS_TOKEN_EXPIRE
                        });
                        const refreshToken = jwt.sign(payload, privateKey, {
                            algorithm: 'RS256',
                            expiresIn: process.env.REFRESH_TOKEN_EXPIRE
                        });
                        // Respuesta exitosa por parte del servidor
                        return res.status(200).json({
                            result: true,
                            code: 200,
                            token_type: "bearer",
                            access_token: token,
                            refresh_token: refreshToken,
                            expires_in: process.env.ACCESS_TOKEN_EXPIRE,
                            user: {
                                "apellidos_us": datos[0]['apellidos_us'],
                                "nombres_us": datos[0]['nombres_us'],
                                "nombre_rol": datos[0]['nombre_rol'],
                                "lenguaje_us": datos[0]['lenguaje_us'],
                                "identificacion_us": datos[0]['identificacion_us'],
                                "email_us": datos[0]['email_us'],
                                "id_em": datos[0]['id_em'],
                                "telf2_us": datos[0]['telf2_us'],
                                "foto_us": datos[0]['foto_us'],
                                "term_us": datos[0]['term_us'],
                            },
                            _persist: { "version": -1, "rehydrated": true }
                        });

                    } else {
                        // retornar la respuesta con resultado vacío
                        return res.status(200).json(
                            {
                                result: false,
                                code: 200,
                                message: "Usuario no existe."
                            }
                        );
                    }
                })
                .catch(err => {
                    console.log("Ups! Falló la respuesta de la BDD: " + err);
                    return res.status(400).json({
                        result: false,
                        code: 400,
                        message: "Ups! Falló la respuesta de la BDD: " + err
                    });
                });


        });

    },
    register: function (req, res) {
        const param = req.body;

        const BooleantoString = boolean => {
            let valor=0;
            if(boolean)
                valor=1;
            return valor;
        };

        let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(param.password), process.env.CRYP_KEY).toString();
        let data=[];
        data.push(param.email);
        data.push(param.fullname);
        data.push(param.username);
        data.push(ciphertext);
        data.push(param.telefono);
        data.push(param.ruc);
        data.push(param.tempresa);
        data.push(parseInt(BooleantoString(param.acceptTerms)));
        data.push(param.valid_email_us);
        userFacade.register(data)
                    .then(registro => {
                        const payload = {
                            check: true,
                            user: {
                                "id_em": registro.rows[0].empresa,
                                "id_us": registro.rows[0].usuario,
                                "username_us": param.username,
                                "id_rol": 2,//Siempre sera el administrador cliente interno luego del registro
                                "email_us": param.email,
                            }
                        };
                        // Generación de token y refresh token con llave privada
                        const privateKey = fs.readFileSync(path.resolve(path.join(__dirname, process.env.APP_KEY_FILE)));
                        const token = jwt.sign(payload, privateKey, {
                            algorithm: 'RS256',
                            expiresIn: process.env.ACCESS_TOKEN_EXPIRE
                        });
                        const refreshToken = jwt.sign(payload, privateKey, {
                            algorithm: 'RS256',
                            expiresIn: process.env.REFRESH_TOKEN_EXPIRE
                        });
                        // Respuesta exitosa por parte del servidor
                        return res.status(200).json({
                            result: true,
                            code: 200,
                            token_type: "bearer",
                            access_token: token,
                            refresh_token: refreshToken,
                            expires_in: process.env.ACCESS_TOKEN_EXPIRE,
                            user: {
                                "apellido_us": param.fullname,
                                "nombres_us": param.fullname,
                                "nombre_rol": 'ADMINCINT',//Siempre sera el administrador cliente interno luego del registro
                                "lenguaje_us": 'ESP',
                                "identificacion_us": param.ruc,
                                "email_us":param.email,
                                "id_em": registro.rows[0].empresa,
                                "foto_us": '',
                                "term_us":BooleantoString(param.acceptTerms),
                            },
                            _persist: { "version": -1, "rehydrated": true }
                        });

                    })
                    .catch(err => {
                        console.log("Ups! Falló la respuesta de la BDD: " + err);
                        return res.status(400).json({
                            result: false,
                            code: 400,
                            message: "Ups! Falló la respuesta de la BDD: " + err
                        });
                    });

    },
    actualizarPasswordUsuario: function (req, res) {
        let param = req.body;
        let condicion;
        let data;

        userFacade.loginMovil([req.user.email_us, req.user.id_rol]).then(
            reslogin => {

                let datos = reslogin.rows;
                // Verificar si el tamaño de la respuesta es vacía
                if (datos.length > 0) {
                    // Inicializar variables de encriptacion de password
                    let dataEncrypted = datos[0].password_us;
                    let bytes = CryptoJS.AES.decrypt(dataEncrypted, process.env.CRYP_KEY);
                    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

                    // verificación de password coincida
                    if (param.password_actual === decryptedData) {

                        // asignar a las variables los valores respectivos
                        condicion = json2map({ id_us: req.user.id_us });
                        data = json2map({
                            password_us: CryptoJS.AES.encrypt(JSON.stringify(param.password_nuevo), process.env.CRYP_KEY).toString()
                        });

                        // Iniciar la actualización de la contraseña
                        userFacade.updateUsuario(data, condicion)
                            .then(respuesta => {
                                return res.status(200).json({
                                    result: true,
                                    code: 200,
                                    message: `Se actualizaron ${respuesta} registros`
                                });
                            })
                            .catch(err => {
                                console.log("Ups! Falló la respuesta de la BDD: " + err);
                                return res.status(200).json({
                                    result: false,
                                    code: 200,
                                    message: "Ups! Falló la respuesta de la BDD: " + err
                                });
                            });

                    } else {
                        return res.status(200).json({
                            result: false,
                            code: 200,
                            message: "La contraseña actual no concuerda"
                        });

                    }

                } else {
                    // retornar la respuesta con resultado vacío
                    return res.status(200).json(
                        {
                            result: false,
                            code: 200,
                            message: "El usuario no existe"
                        }
                    );
                }

            }
        ).catch(err => {
            console.log("Ups! Falló la respuesta de la BDD: " + err);
            return res.status(400).json({
                result: false,
                code: 400,
                message: "Ups! Falló la respuesta de la BDD: " + err
            });
        });

    },
    actualizarTerminosCondiciones: function (req, res) {
        const condicion = json2map({ id_us: req.user.id_us });
        const data = json2map({
            term_us: 1
        });

        userFacade.updateUsuario(data, condicion)
            .then(respuesta => {
                return res.status(200).json({
                    result: true,
                    code: 200,
                    message: "Se aceptó los terminos y condiciones",
                });
            }).catch(err => {
                console.log("Ups! Falló la respuesta de la BDD: " + err);
                return res.status(400).json({
                    result: false,
                    code: 400,
                    message: "Ups! Falló la respuesta de la BDD: " + err
                });
            });

    },
    consultaIntrospect: function (req, res) {
        const id_us = req.user.id_us;

        userFacade.findUsuario([id_us])
            .then(respuesta => {
                const datos = respuesta.rows;

                return res.status(200).json({
                    result: true,
                    code: 200,
                    message: "Se encontró información del usuario",
                    user: {
                        "apellidos_us": datos[0]['apellidos_us'],
                        "nombres_us": datos[0]['nombres_us'],
                        "nombre_rol": datos[0]['nombre_rol'],
                        "lenguaje_us": datos[0]['lenguaje_us'],
                        "identificacion_us": datos[0]['identificacion_us'],
                        "email_us": datos[0]['email_us'],
                        "telf2_us": datos[0]['telf2_us'],
                        "id_em": datos[0]['id_em'],
                        "foto_us": datos[0]['foto_us'],
                        "term_us": datos[0]['term_us'],
                    },
                });

            }).catch(err => {
                console.log("Ups! Falló la respuesta de la BDD: " + err);
                return res.status(400).json({
                    result: false,
                    code: 400,
                    message: "Ups! Falló la respuesta de la BDD: " + err
                });
            });

    },
    getUserByToken: function (req, res) {
        const id_us = req.user.id_us;
        userFacade.findUsuario([id_us])
            .then(respuesta => {
                const datos = respuesta.rows;
                userFacade.findOpciones([id_us,datos[0]['id_rol']])
                    .then(opciones => {
                        return res.status(200).json({
                            result: true,
                            code: 200,
                            message: "Se encontró información del usuario",
                            user: {
                                "apellidos_us": datos[0]['apellidos_us'],
                                "nombres_us": datos[0]['nombres_us'],
                                "nombre_rol": datos[0]['nombre_rol'],
                                "lenguaje_us": datos[0]['lenguaje_us'],
                                "identificacion_us": datos[0]['identificacion_us'],
                                "email_us": datos[0]['email_us'],
                                "telf2_us": datos[0]['telf2_us'],
                                "valid_telf2_us":datos[0]['valid_telf2_us'],
                                "id_em": datos[0]['id_em'],
                                "foto_us": datos[0]['foto_us'],
                                "term_us": datos[0]['term_us'],
                                "opciones":opciones.rows,
                            },
                        });

                    }).catch(err => {
                    console.log("Ups! Falló la respuesta de la BDD: " + err);
                    return res.status(400).json({
                        result: false,
                        code: 400,
                        message: "Ups! Falló la respuesta de la BDD: " + err
                    });
                });

            }).catch(err => {
            console.log("Ups! Falló la respuesta de la BDD: " + err);
            return res.status(400).json({
                result: false,
                code: 400,
                message: "Ups! Falló la respuesta de la BDD: " + err
            });
        });

    },
    recuperar: function (req, res) {
        let aleatorio=Math.round(Math.random()*(999999-99999)+parseInt(99999));
        let ciphertext = CryptoJS.AES.encrypt(JSON.stringify(aleatorio), process.env.CRYP_KEY).toString();
        userFacade.findRecuperar([req.body.username,req.body.email])
            .then(respuesta => {
                if(respuesta!==''){
                    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
                    const msg = {
                        to: req.body.email,
                        from: 'info@track4go.com',
                        subject: "Recuperación Contraseña",
                        text: `Tu nueva contraseña es:${aleatorio}`,
                        html:`Tu nueva contraseña es:${aleatorio}`,
                    }
                    sgMail
                        .send(msg)
                        .then(() => {
                                const condicion = json2map({ id_us: respuesta });
                                const data = json2map({
                                    password_us: ciphertext
                                });

                                userFacade.updateUsuario(data, condicion)
                                    .then(respuesta => {
                                        return res.status(200).json({
                                            result: true,
                                            code: 200,
                                            message: "Se envío un correo con la nueva clave",
                                        });
                                    }).catch(err => {
                                    console.log("Ups! Falló la respuesta de la BDD: " + err);
                                    return res.status(400).json({
                                        result: false,
                                        code: 400,
                                        message: "Ups! Falló la respuesta de la BDD: " + err
                                    });
                                });
                        })
                        .catch((error) => {
                            console.log("Ups! Falló la respuesta del envio de Mail: " + err);
                            return res.status(400).json({
                                result: false,
                                code: 400,
                                message: "Ups! Falló la respuesta del envio de Mail: " + err
                            });
                        })
                }
            }).catch(err => {
            console.log("Ups! Falló la respuesta de la BDD: " + err);
            return res.status(400).json({
                result: false,
                code: 400,
                message: "Ups! Falló la respuesta de la BDD: " + err
            });
        });

    },

};

module.exports = UserController;
