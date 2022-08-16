import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import Link from 'next/link'
import { useAuth } from "../context/Auth";

export const ResetPassword = () => {
  const [user, setUser] = useState({
    email: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const { resetPassword } = useAuth();

  function handleSetUser(event) {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(user.email);
      setMessage("Check your email for resetting password");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }

  return (
    <>
      <Container className="border border-dark mt-5">
        <div
          className="row justify-content-center align-items-center"
          style={{ height: 700 }}
        >
          <div className="col-4">
            <Form
              onSubmit={handleSubmit}
              className="border border-dark rounded-3 p-5"
            >
              <div className="text-center pb-4">
                <h3>Reset Password</h3>
              </div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                {error && <Alert variant="danger"> {error} </Alert>}
                {message && <Alert variant="success"> {message} </Alert>}
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={user.email}
                  onChange={handleSetUser}
                />
              </Form.Group>
              <div className="text-center pt-2 d-grid">
                <Button variant="primary" type="submit" disabled={loading}>
                  Submit
                </Button>
              </div>
              <div className="text-center pt-4">
                Need an account?
                <Link to="/register" className="link">
                  Register
                </Link>
              </div>
              <div className="text-center pt-3">
                Already have an account?
                <Link to="/login" className="link">
                  Login
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};
