import { BoardInterface } from "../../types";

function useSorting(arr1: string[], arr2: BoardInterface[]) {
  // Create a map of ids to their corresponding index positions in the second array
  const idToIndexMap = arr1.reduce((map: any, id: string, index: number) => {
    map[id] = index;
    return map;
  }, {});

  // Sort the first array based on the order specified in the second array
  const sortedArray = arr2.sort((a, b) => {
    const indexA = idToIndexMap[a.id];
    const indexB = idToIndexMap[b.id];
    return indexA - indexB;
  });

  return sortedArray;
}

export default useSorting;
