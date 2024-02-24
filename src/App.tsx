import Navbar from "./layouts/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import { Box, Spinner } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BoardInterface } from "./types";
import Register from "./screens/Register";
import Login from "./screens/Login";
import { getAuth } from "firebase/auth";
import ProfileLayout from "./screens/Profile";
import Boards from "./layouts/Profile/Boards";
import Security from "./layouts/Profile/Security";
import Notifications from "./layouts/Profile/Notifications";
import Profile from "./layouts/Profile/";

function App() {
  const [boardId, setBoardId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(getAuth().currentUser);
  const [boards, setBoards] = useState<BoardInterface[]>();
  const [currentBoard, setCurrentBoard] = useState<BoardInterface | boolean>(
    false
  );

  // update user
  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((user) => {
      setUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);
  if (loading) {
    return <Spinner />;
  }
  return (
    <Box maxH={"100vh"} maxW="100vw" overflow={["scroll", "scroll", "unset"]}>
      <Navbar
        currentBoard={currentBoard as BoardInterface}
        setCurrentBoard={setCurrentBoard}
      />
      <Router>
        <Routes>
          {user ? (
            <>
              <Route
                path="/"
                element={
                  <Home
                    setCurrentBoard={setCurrentBoard}
                    boards={boards}
                    currentBoard={currentBoard}
                    setBoardId={setBoardId}
                    setBoards={setBoards}
                    boardId={boardId}
                  />
                }
              />
              <Route path="/profile" element={<ProfileLayout />}>
                <Route path="/profile/" element={<Profile user={user} />} />
                <Route
                  path="/profile/boards"
                  element={<Boards user={user} />}
                />
                <Route path="/profile/security" element={<Security />} />
                <Route
                  path="/profile/notifications"
                  element={<Notifications user={user} />}
                />
              </Route>
            </>
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
