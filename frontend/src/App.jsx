import React from "react";
import Navbar from "./Components/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import About from "./Components/About";
import Events from "./pages/Events";
import Contact from "./pages/Contact";
import AdminLogin from "./pages/AdminLogin";
import "./App.css";
import Footer from "./Components/Footer";
import AdminDashBoard from "./Components/AdminComponents/AdminDashBoard";

import { useLocation } from "react-router-dom";
import AddEvent from "./Components/AdminComponents/AddEvent";
import AdminViewEvents from "./Components/AdminComponents/AdminViewEvents";
import AdminEditEvent from "./Components/AdminComponents/AdminEditEvent";
import EventDetailsPage from "./pages/EventDetailsPage";
import UserRegistrationForm from "./Components/UserRegistrationForm";
import AdminViewRegistration from "./Components/AdminComponents/AdminViewRegistration";
import useAdminAuth from "./store/useAdminAuth";
function App() {
  const location = useLocation();

  const isAdminDashboard = location.pathname.startsWith("/admindashboard");
  const {isAuth}=useAdminAuth()
  return (
    <>
      <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        {!isAuth  && <Navbar />}
        <div className="">
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/events" element={<Events />}>
              {" "}
            </Route>
            <Route path="/events/:id" element={<EventDetailsPage />}></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/admin" element={<AdminLogin />}></Route>
            <Route
              path="/events/register/:id"
              element={<UserRegistrationForm />}
            ></Route>
            <Route path="/admindashboard" element={isAuth? <AdminDashBoard />:<Home/>}>
              <Route path="addevent" element={<AddEvent />}></Route>
              <Route path="manage-events" element={<AdminViewEvents />}></Route>
              <Route path="edit-event/:id" element={<AdminEditEvent />}></Route>
              <Route
                path="view-registrations/:id"
                element={<AdminViewRegistration />}
              ></Route>
            </Route>
          </Routes>
        </div>
        {!isAuth && <Footer />}
      </div>
    </>
  );
}

export default App;
