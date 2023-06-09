import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as loginActions from "../store/actions";


import { Container, Row, Col } from 'react-bootstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSatellite } from '@fortawesome/free-solid-svg-icons';

import { TextField, Box, Button } from '@mui/material';

import { useFormik } from "formik";

import logo from "../../../img/logo.svg";


const style = {
  rowStyle: {
    height: '100vh'
  },
  img:{
    width: '100%'
  },
  logo: {
    backgroundColor: '#F96E70',
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

function Login() {
  // const [email, setEmail] = useState(process.env.REACT_APP_USER);
  // const [password, setPassword] = useState(process.env.REACT_APP_PASS);

  const dispatch = useDispatch();

  // const handleLogin = () => {
  //   dispatch(loginActions.requestLogin(email, password));
  // };
  // const handleChangeEmail = (event) => {
  //   setEmail(event.target.value);
  // };
  // const handleChangePassword = (event) => {
  //   setPassword(event.target.value);
  // };

  const formik = useFormik({
    initialValues: {
      email: process.env.REACT_APP_USER,
      pass: process.env.REACT_APP_PASS
    },
    onSubmit: values => {
      dispatch(loginActions.requestLogin(values.email, values.pass));
    },
  });

  return (
    <>
      <Row style={style.rowStyle}>
        <Col md={'4'} style={style.logo}>
          <div style={style.center}>
            {/* <FontAwesomeIcon size='8x' color='white' icon={faSatellite} /> */}
            <img style={style.img} src={logo}></img>
          </div>
        </Col>
        <Col md={'8'} style={style.form}>
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
              />
              <Button color='primary' variant="contained"
                // onClick={handleLogin}
                type='submit'
                style={style.input}>INICIAR SESIÓN</Button>
            </Box>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default Login;
