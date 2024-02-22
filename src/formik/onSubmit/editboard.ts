import { getAuth } from "firebase/auth";
import { addBoard, updateBoard } from "../../firebaseFunctions/table";
import { BoardInterface, columnType } from "../../types";
import { Dispatch } from "react";
import { useRandomColor } from "../../hooks/useRandomColor";

const editBoardSubmit = (
  values: any,
  setIsDisabled: Dispatch<boolean>,
  currentBoard: BoardInterface | undefined,
  onClose: () => void,
  formik: any
) => {
  if (Object.keys(values).length === 6) {
    setIsDisabled(true);
  } else {
    setIsDisabled(false);
  }
  // check if the board is new or existing
  // if new, get columns from formik.values where key is not "Board Name"
  // if existing, get columns from currentBoard
  // then call addBoard or updateBoard
  const columnNames = currentBoard?.columns?.map((column) => column.name);
  const dotColors = currentBoard?.columns?.map((column) => column.dotColor);
  const columns: any[] = [];
  const colors: string[] = dotColors ? dotColors : [];
  for (const key in values) {
    if (key !== "Board Name") {
      let index = columnNames?.indexOf(values[key]);
      if (currentBoard && index !== -1) {
        const column = {
          name: values[key],
          tasks: currentBoard?.columns[index as any].tasks,
          dotColor: currentBoard?.columns[index as any].dotColor,
        };
        columns.push(column);
      } else {
        const dotColor = useRandomColor(colors);
        columns.push({
          name: values[key],
          tasks: [],
          dotColor: dotColor,
        });
        colors.push(dotColor);
      }
    }
  }
  if (currentBoard) {
    updateBoard(
      {
        name: values["Board Name"],
        columns: columns as columnType[],
        id: currentBoard.id,
        createdBy: currentBoard.createdBy,
        collaborators: currentBoard.collaborators,
        collaboratorsData: currentBoard.collaboratorsData,
        ownerId: currentBoard.ownerId,
      },
      currentBoard.id
    );
  } else {
    const user = getAuth().currentUser;
    const userObject = {
      id: user?.uid ?? null,
      email: user?.email ?? null,
      name: user?.displayName ?? null,
      photoURL: user?.photoURL ?? null,
    };
    addBoard({
      name: values["Board Name"],
      createdBy: userObject,
      ownerId: user?.uid ?? null,
      collaborators: [user?.uid],
      collaboratorsData: [userObject],
      columns: columns as columnType[],
    });
  }
  onClose();
  formik.resetForm();
};

export default editBoardSubmit;
