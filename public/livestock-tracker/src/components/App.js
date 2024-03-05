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
import LivestockList from "./LivestockList";

function App() {
  const [livestockList, setLivestockList] = useState([]); // State for livestock list

  // Function to delete a livestock
  const deleteLivestock = (id) => {
    setLivestockList((prevLivestockList) =>
      prevLivestockList.filter((livestock) => livestock.id !== id)
    );
  };

  return (
    <Router>
      <AuthProvider>
        <Container
          className="d-flex align-items-start justify-content-start"
          style={{ minHeight: "10vh", padding: "auto" }} // Adjust paddingLeft here
        >
          <div className="w-100" style={{ maxWidth: "400px" }}>
            <Routes>
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Dashboard livestockList={livestockList} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/add-livestock"
                element={<PrivateRoute><AddLivestock setLivestockList={setLivestockList} /></PrivateRoute>}
              />
              <Route
                path="/livestock-list"
                element={
                  <PrivateRoute>
                    <LivestockList
                      livestockList={livestockList}
                      deleteLivestock={deleteLivestock}
                    />
                  </PrivateRoute>
                }
              />
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


