import Navbar from "./layouts/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import { Box, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTables } from "./firebaseFunctions/table";

function App() {
  const [boards, setBoards] = useState<any>();
  const [currentBoard, setrCurrentBoard] = useState<any>(false);
  useEffect(() => {
    getTables()
      .then((res) => {
        setBoards(res), setrCurrentBoard(res[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!currentBoard) {
    return <Spinner />;
  }
  return (
    <Box height={"100vh"}>
      <Navbar currentBoard={currentBoard} />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setrCurrentBoard={setrCurrentBoard}
                currentBoard={currentBoard}
                boards={boards}
              />
            }
          />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
