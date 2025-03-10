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
