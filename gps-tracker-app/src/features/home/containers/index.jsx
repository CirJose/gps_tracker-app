import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import Mapa from "../../map/containers";
import MarcadorZoom from "../../map/components/marcadorZoom";
import { Container, Row, Col } from 'react-bootstrap';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useState, useEffect, useCallback, useRef } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faFolder, faCartShopping, faWrench, faRightFromBracket, faChevronLeft} from '@fortawesome/free-solid-svg-icons';

import { Drawer, Button, BottomNavigation, BottomNavigationAction, Paper, Box, List, ListItem, ListItemIcon, ListItemButton, ListItemText, IconButton, Avatar } from "@mui/material";
import * as actions from "../../device_owner/list/store/actions";
import ListaCarrito from "../components/lista_carrito";

import { MapContainer, TileLayer, useMap, Marker, Popup, LayersControl, ZoomControl, useMapEvents } from 'react-leaflet';
import L from "leaflet";
import { styled } from "@mui/material/styles";

import moment from "moment";
import { groupBy } from "lodash";


const drawerWidth = 150;
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  overflowY: "visible",
  position: "relative",
  border: "none",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "visible",
  overflowY: "visible",
  width: `calc(${theme.spacing(7)} - 150px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} - 150px)`,
  },
  position: "relative",
  height: "auto",
  border: "none",
});

const CarritoDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));


function PositionMarker({ position, icon }) {
  const map = useMap();

  useEffect(() => {
    map.setView(position, map.getZoom());
  }, [position, map]);

  return position === null ? null : (
    <Marker position={position} icon={icon}>
      <Popup>...</Popup>
    </Marker>
  );
}

function Home({
  isAdmin = false
}) {
  const baseUrl = `${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`;
  const icon = L.icon({
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    iconSize: [15, 20],
    iconAnchor: [10, 20],
    popupAnchor: [2, -10]
  });

  const [abrir, setAbrir] = useState(false);
  const [orientacion, setOrientacion] = useState('left');
  const [value, setValue] = useState(0);
  const [listaCarrito, setListaCarrito] = useState([]);
  const [beaconPositions, setBeaconPositions] = useState({});
  const [ibeaconId, setibeaconId] = useState(0);
  const [ibeaconName, setibeaconName] = useState('');
  const [sseObject, setSseObject] = useState(null);
  const [showCart, setShowCart] = useState(true);
  

  const deviceOwnerReducer = useSelector(state => { return state.deviceOwnerReducer }, shallowEqual);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.requestListaDeviceOwner({}));
    return () => {
      // Cerrar el evento si existe
      if (sseObject) {
        sseObject.close();
      }
    }
  }, []);


  const mapRef = useRef();

  const sseEvents = useCallback((deviceIds) => {
    // Cerrar los eventos si existen
    if (sseObject) {
      sseObject.close();
    }

    const sse = new EventSource(`${baseUrl}/gps_track`);

    sse.addEventListener('latestPosition', (e) => {
      const track = JSON.parse(e.data);
      console.log("Mensaje recibido:", track);
    
      // Verificar si los datos recibidos son nulos
      if (track) {
          const id_ibeacon_device = track.id_ibeacon_device;
          const lat = track.lat || 0;
          const lon = track.lon || 0;
    
          setBeaconPositions((prevBeaconPositions) => ({
            ...prevBeaconPositions,
            [id_ibeacon_device]: [lat, lon],
          }));
      } else {
        console.log("Datos recibidos nulos");
      }
    });

    sse.onerror = () => {
      // error log here
      sse.close();
    };

    setSseObject(sse); // Establecer sseObject como el nuevo objeto sse
  }, []);

