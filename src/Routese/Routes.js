import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../componants/Home/Home';
import WorkPage from '../componants/WorkPage/index';
import AboutUs from '../componants/AboutUs/AboutUs';
import HelpLine from '../componants/HelpLine/index';
import Registration from '../componants/Registration/Registration';
import Login from '../componants/Login/Login';
// import Dashboard from '../componants/Dashboard/Pages/DashboardBody/index.js';
import Dashboard from '../componants/Dashboard/Dashboard.js';
import MyBalance from '../componants/Dashboard/Pages/MyBalance/index';
import Generation from '../componants/Dashboard/Pages/Generation/Index';
import Withdraw from '../componants/Dashboard/Pages/Withdraw/Index';
import Tutorial from '../componants/Dashboard/Pages/Tutorial/Index';
import BalanceTransfer from '../componants/Dashboard/Pages/BalanceTransfer/Index.js';
import GenerationHistory from '../componants/Dashboard/Pages/GenerationHistory/Index.js';
import GenerationList from '../componants/Dashboard/Pages/GenerationList/Index.js';
import Salary from '../componants/Dashboard/Pages/Salary/Index.js';
import WIthdrawProve from '../componants/Dashboard/Pages/AddProve/Index';
import Prove from '../componants/Dashboard/Pages/Prove/Index';
import ReferTeamMember from '../componants/Dashboard/Pages/ReferTeamMember/Index';
import Payments from '../componants/Dashboard/Pages/Payments/Index';
import Earnings from '../componants/Dashboard/Pages/Earnings/index.js';
import ChangePassword from '../componants/Dashboard/Pages/ChangePassword/Index';
import UpdateProfile from '../componants/Dashboard/Pages/UpdateProfile/Index';
import RankHistory from '../componants/Dashboard/Pages/RankHistory/index';
import RankLeaders from '../componants/Dashboard/Pages/RankLeaders/index.js';
import AdminPanel from "../componants/AdminDashboard/Admin/index";
import PrivetRoute from './PrivetRoute/PrivetRoute';
import AdminPrivetRoute from './AdminPrivetRoute/AdminPrivetRoute';
// import PerGenarationList from '../componants/Dashboard/Pages/Generation/PerGenarationList/index';
import UserDetails from '../componants/AdminDashboard/Admin/AdminPanelBody/UserDetails/Index';
import EditUserDetails from '../componants/AdminDashboard/Admin/AdminPanelBody/EditUserDetails/EditUserDetails';
import Cart from '../componants/Cart/Cart';
import ProductDetails from '../componants/ProductDetails/ProductDetails';
import Product from '../componants/Dashboard/Pages/Product/index';
import EditProduct from '../componants/Dashboard/Pages/Product/EditProduct/index';
import AdminHelpLine from '../componants/AdminDashboard/AdminHelpLine/index';
import AdminNotification from '../componants/AdminDashboard/AdminNotification/index';
import Notice from '../componants/Dashboard/Pages/Notice/index';
import DailyTask from '../componants/Dashboard/Pages/DailyTask/index';
import AdminDailyTask from '../componants/AdminDashboard/AdminDailyTask/index';
import AdminSlider from '../componants/AdminDashboard/AdminSlider/index';
import AdminCategories from '../componants/AdminDashboard/AdminCategories/index';
import AdminDailyTaskList from '../componants/AdminDashboard/AdminDailyTaskList/index';
import AdminWithdraw from '../componants/AdminDashboard/AdminWithdraw/index';
import AdminDashboard from '../componants/AdminDashboard/AdminDashboard/index.js';
import AdminUser from '../componants/AdminDashboard/AdminUser/index';
import AdminWithdrawConfig from '../componants/AdminDashboard/AdminWithdrawConfig/index';
import AdminBalanceTransferConfig from '../componants/AdminDashboard/AdminBalanceTransferConfig/index.js';
import AminConfig from '../componants/AdminDashboard/AminConfig/index.js';
import AminDashboardConfig from '../componants/AdminDashboard/AminDashboardConfig/index.js';
import AdminProvePost from '../componants/AdminDashboard/AdminProvePost/index';
import AdminProvePostConfig from '../componants/AdminDashboard/AdminProvePostConfig/index';
import AdminPaymentsConfig from '../componants/AdminDashboard/AdminPaymentsConfig/index';
import AdminSalaryConfig from '../componants/AdminDashboard/AdminSalaryConfig/index.js';
import AdminAddDailyTask from '../componants/AdminDashboard/AdminAddDailyTask/index'; 
import AdminAddRanks from '../componants/AdminDashboard/AdminAddRanks/index'; 
import AdminPayments from '../componants/AdminDashboard/AdminPayments/index';
import AdminSalary from '../componants/AdminDashboard/AdminSalary/index.js';
import ProductSearch from '../componants/Search Product/index.js';


