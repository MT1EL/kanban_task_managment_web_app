import { updateColumn } from "../../firebaseFunctions/table";
import { BoardInterface, columnType, subtaskType } from "../../types";

export const newtaskModalOnSubmit = (
  values: any,
  currentBoard: BoardInterface,
  selectedTask: any,
  formik: any
) => {
  let taskObj: any = { completedCount: 0, ...values };
  let subtaskArr: subtaskType[] = [];
  const taskObj_keys = Object.keys(taskObj).splice(4);

  taskObj_keys?.map((key) => {
    subtaskArr.push({ description: values[key], isCompleted: false });
    delete taskObj[key];
  });
  taskObj.subtasks = subtaskArr;
  let newColumns: columnType[] = [...currentBoard?.columns];
  newColumns?.map((column) => {
    if (column.name === currentBoard?.columns[values.status].name) {
      if (
        column.tasks.some(
          (item) => JSON.stringify(item) === JSON.stringify(selectedTask)
        ) &&
        selectedTask
      ) {
        const taskIndex = column.tasks.indexOf(selectedTask);
        column.tasks[taskIndex] = taskObj;
      } else {
        column.tasks = [taskObj, ...column.tasks];
      }
    }
    if (selectedTask && selectedTask.status !== taskObj.status) {
      if (column.name === currentBoard?.columns[selectedTask.status].name) {
        if (column.tasks.length === 1) {
          column.tasks = [];
        } else {
          const indexToRemove = column.tasks.indexOf(selectedTask);
          column.tasks.splice(indexToRemove, 1);
        }
      }
    }
  });
  updateColumn(currentBoard?.id, newColumns as any);
  formik.setValues({});
};
