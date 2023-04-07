import { Box } from "@mui/material";
import PS1 from "./Components/Containers/PS1/PS1";
import { Navigation } from "./Components/Navigation/Navigation";

function App() {
  console.log("test2");
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Navigation />
      <PS1 />
    </Box>
  );
}

export default App;
