import React from "react";
import Algorithm from "../../GenericAlgorithm/Algorithm";
import { Box } from "@mui/system";
import { railFance, decryptRailFance } from "./utils/utils";

const RailFance: React.FC = () => {
  return (
    <Box>
      <Algorithm onConvert={railFance} keyType="number" name="RailFance" />
      <Algorithm
        onConvert={decryptRailFance}
        keyType="number"
        name="RailFance"
      />
    </Box>
  );
};
export default RailFance;
