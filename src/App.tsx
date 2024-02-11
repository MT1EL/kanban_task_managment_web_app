import Navbar from "./layouts/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import { Box, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BoardInterface } from "./types";
import { database } from "../firebase";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { getTables } from "./firebaseFunctions/table";
import Register from "./screens/Register";
import Login from "./screens/Login";

function App() {
  const [boards, setBoards] = useState<BoardInterface[]>();
  const [currentBoard, setCurrentBoard] = useState<BoardInterface | Boolean>(
    boards ? boards[0] : false
  );

  useEffect(() => {
    const boardRef = collection(database, "boards");
    const boardQuery = query(boardRef, orderBy("updatedAt", "desc"));
    const unsubscribe = onSnapshot(boardQuery, (snapshot) => {
      const updatedBoards = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBoards(updatedBoards as any);
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    getTables()
      .then((res) => setCurrentBoard(res[0] as any))
      .catch((err) => console.log(err));
  }, []);
  if (!boards || !currentBoard) {
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/"
            element={<Home setCurrentBoard={setCurrentBoard} boards={boards} />}
          />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
