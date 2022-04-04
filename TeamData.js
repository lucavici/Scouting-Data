const fs = require("fs");
var BlueAlliance = require("bluealliance");
var tba = new BlueAlliance("wYuAaOjtoanexLjWHUWc1ayVQqKM3MjJ3ZTR7D9HGfRcKjljb075oEwpa7YecosQ");


class TeamDatax {
    constructor (team) {

        try{
            this.data = require('./data.json');
        }
        catch (err) {
            console.log("Error parsing JSON string:", err);
        }

        this.teamNum = parseInt(team);
        this.teamMatches = this.data[team];
        this.teamData = {};
        this.team_ = tba.getTeam(this.teamNum); //get team data from tba+store in var _team
        this.getData()
    }

    getTeamNickname() {
        return team_.nickname;
    }
    getTeamRank() {
        return team_.rank;
    }

    getData(data){
        const totals = this.cycleData();
        const averages = this.getAvgs(totals);
        const rates = this.getRates(totals);
        this.teamData = {};
        this.teamData['totals'] = totals;
        this.teamData['averages'] = averages;
        this.teamData['rates'] = rates;
        
        return this.teamData;
    }

    cycleData() {
      
        const teamTotals = {

            /*(change when taxi) taxis : parseInt(0), */
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
    
        for (const [key, match] of Object.entries(this.teamMatches)){
    
            /*(change when taxi) if (match['taxi'] == 'Yes'){
                teamTotals['taxis']++;
            }*/
            for (let i = 0/*(change when taxi) 1*/; i < 8/*(change when taxi) 9*/; i++){
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
            teamAverages[key + "Avg"] = value/Object.keys(this.teamMatches).length;
        }
        return teamAverages;
    }

    getRates(totals) {

        const teamRates = {

            /*(change when taxi) taxiRate : parseInt(0),*/
            aHighRate : parseInt(0),
            aLowRate : parseInt(0),
            
            tHighRate : parseInt(0),
            tLowRate : parseInt(0),

            travSucessRate : parseInt(0),
            highSucessRate : parseInt(0),
            midSucessRate : parseInt(0),
            lowSucessRate : parseInt(0),
        }

        let i = 0/*(change when taxi) 1*/;
        for (i = i; i < 8 /*(change when taxi) 9*/; i++){
            if (totals[Object.keys(totals)[i]] + totals[Object.keys(totals)[i+1]] == 0){
                teamRates[Object.keys(teamRates)[i/2]] = 'N/A';
                i++;
            } else {
                teamRates[Object.keys(teamRates)[i/2]] = totals[Object.keys(totals)[i]]/(totals[Object.keys(totals)[i]] + totals[Object.keys(totals)[i + 1]]);
                i++;
            }
        }
        for (i = i; i < 16 /*(change when taxi) 17*/; i++){
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

    /* (change when taxi) getTaxiRate(){
        return this.teamData['averages']['taxisAvg'] + '%';
    }*/
    getAverageHighAutoBalls(){
        return this.teamData['averages']['aHighsAvg'];
    }
    getAverageLowAutoBalls(){
        return this.teamData['averages']['aLowsAvg'];
    }
    getAverageAutoScore(){ //doesnt include taxi??
        return this.teamData['averages']['aLowsAvg'] * 2 + this.teamData['averages']['aHighsAvg'] * 4;
    }
    getHighAutoRate(){
        return this.teamData['rates']['aHighRate'] + '%';
    }
    getLowAutoRate(){
        return this.teamData['rates']['aLowRate'] + '%';
    }
    
    getAverageHighTeleBalls(){
        return this.teamData['averages']['tHighsAvg'];
    }
    getAverageLowTeleBalls(){
        return this.teamData['averages']['tLowsAvg'];
    }
    getAverageTeleScore(){
        console.log(this.teamData['averages']['tLowsAvg']);
        return this.teamData['averages']['tLowsAvg'] * 1 + this.teamData['averages']['tHighsAvg'] * 2;
    }
    getHighTeleRate(){
        return this.teamData['rates']['tHighRate'] + '%';
    }
    getLowTeleRate(){
        return this.teamData['rates']['tLowRate'] + '%';
    }
    
    getTraversalRate(){
        return this.teamData['rates']['travSucessRate'] + '%';
    }
    getHighClimbRate(){
        return this.teamData['rates']['highSucessRate'] + '%';
    }
    getMidClimbRate(){
        return this.teamData['rates']['midSucessRate'] + '%';
    }
    getLowClimbRate(){
        return this.teamData['rates']['lowSucessRate'] + '%';
    }
    
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
    
        return getAverageAutoScore() + getAverageTeleScore() 
                 + a * 15 + b * 10 + c * 6 + d * 4;
    }
    
    getTotalOffense(){
        return this.teamData['totals']['of'];
    }
    getTotalDefense(){
        return this.teamData['totals']['def'];
    }
    getDefenseRate(){
        return (this.getTotalDefense / (this.getTotalDefense  + this.getTotalOffense)) + '%';
    }
    getOffenseRate(){
        return (100 - this.getDefenseRate()) + '%';
    }

}








class Probability {
    
    constructor (match){
        event = tba.getEvent('casj', 2017); // SVR 2017
        matches = tba.getMatchesAtEvent(event);
        teams = tba.getTeamsInMatch(matches[match]);
        R1 = teams.red[0];
        R2 = teams.red[1];
        R3 = teams.red[2];
        B1 = teams.blue[0];
        B2 = teams.blue[1];
        B3 = teams.blue[2];

        //const r1Data = 
        
    }
}
const teamData = new TeamDatax(254);
console.log(teamData.getAverageTeleScore());