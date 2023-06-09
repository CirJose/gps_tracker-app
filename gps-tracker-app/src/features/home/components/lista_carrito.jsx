// import './App.css';
import { useSelector } from 'react-redux';
import Mapa from "../../map/containers";
import { Container, Row, Col } from 'react-bootstrap';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

import { List, ListItem, ListItemIcon, ListItemButton, ListItemText, ListItemAvatar, Avatar } from "@mui/material";


function ListaCarrito({ elements = [], onClick = (i) => {
    console.log(i)
}, children }) {

    return (
        <>
            <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper', overflow: 'auto', zIndex: 1 }}>
                {children}
                {elements.map(item => {
                    return (
                        <ListItem key={item.id} onClick={() => onClick(item)}>
                            <ListItemAvatar style={{ marginRight: "-10px" }}>
                                <Avatar sx={{ width: 35, height: 35 }}>
                                    <FontAwesomeIcon icon={faCartShopping}></FontAwesomeIcon>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.name} secondary={item.estado} primaryTypographyProps={{style: { fontSize: 14 }}} />
                        </ListItem>
                    );
                })}

            </List>
        </>
    );
}

export default ListaCarrito;
