import { DropResult } from "react-beautiful-dnd";
import { BoardInterface, columnType } from "../../types";
import { updateBoard } from "../../firebaseFunctions/table";

const useDragEndTasks = (result: DropResult, currentBoard: BoardInterface) => {
  if (!result.destination) {
    return;
  }

  const { source, destination } = result;

  if (source.droppableId === destination.droppableId) {
    // Reordering within the same column
    const column = currentBoard.columns.find(
      (col: { name: string }) => col.name === source.droppableId
    );
    if (!column) {
      return; // Column not found
    }

    const newTasks = [...column.tasks];
    const [removed] = newTasks.splice(source.index, 1);
    newTasks.splice(destination.index, 0, removed);

    const newColumns: columnType[] = currentBoard.columns.map(
      (col: columnType) =>
        col.name === source.droppableId ? { ...col, tasks: newTasks } : col
    );

    const newBoard = { name: currentBoard.name, columns: newColumns };
    updateBoard(newBoard as BoardInterface, currentBoard.id);
  } else {
    // Moving between columns
    const sourceColumn = currentBoard.columns.find(
      (col: { name: string }) => col.name === source.droppableId
    );
    const destinationColumn = currentBoard.columns.find(
      (col: { name: string }) => col.name === destination.droppableId
    );

    if (!sourceColumn || !destinationColumn) {
      return; // Source or destination column not found
    }

    const sourceTasks = [...sourceColumn.tasks];
    const destinationTasks = [...destinationColumn.tasks];

    const [removed] = sourceTasks.splice(source.index, 1);
    removed.status = currentBoard.columns.indexOf(destinationColumn);
    destinationTasks.splice(destination.index, 0, removed);

    const newColumns: columnType[] = currentBoard.columns.map(
      (col: columnType) => {
        if (col.name === source.droppableId) {
          return { ...col, tasks: sourceTasks };
        }
        if (col.name === destination.droppableId) {
          return { ...col, tasks: destinationTasks };
        }
        return col;
      }
    );
    const newBoard = { name: currentBoard.name, columns: newColumns };
    updateBoard(newBoard as BoardInterface, currentBoard.id);
  }
};

export default useDragEndTasks;
