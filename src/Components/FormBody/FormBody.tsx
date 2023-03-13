import { FormLabel, Input } from "@mui/material";

type Props = {
  name: string;
  onSetInput: (input: string) => void;
};
const FormBody: React.FC<Props> = (props) => {
  const { name, onSetInput } = props;
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSetInput(e.target.value);
  };
  return (
    <div>
      <FormLabel>{`${name}: `}</FormLabel>
      <Input type="text" onChange={handleChange} />
    </div>
  );
};
export default FormBody;
