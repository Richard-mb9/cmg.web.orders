import React, { useState } from 'react';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';

import Menu from '../modules/components/Menu';
import NavBar from '../modules/components/NavBar';

import Product from '../modules/pages/product';
import StoreProducts from '../modules/pages/storeProducts';
import ProductsCategories from '../modules/pages/productsCategories';
import Home from '../modules/pages/home';


export default function DefaultRoutes(){
    const [mobileOpen, setMobileOpen] = useState(false);

    const drawerWidth = 240;
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    return (
        <BrowserRouter>
            <Box sx={{ display: 'flex'}}>
            <CssBaseline />
            <NavBar drawerWidth={drawerWidth} handleDrawerToggle={handleDrawerToggle} />
            <Menu mobileOpen={mobileOpen} handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} />
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` }, overflowX: 'hidden'}}
            >
                <Toolbar />
                <Routes>
                    <Route element={<Home />} path='/'/>
                    <Route element={<Product/>} path='/store/:storeId/product/:productId'/>
                    <Route element={<StoreProducts/>} path='/store/:storeId'/>
                    <Route element={<ProductsCategories/>} path='/store/:storeId/table/:tableName/products-categories'/>
                </Routes>
                
            </Box>
        </Box>
        </BrowserRouter>
    );


    /* return (
        <BrowserRouter>
            <Routes>
                <Route element={<Product/>} path='/store/:storeId/table/:tableName/product/:productId'/>
                <Route element={<StoreProducts/>} path='/store/:storeId/table/:tableName'/>
            </Routes>
        </BrowserRouter>
    ) */
}