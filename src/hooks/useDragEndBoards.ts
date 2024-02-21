import { DropResult } from "react-beautiful-dnd";
import { BoardInterface } from "../types";
import { doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getUserData } from "../firebaseFunctions/user";
import { database } from "../../firebase";
import { Dispatch } from "react";
import useSorting from "./useSorting";

const useDragEndBoards = (
  result: DropResult,
  boards: BoardInterface[],
  setBoards: Dispatch<BoardInterface[]>
) => {
  if (!result.destination) {
    return;
  }
  const { source, destination } = result;
  const user_id = getAuth().currentUser?.uid;
  if (!user_id) return;
  getUserData(user_id)
    .then((res) => {
      let boardIds = res?.boards;

      if (!boardIds) return;
      const [boardChanged] = boardIds.splice(source.index, 1);
      boardIds.splice(destination.index, 0, boardChanged);
      const sortedBoards = useSorting(boardIds, boards);

      setBoards(sortedBoards);
      updateDoc(doc(database, "users", user_id), { boards: boardIds });
    })
    .catch((err) => console.log(err));

  // const currentTime = serverTimestamp();
  // const updatedBoard = { ...boards[source.index], updatedAt: currentTime };
  // updateBoard(updatedBoard, updatedBoard.id);
};

export default useDragEndBoards;
