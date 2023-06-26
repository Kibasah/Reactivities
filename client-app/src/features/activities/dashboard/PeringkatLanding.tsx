import React from "react";
import { Button, Container } from "semantic-ui-react";
import { Link } from "react-router-dom";

const LandingPeringkatPage = () => {
  return (
    <Container textAlign="center" style={{ marginTop: "5rem" }}>
      <h1>Welcome to the Landing Page</h1>
      <Button
        as={Link}
        to="/activities"
        size="huge"
        color="blue"
        style={{ marginTop: "2rem" }}
      >
        Go to Activity Dashboard
      </Button>
      <Button
        as={Link}
        to="/login"
        size="huge"
        color="green"
        style={{ marginTop: "1rem" }}
      >
        Login
      </Button>
      <Button
        as={Link}
        to="/signup"
        size="huge"
        color="teal"
        style={{ marginTop: "1rem" }}
      >
        Sign Up
      </Button>
    </Container>
  );
};

export default LandingPeringkatPage;
