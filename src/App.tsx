import { Box } from "@mui/material";
import PS1 from "./Components/Containers/PS1/PS1";
import { Navigation } from "./Components/Navigation/Navigation";
import PS2 from "./Components/Containers/PS2/PS2";
import { Route, Routes } from "react-router-dom";

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
      </Routes>
    </Box>
  );
}

export default App;
