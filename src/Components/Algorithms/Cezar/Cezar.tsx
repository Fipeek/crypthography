import React from "react";
import { Box } from "@mui/material";
import Algorithm from "../../GenericAlgorithm/Algorithm";
import { cezarCypher, decryptCezarCypher } from "./utils/utils";
import AlgorithmBox from "../../GenericAlgorithm/AlgorithmBox";

const Cezar: React.FC = () => {
  return (
    <AlgorithmBox algorithmName={"Cezar"}>
      <Algorithm onConvert={cezarCypher} keyType="number" name="Cezar" />
      <Algorithm onConvert={decryptCezarCypher} keyType="number" name="Cezar" />
    </AlgorithmBox>
  );
};
export default Cezar;
