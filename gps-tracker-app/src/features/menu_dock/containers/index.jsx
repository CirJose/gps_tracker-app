// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleUser, faRightFromBracket, faMap, faFileArchive, faScrewdriverWrench, faBell, faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import * as loginActions from "../../login/store/actions";
import { historialAlertas } from '../../../api/alert/alertCRUD';



import {
    Toolbar, IconButton, Menu, MenuItem, Typography, BottomNavigation, BottomNavigationAction,
    MenuList,
    Divider, List, ListItem, ListItemButton, ListItemText, ListItemIcon,
    Paper, Accordion, TextField, Button,
    Grid, Box, Snackbar,
} from '@mui/material';
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import { styled, useTheme, alpha } from "@mui/material/styles";
import moment from "moment";

const style = {
    imgContainer: {
        textAlign: 'center'
    },
    img: {
        width: 100
    },
    input: {
        padding: '8px',
        width: '100%'
    }
}

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: "hidden",
  });
  
  const closedMixin = (theme) => ({
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up("sm")]: {
      width: `calc(${theme.spacing(8)} + 1px)`,
    },
  });
  
  const Drawer = styled(MuiDrawer, {
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
  
  const DrawerHeader = styled("div")(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
  }));
  
  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "open",
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    }),
  }));
  
  const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      {...props}
    />
  ))(({ theme }) => ({
    "& .MuiPaper-root": {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 250,
      overflow: "hidden",
      color:
        theme.palette.mode === "light"
          ? "rgb(55, 65, 81)"
          : theme.palette.grey[300],
      boxShadow:
        "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
      "& .MuiMenu-list": {
        padding: "4px 0",
      },
      "& .MuiMenuItem-root": {
        "& .MuiSvgIcon-root": {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        "&:active": {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity
          ),
        },
      },
    },
  }));
  

