import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from "../store/actions";
import * as gpsActions from "../../../gps/list/store/actions";
import * as ownerActions from "../../../owner/list/store/actions";
import { useNavigate, useLocation } from "react-router-dom";


import { Container, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSatellite } from '@fortawesome/free-solid-svg-icons';

import { TextField, Box, Button, MenuItem } from '@mui/material';

import { useFormik } from "formik";

import Alerta from "../../../../components/Snackbar";


const style = {
  rowStyle: {
    height: '100vh'
  },
  logo: {
    backgroundColor: '#055160',
    position: 'relative'
  },
  form: {
    position: 'relative'
  },
  center: {
    margin: 0,
    position: 'absolute',
    top: '50%',
    left: '50%',
    msTransform: 'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)'
  },
  input: {
    margin: '8px',
    width: '100%'
  }
}

function Details({
  isAdmin = false
}) {
  const [listaDevice, setListaDevice] = useState([]);
  const [listaOwner, setListaOwner] = useState([]);
  const editDeviceOwnerReducer = useSelector(state => { return state.editDeviceOwnerReducer }, shallowEqual);
  const ownerReducer = useSelector(state => { return state.ownerReducer }, shallowEqual);
  const gpsReducer = useSelector(state => { return state.gpsReducer }, shallowEqual);
  const [dataForm, setDataForm] = useState({
    id_owner: 0,
    id_ibeacon_device: 0,
    name: ''
  });

  // Para alertas
  const showMsg = useSelector(state => { return state.editDeviceOwnerReducer.showMsg }, shallowEqual);
  const [openMsg, setOpenMsg] = useState(false);
  const [msg, setMsg] = useState({
    text: '',
    severity: 'info'//'error','info','success','warning'
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBack = (event) => navigate(-1);

  useEffect(() => {
    // Verifica si está ejecutando la petición en axios
    dispatch(ownerActions.requestListaOwner({}));
    dispatch(gpsActions.requestListaGps({}));
  }, []);

  useEffect(() => {
    // Verifica si está ejecutando la petición en axios
    if (editDeviceOwnerReducer.item.id != undefined) {
      const data = { ...editDeviceOwnerReducer.item };
      setDataForm(data);
    }

  }, [editDeviceOwnerReducer]);

  useEffect(() => {
    // Verifica si está ejecutando la petición en axios
    if (!gpsReducer.isChanging) {
      setListaDevice(gpsReducer.listGps);
    }
  }, [gpsReducer]);

  useEffect(() => {
    // Verifica si está ejecutando la petición en axios
    if (!ownerReducer.isChanging) {
      setListaOwner(ownerReducer.listOwner);
    }
  }, [ownerReducer]);


  useEffect(() => {
    // Verifica si está ejecutando la petición en axios
    if (editDeviceOwnerReducer.item.id != undefined) {
      const data = { ...editDeviceOwnerReducer.item };
      setDataForm(data);
    }
  }, [editDeviceOwnerReducer]);

  useEffect(() => {
    // Verifica si está ejecutando la petición en axios
    if (showMsg) {
      if (editDeviceOwnerReducer.isError) {
        setOpenMsg(true);
        setMsg({
          severity: 'error',
          text: editDeviceOwnerReducer.message
        })
      } else {
        setOpenMsg(true);
        setMsg({
          severity: 'success',
          text: editDeviceOwnerReducer.message
        })
      }
    }
  }, [showMsg]);

  const formik = useFormik({
    initialValues: dataForm,
    enableReinitialize: true,
    onSubmit: values => {
      const data = { ...values };
      if (data.id == undefined) {
        dispatch(actions.requestCreateDeviceOwner(values));
      } else {
        dispatch(actions.requestUpdateDeviceOwner(values));
      }

    },
  });



  return (
    <>
      <Alerta open={openMsg} onClose={() => setOpenMsg(false)} message={msg.text} severity={msg.severity}></Alerta>
      <div style={style.center}>
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { m: 1, width: '25ch' },
          }}
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
        >

          <TextField id="id_ibeacon_device"
            label="Dispositivo"
            variant="outlined"
            type={'number'}
            style={style.input}
            select
            name='id_ibeacon_device'
            value={formik.values.id_ibeacon_device}
            onChange={formik.handleChange}
          >
            <MenuItem key={0} value={0} disabled>
              {'Seleccione...'}
            </MenuItem>
            {listaDevice.map((option) => (
              <MenuItem key={`lu${option.id}`} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>


          <TextField id="id_owner"
            label="SuperMercado"
            variant="outlined"
            type={'number'}
            style={style.input}
            select
            name='id_owner'
            value={formik.values.id_owner}
            onChange={formik.handleChange}
          >
            <MenuItem key={0} value={0} disabled>
              {'Seleccione...'}
            </MenuItem>
            {listaOwner.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField id="name"
            name='name'
            label="Nombre"
            variant="outlined"
            type={'text'}
            style={style.input}
            // value={email}
            // onChange={handleChangeEmail} 
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <Container>
            <Row>
              <Col>
                <Button color='success' variant="contained"
                  // onClick={handleSave}
                  type='submit'
                  style={style.input}>GUARDAR</Button>
              </Col>
              <Col>
                <Button color='primary' variant="contained"
                  onClick={handleBack}
                  style={style.input}>REGRESAR</Button>
              </Col>
            </Row>
          </Container>

        </Box>
      </div>
    </>
  );
}

export default Details;
