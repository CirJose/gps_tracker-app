const { ibeaconDevice, ibeaconGateway, ibeaconDeviceTrack } = require('../models');
const gpsDeviceTrack = require('../models/gpsDeviceTrack');
const eventEmitter = require('../_util/eventEmitter');
const { create, lusolve, all } = require('mathjs');
const fmin = require('fmin');
const numeric = require('numeric');
const { Sequelize } = require('sequelize');
const proj4 = require('proj4');
const { latLonToUtm, utm } = require('utm');

const config = {};
const math = create(all, config);
const KalmanFilter = require('kalmanjs');

// Mapa para almacenar un mapa de instancias de KalmanFilter para cada gateway
let kfMap = new Map();

function getKalmanFilterForBeaconInGateway(gatewayMac, beaconMac) {
  // Si ya existe un mapa de KalmanFilter para este gateway, lo usamos
  if (kfMap.has(gatewayMac)) {
    let beaconMap = kfMap.get(gatewayMac);

    // Si ya existe un KalmanFilter para este beacon, lo usamos
    if (beaconMap.has(beaconMac)) {
      return beaconMap.get(beaconMac);
    }

    // Si no existe, creamos uno nuevo y lo almacenamos en el mapa del beacon
    let kf = new KalmanFilter({R: 0.5, Q: 20});
    beaconMap.set(beaconMac, kf);

    console.log('Iniciando, valor de kf', kf);

    return kf;
  }

  // Si no existe, creamos un mapa para el beacon y un nuevo KalmanFilter y los almacenamos en el mapa del gateway
  let kf = new KalmanFilter({R: 0.5, Q: 20});
  let beaconMap = new Map();
  beaconMap.set(beaconMac, kf);
  kfMap.set(gatewayMac, beaconMap);

  console.log('Iniciando, valor de kf', kf);

  return kf;
}

function processRssi(rssi, ibeaconmac, gatewayMac) {
  console.log('Se inicia processRssi')

  // Obtén el KalmanFilter para este beacon en este gateway
  let kf = getKalmanFilterForBeaconInGateway(gatewayMac, ibeaconmac);

  let kalmanEstimate =  kf.filter(rssi);
  kalmanEstimate = Math.round(kalmanEstimate);
  console.log('kalmanEstimate', kalmanEstimate);
  
  return kalmanEstimate;
}

function calculateDistance(rssi, txPower, n = 2) {
  if (typeof rssi !== 'number' || typeof txPower !== 'number') {
    console.error(`calculateDistance: Valores incorrectos: rssi = ${rssi}, txPower = ${txPower}`);
    return NaN;
  }

  return Math.pow(10, (txPower - rssi) / (10 * n));
}

