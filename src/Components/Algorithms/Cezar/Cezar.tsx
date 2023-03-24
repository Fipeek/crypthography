import React from "react";
import { Box } from "@mui/material";
import Algorithm from "../../GenericAlgorithm/Algorithm";
import { cezarCypher, decryptCezarCypher } from "./utils/utils";

const Cezar: React.FC = () => {
  return (
    <Box>
      <Algorithm onConvert={cezarCypher} keyType="number" name="Cezar" />
      <Algorithm onConvert={decryptCezarCypher} keyType="number" name="Cezar" />
    </Box>
  );
};
export default Cezar;
