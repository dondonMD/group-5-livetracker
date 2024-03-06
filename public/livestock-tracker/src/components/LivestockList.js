import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { Toast } from 'react-bootstrap';

function LivestockList({livestockList, setLivestockList,error, showToast,setShowToast, handleDeleteLivestock, deleteLivestock}) {
  



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

