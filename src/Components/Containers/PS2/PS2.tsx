import React from "react";
import { Box } from "@mui/material";
import Pseudorandom from "../../Algorithms/Pseudorandom/pseudorandom";
import { StreamCipher } from "../../Algorithms/StreamCipher/StreamCipher";
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
      <StreamCipher></StreamCipher>
    </Box>
  );
};
export default PS2;
