import React, { useEffect, useState } from "react";
import {
  applyPermutation,
  applyXOR,
  binaryToString,
  convertFromBinaryToDecimal,
  convertToBinary,
  convertToBinaryArray,
  convertToBinaryToString,
  generateBinaryKey,
  iterate,
  joinBlocks,
  shiftLeft,
  splitFileIntoBlocks,
  splitIntoBlocks,
  Tables,
} from "./utils";

import AlgorithmBox from "../../GenericAlgorithm/AlgorithmBox";
import { Button } from "@mui/material";

const key = generateBinaryKey(64);

const Des: React.FC = () => {
  const [input, setInput] = useState<string>("");
  const [inputV2, setInputV2] = useState<string>("");
  const [output, setOutput] = useState<string>("");
  const handleReadFromFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    const reader = new FileReader();
    if (file) {
      reader.onload = (e) => {
        const text = e.target?.result;
        setInput(text as string);
      };
      reader.readAsText(file);
    }
  };
  const handleReadFromFileV2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    const reader = new FileReader();
    if (file) {
      reader.onload = (e) => {
        const text = e.target?.result;
        setInputV2(text as string);
      };
      reader.readAsText(file);
    }
  };
  useEffect(() => {
    const keyAfterPermutation = applyPermutation(key, Tables.keyPermutation);
    const splitedKey = {
      left: splitIntoBlocks(keyAfterPermutation, 28)[0],
      right: splitIntoBlocks(keyAfterPermutation, 28)[1],
    };
    const leftKeys: string[] = [];
    const rightKeys = [];
    const keys: string[] = [];

    for (let i = 0; i < 16; i++) {
      leftKeys.push(shiftLeft(splitedKey.left, Tables.IterateShiftAmount[i]));
      rightKeys.push(shiftLeft(splitedKey.right, Tables.IterateShiftAmount[i]));

      keys.push(
        applyPermutation(
          joinBlocks(leftKeys[i], rightKeys[i]),
          Tables.keyPermutation2
        )
      );
    }
    const splittedInputIntoBlocks = convertToBinaryArray(inputV2);
  }, [inputV2]);
  const handleEncrypt = () => {
    const binaryInput = convertToBinaryArray(input);
    const splittedInput = splitIntoBlocks(binaryInput, 64);

    // _________________________________________________________________________
    // rozbijamy na bloki po 64 bity
    // _________________________________________________________________________
    const splittedInputIntoBlocks = splitFileIntoBlocks(binaryInput);
    // _________________________________________________________________________
    // permutacja początkowa
    // _________________________________________________________________________
    const blocksAfterFirstPermuation = splittedInputIntoBlocks.map((block) =>
      applyPermutation(block, Tables.initialPermutation)
    );
    // _________________________________________________________________________
    // rozbijamy na lewą i prawą część
    // _________________________________________________________________________
    const blocksAfterFirstStep = blocksAfterFirstPermuation.map((block) => {
      const splitedBlock = splitIntoBlocks(block, 32);
      const left = splitedBlock[0];
      const right = splitedBlock[1];
      return { left, right };
    });
    // _________________________________________________________________________
    // permutujemy klucz i rozdzielamy na lewą i prawą część
    // _________________________________________________________________________
    const keyAfterPermutation = applyPermutation(key, Tables.keyPermutation);
    const splitedKey = {
      left: splitIntoBlocks(keyAfterPermutation, 28)[0],
      right: splitIntoBlocks(keyAfterPermutation, 28)[1],
    };
    const leftKeys: string[] = [];

    const rightKeys = [];
    const keys: string[] = [];
    let nthRightBlocks = blocksAfterFirstStep.map((block) => block.right);
    console.log(nthRightBlocks);
    const nthLeftBlocks = blocksAfterFirstStep.map((block) => block.left);

    const finalBlocks: string[] = [];
    for (let i = 0; i < 16; i++) {
      leftKeys.push(shiftLeft(splitedKey.left, Tables.IterateShiftAmount[i]));
      rightKeys.push(shiftLeft(splitedKey.right, Tables.IterateShiftAmount[i]));

      keys.push(
        applyPermutation(
          joinBlocks(leftKeys[i], rightKeys[i]),
          Tables.keyPermutation2
        )
      );
    }
    for (let j = 0; j < blocksAfterFirstStep.length; j++) {
      for (let i = 0; i < 16; i++) {
        nthRightBlocks[j] = applyPermutation(
          nthRightBlocks[j],
          Tables.ePermutation
        );
        nthRightBlocks[j] = applyXOR(nthRightBlocks[j], keys[i]);
        nthRightBlocks[j] = iterate(nthRightBlocks[j]);
        nthRightBlocks[j] = applyPermutation(
          nthRightBlocks[j],
          Tables.pPermutation
        );

        let nthRightBlockMinusOne = nthRightBlocks[j];
        nthRightBlocks[j] = applyXOR(nthRightBlocks[j], nthLeftBlocks[j]);
        nthLeftBlocks[j] = nthRightBlockMinusOne;
      }
      let finalBlock = joinBlocks(nthLeftBlocks[j], nthRightBlocks[j]);
      finalBlock = applyPermutation(
        finalBlock,
        Tables.inversedInitialPermutation
      );
      finalBlocks.push(finalBlock);
    }
    const finalBlocksV2 = binaryToString(joinBlocks(...finalBlocks));
    console.log(finalBlocksV2);
  };
  return (
    <AlgorithmBox algorithmName="DES">
      <input type="file" onChange={handleReadFromFile} />
      <Button onClick={handleEncrypt}>Encrypt</Button>
      <input type="file" onChange={handleReadFromFileV2} />
      <Button onClick={handleEncrypt}>Decrypt</Button>
    </AlgorithmBox>
  );
};

export default Des;
