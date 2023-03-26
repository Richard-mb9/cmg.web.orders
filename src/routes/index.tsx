import React from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Product from '../modules/pages/product';
import StoreProducts from '../modules/pages/storeProducts';


export default function DefaultRoutes(){
    /* const createPrivateElement = (element: JSX.Element)=>{
        if(!!localStorage.getItem('accessToken')){
            return element
        }
        else return <Navigate  to={"/login"}/>
    } */

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Product/>} path='/store/:storeId/table/:tableName/product/:productId'/>
                <Route element={<StoreProducts/>} path='/store/:storeId/table/:tableName'/>
                {/* <Route element={<PageRegister/>} path='/register'/> */}
                {/* <Route element={<PageLogin/>} path='/login' /> */}
            </Routes>
        </BrowserRouter>
    )
}