

const tryToParse = str => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return null;
    }
};
const parseIfNeeded = str => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return str;
    }
};


function indexOfLastMin(a) {
    let lowest = 0;
    for (let i = 1; i < a.length; i++) {
        if (a[i] <= a[lowest]) lowest = i;
    }
    return lowest;
}
