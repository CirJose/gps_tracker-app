// V,DATE:120903,TIME:160649,LAT:59.9326566N,LOT:010.7875033E,Speed:005.5,X-X-X-X-82-10,000,24202-0324-0E26
var bcdUtil = require('./util');

var executeParseFunctionAndCatchException = require('../util').executeParseFunctionAndCatchException;

function parseLatitude(latString, hemisphere) {
    let latitude = (Number(latString.slice(0, 2)) + (Number(latString.slice(2, 9)) / 60))
    if (hemisphere == 'S') {
        latitude = -latitude;
    } else if (hemisphere != 'N') {
        throw "invalid hemisphere";
    }
    return latitude;
}

function parseLongitude(lngString, hemisphere) {
    let longitude = (Number(lngString.slice(0, 3)) + (Number(lngString.slice(3, 10)) / 60))
    if (hemisphere == 'W') {
        longitude = -longitude;
    } else if (hemisphere != 'E') {
        throw "invalid hemisphere";
    }
    return longitude;
}

function parseAvailablility(available) {
    if (available == 'A') {
        return true;
    } else if (available == 'V') {
        return false;
    } else {
        throw "availablilty parse failed";
    }
}

var datePattern = /^(\d{2})(\d{2})(\d{2})$/i;
var timePattern = /^(\d{2})(\d{2})(\d{2})$/i;

function parseDate(dateString, timeString) {
    var date = new Date(0);

    const dateElements = datePattern.exec(dateString);
    const timeElements = timePattern.exec(timeString);

    date.setUTCFullYear("20" + dateElements[3]);
    date.setUTCMonth(dateElements[2] - 1);
    date.setUTCDate(dateElements[1]);

    date.setUTCHours(timeElements[1]);
    date.setUTCMinutes(timeElements[2]);
    date.setUTCSeconds(timeElements[3]);

    return date;
}

function parseSpeed(speedString) {
    let speedElements = parseFloat(speedString); //knots (nudos)
    speedElements = speedElements * (1.852 / 0.1); //km/h
    return speedElements;
}

// A-B-C-XX-YY
// X-X-X-X-82-10
function parseStatus(status) {
    var object = {};
    // var elements = status.split('-');
    // object.batteryLife = parseInt(elements[elements.length - 2], 10);
    // object.gsmSignal = parseInt(elements[elements.length - 1], 10);
    object.all=getBitMasks(status)
    return object;
}

function getBitMasks(hex) {
    theByte = 0, theBitMask = {}, theBitMaskArray = [];
    for (var i = hex.length; i > 0; i -= 2) {
        var v = parseInt(hex.substr(i - 2, 2), 16);
        theBitMaskArray = v.toString(2).split('');
        theBitMask[theByte] = {};
        for (var j = 0; j < theBitMaskArray.length; j++) {
            if (theBitMaskArray[j] === '0') {
                // non sense but 0 means positive (see h02 doc)
                theBitMask[theByte][j] = true;
            } else {
                theBitMask[theByte][j] = false;
            }
        }
        theByte++;
    }
    return theBitMask;
}
// 24202-0ED9-D93B

var networkPattern = /^(\d{3})(\d{2})-([0-9A-F]*)-([0-9A-F]*)$/;
function parseNetwork(networkString) {
    var elements = networkPattern.exec(networkString);
    var object = {};
    object.countryCode = parseInt(elements[1], 10);
    object.networkCode = parseInt(elements[2], 10);
    object.locationAreaCode = parseInt(elements[3], 16);
    object.cellId = parseInt(elements[4], 16);
    return object;
}

var plainTextParser = function (message) {
    var elements = message.split(',');
    var object = {};

    object.available = executeParseFunctionAndCatchException(parseAvailablility, elements[1], message);

    object.timestamp = executeParseFunctionAndCatchException(parseDate, [elements[8], elements[0]], message);

    object.latitude = executeParseFunctionAndCatchException(parseLatitude, [elements[2], elements[3]], message);
    object.longitude = executeParseFunctionAndCatchException(parseLongitude, [elements[4], elements[5]], message);
    object.speed = executeParseFunctionAndCatchException(parseSpeed, elements[6], message);

    object.status = executeParseFunctionAndCatchException(parseStatus, elements[9], message);
    // object.network = executeParseFunctionAndCatchException(parseNetwork, elements[10], message);
    return object;
};

var hexTextParser = function (buf) {
    // var elements = message.split(',');   
    // var demo = new Buffer.from([31,50,10,89,45,02,40,28,02,08,22,33,32,53,15,f6,07,04,69,51,70,00,01,52,ff,ff,ff,ff,00,0a,9a,51,02,da,03,10,e0,93,40,00,00,00,00,00,00,00,00,00,00,00]);
    var message = buf.toString('hex');
    var object = {};
    // console.log(message);
    
    let id = message.substr(0,10);
    let time = message.substr(10,6);
    let date = message.substr(16,6);
    let latitud = message.substr(22,8);
    let battery = message.substr(30,2);
    let longitud = message.substr(32,9);
    let validacionBit = message.substr(41,1);
    let speed = message.substr(42,3);
    let direccion = message.substr(45,3);
    let status = message.substr(48,8);
    // let alarm = message[28];
    // let signal = message[28];

    const digitoValidacion = bcdUtil.validationBit(validacionBit);
    // longitud = longitud.substring(0,longitud.length - 1);

    latitud = latitud.substr(0,4) + "." + latitud.substr(4);
    longitud = longitud.substr(0,5) + "." + longitud.substr(5);
    // speed = speed.substring(0,3); 
    // direccion = latitud.substring(3);

    object.available = executeParseFunctionAndCatchException(parseAvailablility, digitoValidacion.valido, message);
    object.timestamp = executeParseFunctionAndCatchException(parseDate, [date, time], message);
    object.latitude = executeParseFunctionAndCatchException(parseLatitude, [latitud, digitoValidacion.hemisferio.lat], message);
    object.longitude = executeParseFunctionAndCatchException(parseLongitude, [longitud.substr(0,longitud.length - 1), digitoValidacion.hemisferio.lon], message);
    object.speed = executeParseFunctionAndCatchException(parseSpeed, speed, message);

    object.status = executeParseFunctionAndCatchException(parseStatus, status, message);
    // object.network = executeParseFunctionAndCatchException(parseNetwork, elements[10], message);
    return object;
};

var parseMessage = function(message,msgType){
    let result = null;
    switch (msgType) {
        case "hex":
            result = hexTextParser(message);           
            break;
        case "plain":
            result =plainTextParser(message);
            break;
        default:
            break;
    }
    return result;
}

module.exports = parseMessage;