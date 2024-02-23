// AddLivestock.js
import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import MapComponent from './MapComponent'; // Import the MapComponent

function AddLivestock() {
  const { currentUser } = useAuth();
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('');
  const [livestockLocation, setLivestockLocation] = useState({ latitude: -20.163780, longitude: 28.630130}); // State for livestock location

  // Function to handle adding livestock
  const handleAddLivestock = () => {
    // Check if the user is authenticated
    if (!currentUser) {
      // Handle authentication error (e.g., redirect to login page)
      console.log('User not authenticated');
      return;
    }

    // Add your logic to add livestock to the database or perform any other actions
    console.log('Adding livestock:', { name, breed, age, livestockLocation });

    // Reset form fields
    setName('');
    setBreed('');
    setAge('');
    setLivestockLocation({ latitude: 0, longitude: 0 }); // Reset livestock location after adding
  };

  return (
    <div>
      <h2>Add Livestock</h2>
      <Row>
        <Col md={6}>
          <Form>
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
            <Button variant="primary" onClick={handleAddLivestock}>
              Add Livestock
            </Button>
          </Form>
        </Col>
        <Col md={6}>
          {/* Render the MapComponent with livestockLocation */}
          <MapComponent livestockLocation={livestockLocation} />
        </Col>
      </Row>
    </div>
  );
}

export default AddLivestock;
