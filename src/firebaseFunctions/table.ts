import { database } from "./../../firebase";
import { addDoc, collection, getDocs } from "firebase/firestore";

function getTables() {
  const ref = collection(database, "boards");
  return getDocs(ref)
    .then((res) => {
      let newArr: any[] = [];
      res.forEach((doc) => newArr.push(doc.data()));
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

export { getTables, addTable };
