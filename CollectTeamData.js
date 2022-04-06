class CollectTeamData {

    static #fs;
    static #BlueAlliance;
    static #tba;

    static TeamData;

    static #data;

    static #allData; //ALL data for every team
    static #defendedData; //data for when teams have had defense applied to them
    static #notDefendedData; //data for when  teams dont have defense applied to them
    static teamData;

    static {

        this.#fs = require("fs");
        this.#BlueAlliance = require("bluealliance");
        this.#tba = new this.#BlueAlliance("wYuAaOjtoanexLjWHUWc1ayVQqKM3MjJ3ZTR7D9HGfRcKjljb075oEwpa7YecosQ");

        this.TeamData = require('./TeamData.js');
        this.teamData = new TeamData();
        

        try{
            this.#data = require('./data.json');
        }
        catch (err) {
            console.log("Error parsing JSON string:", err);
        }


        this.#allData = {}; //ALL data for every team
        this.#defendedData = {}; //data for when teams have had defense applied to them
        this.#notDefendedData = {}; //data for when  teams dont have defense applied to them
        this.getData();

    }


    //goes through the macths of a team and calls functions. adds data to team data
    getData(){

        //this.init();

        //console.log(this.#data);
        for (const [key, team] of Object.entries(this.#data)){
            let teamData = {};
            const totals = this.#cycleData(team);
            const averages = this.#getAvgs(totals, Object.keys(team).length);
            const rates = this.#getRates(totals);
            
            teamData['totals'] = totals;
            teamData['averages'] = averages;
            teamData['rates'] = rates;

            this.#allData[key] = teamData;
        }

        this.#getDefendedData();
        this.teamData.getTotalsLength();
    }

    //same as above but sorts defenended and not defended
    #getDefendedData(){

        for (const [key, team] of Object.entries(this.#data)){
            let defendedTeamData = {}
            let notDefendedTeamData = {};
            let defendedData = {};
            let notDefendedData = {};
            for (const [key2, match] of Object.entries(team)){
                if (match['defended'] == 'Yes'){
                    defendedData[key2] = match;
                } else {
                    notDefendedData[key2] = match;
                }
            }

            //calcs when defended
            let totals = this.#cycleData(defendedData);
            let averages = this.#getAvgs(totals, Object.keys(defendedData).length);
            let rates = this.#getRates(totals);
            defendedTeamData = {};
            defendedTeamData['totals'] = totals;
            defendedTeamData['averages'] = averages;
            defendedTeamData['rates'] = rates;

            //calcs when not defnded
            totals = this.#cycleData(notDefendedData);
            averages = this.#getAvgs(totals, Object.keys(notDefendedData).length);
            rates = this.#getRates(totals);
            notDefendedTeamData = {};
            notDefendedTeamData['totals'] = totals;
            notDefendedTeamData['averages'] = averages;
            notDefendedTeamData['rates'] = rates;

            this.#defendedData[key] = defendedTeamData;
            this.#notDefendedData[key] = notDefendedData;
        }

    }


    //goes through the data and finds the total number of balls, traversals, etc
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

    //divides data in total by the number of matches sample is from
    #getAvgs(totals, numMatches){
        const teamAverages = {};
        for (const [key, value] of Object.entries(totals)){
            teamAverages[key + "Avg"] = value/numMatches;
        }
        return teamAverages;
    }

    //finds the rates, eg: high hub rate, traversal rate, etc
    #getRates(totals){

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


        //checks to make sure no divison by zero, then divides the (num of succes) / (num of sucess + num of fail)
        //(organized totals so that the corresponding fail is right after the sucess)
        let i = 0/*(change when taxi) 1*/;
        for (i = i; i < 8 /*(change when taxi) 9*/; i = i + 2){
            if (totals[Object.keys(totals)[i]] + totals[Object.keys(totals)[i+1]] == 0){
                teamRates[Object.keys(teamRates)[i/2]] = 'N/A';
            } else {
                teamRates[Object.keys(teamRates)[i/2]] = totals[Object.keys(totals)[i]]/(totals[Object.keys(totals)[i]] + totals[Object.keys(totals)[i + 1]]);
            }
        }

        //checks for division by zero
        //divides (num of times made of bar) / (num of times attempted bar)
        //totals organized so attempts right after sucesses
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


    getAllData(){
        return this.#allData;
    }
    getDefendedData(){
        return this.#defendedData;
    }
    getNotDefendedData(){
        return this.#notDefendedData;
    }
}
module.exports = CollectTeamData;