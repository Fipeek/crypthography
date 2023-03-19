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
    <Box>
      <InputLabel>{name}</InputLabel>
      <Input defaultValue={defaultValue} onChange={onChange} type={type} />
    </Box>
  );
};
