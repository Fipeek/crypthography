export const convertToBinary = (input: string) =>
  input.charCodeAt(0).toString(2).padStart(8, "0");

export const convertToBinaryArray = (input: string) =>
  input
    .split("")
    .map((char) => convertToBinary(char))
    .join("");

export const generateBinaryKey = (length: number) => {
  const key = [];
  for (let i = 0; i < length; i++) {
    key.push(Math.round(Math.random() * 1).toString());
  }
  return key.join("");
};

export const convertFromBinaryToDecimal = (input: string) =>
  parseInt(input, 2).toString();
export const convertToBinaryToString = (input: string) =>
  String.fromCharCode(parseInt(input, 2));
export const splitIntoBlocks = (input: string, blockSize: number) => {
  const blocks = [];
  for (let i = 0; i < input.length; i += blockSize) {
    blocks.push(input.slice(i, i + blockSize));
  }
  return blocks;
};

export function splitFileIntoBlocks(fileData: string): string[] {
  const dataLength = fileData.length;
  const numberOfBytes = Math.ceil(dataLength / 8);
  const divisibleDataLength = Math.floor(dataLength / 64) * 64;

  const divisibleBlocks = [];
  for (let i = 0; i < divisibleDataLength; i += 64) {
    divisibleBlocks.push(fileData.slice(i, i + 64));
  }

  let returnData = divisibleBlocks;

  if (numberOfBytes % 8 !== 0) {
    const restData = fileData.slice(divisibleDataLength);
    const paddedBlock =
      restData +
      "0".repeat(56 - restData.length) +
      ((64 - restData.length) / 8).toString(2).padStart(8, "0");
    returnData.push(paddedBlock);
  } else {
    const paddedBlock = "0".repeat(56) + (8).toString(2).padStart(8, "0");
    returnData.push(paddedBlock);
  }

  return returnData;
}

const getNumber = (sixBitBinaryString: string, set: number[][]) => {
  const firstAndLast =
    sixBitBinaryString.charAt(0) + sixBitBinaryString.charAt(5);

  const middleFour = sixBitBinaryString.slice(1, 5);

  const firstDecimal = parseInt(firstAndLast, 2);

  const secondDecimal = parseInt(middleFour, 2);

  return set[firstDecimal][secondDecimal].toString(2).padStart(4, "0");
};

export const iterate = (string48bits: string) => {
  const tab = splitIntoBlocks(string48bits, 6);
  console.log(tab);
  let result = "";
  result += getNumber(tab[0], Tables.s1);

  result += getNumber(tab[1], Tables.s2);

  result += getNumber(tab[2], Tables.s3);

  result += getNumber(tab[3], Tables.s4);

  result += getNumber(tab[4], Tables.s5);

  result += getNumber(tab[5], Tables.s6);

  result += getNumber(tab[6], Tables.s7);

  result += getNumber(tab[7], Tables.s8);

  return result;
};

export const applyXOR = (input1: string, input2: string) => {
  const output = new Array(input1.length).fill(0).map((el, index) => {
    return input1[index] === input2[index] ? "0" : "1";
  });
  return output.join("");
};

export const joinBlocks = (...blocks: string[]) => blocks.join("");

export const applyPermutation = (input: string, permutationTable: number[]) => {
  const output = new Array(permutationTable.length).fill(0).map((el, index) => {
    return input[permutationTable[index] - 1];
  });

  return output.join("");
};

export const shiftLeft = (input: string, shiftAmount: number) => {
  const output = input.slice(shiftAmount) + input.slice(0, shiftAmount);
  return output;
};
export function binaryToString(binaryString: string): string {
  if (binaryString.length % 8 !== 0) {
    throw new Error("The length of the binary string must be divisible by 8.");
  }

  let result = "";
  for (let i = 0; i < binaryString.length; i += 8) {
    const binaryChunk = binaryString.substr(i, 8);
    const decimalValue = parseInt(binaryChunk, 2);
    result += String.fromCharCode(decimalValue);
  }

  return result;
}
export class Tables {
  static readonly IterateShiftAmount: number[] = [
    1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1,
  ];

  static readonly initialPermutation: number[] = [
    58, 50, 42, 34, 26, 18, 10, 2, 60, 52, 44, 36, 28, 20, 12, 4, 62, 54, 46,
    38, 30, 22, 14, 6, 64, 56, 48, 40, 32, 24, 16, 8, 57, 49, 41, 33, 25, 17, 9,
    1, 59, 51, 43, 35, 27, 19, 11, 3, 61, 53, 45, 37, 29, 21, 13, 5, 63, 55, 47,
    39, 31, 23, 15, 7,
  ];
  static readonly inversedInitialPermutation: number[] = [
    40, 8, 48, 16, 56, 24, 64, 32, 39, 7, 47, 15, 55, 23, 63, 31, 38, 6, 46, 14,
    54, 22, 62, 30, 37, 5, 45, 13, 53, 21, 61, 29, 36, 4, 44, 12, 52, 20, 60,
    28, 35, 3, 43, 11, 51, 19, 59, 27, 34, 2, 42, 10, 50, 18, 58, 26, 33, 1, 41,
    9, 49, 17, 57, 25,
  ];

