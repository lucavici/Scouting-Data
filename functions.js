
const fs = require("fs");

fs.readFile("./data.json", "utf8", (err, jsonString) => {

    if (err) {
        console.log("Error reading file from disk:", err);
        return;
    }

    try {
        const data = JSON.parse(jsonString);
        //console.log(data[254][3].AHigh); //test
    } 
    
    catch (err) {
        console.log("Error parsing JSON string:", err);
    }
});

class TeamMatchData {

    constructor (match, team) {
        this.match = match;
        this.team = team;

        // retrieving the data from the json file
        const aHigh = data[team][match].aHigh;
        const aHighFail = data[team][match].aHighFail;
        const aLow = data[team][match].aLow;
        const aLowFail = data[team][match].aLowFail;
        const tHigh = data[team][match].aHigh;
        const tHighFail = data[team][match].tHighFail;
        const tLow = data[team][match].tLow;
        const tLowFail = data[team][match].tLowFail;
        const climbAttempted = data[team][match].climbAttempted;
        const climbActual = data[team][match].climbActual;
        const climbTime = data[team][match].climbTime;
        const defenseOffense = data[team][match].defenseOffense;
    }
    
    getAutoHigh() {
        return aHigh;
    }
    getAutoHighFail() {
        return aHighFail;
    }
    getAutoLow() {
        return aLow;
    }
    getAutoLowFail() {
        return aLowFail;
    }
    getTeleopHigh() {
        return tHigh;
    }
    getTeleopHighFail() {
        return tHighFail;
    }
    getTeleopLow() {
        return tLow;
    }
    getTeleopLowFail() {
        return tLowFail;
    }
    getClimbAttempted() {
        return climbAttempted;
    }
    getClimbActual() {
        return climbActual;
    }
    getClimbTime() {
        return climbTime;
    }
    getMatchDefenseStatus() {
        return defenseOffense;
    }
    getAutoCargo() {
        return aLow + aHigh;
    }
    getTeleCargo() {
        return tLow + tHigh;
    }
    getTotalCargo() {
        return aLow + aHigh + tLow + tHigh;
    }

    //computing team match accuracies
    
    getAutoMatchAccuracy() { 
        return (100 * (aLow + aHigh) / (aLow + aHigh + aLowFail + aHighFail)).toFixed(2) + "%";
    }
    getTeleopMatchAccuracy() {
        return (100 * (tLow + tHigh) / (tLow + tHigh + tLowFail + tHighFail)).toFixed(2) + "%"; 
    }
    
    //computing team match points

    getAutoPoints() {
        return (4 * aHigh) + (2 * aLow);
    }
    getTeleopPoints() {
        return (2 * tHigh) + tLow;
    }
    getTaxiPoints() {
        //john needs to write a google form question for this--worth 2 pts
        return 0;
    }

    getHangerPoints() {
        hangerPoints = 0;
        if (getClimbSuccess() == "Traversal") {
            hangerPoints += 15;
        } else if (getClimbSuccess() == "High") {
            hangerPoints += 10;
        } else if (getClimbSuccess() == "Mid") {
            hangerPoints += 6;
        } else if (getClimbSuccess() == "Low") {
            hangerPoints += 4;
        }
        return hangerPoints;
    }
    getTeamMatchPoints() {
        return getTaxiPoints() + getAutoPoints() + getTeleopPoints() + getHangerPoints();
    }
}

class AllianceData {

    constructor (match, T1, T2, T3, Opp1, Opp2, Opp3) {
        this.match = match;
        this.T1 = T1;
        this.T2 = T2;
        this.T3 = T3;
        //need opposing team objects to compute tie bonus
        this.Opp1 = Opp1;
        this.Opp2 = Opp2;
        this.Opp3 = Opp3;
        team1 = new TeamMatchData(match, T1);
        team2 = new TeamMatchData(match, T2);
        team3 = new TeamMatchData(match, T3);
        team4 = new TeamMatchData(match, Opp1);
        team5 = new TeamMatchData(match, Opp2);
        team6 = new TeamMatchData(match, Opp3);
        matchPoints = this.getAllianceMatchPoints;
        oppMatchPoints = this.getOppAllianceMatchPoints;
        cargoBonus = this.getCargoBonus;
        hangerBonus = this.getHangerBonus;
        tieBonus = this.getTieBonus;
    }
 
    getAllianceMatchPoints() {
        return team1.getTeamMatchPoints() + team2.getTeamMatchPoints() + team3.getTeamMatchPoints();
    }
    getOppAllianceMatchPoints() {
        return team4.getTeamMatchPoints() + team5.getTeamMatchPoints() + team6.getTeamMatchPoints();
    }
    
    // ranking points
    
