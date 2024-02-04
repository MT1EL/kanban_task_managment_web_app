import { BoardInterface } from "../types";
import { database } from "./../../firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

function getTables() {
  const ref = collection(database, "boards");
  return getDocs(ref)
    .then((res) => {
      let newArr: BoardInterface[] = [];
      res.forEach((doc) =>
        newArr.push({ ...doc.data(), id: doc.id } as BoardInterface)
      );
      return newArr;
    })
    .catch((err) => console.log(err));
}

function addTable(table: any) {
  const ref = collection(database, "boards");
  return addDoc(ref, table)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

// interface Task {
//   title: string;
//   description: string;
//   status: string;
//   subtasks: Subtask[];
// }

// interface Subtask {
//   title: string;
//   isCompleted: boolean;
// }

function addNewTask(boardId: string, updatedColumns: columnType) {
  const ref = doc(database, "boards", boardId);
  updateDoc(ref, { columns: updatedColumns })
    .then((res) => console.log("response:" + res))
    .catch((err) => console.log("error: " + err));
}

export { getTables, addTable, addNewTask };