  static readonly keyPermutation: number[] = [
    57, 49, 41, 33, 25, 17, 9, 1, 58, 50, 42, 34, 26, 18, 10, 2, 59, 51, 43, 35,
    27, 19, 11, 3, 60, 52, 44, 36, 63, 55, 47, 39, 31, 23, 15, 7, 62, 54, 46,
    38, 30, 22, 14, 6, 61, 53, 45, 37, 29, 21, 13, 5, 28, 20, 12, 4,
  ];
  static readonly keyPermutation2: number[] = [
    14, 17, 11, 24, 1, 5, 3, 28, 15, 6, 21, 10, 23, 19, 12, 4, 26, 8, 16, 7, 27,
    20, 13, 2, 41, 52, 31, 37, 47, 55, 30, 40, 51, 45, 33, 48, 44, 49, 39, 56,
    34, 53, 46, 42, 50, 36, 29, 32,
  ];
  static readonly ePermutation: number[] = [
    32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15,
    16, 17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27, 28,
    29, 28, 29, 30, 31, 32, 1,
  ];
  static readonly inversedPermutation: number[] = [
    16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14,
    32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25,
  ];

  static readonly pPermutation: number[] = [
    16, 7, 20, 21, 29, 12, 28, 17, 1, 15, 23, 26, 5, 18, 31, 10, 2, 8, 24, 14,
    32, 27, 3, 9, 19, 13, 30, 6, 22, 11, 4, 25,
  ];

  static readonly s1: number[][] = [
    [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
    [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
    [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
    [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9],
  ];
  static readonly s2: number[][] = [
    [15, 1, 8, 14, 6, 11, 3, 4, 9, 7, 2, 13, 12, 0, 5, 10],
    [3, 13, 4, 7, 15, 2, 8, 14, 12, 0, 1, 10, 6, 9, 11, 5],
    [0, 14, 7, 11, 10, 4, 13, 1, 5, 8, 12, 6, 9, 3, 2, 15],
    [13, 8, 10, 1, 3, 15, 4, 2, 11, 6, 7, 12, 0, 5, 14, 9],
  ];
  static readonly s3: number[][] = [
    [10, 0, 9, 14, 6, 3, 15, 5, 1, 13, 12, 7, 11, 4, 2, 8],
    [13, 7, 0, 9, 3, 4, 6, 10, 2, 8, 5, 14, 12, 11, 15, 1],
    [13, 6, 4, 9, 8, 15, 3, 0, 11, 1, 2, 12, 5, 10, 14, 7],
    [1, 10, 13, 0, 6, 9, 8, 7, 4, 15, 14, 3, 11, 5, 2, 12],
  ];

  static readonly s4: number[][] = [
    [7, 13, 14, 3, 0, 6, 9, 10, 1, 2, 8, 5, 11, 12, 4, 15],
    [13, 8, 11, 5, 6, 15, 0, 3, 4, 7, 2, 12, 1, 10, 14, 9],
    [10, 6, 9, 0, 12, 11, 7, 13, 15, 1, 3, 14, 5, 2, 8, 4],
    [3, 15, 0, 6, 10, 1, 13, 8, 9, 4, 5, 11, 12, 7, 2, 14],
  ];
  static readonly s5: number[][] = [
    [2, 12, 4, 1, 7, 10, 11, 6, 8, 5, 3, 15, 13, 0, 14, 9],
    [14, 11, 2, 12, 4, 7, 13, 1, 5, 0, 15, 10, 3, 9, 8, 6],
    [4, 2, 1, 11, 10, 13, 7, 8, 15, 9, 12, 5, 6, 3, 0, 14],
    [11, 8, 12, 7, 1, 14, 2, 13, 6, 15, 0, 9, 10, 4, 5, 3],
  ];

  static readonly s6: number[][] = [
    [12, 1, 10, 15, 9, 2, 6, 8, 0, 13, 3, 4, 14, 7, 5, 11],
    [10, 15, 4, 2, 7, 12, 9, 5, 6, 1, 13, 14, 0, 11, 3, 8],
    [9, 14, 15, 5, 2, 8, 12, 3, 7, 0, 4, 10, 1, 13, 11, 6],
    [4, 3, 2, 12, 9, 5, 15, 10, 11, 14, 1, 7, 6, 0, 8, 13],
  ];
  static readonly s7: number[][] = [
    [4, 11, 2, 14, 15, 0, 8, 13, 3, 12, 9, 7, 5, 10, 6, 1],
    [13, 0, 11, 7, 4, 9, 1, 10, 14, 3, 5, 12, 2, 15, 8, 6],
    [1, 4, 11, 13, 12, 3, 7, 14, 10, 15, 6, 8, 0, 5, 9, 2],
    [6, 11, 13, 8, 1, 4, 10, 7, 9, 5, 0, 15, 14, 2, 3, 12],
  ];
  static readonly s8: number[][] = [
    [13, 2, 8, 4, 6, 15, 11, 1, 10, 9, 3, 14, 5, 0, 12, 7],
    [1, 15, 13, 8, 10, 3, 7, 4, 12, 5, 6, 11, 0, 14, 9, 2],
    [7, 11, 4, 1, 9, 12, 14, 2, 0, 6, 10, 13, 15, 3, 5, 8],
    [2, 1, 14, 7, 4, 10, 8, 13, 15, 12, 9, 0, 3, 5, 6, 11],
  ];
}