    getCargoBonus() {
        rankingPoint = 0;
        autoCargo = team1.getAutoCargo() + team2.getAutoCargo() + team3.getAutoCargo();
        totalCargo = team1.getTotalCargo() + team2.getTotalCargo() + team3.getTotalCargo();
        if (autoCargo >= 5) {
            if (totalCargo >= 18) {
                rankingPoint++;
            }
        } else {
            if (totalCargo > 20) {
                rankingPoint++;
            }
        }
        return rankingPoint;
    }
    getHangerBonus() {
        rankingPoint = 0;
        totalHangerPoints = getHangerPoints(match, team1) + getHangerPoints(match, team2) + getHangerPoints(match, team3);
        if (totalHangerPoints >= 16) {
            rankingPoint++;
        }
        return rankingPoint;
    }
    getTieBonus() {
        rankingPoint = 0;
        if (matchPoints == oppMatchPoints) {
            rankingPoint++;
        }
        return rankingPoint;
    }

    getRankingPoints() {
        return cargoBonus + hangerBonus + tieBonus;
    }
}

class TeamData {
    constructor (team) {
        this.team = team;
    }

    getData(data){
    
        const tastyData = {};
    
        for (const [key, value] of Object.entries(data)){
        const totals = this.cycleData(value, data);
        const averages = this.getAvgs(value, totals);
        const rates = this.getRates(totals);
        tastyData[key] = {};
        tastyData[key]['totals'] = totals;
        tastyData[key]['averages'] = averages;
        tastyData[key]['rates'] = rates;
        }
        return tastyData;
    }

    cycleData(data) {
      
        const teamTotals = {

            aHighs : parseInt(0),
            aHighsF : parseInt(0),
            aLows : parseInt(0),
            aLowsF : parseInt(0),

            tHighs : parseInt(0),
            tHighsF : parseInt(0),
            tLows : parseInt(0),
            tLowsF : parseInt(0),

            travsA : parseInt(0),
            travsS : parseInt(0),
            highsA : parseInt(0),
            highsS : parseInt(0),
            midsA : parseInt(0),
            midsS : parseInt(0),
            lowsA : parseInt(0),
            lowsS : parseInt(0),
            time : parseInt(0),

            def : parseInt(0),
            of : parseInt(0),
        }
    
        for (const [key, match] of Object.entries(team)){
    
            for (let i = 0; i < 8; i++){
                teamTotals[Object.keys(teamTotals)[i]] += parseInt(match[Object.keys(match)[i]]);
            }
    
            if (match['climbAttempted'] == 'Traversal'){
                teamTotals['travsA']++;
            } else if (match['climbAttempted'] == 'High'){
                teamTotals['highsA']++;
            } else if (match['climbAttempted'] == 'Mid'){
                teamTotals['midsA']++;
            }
        
            if (match['climbActual'] == 'Traversal'){
                teamTotals['travsS']++;
            } else if (match['climbActual'] == 'High'){
                teamTotals['highsS']++;
            } else if (match['climbActual'] == 'Mid'){
                teamTotals['midsS']++;
            }

            teamTotals['time'] += parseInt(match['climbTime']);
        
            if (match['defenseOffense'] == 'Offensive'){
                teamTotals['of']++;
            } else {
                teamTotals['def']++;
            }
        }
        return teamTotals;
    }

    getAvgs(totals){
        const teamAverages = {};
        for (const [key, value] of Object.entries(totals)){
            teamAverages[key] = value/Object.keys.length;
        }
        return teamAverages;
    }

    getRates(totals) {

        const teamRates = {

            aHighRate : parseInt(0),
            aLowRate : parseInt(0),
            
            tHighRate : parseInt(0),
            tLowRate : parseInt(0),

            travSucessRate : parseInt(0),
            highSucessRate : parseInt(0),
            midSucessRate : parseInt(0),
            lowSucessRate : parseInt(0),
        }

        let i;
        for (i = 0; i < 8; i++){
            if (totals[Object.keys(totals)[i]] + totals[Object.keys(totals)[i+1]] == 0){
                teamRates[Object.keys(teamRates)[i/2]] = 'N/A';
                i++;
            } else {
                teamRates[Object.keys(teamRates)[i/2]] = totals[Object.keys(totals)[i]]/(totals[Object.keys(totals)[i]] + totals[Object.keys(totals)[i + 1]]);
                i++;
            }
        }
        for (i = i; i < 16; i++){
            if (totals[Object.keys(totals)[i+1]] == 0){
                teamRates[Object.keys(teamRates)[i/2]] = 'N/A';
                i++;
            } else {
                teamRates[Object.keys(teamRates)[i/2]] = totals[Object.keys(totals)[i]]/totals[Object.keys(totals)[i + 1]];
                i++;
            }
        }
        return teamRates;
    }

    getAutoHighRate() {   
    }
    
    getAutoLowRate() {   
    }

    getTeleHighRate() {   
    }

    getTeleLowRate() {   

    }
    getAutoHighAverage() {

    }
    getAutoLowAverage() {

    }
    getTeleHighAverage() {

    }
    getTeleLowAverage() {

    }
    //etc
}

class Probability {

}

// pull info about a chosen match from bluealliance
class MatchData {

    constructor (match) {
        this.match = match;
    }
    
    getR1() {
    }
    getR2() {
    }
    getR3() {
    }
    getB1() {
    }
    getB2() {
    }
    getB3() {
    }
    getTeamNumber(pos) {
    }

    //get probability calculations from another class
}







