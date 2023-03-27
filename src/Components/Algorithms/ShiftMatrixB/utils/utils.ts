export const shiftMatrixB = (text : string, key : string) => {
    const columns = key.length;
    const textWithNoSpaces = text.replaceAll(' ', '');
    const rows = textWithNoSpaces.length % columns == 0 ? textWithNoSpaces.length / columns : Math.floor(textWithNoSpaces.length / columns) + 1;
    const matrix = new Array(rows);

    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(columns);
    }

    const sortedKey = key.split('').sort().join('');
    const orderArray = new Array(key.length);
    orderArray.fill(-1);
    fillOrderArray(key, sortedKey, orderArray);
    
    let index = 0;

    //uzupełnianie tablicy
    
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = textWithNoSpaces.length > index ? textWithNoSpaces.charAt(index) : " ";
            index++;
        }
    }
    
    
    let result = "";

    //uzupelnianie finałowej zaszyfrowanej treści
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            if (matrix[j][orderArray[i]] != " ") {
                result += matrix[j][orderArray.indexOf(i)]
            }
        }
        result += " ";
    }

    return result;    
}

const fillOrderArray = (key : string, sortedKey : string, orderArray : number[]) => {

    for (let i = 0; i < sortedKey.length; i++) {
        for (let j = 0; j < key.length; j++) {
            if (key.charAt(j) == sortedKey.charAt(i)) {
                if (orderArray[j] == -1) {
                    orderArray[j] = i;
                    break;
                }
            }
        }
    }
    return orderArray;
}

export const shiftMatrixBDecrypt = (text : string, key : string) => {
    const columns = key.length;
    const textWithNoSpaces = text.replaceAll(' ', '');
    const rows = textWithNoSpaces.length % columns == 0 ? textWithNoSpaces.length / columns : Math.floor(textWithNoSpaces.length / columns) + 1;
    const matrix = new Array(rows);

    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(columns);
    }

    const sortedKey = key.split('').sort().join('');
    const orderArray = new Array(key.length);
    orderArray.fill(-1);
    fillOrderArray(key, sortedKey, orderArray);
    console.log(orderArray);
    
    let index = 0;

    //uzupełnianie tablicy
    for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
            matrix[j][orderArray.indexOf(i)] = text.charAt(index)
            index++;
        }
        if (text.charAt(index) == " ") {
            index++;
        }
    }
    
    let result = "";

    //uzupelnianie finałowej zaszyfrowanej treści
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == " ") {
                break;
            }
            result += matrix[i][j];
        }
    }

    return result;    
}