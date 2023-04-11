import React from "react";
import { Box } from "@mui/material";
import Pseudorandom from "../../Algorithms/Pseudorandom/pseudorandom";
const PS2: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "80%",
        height: "100vh",
        overflow: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Pseudorandom />
    </Box>
  );
};
export default PS2;
