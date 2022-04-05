
const fs = require("fs");

//to get blue alliance data
var BlueAlliance = require("bluealliance");
var tba = new BlueAlliance("wYuAaOjtoanexLjWHUWc1ayVQqKM3MjJ3ZTR7D9HGfRcKjljb075oEwpa7YecosQ");

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

export class TeamMatchData {

    constructor (match, team) {
        this.match = match;
        this.team = team;
        // retrieving the data from the json file
        aHigh = data[team][match].aHigh;
        aHighFail = data[team][match].aHighFail;
        aLow = data[team][match].aLow;
        aLowFail = data[team][match].aLowFail;
        tHigh = data[team][match].aHigh;
        tHighFail = data[team][match].tHighFail;
        tLow = data[team][match].tLow;
        tLowFail = data[team][match].tLowFail;
        climbAttempted = data[team][match].climbAttempted;
        climbActual = data[team][match].climbActual;
        climbTime = data[team][match].climbTime;
        defenseOffense = data[team][match].defenseOffense;
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

    getHangarPoints() {
        hangarPoints = 0;
        if (climbActual == "Traversal") {
            hangarPoints += 15;
        } else if (climbActual == "High") {
            hangarPoints += 10;
        } else if (climbActual == "Mid") {
            hangarPoints += 6;
        } else if (climbActual == "Low") {
            hangarPoints += 4;
        }
        return hangarPoints;
    }
    getTeamMatchPoints() {
        return getTaxiPoints() + getAutoPoints() + getTeleopPoints() + getHangarPoints();
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
        hangarBonus = this.getHangarBonus;
        tieBonus = this.getTieBonus;
    }
 
    getAllianceMatchPoints() {
        console.log("hi");
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
    getHangarBonus() {
        rankingPoint = 0;
        totalHangarPoints = getHangarPoints(match, team1) + getHangarPoints(match, team2) + getHangarPoints(match, team3);
        if (totalHangarPoints >= 16) {
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
    getWinBonus() {
        rankingPoint = 0;
        if (matchPoints >= oppMatchPoints) {
            rankingPoint+=2;
        }
        return rankingPoint;
    }

    getRankingPoints() {
        return cargoBonus + hangarBonus + tieBonus;
    }
}


// pull info about a chosen match from bluealliance
class MatchData {

    constructor (match) {
        this.match = match;
        event = await tba.getEvent('casj', 2017); // SVR 2017
        matches = await tba.getMatchesAtEvent(event);
        teams = tba.getTeamsInMatch(matches[match]); // 12th match
        R1 = teams.red[0];
        R2 = teams.red[1];
        R3 = teams.red[2];
        B1 = teams.blue[0];
        B2 = teams.blue[1];
        B3 = teams.blue[2];
    }
    
    getR1() {
        return "working";
    }
    getR2() {
        return R2;
    }
    getR3() {
        return R3;
    }
    getB1() {
        return B1;
    }
    getB2() {
        return B2;
    }
    getB3() {
        return B3;
    }
    // getTeamNumber(pos) {
    //     return tba.getTeamsInMatch(matches[match]);
    // }

    //get probability calculations from another class
}
