export const compareCatsArrays = (array1, array2, array3) => {
    if (array1?.length !== 4 || array2?.length !== 4 || array3?.length !== 4) {
        return false;
    }
    let valid = false;
    let validString = "";

    for (let i = 0; i < 4; i++) {
        const char1 = array1[i];
        const char2 = array2[i];
        const char3 = array3[i];

        if (
            (char1 === char2 && char2 === char3 && char1 === char3) ||
            (char1 !== char2 && char2 !== char3 && char1 !== char3)
        ) {
            validString = `${char1}${char2}${char3}`;
            valid = true;
            break;
        }
    }
    return { valid, validString };
};

export const checkIfArrayIsUnique = (string1, string2) => {
    const arr1 = string1.split("");
    const arr2 = string2.split("");

    arr1.sort();
    arr2.sort();

    for (let i = 0; i < 3; i++) {
        if (arr1[i] !== arr2[i]) {
            return true;
        }
    }

    return false;
};

const array1 = Array.from({ length: 3 }, () => []);
const array2 = Array.from({ length: 3 }, () => []);
const array3 = Array.from({ length: 3 }, () => []);
const array4 = Array.from({ length: 3 }, () => []);
export { array1, array2, array3, array4 };
