import { Box, Button, Input, Typography } from "@mui/material";
import React, { useState } from "react";
import { lfsr } from "./methods";

const Pseudorandom: React.FC = () => {
  const [polynomial, setPolynomial] = React.useState("10011");
  const [result, setResult] = React.useState("");
  const intervalRef = React.useRef<any>(null);
  const [isRunning, setIsRunning] = useState(false);

  const generator = lfsr(parseInt(polynomial, 2));

  const onStart = () => {
    setIsRunning(true);
    let res = "";
    intervalRef.current = setInterval(() => {
      res += generator.next().value;
      setResult(res);
    }, 35);
  };

  const onStop = () => {
    setIsRunning(false);
    clearInterval(intervalRef.current);
  };

  return (
    <Box
      sx={{
        pt: 4,
        width: "30%",
        wordBreak: "break-all",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
        }}
      >
        <Button disabled={isRunning} onClick={onStart}>
          start
        </Button>
        <Button disabled={!isRunning} onClick={onStop}>
          stop
        </Button>
      </Box>
      <Typography pt={1}>Polyminal:</Typography>
      <Input
        defaultValue={10011}
        inputMode="numeric"
        inputProps={{ pattern: "[0-9]*" }}
        onChange={(evt) => setPolynomial(evt.target.value)}
      />
      <Typography pt={3}>Result:</Typography>
      <Typography pt={1}>{result}</Typography>
    </Box>
  );
};

export default Pseudorandom;
