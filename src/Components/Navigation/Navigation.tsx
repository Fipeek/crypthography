// co nowe ps bedziemy dodawac nawigacje to strony

import { Box, List, ListItem } from "@mui/material";

// poki co bedzie pusto
export const Navigation: React.FC = () => {
  return (
    <Box
      sx={{
        width: "20%",
        backgroundColor: "rgba(0,0,0,0.85)",
        boxShadow: "10px 0 10px 0 rgba(0,0,0,0.3)",
      }}
    >
      <List>
        <ListItem
          sx={{
            color: "#abe7e9",
            fontSize: "2.5rem",
            fontFamily: "helvetica",
            backgroundColor: "rgba(0,0,0,0.5)",
            transition: "0.2s",
            "&:hover": {
              backgroundColor: "#abe7e9",
              cursor: "pointer",
              color: "black",
            },
          }}
        >
          PS1
        </ListItem>
      </List>
    </Box>
  );
};
