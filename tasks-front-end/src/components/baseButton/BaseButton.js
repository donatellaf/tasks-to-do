import Button from "@mui/material/Button";
import React from "react";

const BaseButton = ({ title, variant, onClick, fullWidth, type }) => {
  return (
    <Button
      fullWidth={fullWidth}
      variant={variant}
      onClick={onClick}
      type={type}
    >
      {title}
    </Button>
  );
};

BaseButton.defaultProps = {
  variant: "contained",
  onClick: () => {},
};

export default BaseButton;
