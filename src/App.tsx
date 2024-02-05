import Navbar from "./layouts/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import { Box, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTables } from "./firebaseFunctions/table";
import { BoardInterface } from "./types";
import { useQuery } from "react-query";

function App() {
  const [boards, setBoards] = useState<BoardInterface[]>();
  const [currentBoard, setCurrentBoard] = useState<BoardInterface | Boolean>(
    false
  );

  useEffect(() => {
    getTables()
      .then((res) => {
        if (res) {
          setBoards(res);
          setCurrentBoard(res[0]);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  if (!currentBoard) {
    return <Spinner />;
  }
  return (
    <Box height={"100vh"}>
      <Navbar
        currentBoard={currentBoard}
        setCurrentBoard={setCurrentBoard}
        boards={boards}
      />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setCurrentBoard={setCurrentBoard}
                currentBoard={currentBoard}
                setBoards={setBoards}
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
