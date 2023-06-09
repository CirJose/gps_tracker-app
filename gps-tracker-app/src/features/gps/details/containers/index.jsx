import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from "../store/actions";
import { useNavigate, useLocation } from "react-router-dom";


import { Container, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSatellite } from '@fortawesome/free-solid-svg-icons';

import { TextField, Box, Button, Checkbox, FormControlLabel } from '@mui/material';

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
  const editGpsReducer = useSelector(state => { return state.editGpsReducer }, shallowEqual);
  const [dataForm, setDataForm] = useState({
    name: "",
    imei: "",
    phone: "",
    ready: false
  });

  // Para alertas
  const showMsg = useSelector(state => { return state.editGpsReducer.showMsg }, shallowEqual);
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
    if (editGpsReducer.item.id != undefined) {
      const data = { ...editGpsReducer.item };
      setDataForm(data);
    }
  }, [editGpsReducer]);

  useEffect(() => {
    // Verifica si está ejecutando la petición en axios
    if (showMsg) {
      if (editGpsReducer.isError) {
        setOpenMsg(true);
        setMsg({
          severity: 'error',
          text: editGpsReducer.message
        })
      } else {
        setOpenMsg(true);
        setMsg({
          severity: 'success',
          text: editGpsReducer.message
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
        dispatch(actions.requestCreateGps(values));
      } else {
        dispatch(actions.requestUpdateGps(values));
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
          <TextField id="imei"
            name='imei'
            label="IMEI"
            variant="outlined"
            type={'text'}
            style={style.input}
            // value={email}
            // onChange={handleChangeEmail} 
            value={formik.values.imei}
            onChange={formik.handleChange}
          />
          <TextField id="phone"
            name='phone'
            label="Teléfono"
            variant="outlined"
            type={'text'}
            style={style.input}
            // value={email}
            // onChange={handleChangeEmail} 
            value={formik.values.phone}
            onChange={formik.handleChange}
          />
          <FormControlLabel
            value="start"
            control={
              <Checkbox
                disabled
                value={formik.values.ready}
                onChange={formik.handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />
            }
            label="Activo"
            labelPlacement="start"
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
