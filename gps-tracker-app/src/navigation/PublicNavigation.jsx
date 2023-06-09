// import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useSelector } from 'react-redux';
import { Routes, Route } from "react-router-dom";
import { useState } from 'react';

import Login from "../features/login/containers";
import NotFound404 from '../features/error/containers'; 


function PublicNavigation() {


    return (
        <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='*' element={<NotFound404/>}></Route>
        </Routes>
    );
}

export default PublicNavigation;
