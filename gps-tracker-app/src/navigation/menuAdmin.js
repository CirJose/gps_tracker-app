import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboardList,  faExclamationTriangle, faMap, faFileCircleCheck, faUsers, faBuildingUser, faBuilding, faSatelliteDish, faHistory } from '@fortawesome/free-solid-svg-icons';


function menu() {

    return (
        [
            {
                text: 'Mapa',
                icon: faMap,
                url: '/'
            }, {
                text: 'Rol',
                icon: faFileCircleCheck,
                url: '/rol/list'
            }, {
                text: 'Usuario',
                icon: faUsers,
                url: '/user/list'
            }, {
                text: 'SuperMercado',
                icon: faBuilding,
                url: '/owner/list'
            }, {
                text: 'SuperMercado',
                icon: faBuildingUser,
                url: '/user_owner/list'
            }, {
                text: 'Dispositvo',
                icon: faSatelliteDish,
                url: '/gps/list'
            }, {
                text: 'Asignar Dispositivo',
                icon: faSatelliteDish,
                url: '/device_owner/list'
            }, {
                text: 'Historial de Ubicacion',
                icon: faClipboardList ,
                url: '/gps_track_report/historial'
            }, {
                text: 'Historial de Alertas',
                icon:  faExclamationTriangle,
                url: '/alert/historial'
            }
        ]
    );
}

export default menu;
