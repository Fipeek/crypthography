import { Box } from "@mui/material";
import React from "react";
import Algorithm from "../../GenericAlgorithm/Algorithm";
import { vigenerCypher, decryptVigenerCypher } from "./utils/utils";
import AlgorithmBox from "../../GenericAlgorithm/AlgorithmBox";
const Vignere: React.FC = () => {
  return (
    <AlgorithmBox algorithmName={"Vigenere"}>
      <Algorithm onConvert={vigenerCypher} keyType="text" name="Vignere" />
      <Algorithm
        onConvert={decryptVigenerCypher}
        keyType="text"
        name="Vignere"
      />
    </AlgorithmBox>
  );
};
export default Vignere;
