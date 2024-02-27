import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
const LandingPage = () => {
  const navigate = useNavigate();

 

  const handleBook = () => {
setTimeout(() =>    navigate("/search"),0)
  
};

  return (
    <Container fluid className="landing">
      <Row className="features1">
        <Col className="">
          <h1 className="t5 t0 t5render">WELCOME TO SKYWAYS</h1>
          <p className="t2">Discover your next adventure</p>
        </Col>
      </Row>
      <Link onClick={handleBook} className=" btn t3">
        Book Flight
      </Link>

      <Row className="features ">
        <Col className="icon col1">
          <i className="bx bxs-plane bx-lg"></i>
          <h3>Wide Destinations</h3>
          <hr className="hline" />
          <p>Explore flights to various destinations around the world.</p>
        </Col>
        <Col className="icon col2">
          <i className="bx bx-calendar bx-lg"></i>
          <h3>Flexible Booking</h3>
          <hr className="hline" />

          <p>Book your flights with flexible date options.</p>
        </Col>
        <Col className="icon col3">
          <i className="bx bx-user bx-lg"></i>
          <h3>Group Booking</h3>
          <hr className="hline" />

          <p>Plan your trip with friends and family with ease.</p>
        </Col>
        <h4 className="t6 mt-3 mx-2">Dream-Discover-Book Your Flight Today</h4>
      </Row>
    </Container>
  );
};

export default LandingPage;
