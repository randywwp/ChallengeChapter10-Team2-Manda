import { Container } from "react-bootstrap";
import { Nav, Handler } from "./";

export const Rps = () => {
  return (
    <>
      <Container className="mt-5">
        <Nav />

        <div className="text-center pt-5">
          <h5>Game : Rock Paper Scissors</h5>
        </div>

        <Handler />
      </Container>
    </>
  );
};
