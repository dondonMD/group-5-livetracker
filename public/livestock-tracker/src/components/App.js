import React from "react";
import Signup from "./SignUp";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from "./Dashboard";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword"; 
import PrivateRoute from "./PrivateRoute";
import AddLivestock from "./AddLivestock";
import UpdateProfile from "./UpdateProfile";


function App() {
  return (
    <Router>
      <AuthProvider>
        <Container
          className="d-flex align-items-start justify-content-start"
          style={{ minHeight: "100vh", paddingLeft: "50px" }} // Adjust paddingLeft here
        >
          <div className="w-100" style={{ maxWidth:'400px' }}>
            <Routes>
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/add-livestock" element={<PrivateRoute><AddLivestock/></PrivateRoute>} />
              <Route path="/update-profile" element={<PrivateRoute><UpdateProfile /></PrivateRoute>} />
              <Route path="/signup" element={<Signup />} /> 
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
            </Routes>
          </div>
        </Container>
      </AuthProvider>
    </Router>
  );
}

export default App;

