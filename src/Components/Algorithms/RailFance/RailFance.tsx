import React from "react";
import Algorithm from "../../GenericAlgorithm/Algorithm";
import { Box } from "@mui/system";
import { railFance, decryptRailFance } from "./utils/utils";
import AlgorithmBox from "../../GenericAlgorithm/AlgorithmBox";

const RailFance: React.FC = () => {
  return (
    <AlgorithmBox algorithmName={"Rail fence"}>
      <Algorithm onConvert={railFance} keyType="number" name="RailFance" />
      <Algorithm
        onConvert={decryptRailFance}
        keyType="number"
        name="RailFance"
      />
    </AlgorithmBox>
  );
};
export default RailFance;
