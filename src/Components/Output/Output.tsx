type props = {
  output: string;
};
export const Output: React.FC<props> = (props) => {
  const { output } = props;
  return (
    <div>
      <h2>Output</h2>
      <p>{output}</p>
    </div>
  );
};
