// src/components/Footer.tsx
import React from "react";
import { Box, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{ py: 3, px: 2, mt: "auto", backgroundColor: "#212020" }}
    >
      <Typography variant="body2" color="white" align="center">
        Tech-Hub © {new Date().getFullYear()}
      </Typography>
    </Box>
  );
};

export default Footer;
