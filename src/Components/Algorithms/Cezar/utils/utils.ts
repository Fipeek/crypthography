import { ALFABETH_LENGTH } from "../../../../config/config";

export const cezarCypher = (input: string, stringKey: string): string => {
  const key = +stringKey;
  if (!key || key <= 0 || typeof key === "string") return input;
  const splittedInput = input.split("");
  const result = splittedInput.map((char) => {
    const charCode = char.charCodeAt(0);
    if (charCode >= 65 && charCode <= 90) {
      return String.fromCharCode(
        ((charCode - 65 + key) % ALFABETH_LENGTH) + 65
      );
    } else if (charCode >= 97 && charCode <= 122) {
      return String.fromCharCode(
        ((charCode - 97 + key) % ALFABETH_LENGTH) + 97
      );
    }
    return char;
  });
  return result.join("");
};
export const decryptCezarCypher = (
  input: string,
  stringKey: string
): string => {
  const key = +stringKey;
  if (!key || key <= 0) return input;
  const splittedInput = input.split("");
  const result = splittedInput.map((char) => {
    const charCode = char.charCodeAt(0);
    if (charCode >= 65 && charCode <= 90) {
      return String.fromCharCode(
        ((charCode - 65 - key + ALFABETH_LENGTH) % ALFABETH_LENGTH) + 65
      );
    } else if (charCode >= 97 && charCode <= 122) {
      return String.fromCharCode(
        ((charCode - 97 - key + ALFABETH_LENGTH) % ALFABETH_LENGTH) + 97
      );
    }
    return char;
  });
  return result.join("");
};
