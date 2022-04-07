const fs = require("fs");
const BlueAlliance = require("bluealliance");
const tba = new BlueAlliance("wYuAaOjtoanexLjWHUWc1ayVQqKM3MjJ3ZTR7D9HGfRcKjljb075oEwpa7YecosQ");

let data;
try{
    data = require('./data.json');
}
catch (err) {
    console.log("Error parsing JSON string:", err);
}

//const {updateTeamData} = require('./TeamData');

let allData = {}; //ALL data for every team
let defendedData = {}; //data for when teams have had defense applied to them
let notDefendedData = {}; //data for when  teams dont have defense applied to them
getData();

//goes through the macths of a team and calls functions. adds data to team data
function getData(){

    for (const [key, team] of Object.entries(data)){
        let teamData = {};
        const totals = cycleData(team);
        const averages = getAvgs(totals, Object.keys(team).length);
        const rates = getRates(totals);
        
        teamData['totals'] = totals;
        teamData['averages'] = averages;
        teamData['rates'] = rates;

        allData[key] = teamData;
    }
    console.log('Updated all data (CollectTeamData.js)');
    updateDefendedData();
}

//same as above but sorts defenended and not defended
function updateDefendedData(){

    for (const [key, team] of Object.entries(data)){
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
        let totals = cycleData(defendedData);
        let averages = getAvgs(totals, Object.keys(defendedData).length);
        let rates = getRates(totals);
        defendedTeamData = {};
        defendedTeamData['totals'] = totals;
        defendedTeamData['averages'] = averages;
        defendedTeamData['rates'] = rates;

        //calcs when not defnded
        totals = cycleData(notDefendedData);
        averages = getAvgs(totals, Object.keys(notDefendedData).length);
        rates = getRates(totals);
        notDefendedTeamData = {};
        notDefendedTeamData['totals'] = totals;
        notDefendedTeamData['averages'] = averages;
        notDefendedTeamData['rates'] = rates;

        defendedData[key] = defendedTeamData;
        notDefendedData[key] = notDefendedData;
    }

    console.log('Updated (not) defended data (CollectTeamData.js)');
    //updateTeamData();

}


//goes through the data and finds the total number of balls, traversals, etc
function cycleData(teamMatches) {

    const teamTotals = {

        /*(change when taxi) taxis : parseInt(0), */
        autoHighs : parseInt(0),
        autoHighFails : parseInt(0),
        autoLows : parseInt(0),
        autoLowFails : parseInt(0),

        teleHighs : parseInt(0),
        teleHighFails : parseInt(0),
        teleLows : parseInt(0),
        teleLowFails : parseInt(0),

        
        traversalsSucceeded : parseInt(0),
        traversalsAttempted : parseInt(0),
        highbarsSucceeded : parseInt(0),
        highbarsAttempted : parseInt(0),
        midbarsSucceeded : parseInt(0),
        midbarsAttempted : parseInt(0),
        lowbarsSucceeded : parseInt(0),
        lowbarsAttempted : parseInt(0),
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
            teamTotals['traversalsAttempted']++;
        } else if (match['climbAttempted'] == 'High'){
            teamTotals['highbarsAttempted']++;
        } else if (match['climbAttempted'] == 'Mid'){
            teamTotals['midbarsAttempted']++;
        } else if (match['climbAttempted'] == 'Low'){
            teamTotals['lowbarsAttempted']++;
        }
    
        if (match['climbActual'] == 'Traversal'){
            teamTotals['traversalsSucceeded']++;
        } else if (match['climbActual'] == 'High'){
            teamTotals['highbarsSucceeded']++;
        } else if (match['climbActual'] == 'Mid'){
            teamTotals['midbarsSucceeded']++;
        } else if (match['climbActual'] == 'Low'){
            teamTotals['lowbarsSucceeded']++;
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
function getAvgs(totals, numMatches){

    const teamAverages = {};
    

    for (const [key, value] of Object.entries(totals)){
        teamAverages[key] = value/numMatches;
    }
    return teamAverages;
}

//finds the rates, eg: high hub rate, traversal rate, etc
function getRates(totals){

    const teamRates = {

        /*(change when taxi) taxiRate : parseInt(0),*/
        autoHigh : parseInt(0),
        autoLow : parseInt(0),
        
        teleHigh : parseInt(0),
        teleLow : parseInt(0),

        traversalSuccess : parseInt(0),
        highbarSuccess : parseInt(0),
        midbarSuccess : parseInt(0),
        lowbarSuccess : parseInt(0),
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


function getAllData(){
    return allData;
}
function getDefendedData(){
    return defendedData;
}
function getNotDefendedData(){
    return notDefendedData;
}
module.exports = {getAllData, getDefendedData, getNotDefendedData, getData};