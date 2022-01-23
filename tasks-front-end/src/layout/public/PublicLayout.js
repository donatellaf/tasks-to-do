import { Container } from "@mui/material";
import React from "react";

const PublicLayout = ({ children }) => {
  return (
    <Container
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </Container>
  );
};

export default PublicLayout;
