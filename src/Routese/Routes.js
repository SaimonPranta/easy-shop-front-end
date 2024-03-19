import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../componants/Home/Home';
import AboutUs from '../componants/AboutUs/AboutUs';
import HelpLine from '../componants/HelpLine/index';
import Registration from '../componants/Registration/Registration';
import Login from '../componants/Login/Login';
import Dashboard from '../componants/Dashboard/Dashboard';
import MyBalance from '../componants//Dashboard/Pages/MyBalance/index';
import Generation from '../componants/Dashboard/Pages/Generation/Index';
import BalanceRequest from '../componants/Dashboard/Pages/BalanceRequest/index';
import BalanceTransfer from '../componants/Dashboard/Pages/BalanceTransfer/Index';
import MobileRecharge from '../componants/Dashboard/Pages/MobileRecharge/Index';
import Withdraw from '../componants/Dashboard/Pages/Withdraw/Index';
import ChangePassword from '../componants/Dashboard/Pages/ChangePassword/Index';
import UpdateProfile from '../componants/Dashboard/Pages/UpdateProfile/Index';
import RankHistory from '../componants/Dashboard/Pages/RankHistory/index';
import AdminPanel from "../componants/AdminDashboard/Admin/index";
import PrivetRoute from './PrivetRoute/PrivetRoute';
import AdminPrivetRoute from './AdminPrivetRoute/AdminPrivetRoute';
import PerGenarationList from '../componants/Dashboard/Pages/Generation/PerGenarationList/index';
import UserDetails from '../componants/AdminDashboard/Admin/AdminPanelBody/UserDetails/Index';
import EditUserDetails from '../componants/AdminDashboard/Admin/AdminPanelBody/EditUserDetails/EditUserDetails';
import Cart from '../componants/Cart/Cart';
import ProductDetails from '../componants/ProductDetails/ProductDetails';
import Product from '../componants/Dashboard/Pages/Product/index';
import EditProduct from '../componants/Dashboard/Pages/Product/EditProduct/index'; 
import AdminHelpLine from '../componants/AdminDashboard/AdminHelpLine/index';
import AdminNotification from '../componants/AdminDashboard/AdminNotification/index';
import Notice from '../componants/Dashboard/Pages/Notice/index';


const Routess = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/about_us" element={<AboutUs />}></Route>
                    <Route path="/helpline" element={<HelpLine />}></Route>
                    <Route path="/registration" element={<Registration />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/cart" element={<Cart />}></Route>
                    <Route path="/product/:id" element={<ProductDetails />}></Route>
                    <Route path="/dashboard" element={
                        <PrivetRoute>
                            <Dashboard />
                        </PrivetRoute>
                    }></Route>
                    <Route path="/notice" element={
                        <PrivetRoute>
                            <Notice />
                        </PrivetRoute>
                    }></Route>
                    <Route path="/my-balance" element={
                        <PrivetRoute>
                            <MyBalance />
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
                    {/* <Route path="/balance_transfer" element={
                        <PrivetRoute>
                            <BalanceTransfer />
                        </PrivetRoute>
                    }></Route> */}
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
                    <Route path="/admin/help-line" element={
                        <AdminPrivetRoute>
                            <AdminHelpLine />
                        </AdminPrivetRoute>
                    }></Route>
                    <Route path="/admin/notification" element={
                        <AdminPrivetRoute>
                            <AdminNotification />
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