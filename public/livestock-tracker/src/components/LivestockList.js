import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../Firebase';
import { getDatabase, ref, onValue } from 'firebase/database';
import { Toast } from 'react-bootstrap';

function LivestockList() {
  const [livestockList, setLivestockList] = useState([]);
  const [showToast, setShowToast] = useState(false);
  const [error, setError] = useState(null);
  const [test, setTest] = useState([])

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
  }, []);
  
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
    <div className="container mt-4">
      <h2 className="mb-3">Livestock List</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <p><strong>Total Livestock:</strong> {livestockList.length}</p>
      
      <ul className="list-group">
        {livestockList.length > 0 ? (
          livestockList.map(livestock => (
            <li key={livestock.id} className="list-group-item">
              <p className="mb-1"><strong>Name:</strong> {livestock.name}</p>
              <p className="mb-1"><strong>Age:</strong> {livestock.age}</p>
              <p className="mb-1"><strong>Breed:</strong> {livestock.breed}</p>
              <p className="mb-1"><strong>Latitude:</strong> {livestock.latitude || 'N/A'}</p>
              <p className="mb-1"><strong>Longitude:</strong> {livestock.longitude || 'N/A'}</p>
              <button className="btn btn-danger" onClick={() => handleDeleteLivestock(livestock.id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No livestock data available</p>
        )}
      </ul>
      <Link to="/" className="btn btn-primary mt-3">Back to Dashboard</Link>

      <Toast show={showToast} onClose={() => setShowToast(false)} delay={3000} autohide style={{ position: 'absolute', top: 0, right: 0 }}>
        <Toast.Body>Livestock successfully deleted!</Toast.Body>
      </Toast>
    </div>
  );
}

export default LivestockList;

