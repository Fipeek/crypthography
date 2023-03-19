import { railFance } from "./utils";
describe("rail fance utils test ", () => {
  const input = "test";
  const keys = [0, 1, -1, 2];
  const results = ["test", "test", "test", "tset"];
  it.each([
    [input, keys[0], results[0]],
    [input, keys[1], results[1]],
    [input, keys[2], results[2]],
    [input, keys[3], results[3]],
  ])("Should match expected result", (input, key, result) => {
    expect(railFance(input, key)).toStrictEqual(result);
  });
});
