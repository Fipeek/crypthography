import React from "react";
import Cezar from "../../Algorithms/Cezar/Cezar";
import RailFance from "../../Algorithms/RailFance/RailFance";
import ShiftMatrixA from "../../Algorithms/ShiftMatrixA/ShiftMatrixA";
import Vignere from "../../Algorithms/Vigenere/Vigenere";
import Matrix3 from "../../Algorithms/Matrix/Matrix3";
import { Box } from "@mui/material";
const PS1: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "80%",
        height: "100vh",
        overflow: "scroll",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Cezar />
      <RailFance />
      <Vignere />

      <ShiftMatrixA/>
    </>

      <Matrix3 />
    </Box>

  );
};
export default PS1;
