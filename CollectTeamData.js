class CollectTeamData {
    constructor (team) {

        this.fs = require("fs");
        this.BlueAlliance = require("bluealliance");
        this.tba = new this.BlueAlliance("wYuAaOjtoanexLjWHUWc1ayVQqKM3MjJ3ZTR7D9HGfRcKjljb075oEwpa7YecosQ");

        try{
            this.data = require('./data.json');
        }
        catch (err) {
            console.log("Error parsing JSON string:", err);
        }

        this.teamNum = parseInt(team);
        this.teamMatches = this.data[team];
        this.team_ = this.tba.getTeam(this.teamNum); //get team data from tba+store in var _team

        this.teamData = {};
        this.defendedTeamData = {};
        this.notDefendedTeamData = {};

        this.#getData();
        this.#getDefendedData();
    }

    getTeamNickname() {
        return team_.nickname;
    }
    getTeamRank() {
        return team_.rank;
    }

    #getData(){
        const totals = this.#cycleData(this.teamMatches);
        const averages = this.#getAvgs(totals, Object.keys(this.teamMatches).length);
        const rates = this.#getRates(totals);
        this.teamData = {};
        this.teamData['totals'] = totals;
        this.teamData['averages'] = averages;
        this.teamData['rates'] = rates;
        
        return this.teamData;
    }


    #getDefendedData(){
        const defendedData = {};
        const notDefendedData = {};
        for (const [key, match] of Object.entries(this.teamMatches)){
            if (match['defended'] == 'Yes'){
                defendedData[key] = match;
            } else {
                notDefendedData[key] = match;
            }
        }
        let totals = this.#cycleData(defendedData);
        let averages = this.#getAvgs(totals, Object.keys(defendedData).length);
        let rates = this.#getRates(totals);
        this.defendedTeamData = {};
        this.defendedTeamData['totals'] = totals;
        this.defendedTeamData['averages'] = averages;
        this.defendedTeamData['rates'] = rates;

        totals = this.#cycleData(notDefendedData);
        averages = this.#getAvgs(totals, Object.keys(notDefendedData).length);
        rates = this.#getRates(totals);
        this.notDefendedTeamData = {};
        this.notDefendedTeamData['totals'] = totals;
        this.notDefendedTeamData['averages'] = averages;
        this.notDefendedTeamData['rates'] = rates;

    }

    #cycleData(teamMatches) {
    
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

            defended : parseInt(0)
        }

        for (const [key, match] of Object.entries(teamMatches)){

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
            if (match['defended'] == 'Yes'){
                teamTotals['defended']++;
            }
        }
        return teamTotals;
    }

    #getAvgs(totals, numMatches){
        const teamAverages = {};
        for (const [key, value] of Object.entries(totals)){
            teamAverages[key + "Avg"] = value/numMatches;
        }
        return teamAverages;
    }

    #getRates(totals) {

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


    getTeamData(){
        return this.teamData;
    }
    getDefendedTeamData(){
        return this.defendedTeamData;
    }
    getNotDefendedTeamData(){
        return this.notDefendedTeamData;
    }
}
module.exports = CollectTeamData;