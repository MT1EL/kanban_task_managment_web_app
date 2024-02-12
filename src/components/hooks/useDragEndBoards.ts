import { DropResult } from "react-beautiful-dnd";
import { BoardInterface } from "../../types";
import { updateBoard } from "../../firebaseFunctions/table";
import { serverTimestamp } from "firebase/firestore";

const useDragEndBoards = (result: DropResult, boards: BoardInterface[]) => {
  if (!result.destination) {
    return;
  }
  const { source } = result;
  const currentTime = serverTimestamp();
  const updatedBoard = { ...boards[source.index], updatedAt: currentTime };
  updateBoard(updatedBoard, updatedBoard.id);
};

export default useDragEndBoards;
