import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import { getHistorialGps } from '../../../api/historial/historialCRUD.js';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import moment from 'moment';
import L from "leaflet";


const columns = [
  { field: 'id', headerName: 'ID', flex: 1 },
  { field: 'lat', headerName: 'Latitud', flex: 1 },
  { field: 'lon', headerName: 'Longitud', flex: 1 },
  { field: 'id_ibeacon_device', headerName: 'ID Ibeacon Device', flex: 1 },
  { field: 'name', headerName: 'Nombre', flex: 1 },
  { field: 'mac', headerName: 'MAC', flex: 1 },
];

function HistorialGPS({ isAdmin = false }) {
  const [rows, setRows] = useState([]);
  const [fechaInicio, setFechaInicio] = useState(moment().format('YYYY-MM-DD'));
  const [fechaFin, setFechaFin] = useState(moment().format('YYYY-MM-DD'));
  const [selectedLocation, setSelectedLocation] = useState({ lat: 0, lon: 0 });
  console.log(moment().format('YYYY-MM-DD'));
  const handleConsulta = async () => {
    try {
      const queryParams = {};
      if (fechaInicio) queryParams.fechaIni = fechaInicio;
      if (fechaFin) queryParams.fechaFin = fechaFin;
  
      const response = await getHistorialGps(queryParams);
      setRows(response.data.result);
      if (response.data.result.length > 0) {
        const firstRow = response.data.result[0];
        setSelectedLocation({ lat: firstRow.lat, lon: firstRow.lon });
      }
    } catch (error) {
      console.error('Error al consultar el historial GPS:', error);
    }
  };

  useEffect(() => {
    handleConsulta();
  }, [fechaInicio, fechaFin]);

  const handleRowClick = (row) => {
    setSelectedLocation({ lat: row.lat, lon: row.lon });
  };
  const icon = L.icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [15, 20],
    iconAnchor: [10, 20],
    popupAnchor: [2, -10]
  });
  return (
    <Box p={3}>
      <Box display="flex" alignItems="center" mb={2}>
        <TextField
          label="Fecha Inicio"
          type="date"
          value={fechaInicio}
          onChange={(e) => setFechaInicio(e.target.value)}
          sx={{ mr: 2 }}
        />
        <TextField
          label="Fecha Fin"
          type="date"
          value={fechaFin}
          onChange={(e) => setFechaFin(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          startIcon={<FontAwesomeIcon icon={faSearch} />}
          onClick={handleConsulta}
        >
          Consultar
        </Button>
      </Box>
      <Box mb={2}>
  <MapContainer center={[selectedLocation.lat, selectedLocation.lon]} zoom={19} style={{ height: '400px' }} key={JSON.stringify([selectedLocation.lat, selectedLocation.lon])}>
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {selectedLocation && (
      <Marker position={[selectedLocation.lat, selectedLocation.lon]} icon={icon}>
        <Popup>
          <div>
            <p><strong>ID:</strong> {rows[0]?.id}</p>
            <p><strong>Nombre:</strong> {rows[0]?.name}</p>
            <p><strong>MAC:</strong> {rows[0]?.mac}</p>
            <p><strong>Latitud:</strong> {selectedLocation.lat}</p>
            <p><strong>Longitud:</strong> {selectedLocation.lon}</p>
          </div>
        </Popup>
      </Marker>
    )}
  </MapContainer>
</Box>
<Box>
  <DataGrid
    rows={rows}
    columns={columns}
    pageSize={5}
    rowsPerPageOptions={[5]}
    autoHeight
    onRowClick={(params) => handleRowClick(params.row)}
  />
</Box>
</Box>
);
}

export default HistorialGPS;