const Routess = () => {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/earn-money" element={<WorkPage />}></Route>
                    <Route path="/about_us" element={<AboutUs />}></Route>
                    <Route path="/helpline" element={<HelpLine />}></Route>
                    <Route path="/registration" element={<Registration />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/cart" element={<Cart />}></Route>
                    <Route path="/search/:search" element={<ProductSearch />}></Route>
                    <Route path="/product/:id" element={<ProductDetails />}></Route>
                    <Route path="/dashboard" element={
                        <PrivetRoute>
                            <Dashboard />
                        </PrivetRoute>
                    }></Route>
                    <Route path="/notification" element={
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
                    <Route path="/refer-team-member" element={
                        <PrivetRoute>
                            <ReferTeamMember />
                        </PrivetRoute>
                    }></Route>
                    <Route path="/rank_history" element={
                        <PrivetRoute>
                            <RankHistory />
                        </PrivetRoute>
                    }></Route>
                    <Route path="/rank-leaders" element={
                        <PrivetRoute>
                            <RankLeaders />
                        </PrivetRoute>
                    }></Route>
                    <Route path="/daily-task" element={
                        <PrivetRoute>
                            <DailyTask />
                        </PrivetRoute>
                    }></Route>
                    {/* <Route path="/balance_request" element={
                        <PrivetRoute>
                            <BalanceRequest />
                        </PrivetRoute>
                    }></Route> */}
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
                    <Route path="/tutorial" element={
                        <PrivetRoute>
                            <Tutorial />
                        </PrivetRoute>
                    }></Route>
                    <Route path="/balance-transfer" element={
                        <PrivetRoute>
                            <BalanceTransfer />
                        </PrivetRoute>
                    }></Route>
                    <Route path="/generation-history" element={
                        <PrivetRoute>
                            <GenerationHistory />
                        </PrivetRoute>
                    }></Route>
                    <Route path="/salary" element={
                        <PrivetRoute>
                            <Salary />
                        </PrivetRoute>
                    }></Route>
                     <Route path="/prove" element={
                        <PrivetRoute>
                            <Prove />
                        </PrivetRoute>
                    }></Route>
                     <Route path="/add-prove" element={
                        <PrivetRoute>
                            <WIthdrawProve />
                        </PrivetRoute>
                    }></Route>
                    <Route path="/payments" element={
                        <PrivetRoute>
                            <Payments />
                        </PrivetRoute>
                    }></Route>
                    <Route path="/earnings" element={
                        <PrivetRoute>
                            <Earnings />
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
                    <Route path="/admin/daily-task" element={
                        <AdminPrivetRoute>
                            <AdminDailyTask />
                        </AdminPrivetRoute>
                    }></Route>
                    <Route path="/admin/daily-task-list" element={
                        <AdminPrivetRoute>
                            <AdminDailyTaskList />
                        </AdminPrivetRoute>
                    }></Route>
                    <Route path="/admin/withdraw" element={
                        <AdminPrivetRoute>
                            <AdminWithdraw />
                        </AdminPrivetRoute>
                    }></Route>
                      <Route path="/admin/dashboard" element={
                        <AdminPrivetRoute>
                            <AdminDashboard />
                        </AdminPrivetRoute>
                    }></Route>
                    <Route path="/admin/user" element={
                        <AdminPrivetRoute>
                            <AdminUser />
                        </AdminPrivetRoute>
                    }></Route>
                    <Route path="/admin/withdraw-config" element={
                        <AdminPrivetRoute>
                            <AdminWithdrawConfig />
                        </AdminPrivetRoute>
                    }></Route>
                    <Route path="/admin/balance-transfer-config" element={
                        <AdminPrivetRoute>
                            <AdminBalanceTransferConfig />
                        </AdminPrivetRoute>
                    }></Route>
                     <Route path="/admin/dashboard-config" element={
                        <AdminPrivetRoute>
                            <AminDashboardConfig />
                        </AdminPrivetRoute>
                    }></Route>
                     <Route path="/admin/config" element={
                        <AdminPrivetRoute>
                            <AminConfig />
                        </AdminPrivetRoute>
                    }></Route>
                     <Route path="/admin/prove-post" element={
                        <AdminPrivetRoute>
                            <AdminProvePost />
                        </AdminPrivetRoute>
                    }></Route>
                     <Route path="/admin/prove-post-config" element={
                        <AdminPrivetRoute>
                            <AdminProvePostConfig />
                        </AdminPrivetRoute>
                    }></Route>
                     <Route path="/admin/payments" element={
                        <AdminPrivetRoute>
                            <AdminPayments />
                        </AdminPrivetRoute>
                    }></Route>
                     <Route path="/admin/salary" element={
                        <AdminPrivetRoute>
                            <AdminSalary />
                        </AdminPrivetRoute>
                    }></Route>
                    <Route path="/admin/payments-config" element={
                        <AdminPrivetRoute>
                            <AdminPaymentsConfig />
                        </AdminPrivetRoute>
                    }></Route>
                    <Route path="/admin/salary-config" element={
                        <AdminPrivetRoute>
                            <AdminSalaryConfig />
                        </AdminPrivetRoute>
                    }></Route>
                    <Route path="/admin/add-daily-task" element={
                        <AdminPrivetRoute>
                            <AdminAddDailyTask />
                        </AdminPrivetRoute>
                    }></Route>
                    <Route path="/admin/slider" element={
                        <AdminPrivetRoute>
                            <AdminSlider />
                        </AdminPrivetRoute>
                    }></Route>
                    <Route path="/admin/categories" element={
                        <AdminPrivetRoute>
                            <AdminCategories />
                        </AdminPrivetRoute>
                    }></Route>
                    <Route path="/admin/add-ranks/:userID" element={
                        <AdminPrivetRoute>
                            <AdminAddRanks />
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
                            <GenerationList />
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