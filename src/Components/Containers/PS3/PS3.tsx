import React from "react";
import Des from "../../Algorithms/DES/Des";
import { Box } from "@mui/material";

const PS3: React.FC = () => {
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
      <Des />
    </Box>
  );
};
export default PS3;
