const fs = require('fs');
const jwt = require('jsonwebtoken');
const path = require('path');

const json2map = function (obj) {
    const mp = new Map;
    Object.keys(obj).forEach(k => { mp.set(k, obj[k]) });
    return mp;
}

const generateToken = (payload) => {
    const privateKey = fs.readFileSync(path.resolve(path.join(__dirname, "../", process.env.APP_KEY_FILE)));

    const token = jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: process.env.ACCESS_TOKEN_EXPIRE
    });
    const refreshToken = jwt.sign(payload, privateKey, {
        algorithm: 'RS256',
        expiresIn: process.env.REFRESH_TOKEN_EXPIRE
    });

    return (payload == null ? null : {
        "token_type": "bearer",
        "access_token": token,
        "refresh_token": refreshToken,
        "expires_in": process.env.ACCESS_TOKEN_EXPIRE,
    })

}

/**javascript
 * SSE message serializer
 * @param {string} event: Event name
 * @param {Object} data: Event data
 * @returns {string}
 */
const eventSerializer = (event, data) => {
    const jsonString = JSON.stringify(data);
    return `event: ${event}\ndata: ${jsonString}\n\n`;
};
module.exports = {
    json2map,
    generateToken,
    eventSerializer
}