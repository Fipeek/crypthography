import { Box, InputLabel, Input } from "@mui/material";
import React from "react";

type props = {
  onChange: (key: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  defaultValue?: number;
  type?: string;
};
export const KeyInput: React.FC<props> = (props) => {
  const { onChange, type, name, defaultValue } = props;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <InputLabel>{name}</InputLabel>
      <Input
        sx={{
          backgroundColor: "rgba(255,255,255,0.2)",
        }}
        defaultValue={defaultValue}
        onChange={onChange}
        type={type}
      />
    </Box>
  );
};
