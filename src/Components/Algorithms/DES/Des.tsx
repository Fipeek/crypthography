import React, { useEffect, useState } from "react";
import {
  applyPermutation,
  applyXOR,
  binaryToString,
  // convertFromBinaryToDecimal,
  convertToBinary,
  convertToBinaryArray,
  // convertToBinaryToString,
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

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder("utf-8");
const key = generateBinaryKey(64);
// const key = "1110001101011001010110001000100101010010100010001111111101000101";
// const key = "1111101011011000111111110011111010101101100100111101111111110111";
// const key = "1111111011100110001111000101111001101110110001010111100000000000";
// const key = "1011010101000010101000001100000001110111111011111001001101110000"; //klucz gdy przeniesione nizej minusblock

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
        setInputV2(convertToBinaryArray(reader.result as string));
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleDes = (encryption: Boolean) => {
    let binaryInput = convertToBinaryArray(input); //✅
    if (!encryption) {
      binaryInput = inputV2;
    }
    console.log("wejscie binarnie: " + binaryInput);
    // console.log("🔪dlugosc wejscia: " + binaryInput.length);
    console.log("klucz:" + key);
    // _________________________________________________________________________
    // rozbijamy na bloki po 64 bity
    let splittedInputIntoBlocks = splitFileIntoBlocks(binaryInput);
    if (!encryption) {
      splittedInputIntoBlocks = splitIntoBlocks(binaryInput, 64);
    }

    console.log("🔪wejscie binarnie bloki: " + splittedInputIntoBlocks);
    // _________________________________________________________________________
    // permutacja początkowa
    // _________________________________________________________________________
    const blocksAfterFirstPermuation = splittedInputIntoBlocks.map((block) =>
      applyPermutation(block, Tables.initialPermutation)
    ); //blocksAfterFirstPermuation
    // _________________________________________________________________________
    // rozbijamy na lewą i prawą część
    // _________________________________________________________________________
    const blocksAfterFirstStep = blocksAfterFirstPermuation.map((block) => {
      const splitedBlock = splitIntoBlocks(block, 32);
      const left = splitedBlock[0];
      const right = splitedBlock[1];
      return { left, right };
    });

    const keyAfterPermutation = applyPermutation(key, Tables.keyPermutation);

    const splitedKey = {
      left: splitIntoBlocks(keyAfterPermutation, 28)[0],
      right: splitIntoBlocks(keyAfterPermutation, 28)[1],
    };

    const leftKeys: string[] = [];

    const rightKeys = [];
    const keys: string[] = [];
    let nthRightBlocks = blocksAfterFirstStep.map((block) => block.right);

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

    if (!encryption) {
      keys.reverse();
    }

    for (let j = 0; j < blocksAfterFirstStep.length; j++) {
      for (let i = 0; i < 16; i++) {
        const ogRightBlock = nthRightBlocks[j];
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
        nthRightBlocks[j] = applyXOR(nthLeftBlocks[j], nthRightBlocks[j]);

        nthLeftBlocks[j] = ogRightBlock;
      }
      let finalBlock = joinBlocks(nthRightBlocks[j], nthLeftBlocks[j]);
      finalBlock = applyPermutation(
        finalBlock,
        Tables.inversedInitialPermutation
      );
      finalBlocks.push(finalBlock);
    }
    const joinedBlocks = joinBlocks(...finalBlocks);
    const binaryArray = new Uint8Array(
      joinedBlocks.match(/.{1,8}/g)!.map((byte) => parseInt(byte, 2))
    );
    const uint8Array = new Uint8Array(binaryArray);
    const blob = new Blob([uint8Array], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const downloadWindow = window.open(url, "_blank");
    downloadWindow!.focus();
    URL.revokeObjectURL(url);
    const finalText = textDecoder.decode(binaryArray);
    console.log("🔪output text: " + finalText);
    console.log("🔪output binary: " + finalBlocks);

    console.log("-------------------------------------");
  };
  return (
    <AlgorithmBox algorithmName="DES">
      <input type="file" onChange={handleReadFromFile} />
      <Button onClick={() => handleDes(true)}>Encrypt</Button>
      <input type="file" onChange={handleReadFromFileV2} />
      <Button onClick={() => handleDes(false)}>Decrypt</Button>
    </AlgorithmBox>
  );
};

export default Des;
