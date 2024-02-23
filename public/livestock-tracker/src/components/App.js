import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { AuthProvider } from "../context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Login from "./Login";
import ForgotPassword from "./ForgotPassword";
import PrivateRoute from "./PrivateRoute";
import Signup from "./SignUp";
import AddLivestock from "./AddLivestock";
import UpdateProfile from "./UpdateProfile";
import LivestockList from "./LivestockList"; // Import the LivestockList component

function App() {
  // State for livestock list
  const [livestockList] = useState([]);

  return (
    <Router>
      <AuthProvider>
        <Container
          className="d-flex align-items-start justify-content-start"
          style={{ minHeight: "10vh", padding: "auto" }} // Adjust paddingLeft here
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Routes>
              <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/add-livestock" element={<PrivateRoute><AddLivestock  /></PrivateRoute>} /> {/* Pass setLivestockList to AddLivestock */}
              <Route path="/livestock-list" element={<PrivateRoute><LivestockList livestockList={livestockList} /></PrivateRoute>} />
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


