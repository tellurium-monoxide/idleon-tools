

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



number_notations = ["", "k", "M", "B", "T", "Q", "QQ", "QQQ", "e24", "e27"]
function formatIdleonNumbers(value) {
    if (value < 1000) {
        return value.toFixed(2)
    } else {
        let notation_id = Math.floor(Math.log(value) / Math.log(1000))


        let reduced_value = (value / Math.pow(1000, notation_id))
        let decimals = 3 - Math.floor(Math.log(reduced_value) / Math.log(10))
        let numeral_part = reduced_value.toFixed(decimals)
        let symbol = number_notations[notation_id]

        return (numeral_part + symbol)
    }
}


const formatTime = (time_in_seconds) => {

    let time = time_in_seconds
    let s = 1
    let m = 60 * s
    let h = 60 * m
    let d = 24 * h
    let y = 365 * d

    let accounted = 0

    let years = Math.floor(time / y);
    accounted += y * years
    let days = Math.floor((time - accounted) / d);
    accounted += d * days
    let hour = Math.floor((time - accounted) / h);
    accounted += h * hour
    let minutes = Math.floor((time - accounted) / m);
    accounted += m * minutes
    let seconds = Math.floor((time - accounted) / s);
    accounted += s * seconds

    let milliseconds = (time * 1000) % 1000

    let hourTxt = hour;
    let minutesTxt = minutes
    let secondsTxt = seconds
    if (hour < 10) {
        hourTxt = `0${hour}`
    }
    if (minutes < 10) {
        minutesTxt = `0${minutes}`
    }
    if (seconds < 10) {
        secondsTxt = `0${seconds}`
    }
    if (years > 10000) {
        return `${years.toExponential()}y${days}d`
    } else if (years > 0) {
        return `${years}y${days}d`
    } else if (days > 10) {
        return `${days}d${hourTxt}h`
    } else if (days > 0) {
        return `${days}d${hourTxt}h${minutesTxt}m`
    } else if (hour > 0) {
        return `${hourTxt}h${minutesTxt}m${secondsTxt}s`
    } else if (minutes > 0) {
        return `${minutesTxt}m${secondsTxt}s`
    } else if (seconds > 0) {
        return `${secondsTxt}.${milliseconds.toFixed(0)}s`
    } else {
        return `${milliseconds.toFixed(2)}ms`
    }
}
