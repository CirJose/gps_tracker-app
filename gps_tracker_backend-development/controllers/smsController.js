const GPSSmsPass = process.env.SMS_PASS;
const GPRSProvider = process.env.GPRS_PROVIDER;
const GPRSProviderUser = process.env.GPRS_USER;
const GPRSProviderPass = process.env.GPRS_PASS;
const HostIp = process.env.HOST_IP;
const HostPort = process.env.HOST_PORT;
const GpsFreq = process.env.FREQ;
const { notificarSMS } = require('../_util/sendNotifications');

const smsController = {
    format: (req, res) => {
        const to = req.body.to;
        const body = "FORMAT";
        return notificarSMS(to, body)
            .then(data => {
                const httpCode = (data == 0 ? 404 : 200);
                res.status(httpCode).json({
                    result: data,
                    code: httpCode,
                    message: `Se envió la petición`,
                });
            })
            .catch(err => {
                res.status(400).json({
                    result: err,
                    code: 400,
                    message: "Ocurrió un error al enviar mensaje"
                });
            });
    },
    restart: (req, res) => {
        const to = req.body.to;
        const body = "CQ";
        return notificarSMS(to, body)
            .then(data => {
                const httpCode = (data == 0 ? 404 : 200);
                res.status(httpCode).json({
                    result: data,
                    code: httpCode,
                    message: `Se envió la petición`,
                });
            })
            .catch(err => {
                res.status(400).json({
                    result: err,
                    code: 400,
                    message: "Ocurrió un error al enviar mensaje"
                });
            });
    },
    checkStatus: (req, res) => {
        const to = req.body.to;
        const body = "CXZT";
        return notificarSMS(to, body)
            .then(data => {
                const httpCode = (data == 0 ? 404 : 200);
                res.status(httpCode).json({
                    result: data,
                    code: httpCode,
                    message: `Se envió la petición`,
                });
            })
            .catch(err => {
                res.status(400).json({
                    result: err,
                    code: 400,
                    message: "Ocurrió un error al enviar mensaje"
                });
            });
    },
    gprs: (req, res) => {
        const to = req.body.to;
        const body = `GPRS${GPSSmsPass},0,0`;//`GPRS${GPSSmsPass}`; //`GPRS${GPSSmsPass},1,1`; //`GPRS${GPSSmsPass},0,0`;
        return notificarSMS(to, body)
            .then(data => {
                const httpCode = (data == 0 ? 404 : 200);
                res.status(httpCode).json({
                    result: data,
                    code: httpCode,
                    message: `Se envió la petición`,
                });
            })
            .catch(err => {
                res.status(400).json({
                    result: err,
                    code: 400,
                    message: "Ocurrió un error al enviar mensaje"
                });
            });
    },
    freq: (req, res) => {
        const to = req.body.to;
        const body = `FREQ,${GPSSmsPass},${GpsFreq}`;
        return notificarSMS(to, body)
            .then(data => {
                const httpCode = (data == 0 ? 404 : 200);
                res.status(httpCode).json({
                    result: data,
                    code: httpCode,
                    message: `Se envió la petición`,
                });
            })
            .catch(err => {
                res.status(400).json({
                    result: err,
                    code: 400,
                    message: "Ocurrió un error al enviar mensaje"
                });
            });
    },
    apn: (req, res) => {
        const to = req.body.to;
        const body = `apn${GPSSmsPass} ${GPRSProvider}`;
        return notificarSMS(to, body)
            .then(data => {
                const httpCode = (data == 0 ? 404 : 200);
                res.status(httpCode).json({
                    result: data,
                    code: httpCode,
                    message: `Se envió la petición`,
                });
            })
            .catch(err => {
                res.status(400).json({
                    result: err,
                    code: 400,
                    message: "Ocurrió un error al enviar mensaje"
                });
            });
    },
    apn_user: (req, res) => {
        const to = req.body.to;
        const body = `apnuser${GPSSmsPass} ${GPRSProviderUser}`;
        return notificarSMS(to, body)
            .then(data => {
                const httpCode = (data == 0 ? 404 : 200);
                res.status(httpCode).json({
                    result: data,
                    code: httpCode,
                    message: `Se envió la petición`,
                });
            })
            .catch(err => {
                res.status(400).json({
                    result: err,
                    code: 400,
                    message: "Ocurrió un error al enviar mensaje"
                });
            });
    },
    apn_pass: (req, res) => {
        const to = req.body.to;
        const body = `apnpasswd${GPSSmsPass} ${GPRSProviderPass}`;
        return notificarSMS(to, body)
            .then(data => {
                const httpCode = (data == 0 ? 404 : 200);
                res.status(httpCode).json({
                    result: data,
                    code: httpCode,
                    message: `Se envió la petición`,
                });
            })
            .catch(err => {
                res.status(400).json({
                    result: err,
                    code: 400,
                    message: "Ocurrió un error al enviar mensaje"
                });
            });
    },
    setip: (req, res) => {
        const to = req.body.to;
        const body = `IP ${HostIp} ${HostPort}`;
        return notificarSMS(to, body)
            .then(data => {
                const httpCode = (data == 0 ? 404 : 200);
                res.status(httpCode).json({
                    result: data,
                    code: httpCode,
                    message: `Se envió la petición`,
                });
            })
            .catch(err => {
                res.status(400).json({
                    result: err,
                    code: 400,
                    message: "Ocurrió un error al enviar mensaje"
                });
            });
    },
    fix: (req, res) => {
        const to = req.body.to;
        const body = `fix030s***n${GPSSmsPass}`;
        return notificarSMS(to, body)
            .then(data => {
                const httpCode = (data == 0 ? 404 : 200);
                res.status(httpCode).json({
                    result: data,
                    code: httpCode,
                    message: `Se envió la petición`,
                });
            })
            .catch(err => {
                res.status(400).json({
                    result: err,
                    code: 400,
                    message: "Ocurrió un error al enviar mensaje"
                });
            });
    },
}

module.exports = smsController;