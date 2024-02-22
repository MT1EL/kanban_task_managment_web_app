export const useRandomColor = (alreadyUsedColors: string[]) => {
  const colors = ["#635FC7", "#FFFFFF", "#EA5555", "#49C4E5", "#67E2AE"];
  const filteredColors = colors.filter(
    (color) => alreadyUsedColors.includes(color) === false
  );
  const colorIndex = Math.floor(Math.random() * (filteredColors.length - 1));
  return filteredColors[colorIndex];
};
