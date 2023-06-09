import React, { useState, useEffect } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Box, TextField } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { format } from 'date-fns';
import {  historialAlertas as getAlerts  } from '../../../api/alert/alertCRUD';
import moment from 'moment';

const columns = [
  { field: 'id', headerName: 'ID de la alerta', flex: 1 },
  {
    field: "name",
    headerName: "Nombre del dispositivo",
    flex: 1,
    valueGetter: (params) => params.row.ibeaconDevice.name,
  },
  { field: 'id_ibeacon_device', headerName: 'ID del dispositivo', flex: 1 },
  { field: 'alert_type', headerName: 'Tipo de alerta', flex: 1 },
];

function HistorialAlertas({ isAdmin = false }) {
  const [rows, setRows] = useState([]);
  const [fechaInicio, setFechaInicio] = useState(moment().format('YYYY-MM-DD'));
  const [fechaFin, setFechaFin] = useState(moment().format('YYYY-MM-DD'));
  
  const handleConsulta = async (fechaInicio, fechaFin) => {
    try {
      const response = await getAlerts({ fechaInicio, fechaFin });
      setRows(response.data.result);
    } catch (error) {
      console.error('Error al consultar el historial de alertas:', error);
    }
  };

  useEffect(() => {
    handleConsulta()
  }, []);

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
      <Box>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          autoHeight
        />
      </Box>
    </Box>
  );
}

export default HistorialAlertas;

