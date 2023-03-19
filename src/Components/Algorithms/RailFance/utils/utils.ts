export const railFance = (input: string, key: number): string => {
  if (key <= 1 || !key) return input;
  const rails = new Array(key).fill("");
  let direction = 1;
  let rail = 0;
  for (let i = 0; i < input.length; i++) {
    rails[rail] += input[i];
    rail += direction;
    if (rail === key - 1 || rail === 0) {
      direction *= -1;
    }
  }
  return rails.join("");
};
