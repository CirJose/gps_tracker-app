import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';
import { IconButton, Button, Modal, Box, Card, CardActions, CardContent } from '@mui/material';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faEdit, faPlusCircle, faXmarkCircle } from '@fortawesome/free-solid-svg-icons';

import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import * as actions from "../store/actions";
import * as detailsActions from "../../details/store/actions";
import { Col, Row } from 'react-bootstrap';

import Alerta from "../../../../components/Snackbar";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function DataTable({
  isAdmin = false
}) {

  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [elemento, setElemento] = useState({});
  const userOwnerReducer = useSelector(state => { return state.userOwnerReducer }, shallowEqual);

  // Para alertas
  const showMsg = useSelector(state => { return state.userOwnerReducer.showMsg }, shallowEqual);
  const [openMsg, setOpenMsg] = useState(false);
  const [msg, setMsg] = useState({
    text: '',
    severity: 'info'//'error','info','success','warning'
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(actions.requestListaUserOwner({}));
  }, []);

  /**
    * UseEffect - DidUpdate
    * 
    * Verifica si el valor en el reductor ha cambiado a verdadero y muestra el mensaje respectivo
    */
  useEffect(() => {
    // Verifica si está ejecutando la petición en axios
    if (!userOwnerReducer.isChanging) {
      setRows(userOwnerReducer.listUserOwner);
      // let updatedData = data.concat(ownerReducer.listUsers);
      // setData(updatedData);
      // setRefreshing(false);
    }

  }, [userOwnerReducer]);

  useEffect(() => {
    // Verifica si está ejecutando la petición en axios
    if (showMsg) {
      if (userOwnerReducer.isError) {
        setOpenMsg(true);
        setMsg({
          severity: 'error',
          text: userOwnerReducer.message
        })
      } else {
        setOpenMsg(true);
        setMsg({
          severity: 'success',
          text: userOwnerReducer.message
        })
      }
    }
  }, [showMsg]);


  const handleDelete = () => {
    setRows([]);
    dispatch(actions.requestDeleteUserOwner(elemento));
    setOpen(false);
  }

  const handleDetails = (data = {}) => {
    dispatch(detailsActions.setearUserOwner(data));
    navigate("/user_owner/details");
  }

  const columns = [
    {
      field: "actions",
      headerName: "Acciones",
      // width: 90,
      sortable: false,
      filterable: false,
      renderCell: (params) => {
        const onClickEdit = (e) => {
          e.stopPropagation();
          handleDetails(params.row);
          // console.log(params.row);
        }
        const onClickDelete = (e) => {
          e.stopPropagation();
          setOpen(true);
          setElemento(params.row);
          // console.log(params.row);
        }
        // you will find row info in params.row
        return isAdmin ? <>
          <IconButton onClick={onClickDelete} color="error" aria-label="upload picture" component="span">
            <FontAwesomeIcon size='xs' icon={faTrashCan} />
          </IconButton>
          <IconButton onClick={onClickEdit} color="primary" aria-label="upload picture" component="span">
            <FontAwesomeIcon size='xs' icon={faEdit} />
          </IconButton>
        </>:<></>
      }
    },
    { field: 'id', headerName: 'ID' },
    {
      field: 'id_ownerOwner', headerName: 'Mall', flex: 1,
      valueGetter: (params) => {
        if (params.row.id_ownerOwner != null) {
          return `${params.row.id_ownerOwner.name}` || '';
        } else {
          return '';
        }

      }
    },
    {
      field: 'idUsersUser', headerName: 'Usuario', flex: 1,
      valueGetter: (params) => {
        if (params.row.idUsersUser != null) {
          return `${params.row.idUsersUser.name}` || '';
        } else {
          return '';
        }

      }
    },
  ];

  return (
    <>
      <Alerta open={openMsg} onClose={() => setOpenMsg(false)} message={msg.text} severity={msg.severity}></Alerta>
      <div>
        <div style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 20 }}>
          <>{isAdmin &&
            <Button style={{ width: '100%' }} variant="contained" color='success'
              onClick={() => handleDetails({})}
              startIcon={<FontAwesomeIcon size='xs' icon={faPlusCircle} />}>
              Nuevo
            </Button>
          }</>
        </div>
        <div style={{ padding: 10 }}>
          <div style={{ height: 400, width: '100%' }}>
            <div style={{ display: 'flex', height: '100%' }}>
              <div style={{ flexGrow: 1 }}>
                <DataGrid
                  initialState={{
                    columns: {
                      columnVisibilityModel: {
                        idRole: false
                      }
                    }
                  }}
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                />
              </div>
            </div>
          </div>
        </div>

        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Row>
              <h3>Eliminar</h3>
              <p>¿Está seguro de eliminar el registro?</p>
            </Row>
            <Row >
              <Col>
                <Button style={{ width: '100%' }} variant="contained" color='error'
                  onClick={handleDelete}
                  startIcon={<FontAwesomeIcon size='xs' icon={faTrashCan} />}>
                  Eliminar
                </Button>
              </Col>
              <Col>
                <Button style={{ width: '100%' }} variant="contained" color='primary'
                  onClick={() => setOpen(false)}
                  startIcon={<FontAwesomeIcon size='xs' icon={faXmarkCircle} />}>
                  Cancelar
                </Button>
              </Col>
            </Row>
          </Box>
        </Modal>
      </div>
    </>
  );
}

export default DataTable;
