export const railFance = (input: string, stringKey: string): string => {
  const key = +stringKey;
  if (key <= 1 || !key || typeof key === "string") return input;
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

export const decryptRailFance = (input: string, stringKey: string) => {
  const key = +stringKey;
  let row = 0,
    col = 0;
  if (key <= 1 || !key) return input;
  let rail = new Array(key)
    .fill("")
    .map(() => new Array(input.length).fill("\n"));
  let isDownDir = false;
  for (let i = 0; i < input.length; i++) {
    if (row == 0) isDownDir = true;
    if (row == key - 1) isDownDir = false;

    rail[row][col++] = "*";

    isDownDir ? row++ : row--;
  }

  let index = 0;
  for (let i = 0; i < key; i++)
    for (let j = 0; j < input.length; j++)
      if (rail[i][j] == "*" && index < input.length)
        rail[i][j] = input[index++];

  let result = "";
  row = 0;
  col = 0;
  for (let i = 0; i < input.length; i++) {
    if (row == 0) isDownDir = true;
    if (row == key - 1) isDownDir = false;

    if (rail[row][col] != "*") result += rail[row][col++];

    isDownDir ? row++ : row--;
  }

  return result;
};