function MenuDock({ menuItemList = [], children }) {

    const [nombre, setNombre] = useState('');
    const [fechaInicio, setFechaInicio] = useState(
        moment("12-25-1995", "MM-DD-YYYY")
      );
    const [fechaFin, setFechaFin] = useState(moment());

    const [abrir, setAbrir] = useState(false);
    const [abrirUsuario, setAbrirUsuario] = useState(false);
    const [orientacion, setOrientacion] = useState('left');
    const [orientacionUsuario, setOrientacionUsuario] = useState('right');
    const [value, setValue] = useState(0);
    const [abrirAlerta, setAbrirAlerta] = useState(false);
    const [orientacionAlerta, setOrientacionAlerta] = useState('right');
    const [alertas, setAlertas] = useState([]);
    const [message, setMessage] = useState(null);
    const [showAlert, setShowAlert] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
    const handleClose = () => {
        setAnchorEl(null);
    };
      
    const handleMenu = (event) => {
        setAbrir(true);
    };

    const handleMenuUsuario = (event) => {
        setAbrirUsuario(true);
    };

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOrientacion(anchor);
        setAbrir(open);
    };

    const toggleDrawerUsuario = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOrientacionUsuario(anchor);
        setAbrirUsuario(open);
    };

    const handleLogOut = (event) => {
        dispatch(loginActions.logOut());
        navigate("/");
    };

    const handleMenuAlerta = (event) => {
        setAbrirAlerta(true);
    };

    const obtenerAlertas = async () => {
        try {
         const response = await historialAlertas({ fechaInicio, fechaFin });
         let result = response.data.result;
         setAlertas((prevAlertas) => {
            if (prevAlertas.length <= 0) {
              return result;
            } else {
              if (result.length > prevAlertas.length) {
                let idx = result.findIndex((e) => e.id === prevAlertas[0].id);
    
                setMessage(result[idx - 1].mensaje ?? result[idx - 1].message);
                setShowAlert(true);
    
                clearTimeout(timeout);
                timeout = setTimeout(function () {
                  setShowAlert(false);
                }, 1500);
                return [result[idx - 1], ...prevAlertas];
              }
              return result;
            }
          });
        } catch (error) {
          console.error("Error al consultar las alertas:", error);
        }
      };

    useEffect(() => {
        // Llama a la función para obtener alertas cada vez que se monta el componente
        obtenerAlertas();
      
        // Configura un temporizador para actualizar las alertas cada cierto tiempo
        const interval = setInterval(() => {
          obtenerAlertas();
        }, 2000); // Actualiza las alertas cada minuto (60000 ms)
      
        // Limpia el temporizador al desmontar el componente
        return () => clearInterval(interval);
    }, []);
    
    

    const toggleDrawerAlerta = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setOrientacionAlerta(anchor);
        setAbrirAlerta(open);
    };

    const alertasEjemplo = [
        // Reemplazar con tus datos de alerta
        { id: 1, mensaje: 'Alerta 1' },
        { id: 2, mensaje: 'Alerta 2' },
        { id: 3, mensaje: 'Alerta 3' },
        // ...
    ];

    
    // useEffect(() => {
    //     const nomb = menuItemList.find(e => {
    //         if (e.url == location.pathname) {
    //             return e;
    //         }
    //     });

    //     setNombre(nomb.text);

    // }, [location.pathname])


    return (
        <Box sx={{ display: "flex" }}>
            <Drawer
                // anchor={orientacion}
                open={abrir}
                // onClose={toggleDrawer(orientacion, false)}
                variant="permanent"
            >
                <Paper sx={{ width: 300, maxWidth: '100%', height: '100vh' }}>
                    <DrawerHeader>
                        <IconButton
                            onClick={toggleDrawer(orientacion, false)}
                            sx={{ width: 40 }}
                        >
                        <FontAwesomeIcon icon={faChevronLeft} />
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {menuItemList.map((item, index) => (
                            <Accordion key={item.text}>
                                <ListItem key={item.text} disablePadding onClick={(event) => navigate(item.url)} sx={{ display: "block" }}>
                                    <ListItemButton  sx={{ minHeight: 48, justifyContent: abrir ? "initial" : "center", px: 2.5 }}>
                                        <ListItemIcon sx={{ minWidth: "20px", mr: abrir ? 3 : "auto", justifyContent: "center" }}>
                                            <FontAwesomeIcon icon={item.icon} sx={{ opacity: abrir ? 1 : 0 }} />
                                        </ListItemIcon>
                                        <ListItemText primary={item.text} sx={{ opacity: abrir ? 1 : 0 }} />
                                    </ListItemButton>
                                </ListItem>
                            </Accordion>
                        ))}
                    </List>
                </Paper>
            </Drawer>
    
            <MuiDrawer
                anchor={orientacionUsuario}
                open={abrirUsuario}
                onClose={toggleDrawerUsuario(orientacionUsuario, false)}
            >
                <Paper sx={{ width: 240, maxWidth: '100%', height: '100vh' }}>
                    <DrawerHeader />
                    <div style={style.imgContainer}>
                        <img style={style.img} src='https://cdn.icon-icons.com/icons2/1508/PNG/512/systemusers_104569.png' />
                    </div>
                    <Divider />
                    <List>
                        <TextField id="id_owner"
                            label="SuperMercado"
                            variant="outlined"
                            type={'number'}
                            style={style.input}
                            select={false}
                            disabled={true}
                            name='id_owner'
                        >
                            <MenuItem key={0} value={0} disabled>
                                {'Seleccione...'}
                            </MenuItem>
                        </TextField>
                        <div style={{
                            textAlign: 'center',
                            marginLeft: '8px',
                            marginRight: '8px'
                        }}>
                            <Button color='primary' variant="outlined" startIcon={<FontAwesomeIcon icon={faRightFromBracket} />}
                                onClick={handleLogOut}
                                style={style.input}>Salir</Button>
                        </div>
                    </List>
                </Paper>
            </MuiDrawer>
            <MuiDrawer
                anchor={orientacionAlerta}
                open={abrirAlerta}
                onClose={toggleDrawerAlerta(orientacionAlerta, false)}
            >
                <Paper sx={{ width: 240, maxWidth: '100%', height: '100vh' }}>
                <List>
                    {alertas?.slice(0, 10).map((alerta) => (
                        <ListItem key={alerta.id}>
                        <ListItemText primary={alerta.mensaje ?? alerta.message} />
                        </ListItem>
                    ))}
                </List>
                </Paper>
            </MuiDrawer>
            <AppBar position="fixed" color="default" open={abrir}>
                <Toolbar>
                    <div>
                        <IconButton
                            size="small"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            onClick={handleMenu}
                            sx={{ mr: 2, ...(abrir && { display: "none" }) }}
                        >
                            <FontAwesomeIcon icon={faBars} />
                        </IconButton>
                    </div>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        {/* Nombre */}
                    </Typography>
                    <div style={{ display: 'flex' }}> {/* Contenedor agregado */}
                        <IconButton
                            size="large"
                            aria-label="alertas"
                            aria-controls="menu-alerta"
                            aria-haspopup="true"
                            // onClick={handleMenuAlerta}
                            onClick={handleClick}
                            color="inherit"
                        >
                            <FontAwesomeIcon icon={faBell} />
                        </IconButton>
                        <StyledMenu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            >
                            <Typography sx={{ px: 2, py: 1, fontWeight: "bold" }}>
                                Alertas
                            </Typography>
                            <Divider />
                            <Box
                                sx={{
                                    height: "350px",
                                    overflowY: "scroll",
                                }}
                            >
                                <List>
                                {alertas?.slice(0, 10).map((alerta) => (
                                    <ListItem key={alerta.id}>
                                    <ListItemText primary={alerta.mensaje ?? alertas.message} />
                                    </ListItem>
                                ))}
                                </List>
                            </Box>
                        </StyledMenu>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleMenuUsuario}
                            color="inherit"
                        >
                            <FontAwesomeIcon icon={faCircleUser} />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <Box
                sx={{
                    height: "100vh",
                    display: "flex",
                    flexDirection: "column",
                    flexGrow: 1,
                }}
            >
                <DrawerHeader />
                {children}
            </Box>
        
            <Snackbar
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                open={showAlert}
                onClose={() => setShowAlert(false)}
                message={message}
            />
        </Box>
    );
}

export default MenuDock;
