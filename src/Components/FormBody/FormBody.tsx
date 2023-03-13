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
      <label>{name}</label>
      <input type="text" onChange={handleChange} />
    </div>
  );
};
export default FormBody;
