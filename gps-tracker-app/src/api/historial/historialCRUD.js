import axios from "axios";

const baseUrl = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`;

export const HISTORIAL_GPS_URL = `${baseUrl}/gps_track_report/historial`;

export async function getHistorialGps({ fechaIni, fechaFin }) {
  const response = await axios.post(HISTORIAL_GPS_URL, {
    fechaIni,
    fechaFin,
  });

  return response;
}
