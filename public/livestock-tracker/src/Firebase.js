import React, { useState, useEffect } from 'react';
import { Form, Button, Table } from 'react-bootstrap'; // Import Table component from react-bootstrap for displaying livestock data
import { addDoc, collection, getDocs, getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDgABC-3kUS69dT2yFglDk20qnYievsylY",
  authDomain: "live-stock-tracker-ab5a7.firebaseapp.com",
  projectId: "live-stock-tracker-ab5a7",
  storageBucket: "live-stock-tracker-ab5a7.appspot.com",
  messagingSenderId: "1023174066627",
  appId: "1:1023174066627:web:92e213a2160aaf24237d76",
  measurementId: "G-F9YTV1J8B3"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Get the auth instance
const db = getFirestore();

export { app, auth }; // Export 'app' and 'auth'

export function AddLivestock() {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');

   
  const handleAddLivestock = async (e) => {
    e.preventDefault();
   
    try {
        const docRef = await addDoc(collection(db, "livestock_data"), {
          name: name,
          breed: breed,
          age: age
        });
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
}



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

export function YourComponent() {
  const [livestock, setLivestock] = useState([]);

  useEffect(() => {
    const fetchLivestock = async () => {
      try {
        const colRef = collection(db, "livestock"); // Update collection reference to 'livestock_data'
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
  }, []);

  return (
    <div>
      <h2>Livestock Data</h2>
      <Table striped bordered hover> {/* Use Table component to display livestock data */}
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

 // deleting document
/* const deleteAnimalForm = document.querySelector('delete animal')// from html delete form
 deleteAnimalForm.addEventListener('submit', function(event){
  event.preventDefault()
  const docRef = doc(db, 'livestock', deleteAnimalForm.id.value)
  deleteDoc(docRef)
  .then(()=>{
    deleteAnimalForm.requestFullscreen()
  })
 })*/
