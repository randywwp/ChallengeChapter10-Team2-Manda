import { useState } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useAuth } from "../context/Auth";



export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    confirmationPassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { register } = useAuth();

  const router = useRouter();

  function handleSetUser(event) {
    const { name, value } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (user.password !== user.confirmationPassword) {
      return setError("Password do not match");
    }

    try {
      setError("");
      setLoading(true);
      await register(user.email, user.password);
      navigate("/");
    } catch {
      if (user.password.valueOf.length < 6) {
        setError("Password must 6 character");
      } else {
        setError("Failed to register!");
      }
    }

    setLoading(false);
  }

  return (
    <>
      <Container className="mt-5">
        <div
          className="row justify-content-center align-items-center"
          style={{ height: 700 }}
        >
          <div className="col-4">
            <Form onSubmit={handleSubmit} className="p-5">
              <div className="text-center pb-3">
                <h3>Register</h3>
              </div>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
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

              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="confirmationPassword"
                  value={user.confirmationPassword}
                  onChange={handleSetUser}
                />
              </Form.Group>
              <div className="text-center pt-2 d-grid">
              </div>
              <div className="text-center pt-2 d-grid">
                <Button variant="primary" type="submit" disabled={loading}>
                  Submit
                </Button>
              </div>
              <div className="text-center pt-3">
                Already have an account?{" "}
                <Link href="/login" className="link">
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
