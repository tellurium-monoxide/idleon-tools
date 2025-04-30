

function calcGrowingValue(grow, level) {
    if (grow.max) {
        level = Math.min(grow.max, level)
    }
    if (grow.type == "decay") {
        return (grow.x1 * level / (level + grow.x2))
    } else if (grow.type == "decayMulti") {
        return (1 + (level * grow.x1) / (level + grow.x2))
    } else if (grow.type == "add") {
        return (grow.x1 * level)
    } else if (grow.type == "intervalAdd") {
        return (grow.x1 * Math.floor(level / grow.x2))
    } else if (grow.type == "bigBase") {
        return (grow.x1 + grow.x2 * level)
    } else if (grow.type == "vaultCost") {
        return ((level + (grow.x1 + level) * Math.pow(grow.x2, level)))
    } else if (grow.type == "vaultSpecial") {
        let val = level * grow.x1
        for (let [id, pair] of grow.addThresholds.entries()) {
            val += pair[1] * Math.max(0, level - pair[0])
        }
        for (let [id, pair] of grow.multiThresholds.entries()) {
            val *= 1 + pair[1] * Math.floor(level / pair[0])
        }
        return val
    } else {
        throw new Error(`calcGrowingValue not defined for type ${grow.type}`)
    }
}
function calcGrowingValueMax(grow) {
    if (grow.max) {
        return calcGrowingValue(grow, grow.max)
    } else if (grow.type == "decay") {
        return (grow.x1)
    } else if (grow.type == "decayMulti") {
        return (1 + (grow.x1))
    } else if (grow.type == "add") {
        return (Infinity)
    } else if (grow.type == "bigBase") {
        return (Infinity)
    } else if (grow.type == "vaultCost") {
        return ((level + (grow.x1 + level) * Math.pow(grow.x2, level)))
    } else if (grow.type == "vaultSpecial") {
        let val = level * grow.x1
        for (let [id, pair] of grow.addThresholds.entries()) {
            val += pair[1] * Math.max(0, level - pair[0])
        }
        for (let [id, pair] of grow.multiThresholds.entries()) {
            val *= 1 + pair[1] * Math.floor(level / pair[0])
        }
        return val
    } else {
        throw new Error(`calcGrowingValueMax not defined for type ${grow.type}`)
    }
}
function lavaLog(val) {
    return Math.log(Math.max(val, 1)) / 2.30259;
}
function lavaLog2(val) {
    return Math.log(Math.max(val, 1)) / Math.log(2);
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function formatName(name) {
    let words = name.split(/[_ ]/)
    let result = ""
    for (let word of words) {
        result += capitalizeFirstLetter(word.toLowerCase()) + " "
    }
    return result.slice(0, -1);
}

function indexOfLastMin(a) {
    let lowest = 0;
    for (let i = 1; i < a.length; i++) {
        if (a[i] <= a[lowest]) lowest = i;
    }
    return lowest;
}

function formatPercent(fraction) {
    return `${(fraction * 100).toFixed(2)}%`
};


const number_notations = ["", "k", "M", "B", "T", "Q", "QQ", "QQQ", "e24", "e27"]
function formatIdleonNumbers(value) {
    if (value < 1000000) {
        return value.toFixed(0).padStart(6, " ")
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
