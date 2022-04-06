
const {getAllData} = require('./CollectTeamData');
const {getDefendedData} = require('./CollectTeamData');
const {getNotDefendedData} = require('./CollectTeamData');
const {getData} = require('./CollectTeamData');

function updateTeamData(){

    allData = getAllData();
    defendedData = getDefendedData();
    notDefendedData = getNotDefendedData();

    console.log('Updated getter data (TeamData.js)');
}

/*
* Returns percent of times taxi achieved
*
* /
/* (change when taxi) function getTaxiRate(team){
    return allData[team]['averages']['taxisAvg'] + '%';
}*/

//if you see this function no you didnt adn i dont want to talk abt it
function getTotalsLength(team) {
    return allData[team]['totals'].length;
}

function getAverageHighAutoBalls(team){
    return allData[team]['averages']['aHighsAvg'].toFixed(2);
}
function getAverageLowAutoBalls(team){
    return allData[team]['averages']['aLowsAvg'].toFixed(2);
}
function getAverageAutoBalls(team) {
    return getAverageHighAutoBalls(team) + getAverageLowAutoBalls(team);
}
function getAverageAutoScore(team){ //doesnt include taxi??
    return allData[team]['averages']['aLowsAvg'].toFixed(2) * 2 
            + allData[team]['averages']['aHighsAvg'].toFixed(2) * 4 
            /*(change when taxi) + Math.round(getTaxiRate(team)) * 2*/; //adds taxi bonus if gets taxi 50% or more of the time
}
function getAutoStandardDeviation (team) {  
    //need all of the auto scores in an array
    const AutoBalls = allData[team]['totals'];
    const n = AutoBalls.length;
    const mean = getAverageAutoBalls(team);
    if (!AutoBalls || AutoBalls.length === 0) {return 0;}
    return Math.sqrt(AutoBalls.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
}
function getTeleStandardDeviation (team) {  
    //need all of the auto scores in an array
    const AutoBalls = allData[team]['totals'];
    const n = AutoBalls.length;
    const mean = getAverageAutoBalls(team);
    if (!AutoBalls || AutoBalls.length === 0) {return 0;}
    return Math.sqrt(AutoBalls.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
}

/*
* Returns the percentage of balls succesfuly made in upper hub, auto
*
*/
function getHighAutoRate(team){
    console.log(allData[team]);
    return (allData[team]['rates']['aHighRate']*100).toFixed(2) + '%';
}

/*
* Returns the percentage of balls succesfuly made in lower hub, auto
*
*/
function getLowAutoRate(team){
    return (allData[team]['rates']['aLowRate']*100).toFixed(2) + '%';
}

function getAverageHighTeleBalls(team){
    return allData[team]['averages']['tHighsAvg'].toFixed(2);
}
function getAverageLowTeleBalls(team){
    return allData[team]['averages']['tLowsAvg'].toFixed(2);
}

/*
* Returns average amounts of tele lows + average amount of tele highs
*
*/
function getAverageTeleScore(team){
    return allData[team]['averages']['tLowsAvg'].toFixed(2) * 1 
            + allData[team]['averages']['tHighsAvg'].toFixed(2) * 2;
}
function getHighTeleRate(team){
    return (allData[team]['rates']['tHighRate']*100).toFixed(2) + '%';
}
function getLowTeleRate(team){
    return (allData[team]['rates']['tLowRate']*100).toFixed(2) + '%';
}

function getTraversalRate(team){
    return (allData[team]['rates']['travSucessRate']*100).toFixed(2) + '%';
}
function getHighClimbRate(team){
    return (allData[team]['rates']['highSucessRate']*100).toFixed(2) + '%';
}
function getMidClimbRate(team){
    return (allData[team]['rates']['midSucessRate']*100).toFixed(2) + '%';
}
function getLowClimbRate(team){
    return (allData[team]['rates']['lowSucessRate']*100).toFixed(2) + '%';
}


/*
* Returns (average telescore) + (average auto score) + (percent of games got x bar * bar points)
*
*/
function getAverageScore(team){
    
    let a = allData[team]['averages']['travsSAvg'];
    if (a == 'N/A'){
        a = 0;
    }
    let b =  allData[team]['averages']['highsSAvg'];
    if (b == 'N/A'){
        b = 0;
    }
    let c =  allData[team]['averages']['midsSAvg'];
    if (c == 'N/A'){
        c = 0;
    }
    let d =  allData[team]['averages']['lowsSAvg'];
    if (d == 'N/A'){
        d = 0;
    }

    return getAverageAutoScore(team) + getAverageTeleScore(team) 
                + (a * 15).toFixed(2) + (b * 10).toFixed(2) + (c * 6).toFixed(2) + (d * 4).toFixed(2);
}



/*
* Returns the total times the bots played offense
*/
function getTotalOffense(team){
    return allData[team]['totals']['of'];
}

/*
* Returns the total times the bots played defense
*/
function getTotalDefense(team){
    return allData[team]['totals']['def'];
}

/*
* Returns the percentage of games the bots played defense
*/
function getDefenseRate(team){
    return (getTotalDefense() / (getTotalDefense()  + getTotalOffense()) *100).toFixed(2) + '%';
}

/*
* Returns the percentage of games the bots played defense
*/
function getOffenseRate(team){
    return (100 - getDefenseRate(team)) + '%';
}



/*
* Returns the number of games the bots been defended agaisnt
*/
function getTimesDefendedOn(team){
    return allData[team]['totals']['defended'];
}
/*
* Returns the percent of games the bots been defended agaisnt
*/
function getDefendedOnRate(team){
    return (allData[team]['averages']['defendedAvg']*100).toFixed(2) + '%';
}


//-----------------------Same as above but for only games when the bots been defended agaisnt-----------


function getDefendedAverageHighTeleBalls(team){
    return defendedData[team]['averages']['tHighsAvg'].toFixed(2);
}
function getDefendedAverageLowTeleBalls(team){
    return defendedData[team]['averages']['tLowsAvg'].toFixed(2);
}
function getDefendedAverageTeleScore(team){
    return defendedData[team]['averages']['tLowsAvg'].toFixed(2) * 1 + (defendedData[team]['averages']['tHighsAvg'] * 2).toFixed(2);
}
function getDefendedHighTeleRate(team){
    return (defendedData[team]['rates']['tHighRate']*100).toFixed(2) + '%';
}
function getDefendedLowTeleRate(team){
    return (defendedData[team]['rates']['tLowRate']*100).toFixed(2) + '%';
}
function getDefendedAverageScore(team){
    
    let a = defendedData[team]['averages']['travsSAvg'];
    if (a == 'N/A'){
        a = 0;
    }
    let b =  defendedData[team]['averages']['highsSAvg'];
    if (b == 'N/A'){
        b = 0;
    }
    let c =  defendedData[team]['averages']['midsSAvg'];
    if (c == 'N/A'){
        c = 0;
    }
    let d =  defendedData[team]['averages']['lowsSAvg'];
    if (d == 'N/A'){
        d = 0;
    }

    return getAverageAutoScore(team) + getDefendedAverageTeleScore(team) 
                + (a * 15).toFixed(2) + (b * 10).toFixed(2) + (c * 6).toFixed(2) + (d * 4).toFixed(2);
}


//-----------------------Same as above but for only games when the bot HASNT been defended agaisnt-----------


function getNotDefendedAverageHighTeleBalls(team){
    return notDefendedData[team]['averages']['tHighsAvg'].toFixed(2);
}
function getNotDefendedAverageLowTeleBalls(team){
    return notDefendedData[team]['averages']['tLowsAvg'].toFixed(2);
}
function getNotDefendedAverageTeleScore(team){
    return (notDefendedData[team]['averages']['tLowsAvg'] * 1).toFixed(2) + (notDefendedData[team]['averages']['tHighsAvg'] * 2).toFixed(2);
}
function getNotDefendedHighTeleRate(team){
    return (notDefendedData[team]['rates']['tHighRate']*100).toFixed(2) + '%';
}
function getNotDefendedLowTeleRate(team){
    return (notDefendedData[team]['rates']['tLowRate']*100).toFixed(2) + '%';
}

function getNotDefendedAverageScore(team){
    
    let a = notDefendedData[team]['averages']['travsSAvg'];
    if (a == 'N/A'){
        a = 0;
    }
    let b =  notDefendedData[team]['averages']['highsSAvg'];
    if (b == 'N/A'){
        b = 0;
    }
    let c =  notDefendedData[team]['averages']['midsSAvg'];
    if (c == 'N/A'){
        c = 0;
    }
    let d =  notDefendedData[team]['averages']['lowsSAvg'];
    if (d == 'N/A'){
        d = 0;
    }

    return getAverageAutoScore(team) + getNotDefendedAverageTeleScore(team) 
                + (a * 15).toFixed(2) + (b * 10).toFixed(2) + (c * 6).toFixed(2) + (d * 4).toFixed(2);
}

module.exports =    {updateTeamData,
                    getTotalsLength,
                    getAverageHighAutoBalls,
                    getAverageLowAutoBalls,
                    getAverageAutoBalls,
                    getAverageAutoScore,
                    getAutoStandardDeviation ,
                    getTeleStandardDeviation ,
                    getHighAutoRate,
                    getLowAutoRate,
                    getAverageHighTeleBalls,
                    getAverageLowTeleBalls,
                    getAverageTeleScore,
                    getHighTeleRate,
                    getLowTeleRate,
                    getTraversalRate,
                    getHighClimbRate,
                    getMidClimbRate,
                    getLowClimbRate,
                    getAverageScore,
                    getTotalOffense,
                    getTotalDefense,
                    getDefenseRate,
                    getOffenseRate,
                    getTimesDefendedOn,
                    getDefendedOnRate,
                    getDefendedAverageHighTeleBalls,
                    getDefendedAverageLowTeleBalls,
                    getDefendedAverageTeleScore,
                    getDefendedHighTeleRate,
                    getDefendedLowTeleRate,
                    getDefendedAverageScore,
                    getNotDefendedAverageHighTeleBalls,
                    getNotDefendedAverageLowTeleBalls,
                    getNotDefendedAverageTeleScore,
                    getNotDefendedHighTeleRate,
                    getNotDefendedLowTeleRate,
                    getNotDefendedAverageScore,}
