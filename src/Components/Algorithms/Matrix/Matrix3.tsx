import { Box } from "@mui/material";
import React from "react";
import Algorithm from "../../GenericAlgorithm/Algorithm";
import { decryptMatrix3, matrix3 } from "./utils/utils";
import AlgorithmBox from "../../GenericAlgorithm/AlgorithmBox";

const Matrix3: React.FC = () => {
  return (
    <AlgorithmBox algorithmName={"Matrix C"}>
      <Algorithm onConvert={matrix3} keyType="text" name="Matrix3" />
      <Algorithm onConvert={decryptMatrix3} keyType="text" name="Matrix3" />
    </AlgorithmBox>
  );
};

export default Matrix3;
