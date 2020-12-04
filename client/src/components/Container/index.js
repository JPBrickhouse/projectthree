import React from "react";
import Container from "@material-ui/core/Container";

function Container({ children }) {
  return (
    <Container maxWidth="md">
      <div
        style={{ height: 300, clear: "both", paddingTop: 120, textAlign: "center" }}
        className="jumbotron"
      >
        {children}
      </div>
    </Container>

  );
}

export default Container;
