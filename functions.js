
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
        this.team1 = new TeamMatchData(match, T1);
        this.team2 = new TeamMatchData(match, T2);
        this.team3 = new TeamMatchData(match, T3);
        this.team4 = new TeamMatchData(match, Opp1);
        this.team5 = new TeamMatchData(match, Opp2);
        this.team6 = new TeamMatchData(match, Opp3);
        this.matchPoints = this.getAllianceMatchPoints;
        this.oppMatchPoints = this.getOppAllianceMatchPoints;
        this.cargoBonus = this.getCargoBonus;
        this.hangarBonus = this.getHangarBonus;
        this.tieBonus = this.getTieBonus;
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

//module.exports = TeamMatchData;

