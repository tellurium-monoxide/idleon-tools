

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



number_notations = ["", "", "M", "B", "T", "Q", "QQ", "QQQ", "e24", "e27"]
function formatIdleonNumbers(value) {
    if (value < 1000000) {
        return value
    } else {
        let notation_id = Math.floor(Math.log(value) / Math.log(1000))


        let reduced_value = (value / Math.pow(1000, notation_id))
        let decimals = 3 - Math.floor(Math.log(reduced_value) / Math.log(10))
        let numeral_part = reduced_value.toFixed(decimals)
        let symbol = number_notations[notation_id]

        return (numeral_part + symbol)
    }
}