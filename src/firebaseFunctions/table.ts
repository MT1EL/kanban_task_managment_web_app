import { BoardInterface, columnType } from "../types";
import { database } from "./../../firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  updateDoc,
} from "firebase/firestore";

function getTables() {
  const ref = collection(database, "boards");
  const boardsQuery = query(ref, orderBy("updatedAt", "desc"));
  return getDocs(boardsQuery)
    .then((res) => {
      let newArr: BoardInterface[] = [];
      res.forEach((doc) =>
        newArr.push({ ...doc.data(), id: doc.id } as BoardInterface)
      );
      return newArr;
    })
    .catch((err) => console.log(err));
}

function addBoard(board: any) {
  const ref = collection(database, "boards");
  return addDoc(ref, board)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

function updateBoard(board: BoardInterface, boardId: string) {
  const ref = doc(database, "boards", boardId);
  return updateDoc(ref, board)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

function updateColumn(boardId: string, updatedColumns: columnType) {
  const ref = doc(database, "boards", boardId);
  updateDoc(ref, { columns: updatedColumns })
    .then((res) => console.log("response:" + res))
    .catch((err) => console.log("error: " + err));
}

function deleteBoard(id: string) {
  const ref = doc(database, "boards", id);
  deleteDoc(ref)
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
}

export { getTables, addBoard, updateBoard, updateColumn, deleteBoard };
