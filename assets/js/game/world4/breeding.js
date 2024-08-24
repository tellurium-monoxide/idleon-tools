function getTimeForShinyLevel(goal) {
    return Math.floor((1 + Math.pow(goal, 1.6)) * Math.pow(1.7, goal));
}

function getShinyLevel(time) {
    let lvl = 1;
    while (getTimeForShinyLevel(lvl) < time) {
        lvl += 1;
    }
    return lvl;
}


// not used anymore
// const DAYS_FOR_SHINY_LEVELS = [
//   3, // for lvl 1
//   11, // for lvl 2
//   11, // for lvl 3 //TODO
//   11, // for lvl 4 //TODO
//   85, // for lvl 5
//   200, // for lvl 6
//   448, // for lvl 7
//   964, // for lvl 8
//   2020, // for lvl 9
//   4110, // for lvl 10



// ]