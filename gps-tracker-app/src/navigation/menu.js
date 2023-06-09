import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faFileCircleCheck, faUsers, faBuildingUser, faBuilding, faSatelliteDish } from '@fortawesome/free-solid-svg-icons';


function menu() {

    return (
        [
            {
                text: 'Mapa',
                icon: faMap,
                url: '/'
            }, {
                text: 'Usuarios Asignados al SuperMercado',
                icon: faBuildingUser,
                url: '/user_owner/list'
            }, {
                text: 'Dispositivo Asignados a SuperMercado',
                icon: faSatelliteDish,
                url: '/device_owner/list'
            }
        ]
    );
}

export default menu;
