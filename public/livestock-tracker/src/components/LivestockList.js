import React from "react";
import { Link } from "react-router-dom";

function LivestockList({ livestockList }) {
  return (
    <div>
      <h2>Livestock List</h2>
      <ul>
        {livestockList.map((livestock, index) => (
          <li key={index}>
            <p>Name: {livestock.name}</p>
            <p>Age: {livestock.age}</p>
            <p>Breed: {livestock.breed}</p>
          </li>
        ))}
      </ul>
      <Link to="/" className="btn btn-primary">
        Back to Dashboard
      </Link>
    </div>
  );
}

export default LivestockList;
