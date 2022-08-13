import { useState } from "react";
import { Form, Button, Container, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth";
import { signInWithGoogle } from '../services/firebase'

export const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const navigate = useNavigate();

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
      setError("");
      setLoading(true);
      await login(user.email, user.password);
      navigate("/");
    } catch {
      setError("Failed to login or wrong password");
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
              <div className="text-center pb-3">
                <h3>Login</h3>
              </div>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                {error && <Alert variant="danger"> {error} </Alert>}
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={user.email}
                  onChange={handleSetUser}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={user.password}
                  onChange={handleSetUser}
                />
            </Form.Group>
            <Form.Group>
             <div className="text-center pt-2 d-grid">
              <Button onClick={signInWithGoogle} variant="secondary">
                Sign In With Google
              </Button>
              </div>
            </Form.Group>
              <div className="text-center pt-2 d-grid">
                <Button variant="primary" type="submit" disabled={loading}>
                  Submit
                </Button>
              </div>
              <div className="text-center pt-3">
                <Link to="/reset-password" className="link">
                  Forgot Password?
                </Link>
              </div>
              <div className="text-center pt-3">
                Need an account?{" "}
                <Link to="/register" className="link">
                  Register
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </Container>
    </>
  );
};
