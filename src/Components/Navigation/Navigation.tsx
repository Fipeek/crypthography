import { Box, List, ListItem } from "@mui/material";
import { Link } from "react-router-dom";

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
          <Link
            to="/"
            style={{ width: "100%", textDecoration: "none", color: "#abe7e9" }}
          >
            PS1
          </Link>
        </ListItem>
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
          <Link
            to="/PS2"
            style={{ width: "100%", textDecoration: "none", color: "#abe7e9" }}
          >
            PS2
          </Link>
        </ListItem>
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
          <Link
            to="/PS3"
            style={{ width: "100%", textDecoration: "none", color: "#abe7e9" }}
          >
            PS3
          </Link>
        </ListItem>
      </List>
    </Box>
  );
};
