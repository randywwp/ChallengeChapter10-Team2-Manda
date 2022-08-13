/* eslint-disable */
import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import bekgron from "../assets/main-bg.jpg"


export const Home = () => {
  return (
<div className="d-flex vh-100" style={{backgroundImage:`url(${bekgron})`,backgroundRepeat:"no-repeat", backgroundSize:"contain", backgroundPosition:"center", backgroundColor:"#61481C"}} >
      <Card
        className= "m-auto align-self-center"
        style={{
          width: "18rem",
          backgroundColor:"#F2DF3A",
          alignItems: "center"
        }}
      >
        <Card.Header style={{ fontSize: "30px" }}>
          <b>Home Page</b>
        </Card.Header>
        <Card.Body>
          <Card.Title tag="h5">Play RPS</Card.Title>
          <Card.Text>Please feel free to</Card.Text>
          <Button variant="warning" >            
          <Link
              to="/login"
              style={{ textDecoration: "none", color: "white" }}>
              Login
            </Link>
          </Button>
          <br />
          <br />
          <p>OR</p>
          <Button variant="warning">
            <Link
              to="/register"
              style={{ textDecoration: "none", color: "white" }}
            >
              Register
            </Link>
          </Button>
        </Card.Body>
      </Card>
      </div>
  );
};
