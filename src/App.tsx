import { Box } from "@mui/material";
import PS1 from "./Components/Containers/PS1/PS1";
import { Navigation } from "./Components/Navigation/Navigation";
import PS2 from "./Components/Containers/PS2/PS2";
import { Route, Routes } from "react-router-dom";
import PS3 from "./Components/Containers/PS3/PS3";

function App() {
  return (
    <Box
      sx={{
        display: "flex",
      }}
    >
      <Navigation />
      <Routes>
        <Route path="/" element={<PS1 />} />
        <Route path="/PS2" element={<PS2 />} />
        <Route path="/PS3" element={<PS3 />} />
      </Routes>
    </Box>
  );
}

export default App;