const updateBeaconPositions = async (latestBeacons) => {
  const beacons = (latestBeacons);

  for (const beacon of beacons) {
      if (beacon.type === 'iBeacon') {
          const beaconInDb = await ibeaconDevice.findOne({ where: { mac: beacon.mac } });

          if (beaconInDb) {
              for (const gatewayBeacon of beacons) {
                  if (gatewayBeacon.type === 'Gateway') {
                      const gateway = await ibeaconGateway.findOne({ where: { mac: gatewayBeacon.mac } });

                      if (gateway) {
                          // Aquí es donde llamamos a processRssi con el MAC del gateway
                          const filteredRssi = processRssi(beacon.rssi, beacon.mac, gateway.mac); 
                          const distance = calculateDistance(filteredRssi, beacon.ibeaconTxPower);
              
                            console.log('RSSI no filtrado:', beacon.rssi, 'RSSI filtrado:', filteredRssi, 'Distancia calculada:', distance);

                          try {
                              await ibeaconDeviceTrack.create({
                                id_ibeacon_device: beaconInDb.id,
                                id_ibeacon_gateway: gateway.id,
                                ibeaconmac: beacon.mac,
                                gatewaymac: gateway.mac,
                                latgateway: gateway.lat,
                                longateway: gateway.lon,
                                rssi:  beacon.rssi,
                                rssi_filtered: filteredRssi,
                                distance: distance,
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

function trilateracion(gateways, distances) {
    const [gateway1, gateway2, gateway3] = gateways;
    const [distance1, distance2, distance3] = distances;
  
    const ex = normalize(subtract(gateway2, gateway1));
    const i = dotProduct(ex, subtract(gateway3, gateway1));
    const ey = normalize(subtract(subtract(gateway3, gateway1), multiply(ex, i)));
    const ez = crossProduct(ex, ey);
  
    const d = distance(gateway1, gateway2);
    const j = dotProduct(ey, subtract(gateway3, gateway1));
  
    const x = (squared(distance1) - squared(distance2) + squared(d)) / (2 * d);
    const y = ((squared(distance1) - squared(distance3) + squared(i) + squared(j)) / (2 * j)) - ((i * x) / j);
    const z = Math.sqrt(Math.abs(squared(distance1) - squared(x) - squared(y)));
  
    const result = add(gateway1, add(multiply(ex, x), add(multiply(ey, y), multiply(ez, z))));
    return result;
  
    function subtract(a, b) {
      return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
    }
  
    function add(a, b) {
      return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
    }
  
    function multiply(vector, scalar) {
      return { x: vector.x * scalar, y: vector.y * scalar, z: vector.z * scalar };
    }
  
    function dotProduct(a, b) {
      return a.x * b.x + a.y * b.y + a.z * b.z;
    }
  
    function crossProduct(a, b) {
      return {
        x: a.y * b.z - a.z * b.y,
        y: a.z * b.x - a.x * b.z,
        z: a.x * b.y - a.y * b.x,
      };
    }
  
    function distance(a, b) {
      return Math.sqrt(squared(a.x - b.x) + squared(a.y - b.y) + squared(a.z - b.z));
    }
  
    function normalize(vector) {
      const magnitude = Math.sqrt(squared(vector.x) + squared(vector.y) + squared(vector.z));
      return { x: vector.x / magnitude, y: vector.y / magnitude, z: vector.z / magnitude };
    }
  
    function squared(x) {
      return x * x;
    }
}


function geoToCartesian(lat, lon) {
    const earthRadius = 6371000; // radio terrestre en metros
    const phi = lat * (Math.PI / 180); // convertir latitud a radianes
    const theta = lon * (Math.PI / 180); // convertir longitud a radianes
    const alt = 0
  
    const x = (earthRadius + alt) * Math.cos(phi) * Math.cos(theta);
    const y = (earthRadius + alt) * Math.cos(phi) * Math.sin(theta);
    const z = (earthRadius + alt) * Math.sin(phi);
  
    return { x, y, z };
}

function cartesianToLatLonSimple(x, y, z) {
    const earthRadius = 6371000;
    const r = Math.sqrt(x * x + y * y + z * z);
    const lat = Math.asin(z / r) * (180 / Math.PI);
    const lon = Math.atan2(y, x) * (180 / Math.PI);
    return { lat: lat, lon: lon };
}

async function calculatePosition(iBeaconTrackRecord) {
    let gwMacs = iBeaconTrackRecord.map(record => record.gatewaymac);
    let gatewaysObj = await getGatewaysByMacs(gwMacs);
    let gateways = [];
    for (const record of iBeaconTrackRecord) {
      const gateway = gatewaysObj[record.gatewaymac];
      if (gateway) {
        const utmCoords = geoToCartesian(gateway.lat, gateway.lon);
        gateways.push(utmCoords);
      }
    }
     
    //console.log('Resultado de gateways en calculatePosition:', gateways);
  
    let distances = iBeaconTrackRecord.map(record => {
      const rssi = record.rssi_filtered;
      const txPower = record.ibeacontxpower;
      const distance = calculateDistance(rssi, txPower);
      console.log('Calculando distancia con rssi:', rssi, 'y txPower:', txPower, '-> Distancia:', distance);
      return distance;
    });
  
    distances = distances.map(distance => parseFloat(distance));
    //console.log('Resultado de distances en calculatePosition:', distances);
    const cartesianPosition = trilateracion(gateways, distances);
    //console.log("Posición en coordenadas cartesianas:", cartesianPosition);
    const latLonPosition = cartesianToLatLonSimple(cartesianPosition.x, cartesianPosition.y, cartesianPosition.z);
    //console.log("Posición calculada en latitud y longitud:", latLonPosition);
  
    return latLonPosition;
}
    
async function getGatewaysByMacs(macs) {
    const gateways = await ibeaconGateway.findAll({
      where: {
        mac: macs
      },
      attributes: ['mac', 'lat', 'lon']
    });
  
    const result = {};
        for (const gateway of gateways) {
            result[gateway.mac] = {
                lat: parseFloat(gateway.lat),
                lon: parseFloat(gateway.lon)
            };
        }
    return result;
}

async function calculatePositions() {
    const positions = [];
    const beaconsData = {};
    const uniqueIbeaconRecords = await ibeaconDeviceTrack.sequelize.query(`
        WITH latest_record_per_gateway AS (
            SELECT *,
                   ROW_NUMBER() OVER (PARTITION BY "id_ibeacon_device", "gatewaymac" ORDER BY "createdat" DESC) AS latest_rank
            FROM "tracking"."ibeacon_device_track"
            WHERE "deletedat" IS NULL
        ),
        top_3_latest_records_for_all_ibeacons AS (
            SELECT *,
                   ROW_NUMBER() OVER (PARTITION BY "id_ibeacon_device" ORDER BY "createdat" DESC) AS rank_by_device
            FROM latest_record_per_gateway
            WHERE latest_rank = 1
        )
        SELECT *
        FROM top_3_latest_records_for_all_ibeacons
        WHERE rank_by_device <= 3
        ORDER BY "id_ibeacon_device" ASC, "gatewaymac" ASC, "createdat" DESC;
    `, { type: Sequelize.QueryTypes.SELECT });

        //console.log('++++++++++++++++++++++++++++++++calculatePositions: Registros únicos de iBeacon obtenidos:', uniqueIbeaconRecords);
        for (const iBeaconRecord of uniqueIbeaconRecords) {
        //console.log('Procesando iBeaconRecord:', iBeaconRecord);
            if (!beaconsData[iBeaconRecord.ibeaconmac]) {
                beaconsData[iBeaconRecord.ibeaconmac] = [];
            }
            beaconsData[iBeaconRecord.ibeaconmac].push(iBeaconRecord);
         }
        //console.log('beaconsData:', beaconsData);

    // Paso 3: Iterar sobre las entradas de beaconsData y calcular la posición si hay al menos 3 gateways diferentes
        for (const ibeaconmac in beaconsData) {
            //console.log('Procesando ibeaconmac:', ibeaconmac);
            if (beaconsData[ibeaconmac].length >= 3) {
                const position = await calculatePosition(beaconsData[ibeaconmac]);
                const id_ibeacon_device = beaconsData[ibeaconmac][0].id_ibeacon_device;
                //console.log('++++++++++++++++++++++++++++++++++++calculatePositions: Posición calculada:', position);
                if (position) {
                    positions.push({
                        id_ibeacon_device: id_ibeacon_device,
                        ibeaconmac: ibeaconmac,
                        lat: position.lat,
                        lon: position.lon,
                    });
                }
            } else {
                console.log(`El iBeacon con MAC ${ibeaconmac} no tiene suficientes gateways (al menos 3) para calcular la posición.`);
            }
        }

    return positions;
}

module.exports = {
    updateBeaconPositions,
    calculatePositions
};
