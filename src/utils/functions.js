export const compareCatsArrays = (array1, array2, array3) => {
    if (array1?.length !== 4 || array2?.length !== 4 || array3?.length !== 4) {
        return false;
    }
    let valid = false;
    let validString = "";
    let catIds = [];

    for (let i = 0; i < 4; i++) {
        const char1 = array1[i];
        const char2 = array2[i];
        const char3 = array3[i];

        if (
            (char1 === char2 && char2 === char3 && char1 === char3) ||
            (char1 !== char2 && char2 !== char3 && char1 !== char3)
        ) {
            validString = `${char1}${char2}${char3}`;
            catIds = [array1, array2, array3];
            valid = true;
            break;
        }
    }
    return { valid, validString, catIds };
};

export const checkIfCatsAreUnique = (array1, array2) => {
    if (array1.length !== 3 || array2.length !== 3) {
        throw new Error("Arrays must contain three elements each");
    }

    let allCatIdsFound = true;

    for (let i = 0; i < array1.length; i++) {
        let found = false;
        for (let j = 0; j < array2.length; j++) {
            if (array1[i] === array2[j]) {
                found = true;
                break;
            }
        }
        if (!found) {
            allCatIdsFound = false;
            break;
        }
    }

    return !allCatIdsFound;
};

export const gameOver = () => {
    console.log("game over!");
};

export const successMessage = {
    title: "Congratulations!",
    content: "Those cats get along",
};

export const lastSuccessMessage = {
    title: "Congratulations!",
    content: "Those cats get along, game over!",
};

export const errorMessage = {
    title: "Oops",
    content: "Those cats do not get along",
};

export const duplicateClowderMessage = {
    title: "Oops",
    content: "You have already used these three cats in a clowder ,try again",
};

const array1 = Array.from({ length: 3 }, () => []);
const array2 = Array.from({ length: 3 }, () => []);
const array3 = Array.from({ length: 3 }, () => []);
const array4 = Array.from({ length: 3 }, () => []);
export { array1, array2, array3, array4 };

export const getTodaysDate = () => {
    const today = new Date();

    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];

    const dayOfWeek = weekdays[today.getDay()];
    const monthName = months[today.getMonth()];
    const dayOfMonth = today.getDate();
    const year = today.getFullYear();

    return `${dayOfWeek}, ${monthName} ${dayOfMonth}, ${year}`;
};
