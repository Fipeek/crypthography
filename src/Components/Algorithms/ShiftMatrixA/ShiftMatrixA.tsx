import React from "react";
import Algorithm from "../../GenericAlgorithm/Algorithm";
import AlgorithmBox from "../../GenericAlgorithm/AlgorithmBox";
import { shiftMatrixA } from "./utils/utils";

const ShiftMatrixA: React.FC = () => {
  const handleConvert = (input: string, key: string): string => {
    return shiftMatrixA(input, key, true);
  };
  const handleDecrypt = (input: string, key: string): string => {
    return shiftMatrixA(input, key, false);
  };
  return (
    <AlgorithmBox algorithmName={"Matrix A"}>
      <Algorithm onConvert={handleConvert} keyType="text" name="ShiftMatrixA" />
      <Algorithm onConvert={handleDecrypt} keyType="text" name="ShiftMatrixA" />
    </AlgorithmBox>
  );
};
export default ShiftMatrixA;
