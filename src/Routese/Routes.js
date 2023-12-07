import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../componants/Home/Home';
import AboutUs from '../componants/AboutUs/AboutUs';
import Registration from '../componants/Registration/Registration';
import Login from '../componants/Login/Login';
import Dashboard from '../componants/Dashboard/Dashboard';
import Generation from '../componants/Dashboard/Pages/Generation/Index';
import BalanceRequest from '../componants/Dashboard/Pages/BalanceRequest/index';
import BalanceTransfer from '../componants/Dashboard/Pages/BalanceTransfer/Index';
import MobileRecharge from '../componants/Dashboard/Pages/MobileRecharge/Index';
import Withdraw from '../componants/Dashboard/Pages/Withdraw/Index';
import ChangePassword from '../componants/Dashboard/Pages/ChangePassword/Index';
import UpdateProfile from '../componants/Dashboard/Pages/UpdateProfile/Index';
import RankHistory from '../componants/Dashboard/Pages/RankHistory/index';
import AdminPanel from "../componants/Dashboard/Admin/index";
import PrivetRoute from './PrivetRoute/PrivetRoute';
import AdminPrivetRoute from './AdminPrivetRoute/AdminPrivetRoute';
import PerGenarationList from '../componants/Dashboard/Pages/Generation/PerGenarationList/index';
import UserDetails from '../componants/Dashboard/Admin/AdminPanelBody/UserDetails/Index';
import EditUserDetails from '../componants/Dashboard/Admin/AdminPanelBody/EditUserDetails/EditUserDetails';
import Cart from '../componants/Cart/Cart';
import ProductDetails from '../componants/ProductDetails/ProductDetails';
import Product from '../componants/Dashboard/Pages/Product/index';
import EditProduct from '../componants/Dashboard/Pages/Product/EditProduct/index';

const Routess = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/about_us" element={<AboutUs />}></Route>
                    <Route path="/registration" element={<Registration />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/cart" element={<Cart />}></Route>
                    <Route path="/product/:id" element={<ProductDetails />}></Route>
                    <Route path="/dashboard" element={
                        <PrivetRoute>
                            <Dashboard />
                        </PrivetRoute>
                    }></Route>
                    <Route path="/generation" element={
                        <PrivetRoute>
                            <Generation />
                        </PrivetRoute>
                    }></Route>
                    <Route path="/rank_history" element={
                        <PrivetRoute>
                            <RankHistory />
                        </PrivetRoute>
                    }></Route>
                    <Route path="/balance_request" element={
                        <PrivetRoute>
                            <BalanceRequest />
                        </PrivetRoute>
                    }></Route>
                    <Route path="/balance_transfer" element={
                        <PrivetRoute>
                            <BalanceTransfer />
                        </PrivetRoute>
                    }></Route>
                    {/* <Route path="/mobile_recharge" element={
                        <PrivetRoute>
                            <MobileRecharge />
                        </PrivetRoute>
                    }></Route> */}
                    <Route path="/withdraw" element={
                        <PrivetRoute>
                            <Withdraw />
                        </PrivetRoute>
                    }></Route>
                    <Route path="/porfile/change_password" element={
                        <PrivetRoute>
                            <ChangePassword />
                        </PrivetRoute>
                    }></Route>
                    <Route path="/porfile/update_profile" element={
                        <PrivetRoute>
                            <UpdateProfile />
                        </PrivetRoute>
                    }></Route>
                    <Route path="/admin_panel" element={
                        <AdminPrivetRoute>
                            <AdminPanel />
                        </AdminPrivetRoute>
                    }></Route>
                    <Route path="/product" element={
                        <AdminPrivetRoute>
                            <Product />
                        </AdminPrivetRoute>
                    }></Route>
                    <Route path="/product/edit_product/:id" element={
                        <AdminPrivetRoute>
                            <EditProduct />
                        </AdminPrivetRoute>
                    }></Route>
                    <Route path="/generation/:generation" element={
                        <PrivetRoute>
                            <PerGenarationList />
                        </PrivetRoute>
                    }></Route>
                    <Route path="/user/:id" element={
                        <PrivetRoute>
                            <UserDetails />
                        </PrivetRoute>
                    }></Route>
                    <Route path="/edit_user/:id" element={
                        <PrivetRoute>
                            <EditUserDetails />
                        </PrivetRoute>
                    }></Route>
                    <Route path="/*" element={<Home />}></Route>
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default Routess;