export const shiftMatrixA = (decryptedText : string, key : string, isEncrypt : boolean) => {
    const keyValues = key.split("-");
    console.log(keyValues);
    const keyValuesNumber = keyValues.map(key => +key);
    const max = Math.max(...keyValuesNumber);
    const rowCount = decryptedText.length % max == 0 ? decryptedText.length / max : Math.floor(decryptedText.length / max) + 1;
    const matrix = new Array(rowCount);

    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(max);
    }
    let emptyFieldCount = max - (decryptedText.length % max);

    if (!isEncrypt) {
        let ind = max - 1;
        while (emptyFieldCount > 0) {
            matrix[matrix.length - 1][ind] = "X"; 
            ind--;
            emptyFieldCount--;
        }
    }

    let index = 0;
    let keyIndex;

    //uzupełnianie tablicy
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (isEncrypt) { // szyfrowanie
                matrix[i][j] = decryptedText.length > index ? decryptedText.charAt(index) : " ";
                index++;
            }
            else { // odszyfrowywanie
                if (index >= decryptedText.length) {
                    break;
                }
                keyIndex = keyValuesNumber[j] - 1;

                if (matrix[i][keyIndex] != "X") {
                    matrix[i][keyIndex] = decryptedText.charAt(index)
                    index++;
                }
            }
        }
    }
    console.log(matrix);
    let result = "";

    //uzupelnianie finałowej zaszyfrowanej treści
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < max; j++) {
            if (isEncrypt) {
                index = keyValuesNumber[j] - 1;
            }
            else {
                index = j;
            }
            if (matrix[i][index] == " " || matrix[i][index] == "X") {
                continue;
            }
            result += matrix[i][index];
        }
    }

    return result;    
}