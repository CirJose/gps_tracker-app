const path = require('path');
const fs = require('fs');
const jwt = require('jsonwebtoken');
const idAdmin = process.env.ID_ADMIN;

const ProtectedRoute = {
    authenticateJWT: (req, res, next) => {
        // next();
        const authHeader = req.headers.authorization;
        const publicKey = fs.readFileSync(path.resolve(path.join(__dirname, "../", process.env.APP_PUBLICKEY_FILE)));

        if (authHeader) {
            const token = authHeader.split(' ')[1];
            jwt.verify(token, publicKey, { algorithm: 'RS256' }, (err, payload) => {
                if (err) {
                    return res.status(401).send(err);
                }
                // Se envia el dato del usuario como parámetro para el ruteo
                req.auth = {
                    idRole: payload.idRole,
                    idUser: payload.id,
                    isAdmin: payload.idRole === idAdmin
                }

                next();
            });
        } else {
            res.sendStatus(401);
        }
    },
    restrictedRoute: (req, res, next) => {
        if(req.auth.isAdmin){
            next();
        } else {
            res.sendStatus(403);
        }
    }
}

module.exports = ProtectedRoute;
