import { Button, FormControl } from "@mui/material";
import React from "react";
import { AlogirthmNames } from "../../config/config";
import FormBody from "../FormBody/FormBody";

type Props = {
  onSubmit: (e: React.FormEvent) => void;
  name: AlogirthmNames;
  onSetInput: (input: string) => void;
};

export const GenericForm: React.FC<Props> = (props) => {
  const { onSubmit, name, onSetInput } = props;

  return (
    <FormControl>
      <form onSubmit={onSubmit}>
        <FormBody onSetInput={onSetInput} name={name} />
        <Button type="submit">submit</Button>
      </form>
    </FormControl>
  );
};
export default GenericForm;
