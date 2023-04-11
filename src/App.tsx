import { Box } from "@mui/material";
import PS1 from "./Components/Containers/PS1/PS1";
import { Navigation } from "./Components/Navigation/Navigation";
import PS2 from "./Components/Containers/PS2/PS2";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Navigation />
      {/* <PS1 /> */}
      <PS2 />
    </Box>
  );
}

export default App;
