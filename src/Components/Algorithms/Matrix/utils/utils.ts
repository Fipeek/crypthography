export const matrix3 = (input: string, key: string): string => {
  //   input = input.replace(/ /g, "");

  const keyAlphabeticalOrder = key.split("").sort().join("");

  const keyNumberOrder = key.split("").map((letter) => {
    return keyAlphabeticalOrder.indexOf(letter) + 1;
  });

  for (let i = 0; i < key.length; i++) {
    for (let j = i + 1; j < key.length; j++) {
      let count = 0;
      if (keyNumberOrder[i] === keyNumberOrder[j]) {
        keyNumberOrder[j] = keyNumberOrder[j] + 1 + count;
        count++;
      }
    }
  }

  const rowsArray = [];
  let inputUsed = 0;

  for (let i = 0; i < 9999; i++) {
    const currentRowLength = keyNumberOrder.indexOf(i + 1) + 1;
    rowsArray.push(
      input.slice(inputUsed, inputUsed + currentRowLength).split("")
    );
    inputUsed += currentRowLength;
    for (let j = currentRowLength; j < key.length; j++) {
      rowsArray[i].push("~");
    }
    let emptyCount = 0;
    for (let j = 0; j < rowsArray[i].length; j++) {
      if (rowsArray[i][j] === "~") emptyCount++;
    }
    if (emptyCount === rowsArray[i].length) {
      rowsArray.splice(i, 1);
      break;
    }
  }

  let result = "";

  for (let i = 0; i < key.length; i++) {
    const currentColumn = keyNumberOrder.findIndex(
      (number) => number === i + 1
    );
    for (let j = 0; j < rowsArray.length; j++) {
      if (rowsArray[j][currentColumn] === "~") continue;
      if (rowsArray[j][currentColumn] === " ")
        rowsArray[j][currentColumn] = "-";
      result += rowsArray[j][currentColumn] || "";
    }
    result += " ";
  }

  return result;
};

export const decryptMatrix3 = (input: string, key: string): string => {
  const keyAlphabeticalOrder = key.split("").sort().join("");

  const keyNumberOrder = key.split("").map((letter) => {
    return keyAlphabeticalOrder.indexOf(letter) + 1;
  });

  for (let i = 0; i < key.length; i++) {
    for (let j = i + 1; j < key.length; j++) {
      let count = 0;
      if (keyNumberOrder[i] === keyNumberOrder[j]) {
        keyNumberOrder[j] = keyNumberOrder[j] + 1 + count;
        count++;
      }
    }
  }

  const wordArray = input.split(" ");

  const orderedWordArray = new Array(wordArray.length);

  for (let i = 0; i < key.length; i++) {
    const currentColumn = keyNumberOrder.findIndex(
      (number) => number === i + 1
    );

    orderedWordArray[currentColumn] = wordArray[i].split("");
  }

  for (let i = 0; i < orderedWordArray.length; i++) {
    const currentColumn = keyNumberOrder.findIndex(
      (number) => number === i + 1
    );
    for (let j = currentColumn + 1; j < key.length; j++) {
      orderedWordArray[j].splice(i, 0, "~");
    }
  }

  let result = "";

  for (let i = 0; i < orderedWordArray.length; i++) {
    for (let j = 0; j < key.length; j++) {
      if (orderedWordArray[j][i] === "~") continue;
      if (orderedWordArray[j][i] === "-") orderedWordArray[j][i] = " ";
      result += orderedWordArray[j][i] || "";
    }
  }

  return result;
};
