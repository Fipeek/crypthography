import React, { useEffect, useState } from "react";
import { Box, Button, FormLabel, Input, Typography } from "@mui/material";
import AlgorithmBox from "../../GenericAlgorithm/AlgorithmBox";
import { lfsr } from "../Pseudorandom/methods";
import { Output } from "../../Output/Output";

export const StreamCipher: React.FC = () => {
  const [input, setInput] = useState("");
  const [inputLength, setInputLength] = useState(0);
  const [key, setKey] = useState("");
  const [polynomial, setPolynomial] = useState("10011");
  const generator = lfsr(parseInt(polynomial, 2));
  const [output, setOutput] = useState("");
  const [decryptedOutput, setDecryptedOutput] = useState("");
  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;

    const reader = new FileReader();
    if (file) {
      reader.onload = (e) => {
        const text = e.target?.result;
        if (file.type === "application/json") {
          const json = JSON.parse(text as string);
          setInput(json.input);
          setInputLength(json.input.length);
        } else {
          setInput(text as string);
          setInputLength(text?.toString().length as number);
        }
      };
      reader.readAsText(file);
    }
  };

  const handleSubmit = () => {
    const binaryInput = input
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"));

    const binaryKey = key
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"));

    const output = binaryInput
      .map((char, i) => {
        const xor = (parseInt(char, 2) ^ parseInt(binaryKey[i], 2))
          .toString(2)
          .padStart(8, "0");
        return xor;
      })
      .join(" ");

    setOutput(output);
  };
  const handleKeyChange = () => {
    let randomKey = "";
    for (let i = 0; i < inputLength; i++) {
      randomKey += generator.next().value;
    }

    setKey(randomKey);
  };
  const handleDecrypt = () => {
    const binaryKey = key
      .split("")
      .map((char) => char.charCodeAt(0).toString(2).padStart(8, "0"));
    const decryptedText = output
      .split(" ")
      .map((char, i) => {
        const xor = (parseInt(char, 2) ^ parseInt(binaryKey[i], 2))
          .toString(2)
          .padStart(8, "0");
        // convert to ascii from binary and then to string
        return String.fromCharCode(parseInt(xor, 2));
      })
      .join("");
    setDecryptedOutput(decryptedText);
  };

  return (
    <Box
      sx={{
        width: "40%",
        height: "40vh",
        backgroundColor: "rgba(255,255,255,0.5)",
        borderRadius: "1rem",
        boxShadow: "0 0 10px 0 rgba(0,0,0,0.2)",
        margin: "1rem",
        padding: "1rem",
      }}
    >
      <Typography fontWeight="bold" textAlign="center" variant="h5">
        Stream Cipher
      </Typography>
      <div style={{ width: "100%", margin: "2rem 0px" }}>
        <FormLabel
          sx={{
            marginLeft: "1rem",
          }}
        >
          Input:{" "}
        </FormLabel>
        <Input
          sx={{
            width: "60%",
          }}
          defaultValue={10011}
          inputMode="numeric"
          inputProps={{ pattern: "[0-9]*" }}
          onChange={(evt) => setPolynomial(evt.target.value)}
        />
      </div>
      <label>
        <input
          style={{
            width: "300px",

            marginLeft: "1rem",
          }}
          type="file"
          onChange={handleFile}
        />
      </label>
      <div>
        <Output output={output} />
        <Output output={decryptedOutput} />
      </div>
      <div style={{ marginLeft: "0.5rem" }}>
        <Button onClick={handleSubmit} disabled={!key || !polynomial}>
          submit
        </Button>

        <Button onClick={handleKeyChange}>Change Key</Button>
        <Button
          onClick={handleDecrypt}
          disabled={!key || !output || !polynomial}
        >
          Decrypt
        </Button>
      </div>
    </Box>
  );
};
