import { updateColumn } from "../../firebaseFunctions/table";
import { BoardInterface } from "../../types";

export const taskModalOnSubmit = (
  values: any,
  currentBoard: BoardInterface,
  selectedTask: any,
  status: number
) => {
  let updatedColumns = [...currentBoard.columns];
  let updatedTasks = [...currentBoard.columns[status].tasks];
  const indexOfTask = updatedTasks.indexOf(selectedTask);
  const taskToUpdate = updatedTasks[indexOfTask];
  let completedCount = taskToUpdate.subtasks.length;

  taskToUpdate.subtasks.map((subtask, index) => {
    if (!values[`isCompleted${index}`]) {
      completedCount--;
    }
    subtask.isCompleted = values[`isCompleted${index}`];
  });
  taskToUpdate.completedCount = completedCount;
  updatedColumns[status] = {
    ...updatedColumns[status],
    tasks: updatedTasks,
  };
  updateColumn(currentBoard.id, updatedColumns as any);
};
