import { ALFABETH_LENGTH } from "../../../../config/config";

export const vigenerCypher = (input: string, key: string): string => {
  if (!key) return input;
  const splittedInput = input.split("");
  const splittedKey = key.split("");

  const result = splittedInput.map((char, index) => {
    const charCode = char.charCodeAt(0);
    const keyCharCode = splittedKey[index % splittedKey.length].charCodeAt(0);

    if (charCode >= 65 && charCode <= 90) {
      return String.fromCharCode(
        ((charCode - 65 + keyCharCode - 65) % ALFABETH_LENGTH) + 65
      );
    } else if (charCode >= 97 && charCode <= 122) {
      return String.fromCharCode(
        ((charCode - 97 + keyCharCode - 97) % ALFABETH_LENGTH) + 97
      );
    }
    return char;
  });
  return result.join("");
};

export const decryptVigenerCypher = (input: string, key: string): string => {
  if (!key) return input;
  const splittedInput = input.split("");
  const splittedKey = key.split("");

  const result = splittedInput.map((char, index) => {
    const charCode = char.charCodeAt(0);
    const keyCharCode = splittedKey[index % splittedKey.length].charCodeAt(0);

    if (charCode >= 65 && charCode <= 90) {
      return String.fromCharCode(
        ((charCode - 65 - keyCharCode + 65 + ALFABETH_LENGTH) %
          ALFABETH_LENGTH) +
          65
      );
    } else if (charCode >= 97 && charCode <= 122) {
      return String.fromCharCode(
        ((charCode - 97 - keyCharCode + 97 + ALFABETH_LENGTH) %
          ALFABETH_LENGTH) +
          97
      );
    }
    return char;
  });
  return result.join("");
};
