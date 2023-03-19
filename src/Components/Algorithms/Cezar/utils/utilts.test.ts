import { cezarCypher } from "./utils";
describe("Cezar utils test ", () => {
  const input = "abc";
  const keys = [0, 1, -1, 2];
  const results = ["abc", "bcd", "abc", "cde"];
  it.each([
    [input, keys[0], results[0]],
    [input, keys[1], results[1]],
    [input, keys[2], results[2]],
    [input, keys[3], results[3]],
  ])("Should match expected result", (input, key, result) => {
    expect(cezarCypher(input, key)).toStrictEqual(result);
  });
});
