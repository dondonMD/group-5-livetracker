import React from "react";
import { Card, Button, Alert } from "react-bootstrap";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import AddLivestockForm from "./AddLivestock";

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
      <Card style={{ width: "14rem", marginLeft: "30px", marginTop: "1rem" }}>
        <Card.Body>
          <h2 className="text-center mb-4">Profile</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          {currentUser && currentUser.email && (
            <div>
              <strong>Email:</strong>
              {currentUser.email}
            </div>
          )}
          <Link to="./update-profile" className="btn btn-primary w-100 mt-3">
            Update Profile
          </Link>
        </Card.Body>
      </Card>
      <div style={{ marginLeft: "3rem", marginRight: "1rem" }}>
        {/* Apply margin to the left side */}
      </div>
      {/* Pass livestockList and setLivestockList as props to AddLivestockForm */}
      <AddLivestockForm onAddLivestock={handleAddLivestock} livestockList={livestockList} setLivestockList={setLivestockList} />
      <div className="d-flex flex-column align-items-center mt-3">
        <Link to="/livestock-list" className="btn btn-primary">
          Livestock List
        </Link>
        <Button
          variant="link"
          onClick={handleLogout}
          style={{ marginTop: "1rem" }}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
