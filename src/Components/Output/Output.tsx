import { Box, Typography } from "@mui/material";

type props = {
  output: string;
};
export const Output: React.FC<props> = (props) => {
  const { output } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",

        gap: "1rem",
        padding: "1rem",
      }}
    >
      <Typography variant="h6">Output: </Typography>
      <Typography>{output}</Typography>
    </Box>
  );
};
