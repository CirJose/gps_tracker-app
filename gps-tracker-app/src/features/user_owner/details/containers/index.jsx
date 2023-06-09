import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from "../store/actions";
import * as userActions from "../../../users/list/store/actions";
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
  const [listaUser, setListaUser] = useState([]);
  const [listaOwner, setListaOwner] = useState([]);
  const editUserOwnerReducer = useSelector(state => { return state.editUserOwnerReducer }, shallowEqual);
  const ownerReducer = useSelector(state => { return state.ownerReducer }, shallowEqual);
  const userReducer = useSelector(state => { return state.usersReducer }, shallowEqual);
  const [dataForm, setDataForm] = useState({
    name: "",
    idUsers: 0,
    id_owner:0
  });

  // Para alertas
  const showMsg = useSelector(state => { return state.editUserOwnerReducer.showMsg }, shallowEqual);
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
    dispatch(userActions.requestListaUsers({}));
  }, []);

  useEffect(() => {
    // Verifica si está ejecutando la petición en axios
    if (editUserOwnerReducer.item.id != undefined) {
      const data = { ...editUserOwnerReducer.item };
      setDataForm(data);
    }

  }, [editUserOwnerReducer]);

  useEffect(() => {
    // Verifica si está ejecutando la petición en axios
    if (!userReducer.isChanging) {
      setListaUser(userReducer.listUsers);
    }
  }, [userReducer]);

  useEffect(() => {
    // Verifica si está ejecutando la petición en axios
    if (!ownerReducer.isChanging) {
      setListaOwner(ownerReducer.listOwner);
    }
  }, [ownerReducer]);


  useEffect(() => {
    // Verifica si está ejecutando la petición en axios
    if (editUserOwnerReducer.item.id != undefined) {
      const data = { ...editUserOwnerReducer.item };
      setDataForm(data);
    }
  }, [editUserOwnerReducer]);

  useEffect(() => {
    // Verifica si está ejecutando la petición en axios
    if (showMsg) {
      if (editUserOwnerReducer.isError) {
        setOpenMsg(true);
        setMsg({
          severity: 'error',
          text: editUserOwnerReducer.message
        })
      } else {
        setOpenMsg(true);
        setMsg({
          severity: 'success',
          text: editUserOwnerReducer.message
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
        dispatch(actions.requestCreateUserOwner(values));
      } else {
        dispatch(actions.requestUpdateUserOwner(values));
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

          <TextField id="idUsers"
            label="Usuario"
            variant="outlined"
            type={'number'}
            style={style.input}
            select
            name='idUsers'
            value={formik.values.idUsers}
            onChange={formik.handleChange}
          >
            <MenuItem key={0} value={0} disabled>
              {'Seleccione...'}
            </MenuItem>
            {listaUser.map((option) => (
              <MenuItem key={`lu${option.id}`} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>

          
          <TextField id="id_owner"
            label="Mall"
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