/*   useEffect(() => {
    dispatch(actions.requestListaDeviceOwner({}));
    return () => {
      // Cerrar el evento si existe
      if (sseObject) {
        sseObject.close();
      }
    };
  }, []); */

  useEffect(() => {
    // Verifica si está ejecutando la petición en axios
    if (!deviceOwnerReducer.isChanging) {
      setListaCarrito(deviceOwnerReducer.listDeviceOwner);
      const deviceIds = deviceOwnerReducer.listDeviceOwner.map(
        (device) => device.id_ibeacon_device
      );
      if (deviceIds.length) {
        sseEvents(deviceIds);
      }
    }
  }, [deviceOwnerReducer]);
        
        const toggleDrawer = (anchor, open) => (event) => {
          if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
          }
          setOrientacion(anchor);
          setAbrir(open);
        };
        
        const handleListItemClick = (id_ibeacon_device) => {
          const selectedPosition = beaconPositions[id_ibeacon_device];
          console.log(selectedPosition);
          if (selectedPosition) {
            if (mapRef.current) {
              mapRef.current.setView(selectedPosition, 19);
            }
          }
          
          setibeaconId(id_ibeacon_device);
          setibeaconName(deviceOwnerReducer.listDeviceOwner.find(device => device.id_ibeacon_device === id_ibeacon_device).name);
        };
        
     
        const onMapReady = (map) => {
          mapRef.current = map;
        };
        
        return (
          <>
            <Drawer
              anchor={orientacion}
              open={abrir}
              onClose={toggleDrawer(orientacion, true)}
            >
              <Button onClick={toggleDrawer(orientacion, false)}>{'close'}</Button>
              {/* <div>demo</div> */}
              {/* {list(anchor)} */}
            </Drawer>
        
        
            <div style={{ display: "flex", flexGrow: 1, position: "relative" }} >
              <CarritoDrawer
                open={showCart}
                variant="permanent"
                style={{ position: "absolute", zIndex: 999, height: "auto", maxHeight: "100%" }}
              >
                <Box>
                {/* <button onClick={toggleDrawer('left', true)}>Open Drawer</button>
                    <button onClick={toggleDrawer('right', true)}>Open Drawer</button> */}
                    <ListaCarrito elements={listaCarrito}
                      onClick={(e) => {
                        handleListItemClick(e.id_ibeacon_device);
                        /* sseEvents([e.id_ibeacon_device]);
                            setibeaconId(e.id_ibeacon_device); */
                        setibeaconName(e.name);
                      }}
                    >
                      <Box sx={{ display: "flex", justifyContent: "flex-end", px: 1 }}>
                        <IconButton
                          onClick={() => setShowCart(false)}
                          sx={{ width: 40 }}
                        >
                          <FontAwesomeIcon icon={faChevronLeft} />
                        </IconButton>
                      </Box>
                      </ListaCarrito> 
                    
                      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "transparent", margin: "10px", position: "absolute", top: 0 }}>
                        <IconButton
                          onClick={() => setShowCart(true)}
                          style={{ background: "white", borderRadius: 4, border: "2px solid rgba(0,0,0,0.2)" }}
                        >
                          <Avatar>
                            <FontAwesomeIcon icon={faCartShopping} />
                          </Avatar>
                        </IconButton>
                    </Box>
                  </Box>
                </CarritoDrawer>
              <div style={{ flex: 1 }}>
                <Mapa center={[-33.4727879,-70.6298313]} zoom={19}>
                {Object.entries(beaconPositions).map(([id_ibeacon_device, position]) => (
              <Marker key={id_ibeacon_device} position={position} icon={icon}>
                <Popup>
                  <Card sx={{ width: 240 }}>
                    <CardActionArea>
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div" align='center'>
                          {ibeaconName}
                        </Typography>
                        <Row>
                          <Col md={4}>Latitud:</Col>
                          <Col md={8}>{position[0]}</Col>
                          <Col md={4}>Longitud:</Col>
                          <Col md={8}>{position[1]}</Col>
                          <Col md={4}>Fecha:</Col>
                          <Col md={8}>{moment(new Date(position.timestamp)).format('L')}</Col>
                          <Col md={4}>Hora:</Col>
                          <Col md={8}>{moment(new Date(position.timestamp)).format('LTS')}</Col>
                        </Row>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Popup>
              </Marker>
            ))}
          </Mapa>
        </div>

    </div>
  </>
);
}

export default Home;