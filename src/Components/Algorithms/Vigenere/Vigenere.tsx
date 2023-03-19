import { Box } from "@mui/material";
import React, { useState } from "react";
import { KEY_DEFAULT_VALUE } from "../../../config/config";
import GenericForm from "../../GenericForm/GenericForm";
import { KeyInput } from "../../KeyInput/KeyInput";
import { Output } from "../../Output/Output";
import { vigenerCypher } from "./utils/utilts";
const Vignere: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [key, setKey] = useState<string>("");

  const [output, setOutput] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOutput(vigenerCypher(input, key));
  };
  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.currentTarget.value);
  };
  return (
    <Box>
      <KeyInput onChange={handleKeyChange} name="key" />
      <GenericForm
        onSetInput={setInput}
        onSubmit={handleSubmit}
        name="Vigenere"
      />
      <Output output={output} />
    </Box>
  );
};
export default Vignere;
