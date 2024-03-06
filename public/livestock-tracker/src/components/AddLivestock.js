// AddLivestock.js
import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import MapComponent from './MapComponent'; // Import the MapComponent
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../Firebase'; // Replace '../path/to/firebaseConfig' with the correct path to your Firebase configuration file
import MyMap from './MyMap';

function AddLivestock({ livestockList, setLivestockList }) {
  const [livestockName, setLivestockName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [livestockLocation, setLivestockLocation] = useState({ latitude: -20.163780, longitude: 28.630130 }); // State for livestock location

  const handleSubmit = async (e) => {
    e.preventDefault(); // this prevents the page from reloading after submitting the data

    try {
      const docRef = await addDoc(collection(db, "livestock"), {
        livestockName: livestockName,
        age: age,
        breed: breed,
        location: livestockLocation,
      });

      setAge('');
      setLivestockName('');
      setBreed('');
      setLivestockLocation({ latitude: 0, longitude: 0 });
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };
  console.log(livestockList)

  return (
    <div>
      <h2>Add Livestock</h2>
      <Row>
        <Col md={6}>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={livestockName}
                onChange={(e) => setLivestockName(e.target.value)}
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
            <Button type='submit' variant="primary">
              Add Livestock
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          {/* Pass livestockList to MapComponent */}
          {/* <MapComponent livestockList={livestockList} /> */}
          <MyMap livestockList={livestockList} />
        </Col>
      </Row>
    </div>
  );
}

export default AddLivestock;




