import { Box } from "@mui/material";
import React from "react";
import Algorithm from "../../GenericAlgorithm/Algorithm";
import { vigenerCypher, decryptVigenerCypher } from "./utils/utils";
const Vignere: React.FC = () => {
  return (
    <Box>
      <Algorithm onConvert={vigenerCypher} keyType="text" name="Vignere" />
      <Algorithm
        onConvert={decryptVigenerCypher}
        keyType="text"
        name="Vignere"
      />
    </Box>
  );
};
export default Vignere;
