import React from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import AddLivestockForm from "./AddLivestock";
import LivestockList from "./LivestockList"; // Import the LivestockList component

function Dashboard() {
  const [error, setError] = React.useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [livestockList, setLivestockList] = React.useState([]);

  async function handleLogout() {
    setError("");

    try {
      await logout();
      navigate("/login");
    } catch {
      setError("Failed to log out");
    }
  }

  const handleAddLivestock = (newLivestock) => {
    setLivestockList([...livestockList, newLivestock]);
  };

  return (
    <div className="d-flex flex-column align-items-start">
      <Card style={{ width: "10rem", height: "11rem",  marginLeft: "1rem", marginTop: "1rem" }}>
        <Card.Body>
          <h6 className="text-center mb-4">Profile</h6>
          {error && <Alert variant="danger">{error}</Alert>}
          {currentUser && currentUser.email && (
            <div>
              <strong>Email:</strong>
              {currentUser.email}
            </div>
          )}
          <Link to="./update-profile" className="btn btn-primary w-6 h-7 mt-0.5">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div style={{ marginLeft: "auto", marginRight: "1rem" }}> {/* Apply margin to the left side */}
        {/* Render the LivestockList component and pass the livestockList state */}
        <LivestockList livestockList={livestockList} />
      </div>
      <AddLivestockForm onAddLivestock={handleAddLivestock} />
      <Button
        variant="link"
        onClick={handleLogout}
        style={{ margin: "auto", marginTop: "1rem" }}
      >
        Log Out
      </Button>
    </div>
  );
}

export default Dashboard;



