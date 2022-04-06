<<<<<<< Updated upstream
class TeamData {

    constructor(team){
        const CollectTeamData = require('./CollectTeamData.js');
        const collector = new CollectTeamData(team);
        this.teamData = collector.getTeamData();
        this.defendedTeamData = collector.getDefendedTeamData();
        this.notDefendedTeamData = collector.getNotDefendedTeamData();
    }

    /*
    * Returns percent of times taxi achieved
    *
    * /
    /* (change when taxi) getTaxiRate(){
        return this.teamData['averages']['taxisAvg'] + '%';
    }*/

    //if you see this function no you didnt adn i dont want to talk abt it
    getTotalsLength() {
        return this.teamData['totals'].length;
    }

    getAverageHighAutoBalls(){
        return this.teamData['averages']['aHighsAvg'].toFixed(2);
    }
    getAverageLowAutoBalls(){
        return this.teamData['averages']['aLowsAvg'].toFixed(2);
    }
    getAverageAutoBalls() {
        return this.getAverageHighAutoBalls() + this.getAverageLowAutoBalls();
    }
    getAverageAutoScore(){ //doesnt include taxi??
        return this.teamData['averages']['aLowsAvg'].toFixed(2) * 2 
                + this.teamData['averages']['aHighsAvg'].toFixed(2) * 4 
                /*(change when taxi) + Math.round(this.getTaxiRate()) * 2*/; //adds taxi bonus if gets taxi 50% or more of the time
    }
    getAutoStandardDeviation () {  
        //need all of the auto scores in an array
        const AutoBalls = teamData['totals'];
        const n = AutoBalls.length;
        const mean = this.getAverageAutoBalls();
        if (!AutoBalls || AutoBalls.length === 0) {return 0;}
        return Math.sqrt(AutoBalls.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
    }
    getTeleStandardDeviation () {  
        //need all of the auto scores in an array
        const AutoBalls = teamData['totals'];
        const n = AutoBalls.length;
        const mean = this.getAverageAutoBalls();
        if (!AutoBalls || AutoBalls.length === 0) {return 0;}
        return Math.sqrt(AutoBalls.map(x => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n);
    }

    /*
    * Returns the percentage of balls succesfuly made in upper hub, auto
    *
    */
    getHighAutoRate(){
        return (this.teamData['rates']['aHighRate']*100).toFixed(2) + '%';
    }

    /*
    * Returns the percentage of balls succesfuly made in lower hub, auto
    *
    */
    getLowAutoRate(){
        return (this.teamData['rates']['aLowRate']*100).toFixed(2) + '%';
    }
    
    getAverageHighTeleBalls(){
        return this.teamData['averages']['tHighsAvg'].toFixed(2);
    }
    getAverageLowTeleBalls(){
        return this.teamData['averages']['tLowsAvg'].toFixed(2);
    }

    /*
    * Returns average amounts of tele lows + average amount of tele highs
    *
    */
    getAverageTeleScore(){
        return this.teamData['averages']['tLowsAvg'].toFixed(2) * 1 
                + this.teamData['averages']['tHighsAvg'].toFixed(2) * 2;
    }
    getHighTeleRate(){
        return (this.teamData['rates']['tHighRate']*100).toFixed(2) + '%';
    }
    getLowTeleRate(){
        return (this.teamData['rates']['tLowRate']*100).toFixed(2) + '%';
    }
    
    getTraversalRate(){
        return (this.teamData['rates']['travSucessRate']*100).toFixed(2) + '%';
    }
    getHighClimbRate(){
        return (this.teamData['rates']['highSucessRate']*100).toFixed(2) + '%';
    }
    getMidClimbRate(){
        return (this.teamData['rates']['midSucessRate']*100).toFixed(2) + '%';
    }
    getLowClimbRate(){
        return (this.teamData['rates']['lowSucessRate']*100).toFixed(2) + '%';
=======

const {getAllData} = require('./CollectTeamData');
const {getDefendedData} = require('./CollectTeamData');
const {getNotDefendedData} = require('./CollectTeamData');
const {getData} = require('./CollectTeamData');

function updateData(){

    getData();
    allData = getAllData();
    defendedData = getDefendedData();
    notDefendedData = getNotDefendedData();
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
>>>>>>> Stashed changes
    }

<<<<<<< Updated upstream
    /*
    * Returns (average telescore) + (average auto score) + (percent of games got x bar * bar points)
    *
    */
    getAverageScore(){
        
        let a = this.teamData['averages']['travsSAvg'];
        if (a == 'N/A'){
            a = 0;
        }
        let b =  this.teamData['averages']['highsSAvg'];
        if (b == 'N/A'){
            b = 0;
        }
        let c =  this.teamData['averages']['midsSAvg'];
        if (c == 'N/A'){
            c = 0;
        }
        let d =  this.teamData['averages']['lowsSAvg'];
        if (d == 'N/A'){
            d = 0;
        }
    
        return this.getAverageAutoScore() + this.getAverageTeleScore() 
                 + (a * 15).toFixed(2) + (b * 10).toFixed(2) + (c * 6).toFixed(2) + (d * 4).toFixed(2);
    }
    


    /*
    * Returns the total times the bots played offense
    */
    getTotalOffense(){
        return this.teamData['totals']['of'];
    }

    /*
    * Returns the total times the bots played defense
    */
    getTotalDefense(){
        return this.teamData['totals']['def'];
    }

    /*
    * Returns the percentage of games the bots played defense
    */
    getDefenseRate(){
        return (this.getTotalDefense / (this.getTotalDefense  + this.getTotalOffense) *100).toFixed(2) + '%';
    }

    /*
    * Returns the percentage of games the bots played defense
    */
    getOffenseRate(){
        return (100 - this.getDefenseRate()) + '%';
    }
=======
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
>>>>>>> Stashed changes

/*
* Returns the percentage of games the bots played defense
*/
function getOffenseRate(team){
    return (100 - getDefenseRate(team)) + '%';
}


<<<<<<< Updated upstream
    /*
    * Returns the number of games the bots been defended agaisnt
    */
    getTimesDefendedOn(){
        return this.teamData['totals']['defended'];
    }
    /*
    * Returns the percent of games the bots been defended agaisnt
    */
    getDefendedOnRate(){
        return (this.teamData['averages']['defendedAvg']*100).toFixed(2) + '%';
    }
=======

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
>>>>>>> Stashed changes


//-----------------------Same as above but for only games when the bots been defended agaisnt-----------

<<<<<<< Updated upstream
    getDefendedAverageHighTeleBalls(){
        return this.defendedTeamData['averages']['tHighsAvg'].toFixed(2);
    }
    getDefendedAverageLowTeleBalls(){
        return this.defendedTeamData['averages']['tLowsAvg'].toFixed(2);
    }
    getDefendedAverageTeleScore(){
        return this.defendedTeamData['averages']['tLowsAvg'].toFixed(2) * 1 + (this.defendedTeamData['averages']['tHighsAvg'] * 2).toFixed(2);
    }
    getDefendedHighTeleRate(){
        return (this.defendedTeamData['rates']['tHighRate']*100).toFixed(2) + '%';
    }
    getDefendedLowTeleRate(){
        return (this.defendedTeamData['rates']['tLowRate']*100).toFixed(2) + '%';
    }
    getDefendedAverageScore(){
        
        let a = this.defendedTeamData['averages']['travsSAvg'];
        if (a == 'N/A'){
            a = 0;
        }
        let b =  this.defendedTeamData['averages']['highsSAvg'];
        if (b == 'N/A'){
            b = 0;
        }
        let c =  this.defendedTeamData['averages']['midsSAvg'];
        if (c == 'N/A'){
            c = 0;
        }
        let d =  this.defendedTeamData['averages']['lowsSAvg'];
        if (d == 'N/A'){
            d = 0;
        }
    
        return this.getAverageAutoScore() + this.getDefendedAverageTeleScore() 
                 + (a * 15).toFixed(2) + (b * 10).toFixed(2) + (c * 6).toFixed(2) + (d * 4).toFixed(2);
=======

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
>>>>>>> Stashed changes
    }

    return getAverageAutoScore(team) + getDefendedAverageTeleScore(team) 
                + (a * 15).toFixed(2) + (b * 10).toFixed(2) + (c * 6).toFixed(2) + (d * 4).toFixed(2);
}


//-----------------------Same as above but for only games when the bot HASNT been defended agaisnt-----------


<<<<<<< Updated upstream
    getNotDefendedAverageHighTeleBalls(){
        return this.notDefendedTeamData['averages']['tHighsAvg'].toFixed(2);
    }
    getNotDefendedAverageLowTeleBalls(){
        return this.notDefendedTeamData['averages']['tLowsAvg'].toFixed(2);
    }
    getNotDefendedAverageTeleScore(){
        return (this.notDefendedTeamData['averages']['tLowsAvg'] * 1).toFixed(2) + (this.notDefendedTeamData['averages']['tHighsAvg'] * 2).toFixed(2);
    }
    getNotDefendedHighTeleRate(){
        return (this.notDefendedTeamData['rates']['tHighRate']*100).toFixed(2) + '%';
    }
    getNotDefendedLowTeleRate(){
        return (this.notDefendedTeamData['rates']['tLowRate']*100).toFixed(2) + '%';
    }

    getNotDefendedAverageScore(){
        
        let a = this.notDefendedTeamData['averages']['travsSAvg'];
        if (a == 'N/A'){
            a = 0;
        }
        let b =  this.notDefendedTeamData['averages']['highsSAvg'];
        if (b == 'N/A'){
            b = 0;
        }
        let c =  this.notDefendedTeamData['averages']['midsSAvg'];
        if (c == 'N/A'){
            c = 0;
        }
        let d =  this.notDefendedTeamData['averages']['lowsSAvg'];
        if (d == 'N/A'){
            d = 0;
        }
    
        return this.getAverageAutoScore() + this.getNotDefendedAverageTeleScore() 
                 + (a * 15).toFixed(2) + (b * 10).toFixed(2) + (c * 6).toFixed(2) + (d * 4).toFixed(2);
    }

}
module.exports = TeamData;
=======
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

module.exports =    {updateData,
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
>>>>>>> Stashed changes
