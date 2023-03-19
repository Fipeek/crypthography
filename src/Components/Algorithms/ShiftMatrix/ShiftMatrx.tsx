import { Box } from "@mui/system";
import React, { useState } from "react";
import { KEY_DEFAULT_VALUE } from "../../../config/config";
import GenericForm from "../../GenericForm/GenericForm";
import { KeyInput } from "../../KeyInput/KeyInput";
import { Output } from "../../Output/Output";

const RailFance: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [key, setKey] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };
  const handleKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKey(e.currentTarget.value);
  };
  return (
    <Box>
      <KeyInput onChange={handleKeyChange} name="key" />
      <GenericForm
        onSetInput={setInput}
        onSubmit={onSubmit}
        name="Rail Fance"
      />
      <Output output={output} />
    </Box>
  );
};
export default RailFance;
