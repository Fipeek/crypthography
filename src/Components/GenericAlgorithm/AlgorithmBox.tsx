import { Box, Typography } from "@mui/material";
import React from "react";

type props = {
  children: React.ReactNode;
  algorithmName: string;
};

const AlgorithmBox: React.FC<props> = ({ children, algorithmName }) => {
  return (
    <Box
      sx={{
        width: "95%",
        height: "45vh",
        backgroundColor: "rgba(255,255,255,0.5)",
        display: "flex",
        flexDirection: "column",
        alignItems: "space-around",
        borderRadius: "1rem",
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
        margin: "1rem",
      }}
    >
      <Typography fontWeight="bold" textAlign="center" variant="h5">
        {algorithmName}
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AlgorithmBox;
