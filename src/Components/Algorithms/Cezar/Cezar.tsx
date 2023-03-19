import React, { useState } from "react";
import GenericForm from "../../GenericForm/GenericForm";
import { KeyInput } from "../../KeyInput/KeyInput";
import { Output } from "../../Output/Output";
import { cezarCypher } from "./utils/utils";
import { KEY_DEFAULT_VALUE } from "../../../config/config";
import { Box } from "@mui/material";
const Cezar: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [key, setKey] = useState<number>(0);
  const [output, setOutput] = useState<string>("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOutput(cezarCypher(input, key));
  };
  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(+e.currentTarget.value);
  };
  return (
    <Box>
      <KeyInput
        defaultValue={KEY_DEFAULT_VALUE}
        onChange={handleKeyChange}
        name="key"
        type="number"
      />
      <GenericForm onSetInput={setInput} onSubmit={handleSubmit} name="Cezar" />
      <Output output={output} />
    </Box>
  );
};
export default Cezar;
