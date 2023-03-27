import React from "react";
import AlgorithmBox from "../../GenericAlgorithm/AlgorithmBox";
import Algorithm from "../../GenericAlgorithm/Algorithm";
import { shiftMatrixB, shiftMatrixBDecrypt } from "./utils/utils";
const ShiftMatrixB: React.FC = () => {
  return (
    <AlgorithmBox algorithmName={"Matrix B"}>
      <Algorithm
        onConvert={shiftMatrixB}
        keyType="text"
        name="Shift Matrix B"
      />
      <Algorithm
        onConvert={shiftMatrixBDecrypt}
        keyType="text"
        name="Shift Matrix B"
      />
    </AlgorithmBox>
  );
};
export default ShiftMatrixB;
