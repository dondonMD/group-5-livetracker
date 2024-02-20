import React, { useState, useRef } from 'react';
import { Card, Form, Button, Alert, Container } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';

export default function ForgotPassword() {
  const emailRef = useRef();
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
  
    try {
      setMessage('');
      setError('');
      setLoading(true);
  
      // Get the auth instance
      const auth = getAuth();
  
      // Call the sendPasswordResetEmail function from the Firebase Auth module
      await sendPasswordResetEmail(auth, emailRef.current.value);
  
      setMessage('Check your inbox for further instructions');
      navigate('/login');
    } catch (err) {
      if (err.code === 'auth/user-not-found') {
        setError('No user found with this email address. Please check and try again.');
      } else {
        setError('Failed to reset password. Please try again later.');
        console.error('Failed to reset password:', err); // Log the full error object
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: '100vh' }}
    >
      <Container className="w-100" style={{ maxWidth: '400px' }}>
        <Card>
          <Card.Body>
            <h2 className="text-center mb-4">Reset Password</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            {message && <Alert variant="success">{message}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Button disabled={loading} className="w-100" type="submit">
                Reset Password
              </Button>
            </Form>
            <div className="w-100 text-center mt-3">
              <Link to="/login">Login</Link>
            </div>
          </Card.Body>
        </Card>
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/signup">Sign Up</Link>
        </div>
      </Container>
    </div>
  );
}
