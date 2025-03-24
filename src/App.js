// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import React from "react";
// import "./App.css";
// import Home from "../src/View/Home/Index";
// import Login from "./Athentication/Login";
// import MainLayout from "./Layout/MainLayout";
// import Privateroute from "./PrivateRoute/Privateroute";
// import AddSalesPipeline from "./View/Pages/SalesPipeline/AddSalesPipeline.jsx";
// import ManageSalesPipeline from "./View/Pages/SalesPipeline/ManageSalesPipeline.jsx";

// const App = () => {
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route element={<Privateroute />}>
//             <Route element={<MainLayout />}>
//               <Route path="/" element={<Home />} />

//               {/* Lead */}
//               <Route path="/add-sales-pipeline" element={<AddSalesPipeline />} />
//               <Route path="/manage-sales-pipeline" element={<ManageSalesPipeline />} />

//             </Route>
//           </Route>
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// };

// export default App;




// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import React from "react";
// import "./App.css";
// import Home from "../src/View/Home/Index";
// import Login from "./Athentication/Login";
// import MainLayout from "./Layout/MainLayout";
// import Privateroute from "./PrivateRoute/Privateroute";
// import AddSalesPipeline from "./View/Pages/SalesPipeline/AddSalesPipeline.jsx";
// import ManageSalesPipeline from "./View/Pages/SalesPipeline/ManageSalesPipeline.jsx";
// import AddCity from "./View/Pages/Cities/AddCity.jsx"; 
// import ManageCities from "./View/Pages/Cities/ManageCities.jsx";


// const App = () => {
//   return (
//     <>
//       <BrowserRouter>
//         <Routes>
//           <Route element={<Privateroute />}>
//             <Route element={<MainLayout />}>
//               <Route path="/" element={<Home />} />

//               {/* Lead Management */}
//               <Route path="/add-sales-pipeline" element={<AddSalesPipeline />} />
//               <Route path="/manage-sales-pipeline" element={<ManageSalesPipeline />} />

//               {/* Cities Management */}
//               <Route path="/add-city" element={<AddCity />} />  
//               <Route path="/manage-cities" element={<ManageCities />} />
//             </Route>
//           </Route>
//           <Route path="/login" element={<Login />} />
//         </Routes>
//       </BrowserRouter>
//     </>
//   );
// };

// export default App;






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
              
            </Route>
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
