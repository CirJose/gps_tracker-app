const { ibeaconDevice, ibeaconGateway, ibeaconDeviceTrack } = require('../models');
const eventEmitter = require('../_util/eventEmitter');

const calculateDistance = (rssi, txPower) => {
    if (rssi === 0) return -1;

    const ratio = rssi * 1.0 / txPower;
    //console.log('--------------------------------------------------------------ratio',ratio)
    return ratio < 1 ? Math.pow(ratio, 10) : (0.89976) * Math.pow(ratio, 7.7095) + 0.111;
};

const updateBeaconPositions = async (uniqueBeacons) => {
    const beacons = (uniqueBeacons);
    //console.log('--------------------------------------------------------------beacons',beacons)

    for (const beacon of beacons) {
        if (beacon.type === 'iBeacon') {
            const beaconInDb = await ibeaconDevice.findOne({ where: { mac: beacon.mac } });
            //console.log('--------------------------------------------------------------beaconInDb',beaconInDb)


            if (beaconInDb) {
                for (const gatewayBeacon of beacons) {
                    if (gatewayBeacon.type === 'Gateway') {
                        const gateway = await ibeaconGateway.findOne({ where: { mac: gatewayBeacon.mac } });
                        //console.log('--------------------------------------------------------------gateway',gateway)
                        //console.log('Buscando el gateway para el beacon', beacon.mac);
                        if (gateway) {
                            try {
                                await ibeaconDeviceTrack.create({
                                  id_ibeacon_device: beaconInDb.id,
                                  id_ibeacon_gateway: gateway.id,
                                  ibeaconmac: beacon.mac,
                                  gatewaymac: gateway.mac,
                                  latgateway: gateway.lat,
                                  longateway: gateway.lon,
                                  rssi: beacon.rssi,
                                  ibeacontxpower: beacon.ibeaconTxPower,
                                  createdat: new Date(),
                                  updatedat: new Date()
                                });
                                
                              } catch (error) {
                                console.error(error);
                              }
                        }
                    }
                }
            }
        }
    }
}

const calculatePosition = async (iBeaconTrackRecord) => {
    const gatewayRecords = await ibeaconDeviceTrack.findAll({ where: { ibeaconmac: iBeaconTrackRecord.ibeaconmac } });

    if (gatewayRecords.length < 3) {
        return null; // No hay suficientes registros para calcular la posición
    }

    const distances = gatewayRecords.map(record => {
        return calculateDistance(record.rssi, record.ibeacontxpower);
    });

    const weights = distances.map(distance => 1 / distance);

    const weightedLatitude = gatewayRecords.reduce((acc, record, index) => {
        return acc + record.latgateway * weights[index];
    }, 0);

    const weightedLongitude = gatewayRecords.reduce((acc, record, index) => {
        return acc + record.longateway * weights[index];
    }, 0);

    const sumWeights = weights.reduce((acc, weight) => acc + weight, 0);

    const lat = weightedLatitude / sumWeights;
    const lon = weightedLongitude / sumWeights;

    await ibeaconDeviceTrack.update({ latibeacon: lat, lonibeacon: lon }, { where: { ibeaconmac: iBeaconTrackRecord.ibeaconmac } });
    eventEmitter.emit('beaconPositionUpdated'); // Emitir el evento aquí

    return { lat, lon };
};

const calculatePositions = async () => {
    const positions = [];

    const uniqueIbeaconRecords = await ibeaconDeviceTrack.findAll({
        group: 'ibeaconmac',
        attributes: ['ibeaconmac']
    });
    //console.log('______________________________________________uniqueIbeaconRecords',uniqueIbeaconRecords)
    for (const iBeaconRecord of uniqueIbeaconRecords) {
        const iBeaconTrackRecord = await ibeaconDeviceTrack.findOne({ where: { ibeaconmac: iBeaconRecord.ibeaconmac } });
        const position = await calculatePosition(iBeaconTrackRecord);

        if (position) {
            positions.push({
                ibeaconmac: iBeaconRecord.ibeaconmac,
                ...position,
            });
        }
    }

    return positions;
};

module.exports = {
    updateBeaconPositions,
    calculatePositions,
};