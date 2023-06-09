var parseGpsMessage = require('./gps-message-parser');
var executeParseFunctionAndCatchException = require('../util').executeParseFunctionAndCatchException;

var ASTERISK_CHARACTER_CODE = "*".charCodeAt(0);
var DOLAR_CHARACTER_CODE = "$".charCodeAt(0);
var X_CHARACTER_CODE = "X".charCodeAt(0);
var POUND_CHARACTER_CODE = "#".charCodeAt(0);

var lookupCommandResponseType = function (rawMessageType) {
    var messageType;

    switch (rawMessageType) {
        case 'V1':
            messageType = 'getGpsDataResponse';
            break;
        case 'V3':
            messageType = 'getLbsDataResponse';
            break;
        case 'ERROR!':
            messageType = 'error';
            break;
    }
    return messageType;
};

var lookupAlarmType = function (rawMessageType) {
    var messageType;

    switch (rawMessageType) {
        case 'A':
            messageType = 'sosAlarm';
            break;
        case 'B':
            messageType = 'geoAlarm';
            break;
        case 'C':
            messageType = 'speedingAlarm';
            break;
        case 'D':
            messageType = 'lowBatteryAlarm';
            break;
    }
    return messageType;
};


var messageTypePattern = /([a-zA-Z]{3})-(.)(.)?/;

var parseMessageType = function (type) {
    var result = type;
    if (result === null) {
        result = 'error'; // error message (!ERROR) is not parsed by messageTypePattern
    } else {
        result = lookupCommandResponseType(type)
    }
    return result;
};


var framePattern = /([^,]+),([^,]+),([^,]+),?(.*)$/;

var parseMessage = function (message) {
    var matchArray = framePattern.exec(message);
    var frame = {};
    frame.trackerId = matchArray[2];
    frame.type = parseMessageType(matchArray[3], message);
    if (matchArray[4] !== '') {
        frame.location = parseGpsMessage(matchArray[4], 'plain');
    }
    return frame;
};

var parseMessageHex = function (message) {
    var frame = {};
    var mensaje = message.toString('hex');
    let id = mensaje.substr(0,10);
    frame.trackerId = id;
    console.log(id);
    frame.type = parseMessageType('V1', message);
    frame.location = parseGpsMessage(message, 'hex');
    
    return frame;
};

var findFrameAndParseMessage = function (buffer, callback) {
    var messageStartIndex = 0;
    var error = null;
    var message;
    var frameContents;

    try {

        if (buffer.length > 0 ) {
            switch (buffer[0]) {
                case ASTERISK_CHARACTER_CODE:
                    for (var i = 1; i < buffer.length; i++) {
                        if (buffer[i] == POUND_CHARACTER_CODE) {
                            frameContents = buffer.slice(messageStartIndex + 1, i);
                            message = parseMessage(frameContents,'plain');
                            buffer = buffer.slice(i + 1);
                            break;
                        }
                    }
                    break;
                case DOLAR_CHARACTER_CODE:
                    frameContents = buffer.slice(messageStartIndex + 1, buffer.length);
                    message = parseMessageHex(frameContents,'hex');
                    buffer = buffer.slice(buffer.length);
                    break;
                case X_CHARACTER_CODE:
                default:
                    return null;
            }
        }

        // if (buffer.length > 0 && buffer[0] == ASTERISK_CHARACTER_CODE) {
        //     for (var i = 1; i < buffer.length; i++) {
        //         if (buffer[i] == POUND_CHARACTER_CODE) {
        //             var frameContents = buffer.slice(messageStartIndex + 1, i);
        //             message = parseMessage(frameContents);
        //             buffer = buffer.slice(i + 1);
        //             break;
        //         }
        //     }
        // }

    } catch (e) {
        error = e;
    }

    setImmediate(function () {
        callback(error, message, buffer);
    });

};


module.exports = findFrameAndParseMessage;