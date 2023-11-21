import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import AddContact from "./components/addContact";
import EditContact from "./components/editContact";
import Home from "./components/home";
import Navbar from "./components/navbar";
import "./styles.css";

const App = () => {
  return (
    <div>
      <ToastContainer />

      <div className="app-container">
        <Navbar />

        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/add" element={<AddContact />} />
            <Route path="/edit/:id" element={<EditContact />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
