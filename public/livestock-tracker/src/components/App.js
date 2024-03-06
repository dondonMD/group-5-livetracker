import React, { useState, useEffect } from "react";
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
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Link } from "react-router-dom";

import { Toast } from 'react-bootstrap';


function App() {
  const [livestockList, setLivestockList] = useState([]); // State for livestock list
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState(null);
  const [test, setTest] = useState([])
  // Function to delete a livestock
  const deleteLivestock = (id) => {
    setLivestockList((prevLivestockList) =>
      prevLivestockList.filter((livestock) => livestock.id !== id)
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch livestock data
        const livestockCollectionRef = collection(db, 'livestock');
        const livestockSnapshot = await getDocs(livestockCollectionRef);
        const fetchedLivestockList = livestockSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        // Fetch coordinates data
        const database = getDatabase();
        const coordinatesRef = ref(database, 'Coordinates');
        onValue(coordinatesRef, (snapshot) => {
          const coordinatesData = snapshot.val();
           console.log(coordinatesData)
           console.log(fetchedLivestockList)
          if (coordinatesData) {
            const updatedLivestockList = fetchedLivestockList.map((livestock) => {
              const livestockCoordinates = coordinatesData[livestock.id];
              // console.log(coordinatesData.latitude)
              return {
                ...livestock,
                latitude: coordinatesData?.Latitude || livestock.latitude,
                longitude: coordinatesData?.Longitude || livestock.longitude,
              };
            });
            setLivestockList(updatedLivestockList);
          }
        });

      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again later.");
        // Don't update livestockList with potentially incomplete data in case of error
      }
    };

    fetchData();
  }, [livestockList]);
  
  // ... rest of the component code
  

  const handleDeleteLivestock = async (livestockId) => {
    try {
      await deleteDoc(doc(db, 'livestock', livestockId));
      setLivestockList(prevList => prevList.filter(item => item.id !== livestockId));
      setShowToast(true);
    } catch (error) {
      console.error("Error deleting livestock:", error);
      setError("Error deleting livestock. Please try again later.");
    }
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
                    <Dashboard livestockList={livestockList} setLivestockList={setLivestockList} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/add-livestock"
                element={<PrivateRoute><AddLivestock livestockList={livestockList} setLivestockList={setLivestockList} /></PrivateRoute>}
              />
              <Route
                path="/livestock-list"
                element={
                  <PrivateRoute>
                    <LivestockList
                      livestockList={livestockList}
                      setLivestockList={setLivestockList}
                      deleteLivestock={deleteLivestock}
                      handleDeleteLivestock={handleDeleteLivestock}
                      error={error}
                      showToast={showToast}
                      setShowToast={setShowToast}
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


