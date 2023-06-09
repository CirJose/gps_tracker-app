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

import menuItemList from "./menu";

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

import DeviceOwnerList from "../features/device_owner/list/containers";
import DeviceOwnerDetails from "../features/device_owner/details/containers";


function PrivateNavigation() {

    return (
        <MenuDock menuItemList={menuItemList()}>
            <Routes>
                <Route path='/' element={<Home />}></Route>
                {/* <Route path='/user/list' element={<UsersList />}></Route> */}
                <Route path='/user/details' element={<UsersDetails />}></Route>
                {/* <Route path='/rol/list' element={<RolList />}></Route> */}
                {/* <Route path='/rol/details' element={<RolDetails />}></Route> */}
                {/* <Route path='/owner/list' element={<OwnerList />}></Route> */}
                {/* <Route path='/owner/details' element={<OwnerDetails />}></Route> */}
                {/* <Route path='/gps/list' element={<GpsList />}></Route> */}
                <Route path='/gps/details' element={<GpsDetails />}></Route>
                <Route path='/user_owner/list' element={<UserOwnerList />}></Route>
                {/* <Route path='/user_owner/details' element={<UserOwnerDetails />}></Route> */}

                <Route path='/device_owner/list' element={<DeviceOwnerList />}></Route>
                {/* <Route path='/device_owner/details' element={<DeviceOwnerDetails />}></Route> */}

                <Route path='*' element={<NotFound404 />}></Route>
            </Routes>
        </MenuDock>
    );
}

export default PrivateNavigation;
