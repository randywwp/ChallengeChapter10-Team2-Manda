import { Container } from "react-bootstrap";
import Link from 'next/link'
import { useAuth } from "../context/Auth";

export const Nav = () => {
  const { logout } = useAuth();

  return (
    <>
      <Container className="">
        <div className="row">
          <div className="col-11 pt-2">
            <Link to="/" className="link">
              <h5 style={{ color: "black" }}>DASHBOARD</h5>
            </Link>
          </div>
          <div className="col pt-1">
            <Link
              href="/login"
              onClick={logout}
              className="btn btn-primary btn-sm"
            >
              Logout
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
};
