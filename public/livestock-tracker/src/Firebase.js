import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap'; // Import Table component from react-bootstrap for displaying livestock data
import { addDoc, collection, getDocs } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getDatabase, ref, onValue } from 'firebase/database';
import { getAuth } from 'firebase/auth'; // Import getAuth from firebase/auth
// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgABC-3kUS69dT2yFglDk20qnYievsylY",
  authDomain: "live-stock-tracker-ab5a7.firebaseapp.com",
  projectId: "live-stock-tracker-ab5a7",
  storageBucket: "live-stock-tracker-ab5a7.appspot.com",
  messagingSenderId: "1023174066627",
  appId: "1:1023174066627:web:92e213a2160aaf24237d76",
  measurementId: "G-F9YTV1J8B3",
  databaseURL: "https://live-stock-tracker-ab5a7-default-rtdb.asia-southeast1.firebasedatabase.app" // Updated database URL
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const db = getFirestore(app); // Initialize Firestore
const database = getDatabase(app); // Initialize Realtime Database
const auth = getAuth(app);



export function AddLivestock() {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState(' ');

  const handleAddLivestock = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "livestock"), {
        name: name,
        breed: breed,
        age: age
      });
      console.log("Livestock added successfully");
    } catch (error) {
      console.error("Error adding livestock:", error);
    }
  };

  return (
    <div>
      <h2>Add Livestock</h2>
      <Form onSubmit={handleAddLivestock}>
        <Form.Group controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="breed">
          <Form.Label>Breed</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="age">
          <Form.Label>Age</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Livestock
        </Button>
      </Form>
    </div>
  );
}

export function MapComponent() {
  const [livestock, setLivestock] = useState([]);

  useEffect(() => {
    const fetchLivestock = async () => {
      try {
        const colRef = collection(db, "livestock");
        const querySnapshot = await getDocs(colRef);
        const livestockData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setLivestock(livestockData);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchLivestock().catch((error) => {
      console.log(error.message);
    });

    // Listen for changes in the Realtime Database and update livestock coordinates
    const databaseRef = ref(database, 'Coordinates');
    onValue(databaseRef, (snapshot) => {
      const coordinatesData = snapshot.val();
      const updatedLivestockList = livestock.map(livestock => {
        const { id } = livestock;
        if (coordinatesData && coordinatesData[id]) {
          return {
            ...livestock,
            latitude: coordinatesData[id].latitude,
            longitude: coordinatesData[id].longitude
          };
        }
        return livestock;
      });
      setLivestock(updatedLivestockList);
    });

    return () => {
      // Cleanup Realtime Database listener
      onValue(databaseRef);
    };
  }, [livestock]);

  return (
    <div>
      <h2>Livestock Data</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Breed</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {livestock.map((livestockItem) => (
            <tr key={livestockItem.id}>
              <td>{livestockItem.name}</td>
              <td>{livestockItem.breed}</td>
              <td>{livestockItem.age}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}


export { app, db, database, auth }; // Export Firebase instances