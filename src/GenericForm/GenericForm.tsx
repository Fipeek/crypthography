import React from "react";
import FormBody from "../Components/FormBody/FormBody";

type Props = {
  onSubmit: (e: React.FormEvent) => void;
  name: string;
  onSetInput: (input: string) => void;
};

export const GenericForm: React.FC<Props> = (props) => {
  const { onSubmit, name, onSetInput } = props;

  return (
    <form onSubmit={onSubmit}>
      <FormBody onSetInput={onSetInput} name={name} />
      <button type="submit">Submit</button>
    </form>
  );
};
export default GenericForm;
