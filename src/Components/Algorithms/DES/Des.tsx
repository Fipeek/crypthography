import React, { useState } from "react";
import {
  applyPermutation,
  applyXOR,
  convertToBinaryString,
  generateBinaryKey,
  iterate,
  joinBlocks,
  shiftLeft,
  splitFileIntoBlocks,
  splitIntoBlocks,
  Tables,
} from "./utils";

import AlgorithmBox from "../../GenericAlgorithm/AlgorithmBox";
import { Box, Button, Typography } from "@mui/material";

const textDecoder = new TextDecoder("utf-8");
const key = generateBinaryKey(64);

const Des: React.FC = () => {
  const [encryptionInput, setEncryptionInput] = useState<string>("");
  const [decryptionInput, setDecryptionInput] = useState<string>("");
  const handleReadFromFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    const reader = new FileReader();
    if (file) {
      reader.onload = (e) => {
        setEncryptionInput(convertToBinaryString(reader.result as string));
      };
      reader.readAsBinaryString(file);
    }
  };
  const handleReadFromFileV2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] as File;
    const reader = new FileReader();
    if (file) {
      reader.onload = (e) => {
        setDecryptionInput(convertToBinaryString(reader.result as string));
      };
      reader.readAsBinaryString(file);
    }
  };

  const handleDes = (encryption: Boolean) => {
    // wczytujemy plik w postaci stringa przechowującego dane binarne
    const binaryInput = encryption ? encryptionInput : decryptionInput;
    console.log("wejscie binarnie: " + binaryInput);
    console.log("klucz:" + key);
    // rozbijamy na bloki po 64 bity
    let splittedInputIntoBlocks = splitFileIntoBlocks(binaryInput);
    if (!encryption) {
      splittedInputIntoBlocks = splitIntoBlocks(binaryInput, 64);
    }
    // pierwsza permutacja
    const blocksAfterFirstPermuation = splittedInputIntoBlocks.map((block) =>
      applyPermutation(block, Tables.initialPermutation)
    );
    // dzielimy bloki na dwie równe części
    const splittedBlocks = blocksAfterFirstPermuation.map((block) => {
      const splitedBlock = splitIntoBlocks(block, 32);
      const left = splitedBlock[0];
      const right = splitedBlock[1];
      return { left, right };
    });

    // pierwsza permutacja klucza
    const keyAfterPermutation = applyPermutation(key, Tables.keyPermutation);

    // dzielimy klucz na dwie równe części
    const splitedKey = {
      left: splitIntoBlocks(keyAfterPermutation, 28)[0],
      right: splitIntoBlocks(keyAfterPermutation, 28)[1],
    };

    const leftKeys: string[] = [];
    const rightKeys: string[] = [];
    const keys: string[] = [];

    // deklarujemy tablice bloków lewych i prawych
    const rightBlocks = splittedBlocks.map((block) => block.right);
    const leftBlocks = splittedBlocks.map((block) => block.left);

    const finalBlocks: string[] = [];

    for (let i = 0; i < 16; i++) {
      // wykonujemy przesunięcia bitowe na połówkach klucza, zapisując jego 16 wersji
      leftKeys.push(shiftLeft(splitedKey.left, Tables.IterateShiftAmount[i]));
      rightKeys.push(shiftLeft(splitedKey.right, Tables.IterateShiftAmount[i]));

      // łączymy połówki klucza
      keys.push(
        applyPermutation(
          joinBlocks(leftKeys[i], rightKeys[i]),
          Tables.keyPermutation2
        )
      );
    }

    // w przypadku odszyfrowywania klucze muszą być użyte w odwrotnej kolejności
    if (!encryption) {
      keys.reverse();
    }

    // dla kadego bloku danych
    for (let j = 0; j < splittedBlocks.length; j++) {
      let rightBlock = rightBlocks[j];
      let leftBlock = leftBlocks[j];
      // wykonujemy 16 iteracji głównej części algorytmu DES
      for (let i = 0; i < 16; i++) {
        // zapisujemy wartość i bloku prawego, po wykonanu operacji danej iteracji będzie on i-1 blokiem
        const ogRightBlock = rightBlock;
        // wykonujemy permutację rozszerzającą na i prawym bloku
        // 32bit -> 48bit
        rightBlock = applyPermutation(rightBlock, Tables.ePermutation);
        // wykonujemy operację modulo 2 na i prawym bloku oraz i kluczu
        rightBlock = applyXOR(rightBlock, keys[i]);
        // dzielimy i prawy blok na 8 bloków po 6 bitów i za pomocą tablic S zastępujemy każdy z nich 4 bitowym blokiem
        // 48bit -> 32bit
        rightBlock = iterate(rightBlock);
        // wykonujemy permutację P na i prawym bloku
        rightBlock = applyPermutation(rightBlock, Tables.pPermutation);
        // wykonujemy operację modulo 2 na i prawym bloku oraz i lewym bloku
        rightBlock = applyXOR(leftBlock, rightBlock);

        // i blok lewy staje się i-1 blokiem prawym
        leftBlock = ogRightBlock;
      }
      // bloki lewe i prawe są zamieniane miejscami i łączone w jeden blok
      let finalBlock = joinBlocks(rightBlock, leftBlock);
      // wykonujemy permutację końcową
      finalBlock = applyPermutation(
        finalBlock,
        Tables.inversedInitialPermutation
      );
      finalBlocks.push(finalBlock);
    }
    // łączymy bloki w jeden ciąg bitów i konwertujemy na tablicę 8 bitowych liczb w celu utworzenia pliku binarnego stanowiącego wynik algorytmu
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
    console.log("output text: " + finalText);
    console.log("output binary: " + finalBlocks);
  };
  return (
    <AlgorithmBox algorithmName="DES">
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
        }}
      >
        <Box display="flex" py={2}>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Encryption
            </Typography>
            <input
              style={{ fontSize: 16 }}
              type="file"
              onChange={handleReadFromFile}
            />
          </Box>
          <Button
            variant="contained"
            sx={{ fontSize: 16 }}
            onClick={() => handleDes(true)}
          >
            Encrypt
          </Button>
        </Box>
        <Box display="flex" py={2}>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Decryption
            </Typography>
            <input
              style={{ fontSize: 16 }}
              type="file"
              onChange={handleReadFromFileV2}
            />
          </Box>
          <Button
            variant="contained"
            sx={{ fontSize: 16 }}
            onClick={() => handleDes(false)}
          >
            Decrypt
          </Button>
        </Box>
      </Box>
    </AlgorithmBox>
  );
};

export default Des;
