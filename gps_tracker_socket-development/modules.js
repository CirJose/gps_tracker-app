
protocolModules = {};
var protocols = ['tr203', 'gps108watch', 'gotop', 'tk103', 'tk102'];

protocols.forEach(function (moduleName) {
	protocolModules[moduleName] = require('./protocol/' + moduleName + '/module');

});

module.exports = protocolModules;