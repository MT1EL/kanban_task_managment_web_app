import Navbar from "./layouts/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import { Box, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BoardInterface } from "./types";
import Register from "./screens/Register";
import Login from "./screens/Login";
import { getAuth } from "firebase/auth";
import { getUserBoards } from "./firebaseFunctions/user";
import {
  collection,
  doc,
  documentId,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { database } from "../firebase";

function App() {
  const [initialLoad, setInitialLoad] = useState(true);
  const [loading, setLoading] = useState(true);
  const [currentUser, setCurrentUser] = useState(getAuth().currentUser);
  const [boards, setBoards] = useState<BoardInterface[]>();
  const [currentBoard, setCurrentBoard] = useState<BoardInterface | boolean>(
    false
  );
  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Your asynchronous logic here
        if (currentUser) {
          const updatedUserBoards = await getUserBoards(currentUser?.uid);
          setBoards(updatedUserBoards);
          if (currentBoard === false && initialLoad) {
            setCurrentBoard(updatedUserBoards[0]);
            setInitialLoad(false);
          }
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
        return err;
      }
    };
    fetchData();
  }, [currentUser]);
  useEffect(() => {
    if (currentUser) {
      const ref = doc(database, "users", currentUser?.uid);
      const subscribe = onSnapshot(ref, (doc: any) => {
        const updatedBoards = doc.data().boards;
        const boardsRef = collection(database, "boards");
        const boardQuery = query(
          boardsRef,
          where(documentId(), "in", updatedBoards)
        );
        getDocs(boardQuery).then((docs) => {
          const updatedBoards: any = [];
          docs.forEach((doc) =>
            updatedBoards.push({
              id: doc.id,
              ...doc.data(),
            })
          );
          setBoards(updatedBoards);
        });
      });

      return () => subscribe();
    }
  }, [currentUser]);

  useEffect(() => {
    if (currentBoard && !initialLoad) {
      const boardRef = doc(database, "boards", currentBoard.id);
      const unsubscribe = onSnapshot(boardRef, (doc) => {
        const updatedBoards = {
          id: doc?.id,
          ...doc?.data(),
        };
        setCurrentBoard(updatedBoards as any);
        setLoading(false);
      });

      return () => unsubscribe();
    } else {
      setLoading(false);
    }
  }, [initialLoad]);
  if (loading) {
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
          {currentUser ? (
            <Route
              path="/"
              element={
                <Home
                  setCurrentBoard={setCurrentBoard}
                  boards={boards}
                  currentBoard={currentBoard}
                />
              }
            />
          ) : (
            <>
              <Route path="*" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </>
          )}
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
