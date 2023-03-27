import { Box } from "@mui/material";
import React from "react";
import Algorithm from "../../GenericAlgorithm/Algorithm";
import { shiftMatrixA } from "./utils/utils";

const ShiftMatrixA: React.FC = () =>{
    const handleConvert = (input: string, key: string): string =>
    {
       return shiftMatrixA(input,key,true)
    }
    const handleDecrypt = (input: string, key: string): string =>
    {
       return shiftMatrixA(input,key,false)
    }
    return (
        <Box>
          <Algorithm onConvert={handleConvert} keyType="text" name="ShiftMatrixA" />
          <Algorithm
            onConvert={handleDecrypt}
            keyType="text"
            name="ShiftMatrixA"
          />
        </Box>
      );
};
export default ShiftMatrixA;