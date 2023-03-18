import React, { useState } from "react";
import GenericForm from "../../GenericForm/GenericForm";

const RailFance: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [key, setKey] = useState<number>(0);
  const [output, setOutput] = useState<string>("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(input);
  };
  return (
    <>
      <GenericForm onSetInput={setInput} onSubmit={onSubmit} name="RailFance" />
    </>
  );
};
export default RailFance;
