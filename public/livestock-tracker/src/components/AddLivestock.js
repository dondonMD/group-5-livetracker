// AddLivestock.js

import { Form, Button, Row, Col } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import MapComponent from './MapComponent'; // Import the MapComponent
import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs } from "firebase/firestore";

function Dashboard({ livestockList }) { // Pass livestockList as a prop
  const [error, setError] = React.useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const handleAddLivestock = async (e) => {
    e.preventDefault();

    try {
      const docRef = await addDoc(collection(db, "todos"), {
        todo: todo,
      });
       setName("");
       setBreed("");
       setAge("");
       setLivestockLocation({ latitude: 0, longitude: 0 });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const fetchPost = async () => {
    await getDocs(collection(db, "todos")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodos(newData);
      console.log(todos, newData);
    });
  };

  useEffect(() => {
    fetchPost();
  }, []);

  return (
    <div>
      <h2>Add Livestock</h2>
      <Row>
        <Col md={6}>
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
            <Button variant="primary">Add Livestock</Button>
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

export default Dashboard;




