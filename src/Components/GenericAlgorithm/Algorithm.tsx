import { Box } from "@mui/material";
import React, { useState } from "react";
import { KeyTypes } from "../../types/algorithms";
import GenericForm from "../GenericForm/GenericForm";
import { KeyInput } from "../KeyInput/KeyInput";
import { Output } from "../Output/Output";

type props = {
  onConvert: (input: string, key: string) => string;
  keyType: KeyTypes;
  name: string;
};

const Algorithm: React.FC<props> = (props) => {
  const { keyType, onConvert, name } = props;
  const [key, setKey] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.currentTarget.value);
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOutput(onConvert(input, key));
  };
  return (
    <Box>
      <KeyInput onChange={handleKeyChange} name="key" type={keyType} />
      <GenericForm onSubmit={handleSubmit} onSetInput={setInput} name={name} />
      <Output output={output} />
    </Box>
  );
};
export default Algorithm;
