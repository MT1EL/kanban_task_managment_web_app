import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { database } from "../../../firebase";

const getUserData = async (user_id: string) => {
  const userRef = doc(database, "users", user_id);
  return await getDoc(userRef)
    .then((res) => res.data())
    .catch((err) => console.log(err));
};
function getUserBoards(user_id: string) {
  return getUserData(user_id)
    .then((res) => {
      const boardRef = collection(database, "boards");
      const boardQuery = query(
        boardRef,
        where(documentId(), "in", res?.boards)
      );
      return getDocs(boardQuery)
        .then((docs) => {
          const updatedBoards: any = [];
          docs.forEach((doc) =>
            updatedBoards.push({
              id: doc.id,
              ...doc.data(),
            })
          );
          return updatedBoards;
        })
        .catch((err) => err);
    })
    .catch((err) => console.log(err));
}

export { getUserBoards, getUserData };

// q: what are rules for useState hook in react
