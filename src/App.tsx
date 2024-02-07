import Navbar from "./layouts/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import { Box, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getTables } from "./firebaseFunctions/table";
import { BoardInterface } from "./types";
import { database } from "../firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

function App() {
  const [boards, setBoards] = useState<BoardInterface[]>();
  const [currentBoard, setCurrentBoard] = useState<BoardInterface | Boolean>(
    boards ? boards[0] : false
  );
  const getData = () => {
    getTables()
      .then((res) => {
        if (res) {
          setBoards(res);
          if (currentBoard) {
          } else {
            setCurrentBoard(res[0]);
          }
        }
      })
      .catch((err: any) => console.log(err));
  };
  useEffect(() => {
    getData();
    const boardRef = collection(database, "boards");
    const boardQuery = query(boardRef);
    const unsubscribe = onSnapshot(boardQuery, (snapshot) => {
      const updatedBoards = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBoards(updatedBoards as any);
      if (currentBoard) {
        console.log("currentBoard exists");
      } else {
        setCurrentBoard(updatedBoards[0] as any);
      }
    });

    return () => unsubscribe();
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
        getTables={getData}
        setBoards={setBoards}
      />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                setCurrentBoard={setCurrentBoard}
                currentBoard={currentBoard}
                boards={boards}
                getTables={getData}
              />
            }
          />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
