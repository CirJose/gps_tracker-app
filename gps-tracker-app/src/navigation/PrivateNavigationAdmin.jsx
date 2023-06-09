// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCircleUser, faUser, faFolder, faCartShopping, faWrench, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

import Home from "../features/home/containers";
import MenuDock from "../features/menu_dock/containers";
import NotFound404 from '../features/error/containers';

import menuItemList from "./menuAdmin";

import UsersList from "../features/users/list/containers";
import UsersDetails from "../features/users/details/containers";
import RolList from "../features/rol/list/containers";
import RolDetails from "../features/rol/details/containers";
import OwnerList from "../features/owner/list/containers";
import OwnerDetails from "../features/owner/details/containers";
import GpsList from "../features/gps/list/containers";
import GpsDetails from "../features/gps/details/containers";
import UserOwnerList from "../features/user_owner/list/containers";
import UserOwnerDetails from "../features/user_owner/details/containers";
import HistorialGPS from "../features/history_track/containers";
import DeviceOwnerList from "../features/device_owner/list/containers";
import DeviceOwnerDetails from "../features/device_owner/details/containers";
import AlertHistory from "../features/alert/containers";



function PrivateNavigation() {

    return (
        <MenuDock menuItemList={menuItemList()}>
            <Routes>
                <Route path='/' element={<Home isAdmin={true} />}></Route>
                <Route path='/user/list' element={<UsersList isAdmin={true} />}></Route>
                <Route path='/user/details' element={<UsersDetails isAdmin={true} />}></Route>
                <Route path='/rol/list' element={<RolList isAdmin={true} />}></Route>
                <Route path='/rol/details' element={<RolDetails isAdmin={true} />}></Route>
                <Route path='/owner/list' element={<OwnerList isAdmin={true} />}></Route>
                <Route path='/owner/details' element={<OwnerDetails isAdmin={true} />}></Route>
                <Route path='/gps/list' element={<GpsList isAdmin={true} />}></Route>
                <Route path='/gps/details' element={<GpsDetails isAdmin={true} />}></Route>
                <Route path='/user_owner/list' element={<UserOwnerList isAdmin={true} />}></Route>
                <Route path='/user_owner/details' element={<UserOwnerDetails isAdmin={true} />}></Route>
                <Route path='/gps_track_report/historial' element={<HistorialGPS isAdmin={true} />}></Route>
                <Route path='/alert/historial' element={<AlertHistory isAdmin={true} />} />

                <Route path='/alert/fuga' element={<AlertHistory isAdmin={true} />} />
                <Route path='/alert/agrupacion' element={<AlertHistory isAdmin={true} />} />




                <Route path='/device_owner/list' element={<DeviceOwnerList isAdmin={true} />}></Route>
                <Route path='/device_owner/details' element={<DeviceOwnerDetails isAdmin={true} />}></Route>

                <Route path='*' element={<NotFound404 />}></Route>
            </Routes>
        </MenuDock>
    );
}

export default PrivateNavigation;
