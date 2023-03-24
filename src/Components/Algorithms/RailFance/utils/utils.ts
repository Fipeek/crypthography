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
export const decryptRailFance = (input: string, stringKey: string): string => {
  const key = +stringKey;
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
  let result = "";
  let index = 0;
  for (let i = 0; i < input.length; i++) {
    result += rails[index][0];
    rails[index] = rails[index].slice(1);
    index += direction;
    if (index === key - 1 || index === 0) {
      direction *= -1;
    }
  }
  return result;
};
