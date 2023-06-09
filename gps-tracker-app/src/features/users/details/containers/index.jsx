import React, { useState, useEffect } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as actions from "../store/actions";
import * as rolActions from "../../../rol/list/store/actions";
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
  // const [email, setEmail] = useState(process.env.REACT_APP_USER);
  // const [password, setPassword] = useState(process.env.REACT_APP_PASS);
  const editUsersReducer = useSelector(state => { return state.editUsersReducer }, shallowEqual);
  const rolReducer = useSelector(state => { return state.rolReducer }, shallowEqual);
  const [passEdited, setPassEdited] = useState(false);
  const [listaRol, setListaRol] = useState([]);
  const [dataForm, setDataForm] = useState({
    idRole: 0,
    name: "",
    email: "",
    pass: ""
  });
  // Para alertas
  const showMsg = useSelector(state => { return state.editUsersReducer.showMsg }, shallowEqual);
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
    dispatch(rolActions.requestListaRol());
  }, []);

  useEffect(() => {
    // Verifica si está ejecutando la petición en axios
    if (editUsersReducer.item.id != undefined) {
      const data = { ...editUsersReducer.item, pass: 'xxxxxxxxxx' };
      setDataForm(data);
    }

  }, [editUsersReducer]);

  useEffect(() => {
    // Verifica si está ejecutando la petición en axios
    if (showMsg) {
      if (editUsersReducer.isError) {
        setOpenMsg(true);
        setMsg({
          severity: 'error',
          text: editUsersReducer.message
        })
      } else {
        setOpenMsg(true);
        setMsg({
          severity: 'success',
          text: editUsersReducer.message
        })
      }
    }
  }, [showMsg]);

  useEffect(() => {
    // Verifica si está ejecutando la petición en axios
    if (!rolReducer.isChanging) {
      setListaRol(rolReducer.listRol);
    }
  }, [rolReducer]);



  const formik = useFormik({
    initialValues: dataForm,
    enableReinitialize: true,
    onSubmit: values => {
      const data = { ...values };
      if (!passEdited) {
        delete data.pass;
      }
      if (data.id == undefined) {
        dispatch(actions.requestCreateUsers(values));
      } else {
        dispatch(actions.requestUpdateUsers(values));
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
          <TextField id="idRole"
            label="Rol"
            variant="outlined"
            type={'number'}
            style={style.input}
            select
            name='idRole'
            value={formik.values.idRole}
            onChange={formik.handleChange}
          >
            <MenuItem key={0} value={0} disabled>
              {'Seleccione...'}
            </MenuItem>
            {listaRol.map((option) => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField id="name"
            label="Nombre"
            variant="outlined"
            type={'text'}
            style={style.input}
            // value={email}
            // onChange={handleChangeEmail} 
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <TextField id="email"
            label="Email"
            variant="outlined"
            type={'email'}
            style={style.input}
            // value={email}
            // onChange={handleChangeEmail} 
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          <TextField id="pass"
            label="Contraseña"
            variant="outlined"
            type={'password'}
            style={style.input}
            // value={password}
            // onChange={handleChangePassword} 
            value={formik.values.pass}
            onChange={formik.handleChange}
          // onChange={(e) => {
          //   setPassEdited(true);
          //   formik.handleChange(e);
          // }}
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
