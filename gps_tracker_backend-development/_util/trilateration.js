const geolib = require('geolib');

const trilateration = (coordenadasCercanas, distancias) => {
  const puntosInterseccion = [];

  for (let i = 0; i < coordenadasCercanas.length - 1; i++) {
    for (let j = i + 1; j < coordenadasCercanas.length; j++) {
      const coordenada1 = {
        latitude: parseFloat(coordenadasCercanas[i].latitud),
        longitude: parseFloat(coordenadasCercanas[i].longitud)
      };
      const coordenada2 = {
        latitude: parseFloat(coordenadasCercanas[j].latitud),
        longitude: parseFloat(coordenadasCercanas[j].longitud)
      };
      const distancia1 = distancias[i];
      const distancia2 = distancias[j];

      for (const bearing1 of [0, 180]) {
        const punto1 = geolib.computeDestinationPoint(coordenada1, distancia1, bearing1);
        for (const bearing2 of [0, 180]) {
          const punto2 = geolib.computeDestinationPoint(coordenada2, distancia2, bearing2);
          puntosInterseccion.push({ latitud: punto1.latitude, longitud: punto1.longitude });
          puntosInterseccion.push({ latitud: punto2.latitude, longitud: punto2.longitude });
        }
      }
    }
  }

  // Calcular el centroide de los puntos de intersección
  const sumaLatitudes = puntosInterseccion.reduce((sum, punto) => sum + punto.latitud, 0);
  const sumaLongitudes = puntosInterseccion.reduce((sum, punto) => sum + punto.longitud, 0);

  const latitudPromedio = sumaLatitudes / puntosInterseccion.length;
  const longitudPromedio = sumaLongitudes / puntosInterseccion.length;

  return { latitud: latitudPromedio, longitud: longitudPromedio };
};

  module.exports = trilateration;