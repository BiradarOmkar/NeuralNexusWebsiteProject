import React from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Events from "./Components/Events";
import Contact from "./Components/Contact";
import AdminLogin from "./Components/AdminLogin";
import "./App.css";
import Footer from "./Components/Footer";
import AdminDashBoard from "./Components/AdminComponents/AdminDashBoard";

import { useLocation } from "react-router-dom";
import AddEvent from "./Components/AdminComponents/AddEvent";
import AdminViewEvents from "./Components/AdminComponents/AdminViewEvents";
function App() {

  const location =useLocation();

  const isAdminDashboard=location.pathname.startsWith("/admindashboard");
  return (
    <>
      <div>
        {!isAdminDashboard &&<Navbar />}
        <div className="">
          <Routes>
            <Route path="/home" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/events" element={<Events/>}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/admin" element={<AdminLogin/>}></Route>
            <Route path="/admindashboard" element={<AdminDashBoard/>}>
               <Route path="addevent" element={<AddEvent/>}></Route>
               <Route path="manage-events" element={<AdminViewEvents/>}></Route>
            </Route>
          </Routes>
        </div>
        {!isAdminDashboard &&<Footer/>}
      </div>
    </>
  );
}

export default App;
