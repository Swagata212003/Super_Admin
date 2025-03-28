

import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import "./App.css";
import Home from "../src/View/Home/Index";
import Login from "./Athentication/Login";
import MainLayout from "./Layout/MainLayout";
import Privateroute from "./PrivateRoute/Privateroute";
import AddSalesPipeline from "./View/Pages/SalesPipeline/AddSalesPipeline.jsx";
import ManageSalesPipeline from "./View/Pages/SalesPipeline/ManageSalesPipeline.jsx";
import AddCity from "./View/Pages/Cities/AddCity.jsx"; 
import ManageLocality from "./View/Pages/Locality/ManageLocality.jsx";
import ManageBanner from "./View/Pages/Banner/ManageBanner.jsx";


const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Privateroute />}>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Home />} />

              {/* Lead Management */}
              <Route path="/add-sales-pipeline" element={<AddSalesPipeline />} />
              <Route path="/manage-sales-pipeline" element={<ManageSalesPipeline />} />

              {/* Cities Management */}
              <Route path="/add-city" element={<AddCity />} />  
              
              {/*Locality Management */}
              <Route path="/manage-locality" element={<ManageLocality />} />


              {/*Banner Management */}
             
              <Route path="/manage-banner" element={<ManageBanner />} />
              
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
