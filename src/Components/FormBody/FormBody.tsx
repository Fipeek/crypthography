import { Box, FormLabel, Input } from "@mui/material";

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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FormLabel>Message</FormLabel>
      <Input
        sx={{
          backgroundColor: "rgba(255,255,255,0.2)",
          width: "300px", //stala szerokosc pola tekstowego - mozna zmienic
        }}
        multiline
        type="text"
        onChange={handleChange}
      />
    </Box>
  );
};
export default FormBody;
